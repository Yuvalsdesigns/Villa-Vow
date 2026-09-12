"use strict";
/* ---------------- EMAIL TEMPLATES ---------------- */
const EMAIL_TEMPLATES = [
  {title:'Venue inquiry (villa / masseria)', to:'The venue coordinator', subject:'Wedding inquiry — [proposed date], approx. [guest count] guests',
   body:`Hello [Venue name] team,

We're planning a destination wedding on [proposed date] for around [guest count] guests, most traveling from Israel and France, and your property is on our shortlist. A few questions before we go further:

- Is the property available, in full or in part, for [number] nights around that date?
- How many guests can the on-site rooms sleep, and is a full-property exclusive rental an option?
- Is there a space suited to an outdoor wedding ceremony under a chuppah (an open canopy structure), plus an indoor backup in case of weather?
- Are outside caterers permitted? Our catering needs to be fully kosher, supervised by a mashgiach with their own kitchen setup — could you tell us about kitchen access and any restrictions?
- Is a pool or outdoor space available for a private group day the day after the wedding?
- What's included in the venue rate, and what's your deposit and cancellation policy?

We'd love to see photos of the ceremony and reception spaces, and to set up a call if that's easier. Thank you!

Warm regards,
[Your names]`},
  {title:'Kosher caterer inquiry', to:'The catering company', subject:'Kosher catering inquiry — destination wedding, [region], [proposed date]',
   body:`Hello [Caterer name],

We're planning a kosher wedding at [venue name] in [region] on [proposed date], for approximately [guest count] guests. Could you let us know:

- Whether you travel to and cater events in [region], and your availability for that date
- Your certification and which rabbinical authority supervises it
- Whether you bring your own mobile kitchen or require specific facilities on-site (we're happy to connect you directly with the venue)
- Menu style options (plated, buffet, family-style) and approximate pricing per person
- The lead time you need to confirm a booking — we understand this can be as much as 12–18 months for kosher catering in Europe
- Whether you're also able to cater a welcome dinner the night before

Happy to jump on a call whenever suits you. Thank you so much!

Best,
[Your names]`},
  {title:'Rabbi / officiant inquiry', to:'Your rabbi or officiant', subject:'Officiant inquiry — destination wedding, [region], [proposed date]',
   body:`Dear Rabbi [name],

We're getting married on [proposed date] at [venue name] in [region], and would be honored if you'd consider officiating. A few questions:

- Are you available to travel for that date, and is there anything specific you'd need from the venue beforehand (a private room, a particular ceremony layout)?
- Are you comfortable performing the ceremony with kosher catering provided by an outside company, and is there anything you'd want to confirm with them directly (kashrut standard, mashgiach)?
- Do you have requirements around witnesses, and could you help us think through the ketubah?
- What are your fees, including travel and accommodation for the wedding weekend?

Thank you so much for considering it — we'd love to talk further.

Warmly,
[Your names]`},
  {title:'Florist inquiry', to:'The florist', subject:'Florist inquiry — wedding on [proposed date], [venue / region]',
   body:`Hello [florist name],

We're getting married at [venue name] on [proposed date] and love your style. Could you share:

- Your availability for that date, and whether you travel to [region] or are local to the venue
- Whether you can build a floral chuppah, or work with a rented chuppah frame
- Approximate pricing for bouquets, a chuppah installation, and reception centerpieces for [guest count] guests
- Whether the flowers we love (moodboard attached) are realistic for that season and region, or what you'd suggest instead

We'd love to set up a call and share our moodboard. Thank you!

Best,
[Your names]`},
  {title:'DJ / band inquiry', to:'The DJ or band', subject:'DJ/band inquiry — wedding on [proposed date], [venue / region]',
   body:`Hello,

We're getting married on [proposed date] at [venue name], with guests joining from Israel, France, and [region]. We're looking for a DJ or band who can:

- Play a mixed set — Israeli and French favorites alongside international dance music
- Cover the ceremony/cocktail hour and the evening reception, plus (if useful) a lighter set for a pool-day gathering the next day
- Bring their own sound equipment suited to an outdoor setting

Could you let us know your availability for that date, your rates, and whether you take song requests and a do-not-play list in advance? Thank you!

Best,
[Your names]`},
  {title:'Photographer / videographer inquiry', to:'The photographer/videographer', subject:'Photography & video inquiry — wedding on [proposed date], [venue / region]',
   body:`Hello [name],

We love your work and are getting married on [proposed date] at [venue name] in [region]. Could you share:

- Your availability for that date, and whether you're local or would need travel and accommodation covered
- Package options (photo only, video only, or both), and whether you offer multi-day coverage for a welcome dinner and pool-day gathering
- Turnaround time for photos and any highlight video
- Pricing and what's included

We'd love to see a full gallery from a recent wedding. Thank you!

Best,
[Your names]`},
  {title:'Hair & makeup artist inquiry', to:'The hair/makeup artist', subject:'Hair & makeup inquiry — wedding on [proposed date], [venue / region]',
   body:`Hello [name],

We're getting married on [proposed date] at [venue name], and I'd love to book you for hair and makeup. Could you tell me:

- Your availability for a trial and for the wedding day itself, and whether you travel to [region]
- Whether you're experienced working outdoors in warm or humid climates
- Pricing for the bride, and rates for additional family members or bridesmaids
- What products you use, in case of allergies

Thank you so much!

Best,
[Your name]`},
  {title:'Dájas Douro Valley — feasibility inquiry', to:'Dájas Douro Valley', subject:'Wedding inquiry — private full-property rental, [proposed date], approx. [guest count] guests', highlight:true,
   body:`Hello Dájas Douro Valley team,

My partner and I are planning our wedding for [proposed date], and Dájas caught our eye for its setting on the river. We understand you're not primarily set up as a wedding venue, so we wanted to check a few things before getting our hopes up:

1. Do you host weddings at the property, and would a full, exclusive rental of the villas be possible for our date, for around [guest count] guests staying on-site (plus any day guests)?
2. Is there an outdoor space that could hold a Jewish wedding ceremony under a chuppah (an open canopy structure), and an indoor room we could move into if the weather turns?
3. Our catering needs to be kosher, prepared by an outside kosher caterer with their own kitchen supervision (a mashgiach). Would you be able to host an external catering team, and could we discuss your kitchen setup with them in advance?
4. What's the sleeping capacity across the villas, and is a private, full-property buyout possible for two to three nights — arrival, the ceremony day, and a relaxed pool day the day after?
5. Are there any restrictions on outdoor music or amplified sound in the evening, and is the pool available for a private group day after the wedding?
6. Could you share pricing for a full-property buyout across [number] nights for approximately [guest count] guests, and your booking and deposit process?

We'd be so grateful for any photos of the spaces, or a call to walk through logistics. Thank you so much for your time!

Warmly,
[Your names]`},
];
function renderEmails(){
  const wrap = document.getElementById('emailCards'); if(!wrap) return;
  wrap.innerHTML='';
  EMAIL_TEMPLATES.forEach((t,i)=>{
    const card = document.createElement('div'); card.className='email-card'+(t.highlight?'':''); if(t.highlight) card.style.borderColor='var(--brass)';
    card.innerHTML = '<div class="email-head"><h4>'+t.title+'</h4><button class="btn small" data-i="'+i+'">Copy</button></div>'
      + '<div class="to">To: '+esc(t.to)+'</div>'
      + '<div class="subject">Subject: <b>'+esc(t.subject)+'</b></div>'
      + '<textarea readonly rows="10">'+esc(t.body)+'</textarea>';
    card.querySelector('button').addEventListener('click', async ()=>{
      const btn = card.querySelector('button');
      try{ await navigator.clipboard.writeText('Subject: '+t.subject+'\n\n'+t.body); btn.textContent='Copied'; }
      catch(e){ card.querySelector('textarea').select(); btn.textContent='Select & copy manually'; }
      setTimeout(()=> btn.textContent='Copy', 1800);
    });
    wrap.appendChild(card);
  });
}
renderEmails();



"use strict";
/* ---------------- MOODBOARD ---------------- */
/* ---- Pinterest discovery / visual board shelf ---- */
function pinterestSearchUrl(q){ return 'https://www.pinterest.com/search/pins/?q='+encodeURIComponent(q); }
function runPinterestSearch(q){
  q=(q||document.getElementById('pinterestSearch')?.value||'').trim();
  if(!q) return;
  const input=document.getElementById('pinterestSearch'); if(input) input.value=q;
  window.open(pinterestSearchUrl(q),'_blank','noopener');
}
document.getElementById('searchPinterest')?.addEventListener('click',()=>runPinterestSearch());
document.getElementById('pinterestSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();runPinterestSearch();}});
document.querySelectorAll('#pinterestQuick [data-q]').forEach(b=>b.addEventListener('click',()=>runPinterestSearch(b.dataset.q)));
function renderPinterestBoard(url){
  const shelf=document.getElementById('pinterestBoardShelf'); if(!shelf) return;
  url=(url||'').trim();
  if(!url){ shelf.innerHTML=''; return; }
  if(!/^https?:\/\/(www\.)?(pinterest\.[^/]+\/.+|pin\.it\/.+)/i.test(url)){
    shelf.innerHTML='<div class="warn">That does not look like a Pinterest board URL.</div>'; return;
  }
  localStorage.setItem('vv_pinterest_board_url',url);
  shelf.innerHTML='<a data-pin-do="embedBoard" data-pin-board-width="900" data-pin-scale-height="420" data-pin-scale-width="110" href="'+esc(url)+'"></a>';
  ensurePinterestWidgets();
}
document.getElementById('embedPinterestBoard')?.addEventListener('click',()=>renderPinterestBoard(document.getElementById('pinterestBoardUrl')?.value));
const savedPinterestBoard=localStorage.getItem('vv_pinterest_board_url');
if(savedPinterestBoard){ const i=document.getElementById('pinterestBoardUrl'); if(i)i.value=savedPinterestBoard; setTimeout(()=>renderPinterestBoard(savedPinterestBoard),50); }

const BOARD_FILTERS = [['all','All'],['dress','Dress'],['suit','Suit'],['flowers','Flowers'],['venue','Venue'],['music','Music'],['hair','Hair'],['makeup','Makeup'],['stationery','Stationery'],['photo','Photos'],['link','Links'],['pinterest','Pinterest']];
let activeFilter = 'all';
(function(){
  const wrap = document.getElementById('boardFilters');
  BOARD_FILTERS.forEach(([id,label])=>{
    const b=document.createElement('button'); b.className='filter-chip'+(id==='all'?' active':''); b.textContent=label; b.dataset.f=id;
    b.addEventListener('click', ()=>{ activeFilter=id; document.querySelectorAll('.filter-chip').forEach(c=>c.classList.toggle('active',c.dataset.f===id)); renderBoard(); });
    wrap.appendChild(b);
  });
})();
function renderBoard(){
  const grid = document.getElementById('boardGrid'), empty = document.getElementById('boardEmpty');
  let pins = state.pins;
  if(activeFilter!=='all'){
    pins = pins.filter(p => activeFilter==='photo' ? p.type==='photo' : activeFilter==='link' ? p.type==='link' : activeFilter==='pinterest' ? p.type==='pinterest' : p.tag===activeFilter);
  }
  grid.innerHTML='';
  empty.style.display = pins.length? 'none':'block';
  pins.forEach(p=>{
    const el = document.createElement('div'); el.className='pin';
    let inner = '';
    if(p.type==='photo'){
      inner = '<img src="'+p.imageDataUrl+'" alt="">';
    } else if(p.type==='style'){
      inner = '<div class="pin-icon-wrap tint-'+({dress:'wine',suit:'cypress',flowers:'cypress',venue:'brass',music:'cypress',hair:'wine',makeup:'brass',stationery:'brass'}[p.tag]||'cypress')+'">'+svg(ICON[p.icon])+'</div>';
    } else if(p.type==='pinterest'){
      inner = '<div class="pin-pinterest"><blockquote class="pinterest-pin" data-pin-do="embedPin" data-pin-width="medium"><a href="'+esc(p.url)+'">'+esc(p.title||'View on Pinterest')+'</a></blockquote></div>';
    } else {
      inner = '<div class="pin-icon-wrap tint-brass">'+svg(ICON.external)+'</div>';
    }
    el.innerHTML = inner + '<div class="pin-body"><div class="pin-tag">'+(p.tag||'other')+'</div><h5>'+esc(p.title||'')+'</h5>'
      + (p.note?'<p>'+esc(p.note)+'</p>':'')
      + ((p.type==='link'||p.type==='pinterest')?'<a target="_blank" rel="noopener" href="'+esc(p.url)+'">Open source ↗</a>':'')
      + '</div><button class="del-pin">'+svg(ICON.x)+'</button>';
    el.querySelector('.del-pin').addEventListener('click', ()=>{
      if(dbReady) db.collection('pinboard').doc(p.id).delete();
      else { state.pins = state.pins.filter(x=>x.id!==p.id); renderBoard(); renderStart(); }
    });
    grid.appendChild(el);
  });
  ensurePinterestWidgets();
}

function ensurePinterestWidgets(){
  if(!document.querySelector('script[data-vv-pinterest]')){
    const s=document.createElement('script'); s.src='https://assets.pinterest.com/js/pinit.js'; s.async=true; s.dataset.vvPinterest='1'; document.head.appendChild(s);
  } else if(window.PinUtils && window.PinUtils.build){ window.PinUtils.build(); }
}
/* ---- add photo / link modal ---- */
const backdrop = document.getElementById('modalBackdrop');
function openModal(pane){
  backdrop.classList.add('open');
  document.querySelectorAll('.modal-tabs button').forEach(b=>b.classList.toggle('active', b.dataset.pane===pane));
  document.querySelectorAll('.modal-pane').forEach(p=>p.classList.toggle('active', p.id==='pane-'+pane));
}
function closeModal(){ backdrop.classList.remove('open'); resetPhotoForm(); }
document.getElementById('btnAddPhoto').addEventListener('click', ()=>openModal('photo'));
document.getElementById('btnAddLink').addEventListener('click', ()=>openModal('link'));
document.getElementById('modalClose').addEventListener('click', closeModal);
backdrop.addEventListener('click', e=>{ if(e.target===backdrop) closeModal(); });
document.querySelectorAll('.modal-tabs button').forEach(b=> b.addEventListener('click', ()=>openModal(b.dataset.pane)));
document.getElementById('cancelPhoto').addEventListener('click', closeModal);
document.getElementById('btnAddPinterest')?.addEventListener('click', ()=>openModal('pinterest'));
document.getElementById('cancelLink').addEventListener('click', closeModal);

let pendingDataUrl = null;
const dropZone = document.getElementById('dropZone'), fileInput = document.getElementById('fileInput');
dropZone.addEventListener('click', ()=> fileInput.click());
['dragover','dragleave','drop'].forEach(evt=>{
  dropZone.addEventListener(evt, e=>{
    e.preventDefault();
    dropZone.classList.toggle('drag', evt==='dragover');
    if(evt==='drop' && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
});
fileInput.addEventListener('change', ()=>{ if(fileInput.files[0]) handleFile(fileInput.files[0]); });

/* ---- drop / paste anywhere on the moodboard (Pinterest, Google Images, anywhere) ---- */
function extractUrlFromDrop(dt){
  const uriList = dt.getData('text/uri-list'); if(uriList) return uriList.split('\n')[0].trim();
  const legacy = dt.getData('URL'); if(legacy) return legacy.trim();
  const html = dt.getData('text/html');
  if(html){ const m = html.match(/src="([^"]+)"/i) || html.match(/href="([^"]+)"/i); if(m) return m[1]; }
  const plain = dt.getData('text/plain');
  if(plain && /^https?:\/\//i.test(plain.trim())) return plain.trim();
  return null;
}
const boardView = document.getElementById('view-board');
['dragover','dragleave','drop'].forEach(evt=>{
  boardView.addEventListener(evt, e=>{
    e.preventDefault();
    boardView.classList.toggle('drag-over', evt==='dragover');
    if(evt!=='drop') return;
    const dt = e.dataTransfer;
    if(dt.files && dt.files[0] && dt.files[0].type.startsWith('image/')){
      openModal('photo'); handleFile(dt.files[0]);
    } else {
      const url = extractUrlFromDrop(dt);
      if(url){ openModal('link'); document.getElementById('linkUrl').value = url; }
    }
  });
});
document.addEventListener('paste', e=>{
  if(!boardView.classList.contains('active')) return;
  const items = e.clipboardData && e.clipboardData.items;
  let imageFile = null;
  if(items){ for(const it of items){ if(it.type && it.type.startsWith('image/')){ imageFile = it.getAsFile(); break; } } }
  if(imageFile){ e.preventDefault(); openModal('photo'); handleFile(imageFile); return; }
  const activeTag = (document.activeElement && document.activeElement.tagName) || '';
  if(activeTag==='INPUT' || activeTag==='TEXTAREA') return;
  const text = ((e.clipboardData && e.clipboardData.getData('text/plain')) || '').trim();
  if(/^https?:\/\//i.test(text)){ openModal('link'); document.getElementById('linkUrl').value = text; }
});

function handleFile(file){
  const warn = document.getElementById('photoWarn'); warn.style.display='none';
  const img = new Image();
  const reader = new FileReader();
  reader.onload = e=>{
    img.onload = ()=>{
      let quality = 0.72, maxW = 1000;
      const scale = Math.min(1, maxW/img.width);
      const w = Math.round(img.width*scale), h = Math.round(img.height*scale);
      const canvas = document.createElement('canvas'); canvas.width=w; canvas.height=h;
      const ctx = canvas.getContext('2d'); ctx.drawImage(img,0,0,w,h);
      function tryQuality(q){
        const url = canvas.toDataURL('image/jpeg', q);
        return url;
      }
      let url = tryQuality(quality);
      while(url.length > 230000 && quality > 0.3){ quality -= 0.12; url = tryQuality(quality); }
      if(url.length > 230000){
        warn.textContent = 'This image is still too large after compression — try a smaller or simpler photo.';
        warn.style.display='block';
        pendingDataUrl = null;
        document.getElementById('savePhoto').disabled = true;
        return;
      }
      pendingDataUrl = url;
      document.getElementById('photoPreview').src = url;
      document.getElementById('photoPreviewWrap').style.display='block';
      document.getElementById('savePhoto').disabled = false;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function resetPhotoForm(){
  pendingDataUrl=null;
  document.getElementById('photoPreviewWrap').style.display='none';
  document.getElementById('photoTitle').value='';
  document.getElementById('photoWarn').style.display='none';
  document.getElementById('savePhoto').disabled=true;
  fileInput.value='';
}
document.getElementById('savePhoto').addEventListener('click', ()=>{
  if(!pendingDataUrl) return;
  const data = {type:'photo', imageDataUrl:pendingDataUrl, title:document.getElementById('photoTitle').value.trim()||'Untitled', tag:document.getElementById('photoTag').value, createdAt:Date.now()};
  if(dbReady) db.collection('pinboard').add(data).catch(()=>{
    document.getElementById('photoWarn').textContent='Could not save — the image may be too large. Try a smaller photo.';
    document.getElementById('photoWarn').style.display='block';
  });
  else { localAdd(state.pins,data); renderBoard(); renderStart(); }
  closeModal();
});
/* ---- Pinterest bookmarklet ---- */
const BOOKMARKLET_JS = "javascript:(function(){const m=document.querySelector(`meta[property=\"og:title\"]`);const t=(m&&m.content)||document.title||\"\";const u=location.href;const payload=t.trim()+\" :: \"+u;const fail=()=>window.prompt(\"Clipboard blocked - copy this line manually:\",payload);if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(payload).then(()=>alert(\"Copied. Switch to Villa and Vow, open Add Pinterest link, and click Paste from clipboard.\"),fail);}else{fail();}})();";
const bmCodeBox = document.getElementById('bookmarkletCode');
if(bmCodeBox) bmCodeBox.value = BOOKMARKLET_JS;
document.getElementById('copyBookmarklet')?.addEventListener('click', async ()=>{
  const btn = document.getElementById('copyBookmarklet');
  try{ await navigator.clipboard.writeText(BOOKMARKLET_JS); btn.textContent='Copied'; }
  catch(e){ bmCodeBox.select(); btn.textContent='Select & copy manually'; }
  setTimeout(()=> btn.textContent='Copy code', 1800);
});

document.getElementById('pasteClipboard')?.addEventListener('click', async ()=>{
  const warn = document.getElementById('pasteWarn'); warn.style.display='none';
  try{
    const text = (await navigator.clipboard.readText()).trim();
    if(!text) throw new Error('empty');
    let title='', url='';
    if(text.includes(' :: ')){
      const idx = text.lastIndexOf(' :: ');
      title = text.slice(0,idx).trim(); url = text.slice(idx+4).trim();
    } else if(/^https?:\/\//i.test(text)){
      url = text;
    } else {
      title = text;
    }
    if(url) document.getElementById('linkUrl').value = url;
    if(title) document.getElementById('linkTitle').value = title;
    if(!url && !title){ warn.textContent = "Clipboard didn't look like a saved pin — paste the link below by hand."; warn.style.display='block'; }
  }catch(e){
    warn.textContent = "Couldn't read the clipboard — your browser may need permission, or there's nothing copied yet. Paste the link below by hand.";
    warn.style.display='block';
  }
});

document.getElementById('savePinterest')?.addEventListener('click', ()=>{
  const url=document.getElementById('pinterestUrl').value.trim();
  if(!url) return;
  const data={type:'pinterest',url,title:document.getElementById('pinterestTitle').value.trim()||'Pinterest Pin',note:document.getElementById('pinterestNote').value.trim(),tag:document.getElementById('pinterestTag').value,createdAt:Date.now()};
  if(dbReady) db.collection('pinboard').add(data); else {localAdd(state.pins,data);renderBoard();renderStart();}
  document.getElementById('pinterestUrl').value=''; document.getElementById('pinterestTitle').value=''; document.getElementById('pinterestNote').value='';
  closeModal();
});
document.getElementById('cancelPinterest')?.addEventListener('click', closeModal);
document.getElementById('saveLink').addEventListener('click', ()=>{
  const url = document.getElementById('linkUrl').value.trim();
  if(!url) return;
  const data = {type:'link', url, title:document.getElementById('linkTitle').value.trim()||url, note:document.getElementById('linkNote').value.trim(), tag:document.getElementById('linkTag').value, createdAt:Date.now()};
  if(dbReady) db.collection('pinboard').add(data);
  else { localAdd(state.pins,data); renderBoard(); renderStart(); }
  document.getElementById('linkUrl').value=''; document.getElementById('linkTitle').value=''; document.getElementById('linkNote').value='';
  closeModal();
});

/* ---------------- MOBILE NAV ---------------- */
const MOBILE_NAV_ICONS = {
  home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M9.5 20v-6h5v6"/>',
  check:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l1.5 1.5L12 7"/><path d="M14 8h3"/><path d="M8 14l1.5 1.5L12 13"/><path d="M14 14h3"/>',
  venue:'<path d="M3 20h18"/><path d="M5 20V9l7-5 7 5v11"/><path d="M9 20v-6h6v6"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  budget:'<path d="M4 7.5h13.5a2.5 2.5 0 012.5 2.5v7a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 17V7.5z"/><path d="M4.5 7.5l1.5-3h10l1.5 3M15.5 12h4.5v3h-4.5a1.5 1.5 0 010-3z"/><circle cx="16.8" cy="13.5" r=".4" fill="currentColor" stroke="none"/>',
  list:'<path d="M7 4h10l2 3v13H5V7l2-3z"/><path d="M8.5 10.5l1.4 1.4 2.5-2.8M8.5 16l1.4 1.4 2.5-2.8M14 10.5h2M14 16h2"/>',
};
const MOBILE_NAV_PRIMARY = [['start','home','Home'],['todo','check','Checklist'],['budget','budget','Budget'],['considerations','list','Things to Get'],['venues','venue','Venues']];
const MOBILE_NAV_MORE = [['board','Moodboard'],['style','Style Gallery'],['emails','Email Templates'],['guestapp','Guest App']];

function buildMobileNav(){
  if(document.getElementById('vvMobileNav')) return;
  const nav = document.createElement('nav'); nav.id='vvMobileNav'; nav.setAttribute('aria-label','Wedding planner navigation');
  MOBILE_NAV_PRIMARY.forEach(([id,icon,label])=>{
    const b = document.createElement('button'); b.type='button'; b.dataset.tab=id;
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+MOBILE_NAV_ICONS[icon]+'</svg><span>'+label+'</span>';
    b.addEventListener('click', ()=> showTab(id));
    nav.appendChild(b);
  });
  const more = document.createElement('button'); more.type='button'; more.id='vvMoreButton';
  more.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+MOBILE_NAV_ICONS.more+'</svg><span>More</span>';
  more.addEventListener('click', ()=> document.getElementById('vvMobileMore')?.classList.add('open'));
  nav.appendChild(more);
  document.body.appendChild(nav);

  const overlay = document.createElement('div'); overlay.id='vvMobileMore';
  overlay.innerHTML = '<div class="sheet"><div class="handle"></div></div>';
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.classList.remove('open'); });
  document.body.appendChild(overlay);
  const sheet = overlay.querySelector('.sheet');
  MOBILE_NAV_MORE.forEach(([id,label])=>{
    const b = document.createElement('button'); b.type='button'; b.textContent=label;
    b.addEventListener('click', ()=>{ overlay.classList.remove('open'); showTab(id); });
    sheet.appendChild(b);
  });
}
function syncMobileNav(activeId){
  document.querySelectorAll('#vvMobileNav button[data-tab]').forEach(b=> b.classList.toggle('active', b.dataset.tab===activeId));
  const more = document.getElementById('vvMoreButton');
  if(more) more.classList.toggle('active', MOBILE_NAV_MORE.some(([id])=>id===activeId));
}
buildMobileNav();

"use strict";
/* ---------------- PLANNER ASSISTANT ---------------- */
const SYSTEM_PROMPT = "You are the on-call wedding planner inside \"Villa & Vow\", a planning app for a destination wedding in Europe. The couple wants a chuppah, a rabbi, and kosher catering, with guests flying in from Israel and France. They're leaning toward a villa or masseria where guests stay together for about two days, with a pool party the day after the wedding, or a walkable cluster of budget hotels/Airbnbs as backup if one property can't sleep everyone. Four regions are shortlisted in the app: Tuscany, Puglia, Provence and the Algarve. "
  + "Answer warmly and specifically, like an expert in this niche (kosher wedding logistics in Europe, Jewish wedding customs, destination-wedding travel logistics). Use short paragraphs or bullet points, not long essays. If asked to draft something (an email, a timeline, vow ideas, a toast outline) just write it well and completely. "
  + "You do NOT have live access to real vendor names, current prices, or availability in any specific town — never invent a caterer, rabbi, planner or price. When that's what's being asked, say plainly that you don't have real vendor data and suggest exactly who to ask instead (the venue coordinator, a local kosher caterer, a Jewish destination-wedding planner). Use the live app data given to you to make answers specific to where they actually are in planning.";

let sampleFn = null, plannerHistory = [];
async function initPlanner(){
  try{
    if(!window.claude || !window.claude.use) return;
    sampleFn = await window.claude.use('sample');
  }catch(e){ sampleFn = null; }
  if(!sampleFn){
    document.getElementById('plannerFab').style.display = 'none';
  }
}

const CHIPS = [
  "Draft an email to a kosher caterer asking about a destination wedding in [region]",
  "Suggest a kosher menu for our guest count and season",
  "Sanity-check my budget so far",
  "Help me plan the pool-party day after the wedding",
  "What should I ask a venue coordinator before we book?",
  "Suggest a ceremony timeline that includes the chuppah and badeken",
  "Help me write our welcome-dinner speech",
  "How do we handle a civil marriage back home alongside the religious ceremony abroad?",
];
function renderChips(){
  const wrap = document.getElementById('plannerChips'); wrap.innerHTML='';
  CHIPS.forEach(c=>{
    const b=document.createElement('button'); b.textContent=c;
    b.addEventListener('click', ()=>{ document.getElementById('plannerInput').value=c; sendToPlanner(); });
    wrap.appendChild(b);
  });
}
renderChips();

function contextSummary(){
  const est = state.budget.reduce((s,b)=>s+(Number(b.estCost)||0),0);
  const paidCount = state.budget.filter(b=>b.paid).length;
  const todoDone = state.todos.filter(t=>t.done).length;
  const considDone = state.considerations.filter(t=>t.done).length;
  const shortlisted = Object.keys(state.venues).filter(k=>state.venues[k] && state.venues[k].favorited);
  const openTodos = state.todos.filter(t=>!t.done).slice(0,8).map(t=>'- ('+t.category+') '+t.text);
  return "Current app state:\n"
    + "- Budget: "+state.budget.length+" line items, €"+est.toLocaleString()+" estimated total, "+paidCount+" marked paid.\n"
    + "- Checklist: "+todoDone+"/"+state.todos.length+" tasks done.\n"
    + "- Things to get & think about: "+considDone+"/"+state.considerations.length+" settled.\n"
    + "- Shortlisted venue region(s): "+(shortlisted.length? shortlisted.join(', ') : "none shortlisted yet")+".\n"
    + "- Moodboard pins so far: "+state.pins.length+".\n"
    + (openTodos.length? "- Next open checklist items:\n"+openTodos.join('\n') : "");
}

function addMsg(role, text, extraClass){
  const body = document.getElementById('plannerBody');
  const el = document.createElement('div'); el.className='msg '+role+(extraClass?' '+extraClass:'');
  el.textContent = text;
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
  return el;
}

let plannerBusy = false;
async function sendToPlanner(){
  const input = document.getElementById('plannerInput');
  const q = input.value.trim();
  if(!q || plannerBusy || !sampleFn) return;
  input.value='';
  addMsg('user', q);
  plannerHistory.push({role:'user', content:q});
  const thinking = addMsg('assistant', 'Thinking…', 'thinking');
  plannerBusy = true;
  document.getElementById('plannerSend').disabled = true;
  try{
    const turns = [
      {role:'user', content: SYSTEM_PROMPT + "\n\n" + contextSummary()},
      {role:'assistant', content: "Understood — I have the full picture of where things stand. What would you like help with?"},
    ].concat(plannerHistory);
    const result = await sampleFn(turns, {
      modelTier: 'default',
      onText: ({text})=>{ thinking.classList.remove('thinking'); thinking.textContent = text; document.getElementById('plannerBody').scrollTop = 999999; }
    });
    thinking.classList.remove('thinking');
    thinking.textContent = result.text;
    plannerHistory.push({role:'assistant', content: result.text});
  }catch(e){
    thinking.remove();
    const code = e && e.code;
    let msg = "Something went wrong reaching your planner — try again in a moment.";
    if(code === 'not_granted'){ msg = "This view hasn't granted the planner assistant — reopen the board from your own copy of the link."; }
    if(code === 'rate_limited'){ msg = "Your planner is fielding a lot of questions right now — try again shortly."; }
    addMsg('assistant', msg, 'error');
    if(e && e.text) plannerHistory.push({role:'assistant', content:e.text});
  }
  plannerBusy = false;
  document.getElementById('plannerSend').disabled = false;
}
document.getElementById('plannerFab').addEventListener('click', ()=>{
  document.getElementById('plannerPanel').classList.add('open');
});
document.getElementById('plannerClose').addEventListener('click', ()=> document.getElementById('plannerPanel').classList.remove('open'));
document.getElementById('plannerSend').addEventListener('click', sendToPlanner);
document.getElementById('plannerInput').addEventListener('keydown', e=>{
  if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); sendToPlanner(); }
});

document.getElementById('btnAskBudget')?.addEventListener('click', ()=> askPlannerAbout('Can you sanity-check my current budget breakdown? Flag anything that looks like it might be missing for a kosher destination wedding, or unrealistically low.'));

function askPlannerAbout(text){
  document.getElementById('plannerPanel').classList.add('open');
  document.getElementById('plannerInput').value = text;
  sendToPlanner();
}

initDb();
initPlanner();
renderAll();
