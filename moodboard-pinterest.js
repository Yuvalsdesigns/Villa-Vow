"use strict";
/* Moodboard-only Pinterest integration.
   This file intentionally touches only the Moodboard Pinterest behavior. */
(function(){
  const PINTEREST_SCRIPT='https://assets.pinterest.com/js/pinit.js';
  let buildTimer=null;

  function classifyPinterestUrl(raw){
    raw=(raw||'').trim();
    if(!raw) return null;
    try{
      const u=new URL(raw);
      const host=u.hostname.toLowerCase();
      if(host==='pin.it'||host==='www.pin.it') return {kind:'short',url:raw};
      if(host!=='pinterest.com'&&!host.endsWith('.pinterest.com')) return null;
      const parts=u.pathname.split('/').filter(Boolean);
      if(parts[0]&&parts[0].toLowerCase()==='pin'&&parts[1]){
        return {kind:'pin',url:'https://www.pinterest.com/pin/'+encodeURIComponent(parts[1])+'/'};
      }
      /* A board can be organized into sections (e.g. a "Flowers" section
         inside a "Wedding" board), which live at a THIRD path segment:
         pinterest.com/you/wedding-board/flowers/. Dropping that segment
         collapsed every section link back down to the same whole-board
         URL. Pinterest's own embed widget has no separate "section" type
         either, so even keeping the full URL, its widget just resolves a
         section back to its parent board, both of a reason a section link
         needs a different rendering path than a real board (see 'section'
         handling in renderPinterestBoards). */
      if(parts.length>=3){
        return {kind:'section',url:'https://www.pinterest.com/'+encodeURIComponent(parts[0])+'/'+encodeURIComponent(parts[1])+'/'+encodeURIComponent(parts[2])+'/'};
      }
      if(parts.length===2){
        return {kind:'board',url:'https://www.pinterest.com/'+encodeURIComponent(parts[0])+'/'+encodeURIComponent(parts[1])+'/'};
      }
      return null;
    }catch(e){ return null; }
  }

  /* YouTube and TikTok both run a free, public oEmbed endpoint that needs
     no API key or account, unlike Instagram/Google Drive, which require
     a registered app and, in practice, a paid-tier setup to get a real
     thumbnail. Scoped to just these two for that reason. */
  function classifyVideoUrl(raw){
    raw=(raw||'').trim();
    if(!raw) return null;
    try{
      const u=new URL(raw);
      const host=u.hostname.toLowerCase();
      if(host==='youtube.com'||host==='www.youtube.com'||host==='m.youtube.com'||host==='youtu.be'){
        return {provider:'youtube',url:raw};
      }
      if(host==='tiktok.com'||host==='www.tiktok.com'||host==='vm.tiktok.com'||host==='vt.tiktok.com'){
        return {provider:'tiktok',url:raw};
      }
      return null;
    }catch(e){ return null; }
  }
  window.classifyVideoUrl=classifyVideoUrl;

  function requestPinterestBuild(){
    clearTimeout(buildTimer);
    buildTimer=setTimeout(function(){
      if(window.PinUtils&&typeof window.PinUtils.build==='function') window.PinUtils.build();
    },120);
  }

  function ensurePinterestScript(){
    let script=[...document.scripts].find(function(s){return (s.src||'').includes('assets.pinterest.com/js/pinit.js');});
    if(script){
      if(window.PinUtils&&typeof window.PinUtils.build==='function') requestPinterestBuild();
      else script.addEventListener('load',requestPinterestBuild,{once:true});
      return;
    }
    script=document.createElement('script');
    script.src=PINTEREST_SCRIPT;
    script.async=true;
    script.defer=true;
    script.dataset.vvPinterest='1';
    script.addEventListener('load',requestPinterestBuild,{once:true});
    document.body.appendChild(script);
  }

  window.ensurePinterestWidgets=ensurePinterestScript;
  window.classifyPinterestUrl=classifyPinterestUrl;

  /* Pinterest's client-side embed widget (used below only for whole boards)
     is a well-known tracker and gets silently blocked by ad blockers and
     Safari's tracking prevention on some devices, which is why a pin could
     look "added" but never show a picture. Individual pins are previewed
     via our own Worker instead, which fetches Pinterest's oEmbed thumbnail
     server-side and hands back a plain image URL, no third-party script
     involved, and it works for pin.it short links too. */
  const pinPreviewCache=new Map();
  const pinPreviewInFlight=new Set();

  async function resolvePinPreview(pin, cleanUrl, provider){
    if(pinPreviewInFlight.has(cleanUrl)) return;
    pinPreviewInFlight.add(cleanUrl);
    try{
      const user=window.firebase&&firebase.auth&&firebase.auth().currentUser;
      if(!user||!window.VV_WORKER_URL){
        const reason='Not signed in yet, or the worker URL is missing.';
        console.error('[Pinterest preview]',reason,{hasUser:!!user,workerUrl:window.VV_WORKER_URL});
        pinPreviewCache.set(cleanUrl,{failed:true,reason}); window.renderBoard(); return;
      }
      const idToken=await user.getIdToken();
      const body=provider?{action:'resolveEmbed',provider,url:cleanUrl}:{action:'resolvePin',url:cleanUrl};
      const resp=await fetch(window.VV_WORKER_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+idToken},
        body:JSON.stringify(body)
      });
      let data;
      try{ data=await resp.json(); }catch(parseErr){
        const reason='HTTP '+resp.status+' '+resp.statusText+' (response was not JSON)';
        console.error('[Pinterest preview]',reason,{url:cleanUrl});
        pinPreviewCache.set(cleanUrl,{failed:true,reason}); window.renderBoard(); return;
      }
      if(!resp.ok||!data.thumbnailUrl){
        let reason='HTTP '+resp.status+': '+(data&&(data.error||'no thumbnail returned')||'no thumbnail returned');
        if(data&&data.status) reason+=' (Pinterest responded '+data.status+')';
        if(data&&data.bodySnippet) reason+=': '+String(data.bodySnippet).slice(0,160);
        console.error('[Pinterest preview]',reason,{status:resp.status,data,url:cleanUrl});
        pinPreviewCache.set(cleanUrl,{failed:true,reason}); window.renderBoard(); return;
      }
      pinPreviewCache.set(cleanUrl,{thumbnailUrl:data.thumbnailUrl,title:data.title,resolvedUrl:data.url});
      if(dbReady&&pin.id) db.collection('pinboard').doc(pin.id).update({pinThumbnail:data.thumbnailUrl,pinResolvedUrl:data.url});
      else { pin.pinThumbnail=data.thumbnailUrl; pin.pinResolvedUrl=data.url; }
      window.renderBoard();
    }catch(e){
      const reason='Request failed: '+String(e&&e.message||e);
      console.error('[Pinterest preview]',reason,{url:cleanUrl});
      pinPreviewCache.set(cleanUrl,{failed:true,reason});
      window.renderBoard();
    }finally{
      pinPreviewInFlight.delete(cleanUrl);
    }
  }

  /* Pinterest's board-embed widget has no concept of a "section" (see the
     comment on the 'section' kind in classifyPinterestUrl above), so a
     section link can't be handed to it and get section-specific content.
     Instead the Worker fetches the section's page directly and hands back
     a small set of that section's own pins, which are rendered here as a
     plain grid instead of Pinterest's iframe. This depends on Pinterest's
     page still including plain pin links in its HTML response, which is
     not guaranteed and can stop working if Pinterest changes their site. */
  const sectionGalleryCache=new Map();
  const sectionGalleryInFlight=new Set();

  /* A section link can appear both in the dedicated boards shelf and as an
     individually-added pin in the main moodboard grid, so refresh whichever
     of those two renderers is actually in use. */
  function refreshSectionViews(){
    if(typeof window.renderPinterestBoards==='function') window.renderPinterestBoards();
    if(typeof window.renderBoard==='function') window.renderBoard();
  }

  async function resolveSectionGallery(sectionUrl){
    if(sectionGalleryInFlight.has(sectionUrl)) return;
    sectionGalleryInFlight.add(sectionUrl);
    try{
      const user=window.firebase&&firebase.auth&&firebase.auth().currentUser;
      if(!user||!window.VV_WORKER_URL){
        const reason='Not signed in yet, or the worker URL is missing.';
        console.error('[Pinterest section]',reason,{hasUser:!!user,workerUrl:window.VV_WORKER_URL});
        sectionGalleryCache.set(sectionUrl,{failed:true,reason}); refreshSectionViews(); return;
      }
      const idToken=await user.getIdToken();
      const resp=await fetch(window.VV_WORKER_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+idToken},
        body:JSON.stringify({action:'resolveSection',url:sectionUrl})
      });
      let data;
      try{ data=await resp.json(); }catch(parseErr){
        const reason='HTTP '+resp.status+' '+resp.statusText+' (response was not JSON)';
        console.error('[Pinterest section]',reason,{url:sectionUrl});
        sectionGalleryCache.set(sectionUrl,{failed:true,reason}); refreshSectionViews(); return;
      }
      if(!resp.ok||!data.pins||!data.pins.length){
        let reason=data&&data.error||('HTTP '+resp.status);
        if(data&&data.bodySnippet) reason+=': '+String(data.bodySnippet).slice(0,160);
        console.error('[Pinterest section]',reason,{status:resp.status,data,url:sectionUrl});
        sectionGalleryCache.set(sectionUrl,{failed:true,reason}); refreshSectionViews(); return;
      }
      sectionGalleryCache.set(sectionUrl,{pins:data.pins});
      refreshSectionViews();
    }catch(e){
      const reason='Request failed: '+String(e&&e.message||e);
      console.error('[Pinterest section]',reason,{url:sectionUrl});
      sectionGalleryCache.set(sectionUrl,{failed:true,reason});
      refreshSectionViews();
    }finally{
      sectionGalleryInFlight.delete(sectionUrl);
    }
  }

  let localPinterestBoards=[];
  function boardList(){ return (dbReady?state.pinterestBoards:localPinterestBoards)||[]; }

  function boardWarn(msg){
    const warnEl=document.getElementById('pinterestBoardWarn');
    if(warnEl){ warnEl.innerHTML=msg; warnEl.style.display='block'; }
  }

  /* A legacy install only ever remembered one board, locally, in
     localStorage. Carry it over into the shared list once, then forget
     the local copy so this never re-adds it on a later visit. Only runs
     on whichever specific device actually had that value saved. */
  function migrateLegacyBoardUrl(){
    const saved=localStorage.getItem('vv_pinterest_board_url');
    if(!saved||!dbReady) return;
    localStorage.removeItem('vv_pinterest_board_url');
    addPinterestBoard(saved);
  }

  function moveBoard(id,dir){
    const boards=boardList().slice();
    const idx=boards.findIndex(function(b){return b.id===id;});
    if(idx<0) return;
    const swapIdx=dir==='up'?idx-1:idx+1;
    if(swapIdx<0||swapIdx>=boards.length) return;
    const a=boards[idx], b=boards[swapIdx];
    const aTime=a.addedAt, bTime=b.addedAt;
    if(dbReady){
      const batch=db.batch();
      batch.update(db.collection('pinterestBoards').doc(a.id),{addedAt:bTime});
      batch.update(db.collection('pinterestBoards').doc(b.id),{addedAt:aTime});
      batch.commit();
    }else{
      a.addedAt=bTime; b.addedAt=aTime;
      localPinterestBoards.sort(function(x,y){return x.addedAt-y.addedAt;});
      window.renderPinterestBoards();
    }
  }

  function renameBoard(id,newTitle){
    if(dbReady&&id){ db.collection('pinterestBoards').doc(id).update({title:newTitle}); return; }
    const b=localPinterestBoards.find(function(x){return x.id===id;});
    if(b) b.title=newTitle;
  }

  function updateBoardUrl(id,newUrl){
    if(dbReady&&id){ db.collection('pinterestBoards').doc(id).update({url:newUrl}); return; }
    const b=localPinterestBoards.find(function(x){return x.id===id;});
    if(b){ b.url=newUrl; window.renderPinterestBoards(); }
  }

  /* Shared by both the "add a board" form and in-place URL editing, so a
     board or section link is validated (and the same warnings shown) the
     same way whichever path added or changed it. */
  function validateBoardUrl(rawUrl){
    const parsed=classifyPinterestUrl(rawUrl);
    if(!parsed){
      boardWarn('That does not look like a Pinterest board URL.');
      return null;
    }
    if(parsed.kind==='short'){
      boardWarn('Pinterest short links need the full board address first. <a target="_blank" rel="noopener" href="'+esc(parsed.url)+'">Open Pinterest ↗</a>, then copy the full board URL from the address bar and paste it here.');
      return null;
    }
    if(parsed.kind!=='board'&&parsed.kind!=='section'){
      boardWarn('That is an individual Pinterest Pin, not a board. Use “+ Pinterest” below for individual Pins.');
      return null;
    }
    return parsed;
  }

  function addPinterestBoard(rawUrl){
    const parsed=validateBoardUrl(rawUrl);
    if(!parsed) return;
    const titleInput=document.getElementById('pinterestBoardTitle');
    const title=(titleInput&&titleInput.value.trim())||'';
    const data={url:parsed.url,title:title,addedAt:Date.now()};
    if(dbReady) db.collection('pinterestBoards').add(data);
    else { data.id='local-'+Math.random().toString(36).slice(2); localPinterestBoards.push(data); window.renderPinterestBoards(); }
    const input=document.getElementById('pinterestBoardUrl');
    if(input) input.value='';
    if(titleInput) titleInput.value='';
  }

  /* Pinterest's board widget (and, it turns out, Pinterest's own backend)
     can keep showing a board's previous pins for a while after you've
     actually moved/removed them on pinterest.com, since the embed is
     fetched by Pinterest's servers from their own cache of that board,
     not re-read live on every page load. A normal refresh doesn't help
     because the URL is unchanged. Appending a one-off query parameter
     when rebuilding a specific board's embed gives Pinterest a URL it
     hasn't served before, which is a standard way to bypass a cache like
     that; it's a real cache-buster, not guaranteed against every kind of
     caching Pinterest might be doing on their end. */
  const boardRefreshNonce=new Map();

  /* Pinterest's embed widget bakes data-pin-board-width into a fixed-size
     iframe at build time, it does not respond to CSS or container resizes
     on its own, so a hardcoded width left a large empty gap once the
     moodboard view was allowed to grow past that number on a wide screen. */
  function pinterestBoardWidth(shelf){
    const available=(shelf&&shelf.clientWidth)||(shelf&&shelf.parentElement&&shelf.parentElement.clientWidth)||900;
    return Math.max(500, Math.min(1600, Math.round(available)));
  }
  let lastPinterestBoardWidth=null;
  window.renderPinterestBoards=function(){
    const shelf=document.getElementById('pinterestBoardShelf');
    if(!shelf) return;
    migrateLegacyBoardUrl();
    const boards=boardList();
    const boardWidth=pinterestBoardWidth(shelf);
    lastPinterestBoardWidth=boardWidth;
    const pendingSectionUrls=[];
    let hasWidgetBoard=false;
    shelf.innerHTML=boards.map(function(b,i){
      const id=esc(b.id||'');
      /* Classify from the URL itself on every render (see the same choice
         in renderBoard below) rather than trusting a stored field, so
         editing the URL in place always takes the correct rendering path
         without needing a separate migration. */
      const parsed=classifyPinterestUrl(b.url);
      const kind=parsed&&parsed.kind;
      let body;
      if(kind==='section'){
        const cached=sectionGalleryCache.get(b.url);
        if(cached&&cached.pins){
          body='<div class="pinterest-section-gallery">'+cached.pins.map(function(p){
            return '<a class="pinterest-section-thumb" target="_blank" rel="noopener" href="'+esc(p.url)+'"><img src="'+esc(p.thumbnailUrl)+'" alt="'+esc(p.title||'')+'" loading="lazy"></a>';
          }).join('')+'</div>';
        }else if(cached&&cached.failed){
          body='<div class="pinterest-section-status pinterest-section-error">Could not load this section: '+esc(cached.reason||'unknown error')
            +'. <a target="_blank" rel="noopener" href="'+esc(b.url)+'">Open on Pinterest ↗</a> or <button type="button" class="section-retry" data-url="'+esc(b.url)+'">try again</button>.</div>';
        }else{
          body='<div class="pinterest-section-status">Loading this section’s pins…</div>';
          pendingSectionUrls.push(b.url);
        }
      }else{
        const nonce=boardRefreshNonce.get(b.id);
        const embedHref=nonce?b.url+(b.url.indexOf('?')<0?'?':'&')+'_r='+nonce:b.url;
        body='<a data-pin-do="embedBoard" data-pin-board-width="'+boardWidth+'" data-pin-scale-height="420" data-pin-scale-width="110" href="'+esc(embedHref)+'"></a>';
        hasWidgetBoard=true;
      }
      return '<div class="pinterest-board-item">'
        +'<div class="pinterest-board-head">'
          +'<input class="board-title-input" type="text" value="'+esc(b.title||'')+'" placeholder="Add a title, e.g. Flowers" data-id="'+id+'">'
          +'<div class="board-head-actions">'
            +(kind!=='section'?'<button class="board-refresh" type="button" data-id="'+id+'" aria-label="Refresh this board’s pins">'+svg(ICON.refresh)+'</button>':'')
            +'<button class="board-move" type="button" data-dir="up" data-id="'+id+'" aria-label="Move board up"'+(i===0?' disabled':'')+'>'+svg(ICON.chevron)+'</button>'
            +'<button class="board-move board-move-down" type="button" data-dir="down" data-id="'+id+'" aria-label="Move board down"'+(i===boards.length-1?' disabled':'')+'>'+svg(ICON.chevron)+'</button>'
            +'<button class="board-remove" type="button" data-id="'+id+'" aria-label="Remove board">'+svg(ICON.x)+'</button>'
          +'</div>'
        +'</div>'
        +'<div class="pinterest-board-url-row"><input class="board-url-input" type="text" value="'+esc(b.url||'')+'" placeholder="https://www.pinterest.com/you/board/" data-id="'+id+'" spellcheck="false"></div>'
        +body
        +'</div>';
    }).join('');
    shelf.querySelectorAll('.section-retry').forEach(function(btn){
      btn.addEventListener('click',function(){
        sectionGalleryCache.delete(btn.dataset.url);
        window.renderPinterestBoards();
      });
    });
    pendingSectionUrls.forEach(function(url){ resolveSectionGallery(url); });
    shelf.querySelectorAll('.board-refresh').forEach(function(btn){
      btn.addEventListener('click',function(){
        boardRefreshNonce.set(btn.dataset.id,Date.now());
        window.renderPinterestBoards();
      });
    });
    shelf.querySelectorAll('.board-remove').forEach(function(btn){
      btn.addEventListener('click',function(){
        const id=btn.dataset.id;
        const board=boards.find(function(x){return x.id===id;});
        const label=board&&board.title?'"'+board.title+'"':'this board';
        confirmAction('Are you sure you want to delete '+label+'?',function(){
          if(dbReady&&id) db.collection('pinterestBoards').doc(id).delete();
          else { localPinterestBoards=localPinterestBoards.filter(function(x){return x.id!==id;}); window.renderPinterestBoards(); }
        });
      });
    });
    shelf.querySelectorAll('.board-move').forEach(function(btn){
      btn.addEventListener('click',function(){
        if(btn.disabled) return;
        moveBoard(btn.dataset.id,btn.dataset.dir);
      });
    });
    shelf.querySelectorAll('.board-title-input').forEach(function(input){
      const committed=input.value;
      input.addEventListener('keydown',function(e){
        if(e.key==='Enter'){ e.preventDefault(); input.blur(); }
      });
      input.addEventListener('blur',function(){
        const val=input.value.trim();
        if(val!==committed) renameBoard(input.dataset.id,val);
      });
    });
    shelf.querySelectorAll('.board-url-input').forEach(function(input){
      const committed=input.value;
      input.addEventListener('keydown',function(e){
        if(e.key==='Enter'){ e.preventDefault(); input.blur(); }
      });
      input.addEventListener('blur',function(){
        const val=input.value.trim();
        if(val===committed) return;
        const parsed=validateBoardUrl(val);
        if(!parsed){ input.value=committed; return; }
        updateBoardUrl(input.dataset.id,parsed.url);
      });
    });
    if(hasWidgetBoard){ ensurePinterestScript(); requestPinterestBuild(); }
  };

  /* The embed's width is fixed at build time, so a genuine window resize
     (or the moodboard container simply becoming visible at its real size,
     since a hidden view measures 0 width) needs a full rebuild to pick up
     the new size, not just a rebuild of the existing iframe. Mobile browsers
     also fire "resize" purely from the address bar showing/hiding while you
     scroll, with no width change at all; rebuilding on those (destroying and
     recreating every board's iframe mid-scroll) is what caused the page to
     visibly jump, so skip the rebuild unless the measured width actually
     changed. */
  let boardResizeTimer=null;
  window.addEventListener('resize', function(){
    clearTimeout(boardResizeTimer);
    boardResizeTimer=setTimeout(function(){
      const shelf=document.getElementById('pinterestBoardShelf');
      if(!shelf) return;
      if(pinterestBoardWidth(shelf)===lastPinterestBoardWidth) return;
      window.renderPinterestBoards();
    }, 300);
  });

  window.renderBoard=function(){
    const grid=document.getElementById('boardGrid'), empty=document.getElementById('boardEmpty');
    if(!grid||!empty) return;
    let pins=state.pins;
    if(activeFilter!=='all'){
      pins=pins.filter(function(p){
        return activeFilter==='photo'?p.type==='photo':activeFilter==='link'?p.type==='link':activeFilter==='pinterest'?(p.type==='pinterest'||!!classifyPinterestUrl(p.url)):p.tag===activeFilter;
      });
    }
    grid.innerHTML='';
    empty.style.display=pins.length?'none':'block';
    let hasBoardPinterest=false;
    pins.forEach(function(p){
      const el=document.createElement('div'); el.className='pin';
      let inner='';
      let previewError=null;
      if(p.type==='photo'){
        inner='<img src="'+p.imageDataUrl+'" alt="">';
      }else if(p.type==='style'){
        inner='<div class="pin-icon-wrap tint-'+({dress:'wine',suit:'lilac',flowers:'cypress',venue:'coral',music:'butter',hair:'brass',makeup:'brass',stationery:'lilac'}[p.tag]||'cypress')+'">'+svg(ICON[p.icon])+'</div>';
      }else if(p.type==='pinterest'||p.type==='link'){
        /* Classify from the URL itself on every render, rather than trusting
           the stored type/pinterestKind fields, since those depend on a one-time
           migration or on which code path originally saved the pin, and a
           pin added (or re-added) after that migration already ran once
           would otherwise be stuck showing the generic icon forever. */
        const parsed=classifyPinterestUrl(p.url);
        const kind=p.pinterestKind||(parsed&&parsed.kind);
        const clean=(parsed&&parsed.url)||p.url;
        if(kind==='board'){
          inner='<div class="pin-pinterest pin-pinterest-board"><a data-pin-do="embedBoard" data-pin-board-width="320" data-pin-scale-height="240" data-pin-scale-width="80" href="'+esc(clean)+'"></a></div>';
          hasBoardPinterest=true;
        }else if(kind==='section'){
          const cached=sectionGalleryCache.get(clean);
          if(cached&&cached.pins){
            inner='<div class="pinterest-section-gallery pinterest-section-gallery-small">'+cached.pins.slice(0,4).map(function(sp){
              return '<a class="pinterest-section-thumb" target="_blank" rel="noopener" href="'+esc(sp.url)+'"><img src="'+esc(sp.thumbnailUrl)+'" alt="" loading="lazy"></a>';
            }).join('')+'</div>';
          }else{
            inner='<div class="pin-icon-wrap tint-brass">'+svg(ICON.external)+'</div>';
            if(cached&&cached.failed) previewError=cached.reason||'Could not load this section';
            else resolveSectionGallery(clean);
          }
        }else if(kind==='pin'||kind==='short'){
          const preview=(p.pinThumbnail&&{thumbnailUrl:p.pinThumbnail})||pinPreviewCache.get(clean);
          if(preview&&preview.thumbnailUrl){
            inner='<img src="'+esc(preview.thumbnailUrl)+'" alt="">';
          }else{
            inner='<div class="pin-icon-wrap tint-brass">'+svg(ICON.external)+'</div>';
            if(preview&&preview.failed) previewError=preview.reason||'Preview failed';
            else resolvePinPreview(p,clean);
          }
        }else{
          const video=classifyVideoUrl(p.url);
          if(video){
            const preview=(p.pinThumbnail&&{thumbnailUrl:p.pinThumbnail})||pinPreviewCache.get(video.url);
            if(preview&&preview.thumbnailUrl){
              inner='<img src="'+esc(preview.thumbnailUrl)+'" alt="">';
            }else{
              inner='<div class="pin-icon-wrap tint-brass">'+svg(ICON.external)+'</div>';
              if(preview&&preview.failed) previewError=preview.reason||'Preview failed';
              else resolvePinPreview(p,video.url,video.provider);
            }
          }else{
            inner='<div class="pin-icon-wrap tint-brass">'+svg(ICON.external)+'</div>';
          }
        }
      }else{
        inner='<div class="pin-icon-wrap tint-brass">'+svg(ICON.external)+'</div>';
      }
      el.innerHTML=inner+'<div class="pin-body"><div class="pin-tag">'+(p.tag||'other')+'</div><h5>'+esc(p.title||'')+'</h5>'+(p.note?'<p>'+esc(p.note)+'</p>':'')+(previewError?'<p style="color:#b3372f;font-size:10.5px;font-family:\'IBM Plex Mono\',monospace;">'+esc(previewError)+'</p>':'')+((p.type==='link'||p.type==='pinterest')?'<a target="_blank" rel="noopener" href="'+esc(p.url)+'">Open source ↗</a>':'')+'</div><button class="del-pin">'+svg(ICON.x)+'</button>';
      el.querySelector('.del-pin').addEventListener('click',function(){
        const label=p.title?'"'+p.title+'"':'this item';
        confirmAction('Are you sure you want to delete '+label+'?',function(){
          if(dbReady) db.collection('pinboard').doc(p.id).delete();
          else {state.pins=state.pins.filter(function(x){return x.id!==p.id;});renderBoard();renderStart();}
        });
      });
      grid.appendChild(el);
    });
    if(hasBoardPinterest){ ensurePinterestScript(); requestPinterestBuild(); }
  };

  function replacePinterestSaveHandler(){
    const old=document.getElementById('savePinterest');
    if(!old||old.dataset.vvPinterestIsolated==='1') return;
    const fresh=old.cloneNode(true);
    fresh.dataset.vvPinterestIsolated='1';
    old.replaceWith(fresh);
    fresh.addEventListener('click',function(){
      const raw=document.getElementById('pinterestUrl').value.trim();
      if(!raw) return;
      const parsed=classifyPinterestUrl(raw);
      if(!parsed){
        const warn=document.getElementById('pasteWarn');
        if(warn){warn.textContent='That does not look like a Pinterest URL.';warn.style.display='block';}
        return;
      }
      const url=parsed.url;
      const defaultTitle=parsed.kind==='board'?'Pinterest Board':parsed.kind==='section'?'Pinterest Section':'Pinterest Pin';
      const data={type:'pinterest',pinterestKind:parsed.kind,url:url,title:document.getElementById('pinterestTitle').value.trim()||defaultTitle,note:document.getElementById('pinterestNote').value.trim(),tag:document.getElementById('pinterestTag').value,createdAt:Date.now()};
      if(dbReady) db.collection('pinboard').add(data);
      else {localAdd(state.pins,data);renderBoard();renderStart();}
      document.getElementById('pinterestUrl').value='';
      document.getElementById('pinterestTitle').value='';
      document.getElementById('pinterestNote').value='';
      closeModal();
    });
  }

  const addPinterest=document.getElementById('btnAddPinterest');
  if(addPinterest) addPinterest.textContent='+ Pinterest';
  const paneTitle=document.querySelector('#pane-pinterest h3');
  if(paneTitle) paneTitle.textContent='Add from Pinterest';
  const urlLabel=document.querySelector('#pane-pinterest label.field');
  if(urlLabel&&urlLabel.childNodes.length) urlLabel.childNodes[0].nodeValue='Pinterest Pin or Board URL';
  const urlInput=document.getElementById('pinterestUrl');
  if(urlInput) urlInput.placeholder='https://www.pinterest.com/...';
  if(document.getElementById('savePinterest')) document.getElementById('savePinterest').textContent='Add to Moodboard';
  replacePinterestSaveHandler();

  const boardButton=document.getElementById('embedPinterestBoard');
  if(boardButton){
    const clean=boardButton.cloneNode(true);
    boardButton.replaceWith(clean);
    clean.addEventListener('click',function(){
      const warnEl=document.getElementById('pinterestBoardWarn');
      if(warnEl) warnEl.style.display='none';
      addPinterestBoard(document.getElementById('pinterestBoardUrl')?.value);
    });
  }
  const boardUrlInput=document.getElementById('pinterestBoardUrl');
  if(boardUrlInput){
    boardUrlInput.addEventListener('keydown',function(e){
      if(e.key==='Enter'){
        e.preventDefault();
        const warnEl=document.getElementById('pinterestBoardWarn');
        if(warnEl) warnEl.style.display='none';
        addPinterestBoard(boardUrlInput.value);
      }
    });
  }

  setTimeout(function(){window.renderPinterestBoards();},50);
  setTimeout(function(){window.renderBoard();},80);
})();
