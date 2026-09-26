"use strict";

/* ---------------- SHARED UTILS ---------------- */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ---------------- ICONS ---------------- */
const ICON = {
  home:'<path d="M12 3.5l1.5 4.1 4.1 1.5-4.1 1.5-1.5 4.1-1.5-4.1-4.1-1.5 4.1-1.5L12 3.5z"/><path d="M5 16.5l.8 2.1 2.2.8-2.2.8L5 22.3l-.8-2.1-2.2-.8 2.2-.8L5 16.5z"/><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"/>',
  board:'<rect x="5" y="4" width="14" height="16" rx="2.4"/><path d="M8 8.5h8M8 12h5"/><path d="M8 16l2.2-2.2 1.8 1.8 2.8-3 1.2 1.2"/><circle cx="15.8" cy="8.4" r="1"/>',
  check:'<rect x="5" y="4" width="14" height="16" rx="2.3"/><path d="M9 4V2.8M15 4V2.8M8.5 9.5l1.6 1.6 3-3M8.5 15l1.6 1.6 3-3M14.5 10h2M14.5 15.5h2"/>',
  budget:'<path d="M4 7.5h13.5a2.5 2.5 0 012.5 2.5v7a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 17V7.5z"/><path d="M4.5 7.5l1.5-3h10l1.5 3M15.5 12h4.5v3h-4.5a1.5 1.5 0 010-3z"/><circle cx="16.8" cy="13.5" r=".4" fill="currentColor" stroke="none"/>',
  map:'<path d="M4 20V10.5L12 5l8 5.5V20"/><path d="M7 20v-6.5h10V20M9.5 10.5h5"/><path d="M18.5 7.5c0-2 1.2-3.5 3-3.5"/><circle cx="21.5" cy="4" r=".8"/>',
  style:'<path d="M8 7.5c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.4-2.1 3.6-4 4.8-1.9-1.2-4-2.4-4-4.8z"/><path d="M12 12.3V21M7.5 16.5h9"/><path d="M5 5.5l.7 1.8 1.8.7-1.8.7L5 10.5l-.7-1.8-1.8-.7 1.8-.7L5 5.5z"/>',
  list:'<path d="M7 4h10l2 3v13H5V7l2-3z"/><path d="M8.5 10.5l1.4 1.4 2.5-2.8M8.5 16l1.4 1.4 2.5-2.8M14 10.5h2M14 16h2"/>',
  heart:'<path d="M12 20s-7-4.4-9.5-8.8C.8 8 2 4.6 5.2 3.7 7.6 3 10 4 12 6.5 14 4 16.4 3 18.8 3.7 22 4.6 23.2 8 21.5 11.2 19 15.6 12 20 12 20z"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  pencil:'<path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  trash:'<path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13"/>',
  grip:'<circle cx="9" cy="6" r="1.3"/><circle cx="15" cy="6" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="9" cy="18" r="1.3"/><circle cx="15" cy="18" r="1.3"/>',
  chevron:'<path d="M6 9l6 6 6-6"/>',
  external:'<path d="M14 5h5v5M19 5l-9 9M9 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-3"/>',
  refresh:'<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0020.49 15"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  check2:'<path d="M4 12l5 5L20 6"/>',
  dressA:'<path d="M12 3v6M9.5 9l-4 12h13l-4-12M9.5 9c0-2 1-3 2.5-3s2.5 1 2.5 3"/>',
  dressMermaid:'<path d="M12 3v5M9.5 8c0 3-2 6-2.5 10 1.7 2.5 6.3 2.5 8 0-.5-4-2.5-7-2.5-10M9.5 8c0-2 1-3 2.5-3s2.5 1 2.5 3"/>',
  dressBall:'<path d="M12 3v5M8 8c-3 3-3 9-3 12h14c0-3 0-9-3-12M9.7 8a2.3 2.3 0 014.6 0"/>',
  dressSheath:'<rect x="9" y="3" width="6" height="18" rx="2.5"/>',
  dressBoho:'<path d="M12 3v5M8 8c-1 4 1 5-1 12M16 8c1 4-1 5 1 12M9.8 8a2.2 2.2 0 014.4 0"/>',
  dressTwopc:'<rect x="8.5" y="4" width="7" height="6" rx="1.5"/><path d="M8 13l-1.5 8h11L16 13z"/>',
  flowerCascade:'<circle cx="12" cy="6" r="2"/><circle cx="9.3" cy="9" r="1.6"/><circle cx="14.7" cy="9" r="1.6"/><circle cx="11" cy="12.5" r="1.4"/><circle cx="13.5" cy="15" r="1.1"/><path d="M12 8v13"/>',
  flowerRound:'<circle cx="12" cy="11" r="2"/><circle cx="8" cy="9" r="1.8"/><circle cx="16" cy="9" r="1.8"/><circle cx="8" cy="13" r="1.8"/><circle cx="16" cy="13" r="1.8"/><circle cx="12" cy="6.5" r="1.8"/><circle cx="12" cy="15.5" r="1.8"/><path d="M12 17v4"/>',
  flowerWild:'<path d="M6 20l2-8M11 20l1-10M15 20l-1-9M19 20l-3-7"/><circle cx="8" cy="11" r="1.3"/><circle cx="12" cy="8" r="1.3"/><circle cx="14" cy="10" r="1.3"/><circle cx="16" cy="12" r="1.3"/>',
  flowerTropical:'<path d="M12 21c0-9 0-14 6-17-3 6-2 10 0 12M12 21c0-9 0-14-6-17 3 6 2 10 0 12"/>',
  flowerDried:'<path d="M12 21V7M9 9l3-2 3 2M9 12l3-2 3 2M9 15l3-2 3 2"/><circle cx="12" cy="5" r="1.3"/>',
  venueTuscany:'<path d="M4 21V10a3 3 0 013-3h10a3 3 0 013 3v11" /><path d="M9 21v-6a3 3 0 016 0v6"/><path d="M17 21V6c2-2 2-4 0-6"/>',
  venueProvence:'<rect x="5" y="9" width="14" height="12" rx="1"/><path d="M9 21v-5h6v5M8 12h2M14 12h2M8 15h2M14 15h2"/><path d="M12 9V4"/><circle cx="12" cy="3" r="1"/>',
  venuePuglia:'<path d="M6 21V13a6 6 0 0112 0v8"/><path d="M4 21h16"/><circle cx="18.5" cy="6" r="1.6"/>',
  venueAlgarve:'<path d="M4 19c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0"/><path d="M4 15c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0"/><path d="M9 4h6v6H9z"/>',
  hairBun:'<circle cx="12" cy="10" r="6"/><circle cx="16.5" cy="14.5" r="2.3"/><path d="M6 12c0 5 2 9 6 9"/>',
  hairWaves:'<circle cx="12" cy="8" r="5"/><path d="M7 10c0 4-2 5-1 11M17 10c0 4 2 5 1 11M9 21c0-3 1-4 1-8M15 21c0-3-1-4-1-8"/>',
  hairBraid:'<circle cx="12" cy="7" r="5"/><path d="M12 12l2 2-2 2 2 2-2 2 2 2"/>',
  hairHalf:'<circle cx="12" cy="9" r="5.5"/><path d="M7.5 8c1-4 8-4 9 0M6 14c0 4 2 7 6 7M18 14c0 4-2 7-6 7"/><circle cx="15" cy="6.5" r="1.1"/>',
  makeupGlam:'<path d="M4 12c3-3 6-4 8-4s5 1 8 4c-3 3-6 4-8 4s-5-1-8-4z"/><circle cx="12" cy="12" r="2"/><path d="M17 9l3-2"/>',
  makeupNatural:'<path d="M5 12c2.5-2 5-3 7-3s4.5 1 7 3c-2.5 2-5 3-7 3s-4.5-1-7-3z"/><circle cx="12" cy="12" r="1.6"/>',
  makeupBronze:'<circle cx="12" cy="8" r="3"/><path d="M12 2v1.5M12 12.5V14M6 8H4.5M19.5 8H18M7.8 3.8l1 1M16.2 3.8l-1 1M7.8 12.2l1-1M16.2 12.2l-1-1"/><path d="M6 20c2-2 4-3 6-3s4 1 6 3"/>',
  makeupBold:'<path d="M5 10c2.3-2.4 4.9-3.4 7-3.4s4.7 1 7 3.4c-2.3 2.4-4.9 3.4-7 3.4S7.3 12.4 5 10z"/><circle cx="12" cy="10" r="1.5"/><path d="M8 18c1.4-1 2.6-1 4 0 1.4 1 2.6 1 4 0" stroke-width="2.4"/>',
  shoeBlock:'<path d="M4 19h13c2 0 3-1 3-2.5 0-1.8-1.6-2.3-3-3.2-1.4-.9-2-2.2-2-3.8V7h-4v5l-7 3v4z"/>',
  shoePump:'<path d="M4 18h11c2.5 0 4-1 4.3-2.4.3-1.3-.6-2-2-2.7-2-1-3.3-2.7-3.3-4.9V6h-3v3.6L5 15.8c-.8.6-1 1.4-1 2.2z"/>',
  shoeSandal:'<path d="M4 17c0-2 1-3 3-3h10c2 0 3 1 3 3s-1 3-3 3H7c-2 0-3-1-3-3z"/><path d="M8 14V9M14 14V9M6 9h12"/>',
  shoeSneaker:'<path d="M3 18h17c1 0 1.5-.6 1.5-1.4 0-1-1-1.4-2-1.8-2-.8-4-1-6-3.3-1-1.1-2-1.5-3-1.5H8c-2 0-3 1-3.5 2.3L3 15v3z"/><path d="M7 12.5v3M10.5 12v3.3M14 12v3.6"/>',
  musicDJ:'<rect x="4" y="10" width="16" height="8" rx="1.5"/><circle cx="8.5" cy="14" r="2"/><circle cx="15.5" cy="14" r="2"/><path d="M9 6.5h6L14 10h-4z"/>',
  musicBand:'<circle cx="8" cy="6" r="2"/><path d="M8 8v6M5 21l3-7 3 7M14 4v11a2 2 0 104 0V4l-2 1.5L14 4z"/>',
  musicAcoustic:'<circle cx="10" cy="16" r="5"/><circle cx="10" cy="16" r="2"/><path d="M13.5 12.5L20 4"/><path d="M17.5 4h3v3"/>',
  musicSilent:'<path d="M12 3v6M9 21h6M12 15a4 4 0 004-4V7a4 4 0 10-8 0v4a4 4 0 004 4z"/>',
  inviteLetterpress:'<rect x="4" y="6" width="16" height="12" rx="1"/><path d="M4 7l8 6 8-6"/>',
  inviteMinimal:'<rect x="6" y="4" width="12" height="16" rx="1"/><path d="M9 9h6M9 12h6M9 15h3"/>',
  inviteWatercolor:'<rect x="4" y="6" width="16" height="12" rx="1"/><circle cx="8" cy="10" r="1.6"/><circle cx="10.5" cy="8.5" r="1.2"/><path d="M8 11.5c0 2-1 3-2 4"/>',
  inviteBilingual:'<rect x="4" y="6" width="16" height="12" rx="1"/><path d="M8 10h3M8 13h5M13.5 10h2.5M13.5 13h2.5"/><path d="M12 8v8" stroke-dasharray="1.5 1.8"/>',
  venueDouro:'<path d="M3 16c3-4 6-4 9 0s6 4 9 0" /><path d="M4 21c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0"/><circle cx="17" cy="8" r="1.4"/><path d="M17 9.4V13M15 11h4"/>',
  guests:'<circle cx="8.5" cy="8" r="2.7"/><circle cx="16.3" cy="8.8" r="2.2"/><path d="M3.5 20c0-3.7 2.2-6.1 5-6.1s5 2.4 5 6.1M13.2 14.2c2.8 0 4.8 2.1 4.8 5.8"/><path d="M18.5 15.5h2.5v4h-2.5zM19.8 15.5v-1.2"/>',
  suitTux:'<path d="M7 21V10l5-4 5 4v11"/><path d="M9 8l3 5 3-5"/><circle cx="12" cy="7.3" r="1.1"/>',
  suitLinen:'<path d="M7 21V9l5-3 5 3v12"/><path d="M9 8l3 4.5 3-4.5"/><path d="M8 13l1.5 1M16 13l-1.5 1"/>',
  suitJacket:'<path d="M7 21v-7.5l5-4.5 5 4.5V21"/><path d="M9 9l3 5 3-5"/><path d="M8 21v-6h8v6"/>',
  suitGuayabera:'<path d="M7 21V9l5-3 5 3v12"/><path d="M9 21V12M15 21V12"/><path d="M9.8 14h1M13.2 14h1M9.8 17h1M13.2 17h1"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 6l9 7 9-7"/>',
  scissors:'<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M20 4L7.9 15.9M14.5 14.5L20 20M7.9 8.1L12 12"/>',
};
function svg(paths, extra){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" '+(extra||'')+'>'+paths+'</svg>'; }


/* ---------------- TAB NAV ---------------- */
const TABS = [
  {id:'start', label:'Start Here', icon:ICON.home},
  {id:'todo', label:'Checklist', icon:ICON.check},
  {id:'budget', label:'Budget', icon:ICON.budget},
  {id:'considerations', label:'Things to Get', icon:ICON.list},
  {id:'venues', label:'Venues & Destinations', icon:ICON.map},
  {id:'venuereplies', label:'Venue Replies', icon:ICON.check2},
  {id:'board', label:'Moodboard', icon:ICON.board},
  {id:'style', label:'Style Gallery', icon:ICON.style},
  {id:'emails', label:'Emails and Gifts', icon:ICON.mail},
  {id:'guestapp', label:'Guest App', icon:ICON.guests},
  {id:'diy', label:'Wedding d.i.y', icon:ICON.scissors},
  {id:'travelguide', label:'Travel Guide', icon:ICON.compass},
];
const TAB_TINTS = {start:'blush', todo:'coral', budget:'butter', considerations:'lilac', venues:'wine', venuereplies:'wine', board:'cypress', style:'brass', emails:'blush', guestapp:'coral', diy:'lilac', travelguide:'brass'};
const tabNav = document.getElementById('tabNav');
const tabsScrollArrow = document.getElementById('tabsScrollArrow');
const tabsScrollArrowLeft = document.getElementById('tabsScrollArrowLeft');
/* Only these tabs ever get a count filled in by renderStart() below; an
   empty .count span still renders as a small pill (its padding/background
   apply with no text), which looked like a stray dash after every other
   tab, so skip creating it for tabs that will never have one. */
const TABS_WITH_COUNT = new Set(['todo','considerations','board','budget','travelguide']);
TABS.forEach(t=>{
  const b = document.createElement('button');
  b.className='tab-btn tabtint-'+TAB_TINTS[t.id]; b.dataset.tab=t.id;
  b.innerHTML = svg(t.icon) + '<span>'+t.label+'</span>' + (TABS_WITH_COUNT.has(t.id) ? '<span class="count" data-count="'+t.id+'"></span>' : '');
  b.addEventListener('click', ()=> showTab(t.id));
  tabNav.appendChild(b);
});
/* The tab strip scrolls horizontally instead of hiding tabs behind a "More"
   dropdown, so trackpad/shift-scroll works for free; the arrows are just a
   discoverable hint that there's more in either direction, each shown only
   while there's actually somewhere left to scroll that way. */
function updateTabsScrollArrow(){
  if(!tabsScrollArrow) return;
  const hasMoreToRight = tabNav.scrollWidth - tabNav.clientWidth - tabNav.scrollLeft > 4;
  tabsScrollArrow.classList.toggle('visible', hasMoreToRight);
  tabsScrollArrowLeft?.classList.toggle('visible', tabNav.scrollLeft > 4);
}
tabsScrollArrow?.addEventListener('click', ()=> tabNav.scrollBy({left:220, behavior:'smooth'}));
tabsScrollArrowLeft?.addEventListener('click', ()=> tabNav.scrollBy({left:-220, behavior:'smooth'}));
tabNav.addEventListener('scroll', updateTabsScrollArrow);
window.addEventListener('resize', updateTabsScrollArrow);
setTimeout(updateTabsScrollArrow, 0);
function showTab(id){
  // Jumping the page back to the top makes sense when actually switching
  // to a different tab, but not if something calls showTab() again for
  // whichever tab is already open (e.g. a stray re-trigger), which would
  // otherwise yank the page back up from wherever the user had scrolled to.
  const alreadyOnThisTab = document.getElementById('view-'+id)?.classList.contains('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active', v.id==='view-'+id));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===id));
  if(!alreadyOnThisTab){
    const activeBtn = tabNav.querySelector('.tab-btn[data-tab="'+id+'"]');
    if(activeBtn) activeBtn.scrollIntoView({inline:'nearest', block:'nearest', behavior:'smooth'});
    window.scrollTo(0,0);
  }
  if(typeof syncMobileNav==='function') syncMobileNav(id);
  if(id==='budget' && typeof resizeAllBudgetNotes==='function') resizeAllBudgetNotes();
  if(id==='board' && typeof renderPinterestBoards==='function') renderPinterestBoards();
  if(id==='diy' && typeof renderDiyPinterestBoards==='function') renderDiyPinterestBoards();
  if((id==='todo' || id==='considerations' || id==='travelguide') && typeof resizeAllItemTextareas==='function') resizeAllItemTextareas();
  if(id==='venues' && typeof onVenuesTabShown==='function') onVenuesTabShown();
  try{ localStorage.setItem('vv_active_tab', id); }catch(e){}
  setTimeout(updateTabsScrollArrow, 260);
}
document.querySelectorAll('[data-jump]').forEach(el=>{
  el.addEventListener('click', ()=>showTab(el.dataset.jump));
  // Only the logo mark uses this on a plain div (role="button"), which
  // needs Enter/Space wired up by hand, unlike a real <button>.
  if(el.getAttribute('role')==='button'){
    el.addEventListener('keydown', e=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); showTab(el.dataset.jump); }
    });
  }
});
let initialTab = 'start';
try{
  const saved = localStorage.getItem('vv_active_tab');
  if(saved && TABS.some(t=>t.id===saved)) initialTab = saved;
}catch(e){}
showTab(initialTab);


/* ---------------- START DASHBOARD ---------------- */
function renderStart(){
  const el = document.getElementById('startStats');
  const todoDone = state.todos.filter(t=>t.done).length;
  const considDone = state.considerations.filter(t=>t.done).length;
  const estTotal = state.budget.reduce((s,b)=>s+(Number(b.estCost)||0),0);
  const pins = state.pins.length;
  el.innerHTML = [
    tile(String(todoDone)+' / '+state.todos.length, 'Checklist tasks done', true),
    tile(String(considDone)+' / '+state.considerations.length, 'Things to get, settled'),
    tile('€'+estTotal.toLocaleString(), 'Budget estimated so far'),
    tile(String(pins), 'Pins on your moodboard'),
  ].join('');
  document.querySelectorAll('[data-count]').forEach(c=>{
    const k=c.dataset.count;
    if(k==='todo') c.textContent = todoDone+'/'+state.todos.length;
    if(k==='considerations') c.textContent = considDone+'/'+state.considerations.length;
    if(k==='board') c.textContent = pins||'';
    if(k==='budget') c.textContent = state.budget.length||'';
    if(k==='travelguide') c.textContent = state.travelGuide.filter(t=>t.done).length+'/'+state.travelGuide.length;
  });
}
function tile(n,l,accent){ return '<div class="stat-tile'+(accent?' accent':'')+'"><div class="n mono">'+n+'</div><div class="l">'+l+'</div></div>'; }
function goalTile(goal, diff){
  const status = !goal ? '' : diff>=0 ? '<span class="under">€'+diff.toLocaleString()+' left to plan</span>' : '<span class="over">€'+Math.abs(diff).toLocaleString()+' over goal</span>';
  return '<div class="stat-tile goal-tile"><div class="n mono">€<input type="number" id="budgetGoalInput" value="'+goal+'" min="0" step="500"></div><div class="l">Goal budget<br>'+status+'</div></div>';
}

const LOVE_NOTE_NAMES = {'yuvalsh99@gmail.com':'Yuval', 'yohan-levy@hotmail.fr':'Yohan'};
function loveNoteAuthorName(email){ return LOVE_NOTE_NAMES[email] || (email ? email.split('@')[0] : 'Someone'); }
function loveNoteTimeAgo(ts){
  const mins = Math.max(0, Math.round((Date.now()-ts)/60000));
  if(mins<1) return 'just now';
  if(mins<60) return mins+'m ago';
  const hrs = Math.round(mins/60);
  if(hrs<24) return hrs+'h ago';
  const days = Math.round(hrs/24);
  if(days<7) return days+'d ago';
  return new Date(ts).toLocaleDateString();
}
let editingLoveNoteId = null;
function updateLoveNote(id, text){
  if(dbReady) db.collection('loveNotes').doc(id).update({text}).catch(err=>{ console.error('[Love notes] update failed', err); alert('Could not save the note: '+err.message); });
  else { const n = state.loveNotes.find(n=>n.id===id); if(n) n.text = text; }
}
function renderLoveNotes(){
  const list = document.getElementById('loveNotesList');
  if(!list) return;
  list.innerHTML = state.loveNotes.map(n=>{
    const editing = n.id === editingLoveNoteId;
    const body = editing
      ? '<textarea class="note-edit-input" rows="2">'+esc(n.text)+'</textarea>'
      : '<p>'+esc(n.text)+'</p>';
    const actions = editing
      ? '<button class="save-note" type="button" data-id="'+esc(n.id)+'" aria-label="Save note">'+svg(ICON.check2)+'</button>'
      : '<button class="edit-note" type="button" data-id="'+esc(n.id)+'" aria-label="Edit note">'+svg(ICON.pencil)+'</button>'
        +'<button class="del-note" type="button" data-id="'+esc(n.id)+'" aria-label="Delete note">'+svg(ICON.x)+'</button>';
    return '<div class="love-note'+(editing?' editing':'')+'">'+body
      +'<div class="meta">'+esc(loveNoteAuthorName(n.authorEmail))+' · '+loveNoteTimeAgo(n.createdAt||0)+'</div>'
      +'<div class="love-note-actions">'+actions+'</div></div>';
  }).join('');
  list.querySelectorAll('.del-note').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      confirmAction('Are you sure you want to delete this note?', ()=>{
        if(dbReady) db.collection('loveNotes').doc(id).delete().catch(err=>{ console.error('[Love notes] delete failed', err); alert('Could not delete the note: '+err.message); });
        else { state.loveNotes = state.loveNotes.filter(n=>n.id!==id); renderLoveNotes(); }
      });
    });
  });
  list.querySelectorAll('.edit-note').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      editingLoveNoteId = btn.dataset.id;
      renderLoveNotes();
      const ta = list.querySelector('.note-edit-input');
      if(ta){ ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
    });
  });
  list.querySelectorAll('.save-note').forEach(btn=>{
    const commit = ()=>{
      const ta = btn.closest('.love-note').querySelector('.note-edit-input');
      const val = ta.value.trim();
      if(val) updateLoveNote(btn.dataset.id, val);
      editingLoveNoteId = null;
      renderLoveNotes();
    };
    btn.addEventListener('click', commit);
  });
  list.querySelectorAll('.note-edit-input').forEach(ta=>{
    ta.addEventListener('keydown', e=>{
      if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); ta.closest('.love-note').querySelector('.save-note').click(); }
      if(e.key==='Escape'){ editingLoveNoteId = null; renderLoveNotes(); }
    });
  });
}
document.getElementById('loveNoteSend')?.addEventListener('click', ()=>{
  const input = document.getElementById('loveNoteInput');
  const text = input.value.trim();
  if(!text) return;
  const authorEmail = (window.firebase && firebase.auth && firebase.auth().currentUser && firebase.auth().currentUser.email) || '';
  const data = {text, authorEmail, createdAt: Date.now()};
  if(dbReady) db.collection('loveNotes').add(data).catch(err=>{ console.error('[Love notes] add failed', err); alert('Could not send the note: '+err.message); });
  else { data.id = 'local-'+Math.random().toString(36).slice(2); state.loveNotes.unshift(data); renderLoveNotes(); }
  input.value='';
});



"use strict";

let db = null, dbReady=false, syncUnavailable=false;
const state = { todos:[], budget:[], pins:[], considerations:[], venues:{}, venueOverrides:{}, customStyles:[], customVenues:[], budgetGoal:100000, guests:[], labels:{mineLabel:'Your guests', partnerLabel:"Fiancé's guests"}, pinterestBoards:[], diyPinterestBoards:[], loveNotes:[], diyIdeas:[], venueContacts:[], travelGuide:[] };

/* Ballpark estimates for a ~90-guest, 2-3 day villa/masseria wedding in
   Italy or Portugal (Provence would run similar or a bit higher). These
   are rough planning-guide figures, not real vendor quotes, replace
   each one as you get actual quotes. Kosher catering runs well above
   standard European wedding catering because of the mashgiach and
   imported/kosher-certified ingredients. */
const SEED_BUDGET = [
  {category:'Venue', item:'Villa / masseria rental (multi-day)', estCost:18000, actCost:0, paid:0, order:0},
  {category:'Accommodation', item:'Overflow hotel/Airbnb room block', estCost:5000, actCost:0, paid:0, order:1},
  {category:'Catering', item:'Kosher dinner + mashgiach fee', estCost:16000, actCost:0, paid:0, order:2},
  {category:'Catering', item:'Welcome dinner', estCost:7000, actCost:0, paid:0, order:3},
  {category:'Ceremony', item:'Rabbi travel & officiant fee', estCost:3000, actCost:0, paid:0, order:4},
  {category:'Ceremony', item:'Chuppah', estCost:1500, actCost:0, paid:0, order:5},
  {category:'Flowers', item:'Bouquets & ceremony florals', estCost:5500, actCost:0, paid:0, order:6},
  {category:'Attire', item:'Dress & alterations', estCost:4000, actCost:0, paid:0, order:7},
  {category:'Attire', item:"Partner's attire", estCost:1200, actCost:0, paid:0, order:8},
  {category:'Beauty', item:'Hair & makeup (trial + day-of)', estCost:900, actCost:0, paid:0, order:9},
  {category:'Media', item:'Photography & video', estCost:7500, actCost:0, paid:0, order:10},
  {category:'Entertainment', item:'Music / DJ or band', estCost:5000, actCost:0, paid:0, order:11},
  {category:'Guest travel', item:'Shuttles & welcome bags', estCost:3000, actCost:0, paid:0, order:12},
  {category:'Legal', item:'Marriage license & paperwork', estCost:500, actCost:0, paid:0, order:13},
  {category:'Contingency', item:'Buffer (~10% of total)', estCost:9000, actCost:0, paid:0, order:14},
  {category:'Stationery', item:'Save-the-dates, invitations & day-of signage', estCost:2000, actCost:0, paid:0, order:15},
  {category:'Cake & desserts', item:'Cake or dessert table (kosher-friendly)', estCost:1000, actCost:0, paid:0, order:16},
  {category:'Honeymoon', item:'Honeymoon travel & stay', estCost:5000, actCost:0, paid:0, order:17},
  {category:'Gifts & favors', item:'Wedding party gifts & guest favors', estCost:2000, actCost:0, paid:0, order:18}
];

const TODO_SEED_PART_1 = [
  ['12+ months out', 'Set an overall budget and rough guest count'],
  ['12+ months out', 'Choose 2–3 possible dates, keeping the Hebrew calendar and Shabbat in mind'],
  ['12+ months out', 'Shortlist destination regions and specific venues'],
  ['12+ months out', 'Confirm a kosher caterer can work at your venue before signing anything'],
  ['12+ months out', 'Confirm your rabbi or officiant is available and can travel'],
  ['12+ months out', 'Confirm the venue has a real rain plan (indoor space that fits your full guest count, plus a clear Plan B and how last-minute the call can be) before signing anything'],
  ['12+ months out', 'Check how much on-site parking the venue has, and the backup plan for guests and vendors if it’s limited'],
  ['12+ months out', 'Put a deposit down on the venue'],
  ['12+ months out', 'Decide on your overall color palette and wedding theme'],
  ['12+ months out', 'Choose your wedding party (bridesmaids, groomsmen, honor attendants)'],
  ['9–12 months out', 'Send save-the-dates'],
  ['9–12 months out', 'Book a wedding planner or on-the-ground coordinator who knows kosher logistics'],
  ['9–12 months out', 'Start dress shopping'],
  ['9–12 months out', 'Research group flight deals and block a hotel room allotment for overflow guests'],
  ['9–12 months out', 'Reserve or commission your chuppah'],
  ['9–12 months out', 'Meet with 2–3 florists and compare styles and quotes'],
  ['9–12 months out', 'Design or order your invitation suite'],
  ['9–12 months out', 'Set up a guest-facing wedding website or app with RSVP and travel info'],
  ['9–12 months out', 'Research kosher-friendly cake or dessert options'],
  ['6–9 months out', 'Finalize the guest list and send invitations with travel details'],
  ['6–9 months out', 'Book flights for yourselves'],
  ['6–9 months out', 'Choose a florist and flower styles'],
  ['6–9 months out', 'Book a photographer and videographer'],
  ['6–9 months out', 'Book hair and makeup artists for the wedding day'],
  ['6–9 months out', 'Book a DJ or live band experienced with mixed Israeli/French/local crowds'],
  ['6–9 months out', 'Coordinate bridal party and groomsmen/partner attire'],
  ['6–9 months out', 'Plan and book your honeymoon'],
  ['6–9 months out', 'Plan a bridal shower or hen weekend, if you’re doing one'],
  ['3–6 months out', 'Do a kosher menu tasting with your caterer'],
  ['3–6 months out', 'Plan the guest weekend itinerary, including the pool-party day'],
  ['3–6 months out', 'Put together welcome bags for arriving guests'],
  ['3–6 months out', 'Look into legal paperwork and any apostille needed for the marriage certificate'],
  ['3–6 months out', 'Buy the rings, ketubah, and kiddush cup'],
  ['3–6 months out', 'Finalize your flower order: bouquets, centerpieces, and chuppah florals'],
  ['3–6 months out', 'Mail formal invitations with the full weekend itinerary']
];

const TODO_SEED_PART_2 = [
  ['3–6 months out', 'Choose ceremony entrance and recessional music'],
  ['3–6 months out', 'Finalize your cake or dessert tasting with the caterer'],
  ['1–3 months out', 'Give the venue and caterer a final headcount'],
  ['1–3 months out', 'Confirm the ceremony script and readings with your rabbi'],
  ['1–3 months out', 'Plan how to transport and steam the dress after travel'],
  ['1–3 months out', 'Arrange guest transport or shuttles for the wedding weekend'],
  ['1–3 months out', 'Do your hair and makeup trial'],
  ['1–3 months out', 'Draft your vows'],
  ['1–3 months out', 'Send the DJ/band your must-play and do-not-play song list'],
  ['1–3 months out', 'Track RSVPs and follow up with non-responders'],
  ['1–3 months out', 'Delegate day-of tasks to your wedding party (best man, maid of honor, ushers)'],
  ['Final weeks', 'Confirm every vendor one more time'],
  ['Final weeks', 'Finalize the seating chart'],
  ['Final weeks', 'Pack a day-of emergency kit'],
  ['Final weeks', 'Reconfirm shuttle times and welcome-bag delivery'],
  ['Final weeks', 'Finalize and practice your vows'],
  ['Final weeks', 'Break in your wedding shoes'],
  ['Final weeks', 'Finalize and collect your marriage license paperwork'],
  ['Final weeks', 'Plan the wedding rehearsal (often folded into the welcome dinner)'],
  ['Wedding weekend', 'Welcome dinner the night before'],
  ['Wedding weekend', 'Hair, makeup and dressing timeline'],
  ['Wedding weekend', 'Ceremony and chuppah'],
  ['Wedding weekend', 'Pool party the next day'],
  ['After the wedding', 'Send thank-you cards'],
  ['After the wedding', 'Back up and share photos with guests'],
  ['After the wedding', 'Return any rentals: chuppah, décor, suits'],
  ['After the wedding', 'Handle any name-change or marriage-certificate paperwork back home'],
  ['12+ months out', 'Set the guest-count range and a realistic total wedding budget'],
  ['12+ months out', 'Choose the top 3 destination regions to investigate'],
  ['12+ months out', 'Shortlist villas, masserias, estates and hotel buyouts'],
  ['12+ months out', 'Confirm the venue can host a Jewish ceremony under a chuppah'],
  ['12+ months out', 'Confirm outside kosher catering and mashgiach access is permitted'],
  ['12+ months out', 'Ask the rabbi about date, travel, ketubah and ceremony requirements']
];


"use strict";

const TODO_SEED_PART_3 = [
  ['12+ months out', 'Check flight routes and approximate travel time from Israel and France'],
  ['12+ months out', 'Decide whether you want a 2-night or 3-night shared weekend'],
  ['9–12 months out', 'Book the venue and secure the exclusive-use dates if possible'],
  ['9–12 months out', 'Book the kosher caterer and confirm supervision requirements'],
  ['9–12 months out', 'Book the rabbi / officiant'],
  ['9–12 months out', 'Confirm the ceremony setup, chuppah location and indoor weather backup'],
  ['9–12 months out', 'Map on-site rooms plus nearby walkable hotels / Airbnbs for overflow'],
  ['9–12 months out', 'Book photographer and videographer'],
  ['9–12 months out', 'Book DJ / band and discuss Israeli, French and international music'],
  ['9–12 months out', 'Send save-the-dates with the destination and weekend dates'],
  ['6–9 months out', 'Choose the wedding dress silhouette and start fittings'],
  ['6–9 months out', 'Choose groom attire and wedding-party dress code'],
  ['6–9 months out', 'Book florist and discuss chuppah flowers + reception flowers'],
  ['6–9 months out', 'Choose invitation design and languages'],
  ['6–9 months out', 'Plan welcome dinner and day-after pool / recovery party'],
  ['6–9 months out', 'Research guest transfers, taxis and late-night transport'],
  ['6–9 months out', 'Create the guest travel page / guest app'],
  ['6–9 months out', 'Start collecting dietary, accessibility and rooming information'],
  ['3–6 months out', 'Order invitations and finalize the guest-information inserts'],
  ['3–6 months out', 'Send formal invitations and set the RSVP deadline'],
  ['3–6 months out', 'Finalize menu direction with the kosher caterer'],
  ['3–6 months out', 'Choose ceremony music, processional order and reception playlist'],
  ['3–6 months out', 'Choose ceremony readings, speeches and wedding-day roles'],
  ['3–6 months out', 'Order / prepare ketubah materials and confirm witness details with the rabbi'],
  ['3–6 months out', 'Confirm legal marriage paperwork and any civil ceremony at home'],
  ['1–3 months out', 'Finalize guest list, rooming and airport / transfer details'],
  ['1–3 months out', 'Finalize seating plan and table assignments'],
  ['1–3 months out', 'Confirm all vendor arrival times and contact numbers'],
  ['1–3 months out', 'Do hair and makeup trial'],
  ['1–3 months out', 'Final dress fitting and bustle / steaming plan'],
  ['1–3 months out', 'Prepare welcome bags, printed itineraries and emergency kit'],
  ['Final weeks', 'Confirm final headcount with caterer and venue'],
  ['Final weeks', 'Share final timeline and venue map with vendors']
];

const TODO_SEED_PART_4 = [
  ['Final weeks', 'Prepare envelopes, tips, balances and payment schedule'],
  ['Final weeks', 'Pack rings, ketubah, marriage documents and ceremony items in hand luggage'],
  ['Final weeks', 'Confirm weather forecast and trigger the backup plan if needed'],
  ['Final weeks', 'Prepare chuppah supplies, yarmulkes, breaking-glass items and Jewish ceremony kit'],
  ['Wedding weekend', 'Welcome guests and hand out room / transport information'],
  ['Wedding weekend', 'Run the ceremony rehearsal / venue walkthrough'],
  ['Wedding weekend', 'Hold welcome dinner'],
  ['Wedding weekend', 'Wedding day: getting ready, chuppah, reception and dancing'],
  ['Wedding weekend', 'Day-after pool / recovery party and casual group time'],
  ['After the wedding', 'Collect cards, gifts and personal items from the venue'],
  ['After the wedding', 'Settle remaining vendor balances and collect receipts'],
  ['After the wedding', 'Back up photos and video when galleries arrive'],
  ['After the wedding', 'Send thank-you notes and share selected photos'],
  ['12+ months out', 'Set a minimum and maximum guest-count scenario so venue capacity can be compared honestly'],
  ['12+ months out', 'Define the venue brief: exclusive use, pool, two-night stay, outdoor chuppah, beautiful backdrop and nearby overflow rooms'],
  ['9–12 months out', 'Ask each venue for exact on-site sleeping capacity, room configuration and full-property buyout terms'],
  ['9–12 months out', 'Check walking time, nightly price and late-night access for every overflow hotel or apartment option'],
  ['6–9 months out', 'Book or shortlist a bridal stylist/dresser for steaming, dressing, bustle and touch-ups'],
  ['6–9 months out', 'Choose wedding shoes plus a comfortable second pair for dancing'],
  ['3–6 months out', 'Plan the welcome dinner menu, timing and dress code'],
  ['3–6 months out', 'Plan the day-after pool party menu, drinks, music, towels, shade and cleanup'],
  ['1–3 months out', 'Confirm who physically transports the ketubah, rings, kiddush cup and breaking glass'],
  ['Final weeks', 'Confirm guest room assignments, check-in instructions and emergency contact details'],
  ['Wedding weekend', 'Set up a hydration, sunscreen and shade station for the pool party'],
  ['6–9 months out', 'Choose your veil and any ceremony hair accessories'],
  ['6–9 months out', 'Plan a second look / reception outfit that is comfortable for dancing'],
  ['3–6 months out', 'Choose wedding décor and rentals: tablescape, candles, linens, signage, lighting and lounge furniture'],
  ['3–6 months out', 'Choose ceremony décor: aisle, chuppah styling and welcome area'],
  ['1–3 months out', 'Confirm décor rental quantities, delivery, setup and breakdown responsibilities'],
  ['1–3 months out', 'Choose comfortable second-look shoes or dancing shoes'],
  ['Final weeks', 'Pack veil, second look, jewellery, hair accessories, lingerie/shapewear and dancing shoes'],
  ['Final weeks', 'Confirm who will steam, bustle or change the dress and help with the second look'],
  ['Wedding weekend', 'Set up welcome-area, ceremony, reception and pool-party décor']
];

const CONSID_SEED_PART_1 = [
  ['Ceremony essentials', 'Chuppah'],
  ['Ceremony essentials', 'Ketubah'],
  ['Ceremony essentials', 'Wedding rings'],
  ['Ceremony essentials', 'Glass to break (wrapped)'],
  ['Ceremony essentials', 'Kiddush cup'],
  ['Ceremony essentials', 'Kosher witnesses (if Orthodox)'],
  ['Ceremony essentials', 'Decide: traditional/personal vows or both'],
  ['Kosher & catering', 'Confirm the kitchen can be kashered or caterer brings a mobile kitchen'],
  ['Kosher & catering', 'Confirm a mashgiach will be on site'],
  ['Kosher & catering', 'Kosher wine'],
  ['Kosher & catering', 'Survey guests for other dietary restrictions'],
  ['Kosher & catering', 'Meat vs. dairy menu logistics'],
  ['Legal & paperwork', 'Marriage license requirements in the destination country'],
  ['Legal & paperwork', 'Whether you need a separate civil ceremony at home'],
  ['Legal & paperwork', 'Apostille/certified translation of the certificate'],
  ['Legal & paperwork', 'Passport validity (6 months past travel)'],
  ['Guests & travel', 'Passport/visa checks for guests'],
  ['Guests & travel', 'Group flight coordination or shared travel agent'],
  ['Guests & travel', 'Shuttle/transport plan'],
  ['Guests & travel', 'Welcome bags (sunscreen, snacks, schedule, aspirin)'],
  ['Guests & travel', 'A block of budget hotel/Airbnb rooms within walking distance'],
  ['Beauty countdown', 'Book hair/makeup trials'],
  ['Beauty countdown', 'Schedule facials with lead time'],
  ['Beauty countdown', 'Tan plan'],
  ['Beauty countdown', 'Book a stylist/dresser for wedding-day steaming and bustling'],
  ['Weather & backup plan', 'Indoor backup for the ceremony'],
  ['Weather & backup plan', "Get the venue's rain plan in writing: which indoor space, its capacity, and how last-minute the call can be"],
  ['Weather & backup plan', 'Shade and water for an outdoor ceremony'],
  ['Weather & backup plan', 'Backup plan for the pool party'],
  ['Language & culture', 'Bilingual/trilingual MC'],
  ['Language & culture', 'Translated ceremony programs'],
  ['Language & culture', 'Playlist mixing Israeli/French/local music'],
  ['Language & culture', 'Briefing for guests unfamiliar with Jewish customs'],
  ['Language & culture', 'Multilingual wording for invitations/signage'],
  ['Ceremony essentials', 'Rabbi / officiant confirmed for the destination date']
];


"use strict";

const CONSID_SEED_PART_2 = [
  ['Ceremony essentials', 'Chuppah frame, fabric, flowers and setup responsibility'],
  ['Ceremony essentials', 'Ketubah format, witnesses and signing plan confirmed with rabbi'],
  ['Ceremony essentials', 'Breaking glass, kiddush cup, wine / grape juice and ceremony items'],
  ['Ceremony essentials', 'Badeken and processional flow included in the timeline'],
  ['Kosher & catering', 'Exact kashrut standard and supervising authority'],
  ['Kosher & catering', 'Mashgiach availability and supervision from setup through service'],
  ['Kosher & catering', 'Separate kitchen / mobile kitchen requirements at the venue'],
  ['Kosher & catering', 'Welcome dinner and day-after food covered, not only the wedding meal'],
  ['Kosher & catering', 'Wine, challah, desserts and bar service fit the kosher plan'],
  ['Legal & paperwork', 'Check local civil-marriage rules and whether the legal ceremony is abroad or at home'],
  ['Legal & paperwork', 'Passports and required documents have enough validity'],
  ['Legal & paperwork', 'Marriage license / civil paperwork deadlines tracked'],
  ['Legal & paperwork', 'Insurance, deposits, cancellation terms and force-majeure clauses reviewed'],
  ['Guests & travel', 'Best airport for the group from Israel and France'],
  ['Guests & travel', 'Group transport plan from airport to venue'],
  ['Guests & travel', 'Overflow hotels / Airbnbs are walkable or have simple transport'],
  ['Guests & travel', 'Room assignments, accessibility and special requests'],
  ['Guests & travel', 'Guest app / WhatsApp / emergency contact system'],
  ['Beauty countdown', 'Hair and makeup artists are comfortable with heat, humidity and outdoor photos'],
  ['Beauty countdown', 'Dress steaming and bustle help on arrival'],
  ['Beauty countdown', 'Trial timing, nails, brows, tan and skincare schedule'],
  ['Beauty countdown', 'Second look / party outfit and comfortable shoes'],
  ['Weather & backup plan', 'Indoor ceremony backup that can actually fit the chuppah and guests'],
  ['Weather & backup plan', 'Rain, wind, heat and shade plan for ceremony + reception'],
  ['Weather & backup plan', 'Pool-day backup if the next day is rainy'],
  ['Weather & backup plan', 'Noise curfew and outdoor-music restrictions'],
  ['Language & culture', 'Invitation languages: Hebrew, French and local language as needed'],
  ['Language & culture', 'Ceremony program / translations for non-Hebrew-speaking guests'],
  ['Language & culture', 'Music mix: Israeli, French and international favorites'],
  ['Language & culture', 'Explain Jewish wedding moments for guests who have not attended one'],
  ['Ceremony essentials', 'Who supplies, transports, builds and takes down the chuppah'],
  ['Ceremony essentials', 'Ketubah pen and a flat protected place for signing'],
  ['Ceremony essentials', 'Kippot / yarmulkes for guests who need them'],
  ['Kosher & catering', 'Whether outside caterers may use the venue kitchen, storage, refrigeration and service areas']
];

const CONSID_SEED_PART_3 = [
  ['Kosher & catering', 'Kosher breakfast / brunch options for guests staying on-site'],
  ['Guests & travel', 'Exact walking route and lighting between overflow accommodation and the venue at night'],
  ['Guests & travel', 'Late-night taxi / shuttle backup even if accommodation is walkable'],
  ['Guests & travel', 'Rooming list for family, wedding party, elderly guests and children'],
  ['Beauty countdown', 'Wedding-day touch-up kit: lip color, powder, blotting paper, pins, fashion tape and blister care'],
  ['Beauty countdown', 'Hair and makeup start time based on photographer arrival and ceremony time'],
  ['Weather & backup plan', 'Wind plan for chuppah fabric, candles, stationery and hair'],
  ['Weather & backup plan', 'Power / generator backup for music, lighting, refrigeration and catering'],
  ['Language & culture', 'Signs and weekend schedules readable for Hebrew- and French-speaking guests'],
  ['Attire & accessories', 'Veil'],
  ['Attire & accessories', 'Second look / reception dress or outfit'],
  ['Attire & accessories', 'Comfortable dancing shoes / second-look shoes'],
  ['Attire & accessories', 'Jewellery'],
  ['Attire & accessories', 'Hair accessories'],
  ['Attire & accessories', 'Lingerie / shapewear'],
  ['Attire & accessories', 'Getting-ready outfit / robe'],
  ['Attire & accessories', 'Dress garment bag and travel-safe hanger'],
  ['Attire & accessories', 'Dress steaming, bustling and change-of-look plan'],
  ['Décor & styling', 'Table décor and centerpieces'],
  ['Décor & styling', 'Candles and candle holders'],
  ['Décor & styling', 'Linens, napkins and table runners'],
  ['Décor & styling', 'Welcome sign and directional signage'],
  ['Décor & styling', 'Seating chart / escort-card display'],
  ['Décor & styling', 'Menus, place cards and table numbers'],
  ['Décor & styling', 'Ceremony aisle décor'],
  ['Décor & styling', 'Chuppah décor and florals'],
  ['Décor & styling', 'Lighting, string lights and/or lanterns'],
  ['Décor & styling', 'Lounge furniture / soft seating'],
  ['Décor & styling', 'Bar décor'],
  ['Décor & styling', 'Dance-floor décor'],
  ['Décor & styling', 'Welcome-area décor'],
  ['Décor & styling', 'Pool-party décor'],
  ['Décor & styling', 'Décor rentals, delivery, setup and breakdown'],
  ['Décor & styling', 'Décor transport and storage plan']
];

const CONSID_SEED_PART_4 = [
  ['Wedding Day Survival Kit', 'Pain relievers (ibuprofen & paracetamol)'],
  ['Wedding Day Survival Kit', 'Antacids'],
  ['Wedding Day Survival Kit', 'Blister plasters / moleskin'],
  ['Wedding Day Survival Kit', 'Stain-removing pen'],
  ['Wedding Day Survival Kit', 'Safety pins'],
  ['Wedding Day Survival Kit', 'Small sewing kit (needle, thread, spare buttons)'],
  ['Wedding Day Survival Kit', 'Bobby pins and hair ties'],
  ['Wedding Day Survival Kit', 'Hairspray or static-cling spray'],
  ['Wedding Day Survival Kit', 'Deodorant'],
  ['Wedding Day Survival Kit', 'Dental floss'],
  ['Wedding Day Survival Kit', 'Mints or gum'],
  ['Wedding Day Survival Kit', 'Tissues'],
  ['Wedding Day Survival Kit', 'Eye drops'],
  ['Wedding Day Survival Kit', 'Hand sanitizer'],
  ['Wedding Day Survival Kit', 'Clear nail polish (stops stocking runs)'],
  ['Wedding Day Survival Kit', 'Double-sided fashion tape'],
  ['Wedding Day Survival Kit', 'Portable phone charger / battery pack'],
  ['Wedding Day Survival Kit', 'Snacks and water bottles']
];

const SEED_TODOS = [...TODO_SEED_PART_1,...TODO_SEED_PART_2,...TODO_SEED_PART_3,...TODO_SEED_PART_4];
const SEED_CONSIDERATIONS = [...CONSID_SEED_PART_1,...CONSID_SEED_PART_2,...CONSID_SEED_PART_3,...CONSID_SEED_PART_4];
const ORIGINAL_CONSIDERATION_COUNT = 33;

state.todos = SEED_TODOS.map(([category,text],i)=>({id:'seed-todo-'+i, category, text, done:false, order:i}));
state.considerations = SEED_CONSIDERATIONS.map(([category,text],i)=>({id:'seed-consid-'+i, category, text, done:false, order:i}));
const unsub = [];

function setSync(ok, text){
  const dot=document.getElementById('syncDot'), t=document.getElementById('syncText');
  if(!dot) return;
  dot.classList.toggle('off', !ok);
  t.textContent = text;
}

async function initDb(){
  try{
    if(!window.claude || !window.claude.use){ syncUnavailable=true; setSync(false,'no live sync in this view'); renderAll(); return; }
    db = await window.claude.use('db');
    if(!db){ syncUnavailable=true; setSync(false,'no live sync in this view, changes stay on this device only'); renderAll(); return; }
    dbReady = true;
    setSync(true,'synced');
    unsub.push(db.collection('todos').orderBy('order','asc').onSnapshot(snap=>{
      state.todos = snap.docs.length ? snap.docs.map(d=>({id:d.id, ...d.data()})) : SEED_TODOS.map(([category,text],i)=>({id:'seed-todo-'+i, category, text, done:false, order:i}));
      renderTodos(); renderStart();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('budget').orderBy('order','asc').onSnapshot(snap=>{
      state.budget = snap.docs.map(d=>({id:d.id, ...d.data()}));
      renderBudget(); renderStart();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('meta').doc('budgetGoal').onSnapshot(doc=>{
      state.budgetGoal = doc.exists ? (Number(doc.data().amount)||0) : state.budgetGoal;
      renderBudget(); renderStart();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('pinboard').orderBy('createdAt','desc').onSnapshot(snap=>{
      state.pins = snap.docs.map(d=>({id:d.id, ...d.data()}));
      renderBoard(); renderStart();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('pinterestBoards').orderBy('addedAt','asc').onSnapshot(snap=>{
      state.pinterestBoards = snap.docs.map(d=>({id:d.id, ...d.data()}));
      if(typeof renderPinterestBoards==='function') renderPinterestBoards();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('diyPinterestBoards').orderBy('addedAt','asc').onSnapshot(snap=>{
      state.diyPinterestBoards = snap.docs.map(d=>({id:d.id, ...d.data()}));
      if(typeof renderDiyPinterestBoards==='function') renderDiyPinterestBoards();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('loveNotes').orderBy('createdAt','desc').limit(30).onSnapshot(snap=>{
      state.loveNotes = snap.docs.map(d=>({id:d.id, ...d.data()}));
      renderLoveNotes();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('diyIdeas').orderBy('createdAt','desc').onSnapshot(snap=>{
      state.diyIdeas = snap.docs.map(d=>({id:d.id, ...d.data()}));
      if(typeof renderDiyIdeas==='function') renderDiyIdeas();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('venueContacts').orderBy('createdAt','desc').onSnapshot(snap=>{
      state.venueContacts = snap.docs.map(d=>({id:d.id, ...d.data()}));
      if(typeof renderVenueContacts==='function') renderVenueContacts();
      if(typeof renderVenues==='function') renderVenues();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('considerations').orderBy('order','asc').onSnapshot(snap=>{
      state.considerations = snap.docs.length ? snap.docs.map(d=>({id:d.id, ...d.data()})) : SEED_CONSIDERATIONS.map(([category,text],i)=>({id:'seed-consid-'+i, category, text, done:false, order:i}));
      renderConsiderations(); renderStart();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('travelGuide').orderBy('order','asc').onSnapshot(snap=>{
      state.travelGuide = snap.docs.map(d=>({id:d.id, ...d.data()}));
      if(typeof renderTravelGuide==='function'){ renderTravelGuide(); renderStart(); }
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('guests').orderBy('order','asc').onSnapshot(snap=>{
      state.guests = snap.docs.map(d=>({id:d.id, ...d.data()}));
      renderGuestApp();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('meta').doc('labels').onSnapshot(doc=>{
      if(doc.exists){
        const d = doc.data();
        if(d.mineLabel) state.labels.mineLabel = d.mineLabel;
        if(d.partnerLabel) state.labels.partnerLabel = d.partnerLabel;
        renderGuestApp();
      }
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('venueFavorites').onSnapshot(snap=>{
      state.venues = {};
      snap.docs.forEach(d=> state.venues[d.id] = d.data());
      renderVenues();
    }, err=>setSync(false,'sync error')));
    /* Edits to a curated (built-in) venue, keyed by that venue's fixed id,
       are stored here instead of mutating the VENUES array itself, since
       that array lives in source code, not Firestore. allVenuesList()
       layers each one over its base curated entry at render time. */
    unsub.push(db.collection('venueOverrides').onSnapshot(snap=>{
      state.venueOverrides = {};
      snap.docs.forEach(d=> state.venueOverrides[d.id] = d.data());
      if(typeof renderVenueFilters==='function') renderVenueFilters();
      renderVenues();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('customStyles').orderBy('createdAt','desc').onSnapshot(snap=>{
      state.customStyles = snap.docs.map(d=>({id:d.id, ...d.data()}));
      if(typeof renderStyleSections==='function') renderStyleSections();
    }, err=>setSync(false,'sync error')));
    unsub.push(db.collection('customVenues').orderBy('createdAt','desc').onSnapshot(snap=>{
      state.customVenues = snap.docs.map(d=>({id:d.id, ...d.data()}));
      if(typeof renderVenueFilters==='function') renderVenueFilters();
      renderVenues();
    }, err=>setSync(false,'sync error')));
  }catch(e){ syncUnavailable=true; setSync(false,'no live sync, changes stay on this device only'); renderAll(); }
}
function renderAll(){ renderTodos(); renderBudget(); renderBoard(); renderConsiderations(); renderVenues(); renderGuestApp(); renderStart(); }

/* fallback local id for no-db mode */
function localAdd(arr, data){ data.id = 'local-'+Math.random().toString(36).slice(2); arr.unshift(data); return data; }


"use strict";

/* ---------------- CHECKLIST ---------------- */
const GROUP_TINTS = ['blush','coral','butter','lilac','wine','cypress','brass'];
const TODO_GROUPS = ['12+ months out','9–12 months out','6–9 months out','3–6 months out','1–3 months out','Final weeks','Wedding weekend','After the wedding'];
function renderTodos(){
  const wrap = document.getElementById('todoGroups');
  const done = state.todos.filter(t=>t.done).length;
  document.getElementById('todoStats').innerHTML = [
    tile(done+' / '+state.todos.length,'Tasks completed', true),
    tile(String(state.todos.filter(t=>!t.done).length),'Still open'),
  ].join('');
  wrap.innerHTML = '';
  TODO_GROUPS.forEach((g,gi)=>{
    const items = state.todos.filter(t=>t.category===g);
    const tint = GROUP_TINTS[gi % GROUP_TINTS.length];
    const box = document.createElement('div'); box.className='group';
    box.innerHTML = '<div class="group-head"><h3 class="tint-text-'+tint+'">'+g+'</h3><span class="sub tint-'+tint+'">'+items.filter(i=>i.done).length+'/'+items.length+'</span></div>';
    const list = document.createElement('div'); list.className='item-list';
    if(items.length===0){ list.innerHTML = '<div class="item-row"><span class="item-text" style="color:var(--ink-faint)">Nothing here yet.</span></div>'; }
    items.forEach(it=> list.appendChild(itemRow(it,'todos')) );
    box.appendChild(list);
    const add = document.createElement('div'); add.className='add-row';
    add.innerHTML = '<input type="text" placeholder="Add a task…"><button class="btn small">'+svg(ICON.plus)+'</button>';
    add.querySelector('button').addEventListener('click', ()=>{
      const input = add.querySelector('input'); if(!input.value.trim()) return;
      addItem('todos', {text:input.value.trim(), category:g, done:false, order: Date.now()});
      input.value='';
    });
    add.querySelector('input').addEventListener('keydown', e=>{ if(e.key==='Enter') add.querySelector('button').click(); });
    box.appendChild(add);
    wrap.appendChild(box);
  });
  resizeAllItemTextareas();
}
/* Same 0-height-while-hidden issue as the budget notes textarea: sizing
   only at creation time measures wrong whenever the Checklist/Things to
   Get tab isn't the one currently visible (their normal state, since
   both render regardless of which tab is open), so re-run it once the
   tab actually becomes visible too (see showTab). */
function resizeAllItemTextareas(){ document.querySelectorAll('#view-todo textarea.item-text, #view-considerations textarea.item-text, #view-travelguide textarea.item-text').forEach(autoGrowTextarea); }
function itemRow(it, coll){
  const row = document.createElement('div'); row.className='item-row'+(it.done?' done':'');
  row.draggable = true;
  row.dataset.itemId = it.id;
  row.dataset.category = it.category;
  const grip = document.createElement('span'); grip.className='grip'; grip.innerHTML = svg(ICON.grip);
  const chk = document.createElement('button'); chk.className='chk'+(it.done?' on':''); chk.innerHTML = it.done?svg(ICON.check2):'';
  chk.addEventListener('click', ()=> toggleItem(coll, it));
  const text = document.createElement('textarea'); text.className='item-text'; text.rows=1; text.value = it.text;
  text.addEventListener('input', ()=> autoGrowTextarea(text));
  text.addEventListener('change', ()=>{
    const val = text.value.trim();
    if(!val){ text.value = it.text; return; }
    updateItem(coll, it, {text: val});
  });
  const del = document.createElement('button'); del.className='btn ghost del'; del.innerHTML = svg(ICON.trash);
  del.addEventListener('click', ()=>{
    const label = it.text ? '"'+it.text+'"' : 'this item';
    confirmAction('Are you sure you want to delete '+label+'?', ()=> deleteItem(coll, it));
  });
  row.appendChild(grip); row.appendChild(chk); row.appendChild(text); row.appendChild(del);

  row.addEventListener('dragstart', e=>{ row.classList.add('dragging'); e.dataTransfer.setData('text/plain', it.id); e.dataTransfer.effectAllowed='move'; });
  row.addEventListener('dragend', ()=> row.classList.remove('dragging'));
  row.addEventListener('dragover', e=>{
    e.preventDefault();
    const rect = row.getBoundingClientRect();
    const before = (e.clientY - rect.top) < rect.height/2;
    row.classList.toggle('drag-over-top', before);
    row.classList.toggle('drag-over-bottom', !before);
  });
  row.addEventListener('dragleave', ()=> row.classList.remove('drag-over-top','drag-over-bottom'));
  row.addEventListener('drop', e=>{
    e.preventDefault();
    row.classList.remove('drag-over-top','drag-over-bottom');
    const draggedId = e.dataTransfer.getData('text/plain');
    if(!draggedId || draggedId===it.id) return;
    const dragged = state[coll].find(x=>x.id===draggedId);
    if(!dragged || dragged.category!==it.category) return;
    const rect = row.getBoundingClientRect();
    const before = (e.clientY - rect.top) < rect.height/2;
    reorderItems(coll, it.category, draggedId, it.id, before);
  });

  /* Native HTML5 drag-and-drop (the dragstart/dragover/drop wiring above)
     never fires from a touchscreen, browsers just don't map touch gestures
     to it, so the grip handle did nothing on a phone even though it was
     visually the same element. Wire the same reorder behavior to real
     touch events on just the grip, so scrolling the list by touching
     anywhere else still works normally. */
  wireTouchDrag(grip, row, function(targetRow, before){
    const targetId = targetRow.dataset.itemId;
    if(!targetId || targetId===it.id) return;
    if(targetRow.dataset.category !== it.category) return;
    reorderItems(coll, it.category, it.id, targetId, before);
  });

  return row;
}
/* Touch equivalent of the item-row drag-and-drop above: touchmove keeps
   firing on the element that received touchstart, not on whatever the
   finger is currently over, so the row under the finger has to be found
   manually with elementFromPoint on every move, same technique any
   from-scratch touch-drag implementation needs since there is no native
   touch drag-and-drop API. */
function wireTouchDrag(handle, row, onDrop){
  let active = false;
  function rowAt(x, y){
    const el = document.elementFromPoint(x, y);
    return el && el.closest ? el.closest('.item-row') : null;
  }
  function clearDropHighlight(){
    document.querySelectorAll('.item-row.drag-over-top, .item-row.drag-over-bottom').forEach(r=>{
      r.classList.remove('drag-over-top','drag-over-bottom');
    });
  }
  handle.addEventListener('touchstart', ()=>{
    active = true;
    row.classList.add('dragging');
  }, {passive:true});
  handle.addEventListener('touchmove', e=>{
    if(!active) return;
    e.preventDefault();
    const touch = e.touches[0];
    const target = rowAt(touch.clientX, touch.clientY);
    clearDropHighlight();
    if(target && target!==row){
      const rect = target.getBoundingClientRect();
      const before = (touch.clientY - rect.top) < rect.height/2;
      target.classList.toggle('drag-over-top', before);
      target.classList.toggle('drag-over-bottom', !before);
    }
  }, {passive:false});
  handle.addEventListener('touchend', e=>{
    if(!active) return;
    active = false;
    row.classList.remove('dragging');
    const touch = e.changedTouches[0];
    const target = rowAt(touch.clientX, touch.clientY);
    clearDropHighlight();
    if(target && target!==row){
      const rect = target.getBoundingClientRect();
      const before = (touch.clientY - rect.top) < rect.height/2;
      onDrop(target, before);
    }
  });
  handle.addEventListener('touchcancel', ()=>{
    active = false;
    row.classList.remove('dragging');
    clearDropHighlight();
  });
}
function reorderItems(coll, category, draggedId, targetId, before){
  const list = state[coll].filter(x=>x.category===category);
  const fromIdx = list.findIndex(x=>x.id===draggedId);
  if(fromIdx<0) return;
  const [item] = list.splice(fromIdx,1);
  let toIdx = list.findIndex(x=>x.id===targetId);
  if(toIdx<0) toIdx = list.length;
  list.splice(before ? toIdx : toIdx+1, 0, item);
  const base = Date.now();
  list.forEach((it,i)=>{
    const newOrder = base+i;
    if(it.order !== newOrder){
      it.order = newOrder;
      if(dbReady) db.collection(coll).doc(it.id).update({order:newOrder});
    }
  });
  if(!dbReady) ({todos:renderTodos, considerations:renderConsiderations, travelGuide:renderTravelGuide})[coll]();
}
function addItem(coll, data){
  if(dbReady){ db.collection(coll).add(data); }
  else { localAdd(state[coll], data); ({todos:renderTodos, considerations:renderConsiderations, travelGuide:renderTravelGuide})[coll](); renderStart(); }
}
function toggleItem(coll, it){
  if(dbReady){ db.collection(coll).doc(it.id).update({done: !it.done}); }
  else { it.done = !it.done; ({todos:renderTodos, considerations:renderConsiderations, travelGuide:renderTravelGuide})[coll](); renderStart(); }
}
function updateItem(coll, it, data){
  Object.assign(it, data);
  if(dbReady){ db.collection(coll).doc(it.id).update(data); }
  else { ({todos:renderTodos, considerations:renderConsiderations, travelGuide:renderTravelGuide})[coll](); }
}
function deleteItem(coll, it){
  if(dbReady){ db.collection(coll).doc(it.id).delete(); }
  else { state[coll]=state[coll].filter(x=>x.id!==it.id); ({todos:renderTodos, considerations:renderConsiderations, travelGuide:renderTravelGuide})[coll](); renderStart(); }
}

/* ---------------- CONSIDERATIONS ---------------- */
const CONSID_GROUPS = ['Ceremony essentials','Kosher & catering','Legal & paperwork','Guests & travel','Beauty countdown','Weather & backup plan','Language & culture',
  'Attire & accessories',
  'Décor & styling',
  'Wedding Day Survival Kit'];
function renderConsiderations(){
  const wrap = document.getElementById('considGroups');
  const done = state.considerations.filter(t=>t.done).length;
  document.getElementById('considStats').innerHTML = [
    tile(done+' / '+state.considerations.length,'Settled', true),
    tile(String(state.considerations.filter(t=>!t.done).length),'Still to sort'),
  ].join('');
  wrap.innerHTML = '';
  CONSID_GROUPS.forEach((g,gi)=>{
    const items = state.considerations.filter(t=>t.category===g);
    const tint = GROUP_TINTS[gi % GROUP_TINTS.length];
    const box = document.createElement('div'); box.className='group';
    box.innerHTML = '<div class="group-head"><h3 class="tint-text-'+tint+'">'+g+'</h3><span class="sub tint-'+tint+'">'+items.filter(i=>i.done).length+'/'+items.length+'</span></div>';
    const list = document.createElement('div'); list.className='item-list';
    items.forEach(it=> list.appendChild(itemRow(it,'considerations')) );
    box.appendChild(list);
    const add = document.createElement('div'); add.className='add-row';
    add.innerHTML = '<input type="text" placeholder="Add something to think about…"><button class="btn small">'+svg(ICON.plus)+'</button>';
    add.querySelector('button').addEventListener('click', ()=>{
      const input = add.querySelector('input'); if(!input.value.trim()) return;
      addItem('considerations', {text:input.value.trim(), category:g, done:false, order: Date.now()});
      input.value='';
    });
    add.querySelector('input').addEventListener('keydown', e=>{ if(e.key==='Enter') add.querySelector('button').click(); });
    box.appendChild(add);
    wrap.appendChild(box);
  });
  resizeAllItemTextareas();
}

/* ---------------- TRAVEL GUIDE ---------------- */
/* The venue (and so the destination) usually isn't locked in yet, so this
   starts as a ready-to-fill layout rather than empty: one example prompt
   per section, worded as a placeholder, so the shape of the page is clear
   even before there's a real destination to write about. Real content
   replaces these once the venue is booked (see ensureTravelGuideSeedMigration
   in firebase-sync.js for the actual seed text). */
const TRAVEL_GROUPS = ['Getting there','Getting to the venue','Where guests can stay','Getting around locally','Weather & what to pack','Local culture & language','Things to do nearby','Practical & emergency info'];
function renderTravelGuide(){
  const wrap = document.getElementById('travelGroups');
  if(!wrap) return;
  const done = state.travelGuide.filter(t=>t.done).length;
  document.getElementById('travelStats').innerHTML = [
    tile(done+' / '+state.travelGuide.length,'Sections filled in', true),
    tile(String(state.travelGuide.filter(t=>!t.done).length),'Still to fill in'),
  ].join('');
  wrap.innerHTML = '';
  TRAVEL_GROUPS.forEach((g,gi)=>{
    const items = state.travelGuide.filter(t=>t.category===g);
    const tint = GROUP_TINTS[gi % GROUP_TINTS.length];
    const box = document.createElement('div'); box.className='group';
    box.innerHTML = '<div class="group-head"><h3 class="tint-text-'+tint+'">'+g+'</h3><span class="sub tint-'+tint+'">'+items.filter(i=>i.done).length+'/'+items.length+'</span></div>';
    const list = document.createElement('div'); list.className='item-list';
    if(items.length===0){ list.innerHTML = '<div class="item-row"><span class="item-text" style="color:var(--ink-faint)">Nothing here yet.</span></div>'; }
    items.forEach(it=> list.appendChild(itemRow(it,'travelGuide')) );
    box.appendChild(list);
    const add = document.createElement('div'); add.className='add-row';
    add.innerHTML = '<input type="text" placeholder="Add a detail…"><button class="btn small">'+svg(ICON.plus)+'</button>';
    add.querySelector('button').addEventListener('click', ()=>{
      const input = add.querySelector('input'); if(!input.value.trim()) return;
      addItem('travelGuide', {text:input.value.trim(), category:g, done:false, order: Date.now()});
      input.value='';
    });
    add.querySelector('input').addEventListener('keydown', e=>{ if(e.key==='Enter') add.querySelector('button').click(); });
    box.appendChild(add);
    wrap.appendChild(box);
  });
  resizeAllItemTextareas();
}


/* ---------------- BUDGET ---------------- */
/* scrollHeight reads as 0/tiny while the Budget tab (or an ancestor) is
   display:none, so sizing notes textareas only at creation time leaves
   them too short whenever renderBudget() runs off-screen (e.g. a live
   Firestore update while another tab is open). resizeAllBudgetNotes()
   re-measures every note once the tab is actually visible. */
function autoGrowTextarea(el){ el.style.height='auto'; el.style.height=el.scrollHeight+'px'; }
function resizeAllBudgetNotes(){ document.querySelectorAll('#view-budget .notes-input').forEach(autoGrowTextarea); }
function renderBudget(){
  if(syncUnavailable && state.budget.length===0){
    state.budget = SEED_BUDGET.map((b,i)=>({id:'local-budget-'+i, ...b}));
  }
  const body = document.getElementById('budgetBody');
  const est = state.budget.reduce((s,b)=>s+(Number(b.estCost)||0),0);
  const act = state.budget.reduce((s,b)=>s+(Number(b.actCost)||0),0);
  const paid = state.budget.filter(b=>b.paid).reduce((s,b)=>s+(Number(b.actCost)||Number(b.estCost)||0),0);
  const goal = Number(state.budgetGoal)||0;
  const diff = goal - est;
  document.getElementById('budgetStats').innerHTML = [
    tile('€'+est.toLocaleString(),'Estimated total', true),
    goalTile(goal, diff),
    tile('€'+act.toLocaleString(),'Actual (quoted/booked)'),
    tile('€'+paid.toLocaleString(),'Paid so far'),
    tile(String(state.budget.length),'Line items'),
  ].join('');
  document.getElementById('budgetGoalInput').addEventListener('change', e=>{
    const val = Math.max(0, Number(e.target.value)||0);
    state.budgetGoal = val;
    if(dbReady) db.collection('meta').doc('budgetGoal').set({amount: val});
    else renderBudget();
  });
  body.innerHTML='';
  state.budget.forEach(b=>{
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>'+esc(b.category)+'</td><td>'+esc(b.item)+'</td>'
      +'<td class="num-cell mono">'+numInput('est',b)+'</td>'
      +'<td class="num-cell mono">'+numInput('act',b)+'</td>'
      +'<td></td><td></td><td></td>';
    body.appendChild(tr);
    const paidCell = tr.children[4];
    const pill = document.createElement('button'); pill.className='paid-pill'+(b.paid?'':' no'); pill.textContent = b.paid?'Paid':'Unpaid';
    pill.addEventListener('click', ()=> updateBudget(b,{paid:!b.paid}));
    paidCell.appendChild(pill);
    const notesCell = tr.children[5];
    const ni = document.createElement('textarea'); ni.className='notes-input'; ni.rows=1; ni.value=b.notes||''; ni.placeholder='-';
    ni.addEventListener('input', ()=> autoGrowTextarea(ni));
    ni.addEventListener('change', ()=> updateBudget(b,{notes:ni.value}));
    notesCell.appendChild(ni);
    const delCell = tr.children[6];
    const delBtn = document.createElement('button'); delBtn.className='btn ghost small'; delBtn.innerHTML = svg(ICON.trash);
    delBtn.addEventListener('click', ()=>{
      const label = b.item ? '"'+b.item+'"' : 'this line';
      confirmAction('Are you sure you want to delete '+label+'?', ()=>{
        if(dbReady) db.collection('budget').doc(b.id).delete();
        else { state.budget = state.budget.filter(x=>x.id!==b.id); renderBudget(); }
      });
    });
    delCell.appendChild(delBtn);
    tr.querySelector('.num-cell input[data-k="est"]')?.addEventListener('change', e=> updateBudget(b,{estCost:Number(e.target.value)||0}));
    tr.querySelector('.num-cell input[data-k="act"]')?.addEventListener('change', e=> updateBudget(b,{actCost:Number(e.target.value)||0}));
  });
  function numInput(k,b){ const val = k==='est'?(b.estCost??''):(b.actCost??''); return '<input type="number" data-k="'+k+'" value="'+val+'">'; }
  resizeAllBudgetNotes();
}
function updateBudget(b, data){
  Object.assign(b,data);
  if(dbReady) db.collection('budget').doc(b.id).update(data);
  else renderBudget();
}
document.getElementById('btnAddBudget').addEventListener('click', ()=>{
  const cat=document.getElementById('bCategory'), item=document.getElementById('bItem'), est=document.getElementById('bEst'), act=document.getElementById('bAct');
  if(!item.value.trim()) return;
  const data = {category:cat.value.trim()||'General', item:item.value.trim(), estCost:Number(est.value)||0, actCost:Number(act.value)||0, paid:false, notes:'', order:Date.now()};
  if(dbReady) db.collection('budget').add(data);
  else { localAdd(state.budget,data); renderBudget(); }
  cat.value=''; item.value=''; est.value=''; act.value='';
});

