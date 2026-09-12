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
      if(parts.length>=2){
        return {kind:'board',url:'https://www.pinterest.com/'+encodeURIComponent(parts[0])+'/'+encodeURIComponent(parts[1])+'/'};
      }
      return null;
    }catch(e){ return null; }
  }

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
     server-side and hands back a plain image URL — no third-party script
     involved, and it works for pin.it short links too. */
  const pinPreviewCache=new Map();
  const pinPreviewInFlight=new Set();

  async function resolvePinPreview(pin, cleanUrl){
    if(pinPreviewInFlight.has(cleanUrl)) return;
    pinPreviewInFlight.add(cleanUrl);
    try{
      const user=window.firebase&&firebase.auth&&firebase.auth().currentUser;
      if(!user||!window.VV_WORKER_URL){ console.error('[Pinterest preview] not signed in or no worker URL configured',{hasUser:!!user,workerUrl:window.VV_WORKER_URL}); pinPreviewCache.set(cleanUrl,{failed:true}); return; }
      const idToken=await user.getIdToken();
      const resp=await fetch(window.VV_WORKER_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+idToken},
        body:JSON.stringify({action:'resolvePin',url:cleanUrl})
      });
      let data;
      try{ data=await resp.json(); }catch(parseErr){ console.error('[Pinterest preview] worker response was not JSON',{status:resp.status,statusText:resp.statusText,url:cleanUrl}); pinPreviewCache.set(cleanUrl,{failed:true}); return; }
      if(!resp.ok||!data.thumbnailUrl){ console.error('[Pinterest preview] worker did not return a thumbnail',{status:resp.status,data,url:cleanUrl}); pinPreviewCache.set(cleanUrl,{failed:true}); return; }
      pinPreviewCache.set(cleanUrl,{thumbnailUrl:data.thumbnailUrl,title:data.title,resolvedUrl:data.url});
      if(dbReady&&pin.id) db.collection('pinboard').doc(pin.id).update({pinThumbnail:data.thumbnailUrl,pinResolvedUrl:data.url});
      else { pin.pinThumbnail=data.thumbnailUrl; pin.pinResolvedUrl=data.url; }
      window.renderBoard();
    }catch(e){
      console.error('[Pinterest preview] request failed',{error:String(e),url:cleanUrl});
      pinPreviewCache.set(cleanUrl,{failed:true});
    }finally{
      pinPreviewInFlight.delete(cleanUrl);
    }
  }

  window.renderPinterestBoard=function(rawUrl){
    const shelf=document.getElementById('pinterestBoardShelf');
    if(!shelf) return;
    const parsed=classifyPinterestUrl(rawUrl);
    if(!parsed){
      shelf.innerHTML='<div class="warn">That does not look like a Pinterest board URL.</div>';
      return;
    }
    if(parsed.kind==='short'){
      shelf.innerHTML='<div class="warn">Pinterest short links need the full board address first. <a target="_blank" rel="noopener" href="'+esc(parsed.url)+'">Open Pinterest ↗</a>, then copy the full board URL from the address bar and paste it here.</div>';
      return;
    }
    if(parsed.kind!=='board'){
      shelf.innerHTML='<div class="warn">That is an individual Pinterest Pin, not a board. Use “+ Pinterest” below for individual Pins.</div>';
      return;
    }
    const input=document.getElementById('pinterestBoardUrl');
    if(input) input.value=parsed.url;
    localStorage.setItem('vv_pinterest_board_url',parsed.url);
    shelf.innerHTML='<a data-pin-do="embedBoard" data-pin-board-width="900" data-pin-scale-height="420" data-pin-scale-width="110" href="'+esc(parsed.url)+'"></a>';
    ensurePinterestScript();
    requestPinterestBuild();
  };

  window.renderBoard=function(){
    const grid=document.getElementById('boardGrid'), empty=document.getElementById('boardEmpty');
    if(!grid||!empty) return;
    let pins=state.pins;
    if(activeFilter!=='all'){
      pins=pins.filter(function(p){
        return activeFilter==='photo'?p.type==='photo':activeFilter==='link'?p.type==='link':activeFilter==='pinterest'?p.type==='pinterest':p.tag===activeFilter;
      });
    }
    grid.innerHTML='';
    empty.style.display=pins.length?'none':'block';
    let hasBoardPinterest=false;
    pins.forEach(function(p){
      const el=document.createElement('div'); el.className='pin';
      let inner='';
      if(p.type==='photo'){
        inner='<img src="'+p.imageDataUrl+'" alt="">';
      }else if(p.type==='style'){
        inner='<div class="pin-icon-wrap tint-'+({dress:'wine',suit:'cypress',flowers:'cypress',venue:'brass',music:'cypress',hair:'wine',makeup:'brass',stationery:'brass'}[p.tag]||'cypress')+'">'+svg(ICON[p.icon])+'</div>';
      }else if(p.type==='pinterest'){
        const parsed=classifyPinterestUrl(p.url);
        const kind=p.pinterestKind||(parsed&&parsed.kind);
        const clean=(parsed&&parsed.url)||p.url;
        if(kind==='board'){
          inner='<div class="pin-pinterest pin-pinterest-board"><a data-pin-do="embedBoard" data-pin-board-width="320" data-pin-scale-height="240" data-pin-scale-width="80" href="'+esc(clean)+'"></a></div>';
          hasBoardPinterest=true;
        }else if(kind==='pin'||kind==='short'){
          const preview=(p.pinThumbnail&&{thumbnailUrl:p.pinThumbnail})||pinPreviewCache.get(clean);
          if(preview&&preview.thumbnailUrl){
            inner='<img src="'+esc(preview.thumbnailUrl)+'" alt="">';
          }else{
            inner='<div class="pin-icon-wrap tint-brass">'+svg(ICON.external)+'</div>';
            if(!preview||!preview.failed) resolvePinPreview(p,clean);
          }
        }else{
          inner='<div class="pin-icon-wrap tint-brass">'+svg(ICON.external)+'</div>';
        }
      }else{
        inner='<div class="pin-icon-wrap tint-brass">'+svg(ICON.external)+'</div>';
      }
      el.innerHTML=inner+'<div class="pin-body"><div class="pin-tag">'+(p.tag||'other')+'</div><h5>'+esc(p.title||'')+'</h5>'+(p.note?'<p>'+esc(p.note)+'</p>':'')+((p.type==='link'||p.type==='pinterest')?'<a target="_blank" rel="noopener" href="'+esc(p.url)+'">Open source ↗</a>':'')+'</div><button class="del-pin">'+svg(ICON.x)+'</button>';
      el.querySelector('.del-pin').addEventListener('click',function(){
        if(dbReady) db.collection('pinboard').doc(p.id).delete();
        else {state.pins=state.pins.filter(function(x){return x.id!==p.id;});renderBoard();renderStart();}
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
      const defaultTitle=parsed.kind==='board'?'Pinterest Board':'Pinterest Pin';
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
    clean.addEventListener('click',function(){window.renderPinterestBoard(document.getElementById('pinterestBoardUrl')?.value);});
  }

  const saved=localStorage.getItem('vv_pinterest_board_url');
  if(saved) setTimeout(function(){window.renderPinterestBoard(saved);},50);
  setTimeout(function(){window.renderBoard();},80);
})();
