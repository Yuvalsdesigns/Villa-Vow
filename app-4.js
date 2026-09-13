"use strict";
/* ---------------- GUEST APP (Who's Coming) ---------------- */
let expandedGuestId = null;

function confirmAction(message, onYes){
  const backdrop = document.getElementById('confirmBackdrop');
  document.getElementById('confirmMessage').textContent = message;
  backdrop.classList.add('open');
  const yesBtn = document.getElementById('confirmYes');
  const noBtn = document.getElementById('confirmNo');
  function cleanup(){ backdrop.classList.remove('open'); yesBtn.removeEventListener('click', onYesClick); noBtn.removeEventListener('click', onNoClick); backdrop.removeEventListener('click', onBackdropClick); }
  function onYesClick(){ cleanup(); onYes(); }
  function onNoClick(){ cleanup(); }
  function onBackdropClick(e){ if(e.target===backdrop) cleanup(); }
  yesBtn.addEventListener('click', onYesClick);
  noBtn.addEventListener('click', onNoClick);
  backdrop.addEventListener('click', onBackdropClick);
}

function guestsFor(side){ return state.guests.filter(g=>g.side===side); }

function renderGuestApp(){
  const labelMine = document.getElementById('labelMine');
  const labelPartner = document.getElementById('labelPartner');
  if(labelMine && document.activeElement!==labelMine) labelMine.value = state.labels.mineLabel;
  if(labelPartner && document.activeElement!==labelPartner) labelPartner.value = state.labels.partnerLabel;
  ['mine','partner'].forEach(renderGuestSide);
  renderGuestStats();
}

function headcountBreakdown(list){
  let base=0, plus=0;
  list.forEach(g=>{
    if(g.rsvp==='confirmed') base += 1;
    if(!g.plusOnesTBD && (g.plusOnes||0)>0 && g.plusRsvp==='confirmed') plus += g.plusOnes;
  });
  return {base, plus, total: base+plus};
}
/* Likelihood is your own early guess of who'll attend, separate from the
   real RSVP tracked once invites go out. Used for early headcount planning. */
function likelyHeadcount(list){
  let base=0, plus=0;
  list.forEach(g=>{
    if((g.likelihood||'likely')==='likely') base += 1;
    if(!g.plusOnesTBD && (g.plusOnes||0)>0 && (g.plusLikelihood||'likely')==='likely') plus += g.plusOnes;
  });
  return {base, plus, total: base+plus};
}
function toVerifyCount(list){ return list.filter(g=> g.plusOnesTBD && g.rsvp!=='declined').length; }
/* Every row counted once, plus its plus-ones (if a real number, not "+X"),
   regardless of RSVP status, a separate number from the by-status counts. */
function totalPeopleAllStatuses(list){
  let base=0, plus=0;
  list.forEach(g=>{
    base += 1;
    if(!g.plusOnesTBD && g.plusOnes>0) plus += g.plusOnes;
  });
  return {base, plus, total: base+plus};
}

function renderGuestStats(){
  const all = state.guests;
  const invited = all.length;
  const hc = headcountBreakdown(all);
  const totalAll = totalPeopleAllStatuses(all);
  const likely = likelyHeadcount(all);
  const pending = all.filter(g=>g.rsvp==='pending').length;
  const declined = all.filter(g=>g.rsvp==='declined').length;
  const toVerify = toVerifyCount(all);
  const el = document.getElementById('guestStatRow');
  if(!el) return;
  el.innerHTML = [
    tile(String(invited), 'Invites sent (rows on the list)', true),
    tile(String(totalAll.total), 'Total people, any status<br><span class="tile-breakdown">'+totalAll.base+' rows + '+totalAll.plus+' plus-ones</span>'),
    tile(String(likely.total), 'Likely to attend (your estimate)<br><span class="tile-breakdown">'+likely.base+' guests + '+likely.plus+' plus-ones</span>'),
    tile(String(hc.total), 'Confirmed headcount (real RSVPs)<br><span class="tile-breakdown">'+hc.base+' guests + '+hc.plus+' plus-ones</span>'),
    tile(String(pending), 'Awaiting RSVP'),
    tile(String(declined), "Can't make it"),
    tile(String(toVerify), 'Plus-ones to verify (+X)'),
  ].join('');
}

function renderGuestSide(side){
  const list = guestsFor(side);
  const listEl = document.getElementById(side==='mine'?'listMine':'listPartner');
  const emptyEl = document.getElementById(side==='mine'?'emptyMine':'emptyPartner');
  const countEl = document.getElementById(side==='mine'?'countMine':'countPartner');
  const miniEl = document.getElementById(side==='mine'?'miniMine':'miniPartner');
  if(!listEl) return;
  const sideTotals = totalPeopleAllStatuses(list);
  countEl.textContent = sideTotals.base + (sideTotals.plus ? '+'+sideTotals.plus : '');
  const conf = list.filter(g=>g.rsvp==='confirmed').length;
  const pend = list.filter(g=>g.rsvp==='pending').length;
  const decl = list.filter(g=>g.rsvp==='declined').length;
  const likelyCount = list.filter(g=>(g.likelihood||'likely')==='likely').length;
  const unlikelyCount = list.filter(g=>(g.likelihood||'likely')==='unlikely').length;
  const toVerify = toVerifyCount(list);
  miniEl.innerHTML = '<span><b>'+conf+'</b> confirmed</span><span><b>'+pend+'</b> pending</span><span><b>'+decl+'</b> declined</span>'+(toVerify? '<span><b>'+toVerify+'</b> to verify</span>':'')
    + '<span style="margin-left:8px;"><b>'+likelyCount+'</b> likely</span><span><b>'+unlikelyCount+'</b> unlikely</span>';
  emptyEl.style.display = list.length? 'none':'block';
  listEl.innerHTML='';
  list.forEach(g=> listEl.appendChild(buildGuestRow(g, side)));
}

function buildGuestRow(g, side){
  const row = document.createElement('div');
  row.className='guest-row'; row.dataset.id = g.id; row.dataset.side = side;
  row.draggable = true;

  const main = document.createElement('div'); main.className='row-main';
  const likelihood = g.likelihood||'likely';
  const hasAnyPlus = g.plusOnesTBD || (g.plusOnes||0) > 0;
  const plusLikelihood = g.plusLikelihood||'likely';
  const plusRsvp = g.plusRsvp||'pending';
  main.innerHTML = '<span class="grip">'+svg(ICON.grip)+'</span>'
    + '<input class="row-name" value="'+esc(g.name)+'">'
    + '<select class="likelihood '+likelihood+'" title="Your own guess: will they come?">'
      + '<option value="likely"'+(likelihood==='likely'?' selected':'')+'>Likely</option>'
      + '<option value="unlikely"'+(likelihood==='unlikely'?' selected':'')+'>Unlikely</option>'
    + '</select>'
    + '<select class="rsvp '+g.rsvp+'" title="Their actual RSVP">'
      + '<option value="pending"'+(g.rsvp==='pending'?' selected':'')+'>Pending</option>'
      + '<option value="confirmed"'+(g.rsvp==='confirmed'?' selected':'')+'>Confirmed</option>'
      + '<option value="declined"'+(g.rsvp==='declined'?' selected':'')+'>Declined</option>'
    + '</select>'
    + '<span class="stepper" title="Plus-ones invited">'
      + '<button class="step-minus" '+(g.plusOnesTBD?'disabled':'')+'>−</button>'
      + '<span class="val'+(g.plusOnesTBD?' tbd':'')+'">'+(g.plusOnesTBD? 'X' : '+'+(g.plusOnes||0))+'</span>'
      + '<button class="step-plus">+</button>'
    + '</span>'
    + (g.dietary? '<span class="tag-chip">'+esc(g.dietary)+'</span>' : '')
    + '<button class="icon-btn expand-btn">'+svg(ICON.chevron)+'</button>'
    + '<button class="icon-btn del-btn">'+svg(ICON.trash)+'</button>';
  row.appendChild(main);

  const detail = document.createElement('div'); detail.className='row-detail'+(expandedGuestId===g.id?' open':'');
  detail.innerHTML = '<label class="plusone-field" style="flex:1 1 160px;"><span style="display:flex;align-items:center;gap:4px;font-size:11px;white-space:nowrap;"><input type="checkbox" style="width:auto;" class="tbd-ck" '+(g.plusOnesTBD?'checked':'')+'> Plus-ones unverified (+X, count not confirmed yet)</span></label>'
    + '<label class="notes-field" style="flex:1 1 160px;">Plus-one names (if known)<input type="text" placeholder="e.g. Ben & Noa" value="'+esc(g.plusOneNotes||'')+'"></label>'
    + (hasAnyPlus? '<label class="plus-status-field">Plus-ones likelihood<select class="likelihood plus-likelihood '+plusLikelihood+'">'
        + '<option value="likely"'+(plusLikelihood==='likely'?' selected':'')+'>Likely</option>'
        + '<option value="unlikely"'+(plusLikelihood==='unlikely'?' selected':'')+'>Unlikely</option>'
      + '</select></label>'
      + '<label class="plus-status-field">Plus-ones RSVP<select class="rsvp plus-rsvp '+plusRsvp+'">'
        + '<option value="pending"'+(plusRsvp==='pending'?' selected':'')+'>Pending</option>'
        + '<option value="confirmed"'+(plusRsvp==='confirmed'?' selected':'')+'>Confirmed</option>'
        + '<option value="declined"'+(plusRsvp==='declined'?' selected':'')+'>Declined</option>'
      + '</select></label>' : '')
    + '<label class="email-field">Email (for e-vites)<input type="email" value="'+esc(g.email||'')+'" placeholder="name@email.com"></label>'
    + '<label class="dietary-field">Dietary / kosher<input type="text" value="'+esc(g.dietary||'')+'" placeholder="e.g. Kosher, gluten-free"></label>'
    + '<label class="table-field">Table / group<input type="text" value="'+esc(g.table||'')+'" placeholder="e.g. Family table"></label>'
    + '<label class="notes-field">Notes<textarea placeholder="Anything else">'+esc(g.notes||'')+'</textarea></label>';
  row.appendChild(detail);

  main.querySelector('.row-name').addEventListener('change', e=> updateGuest(g, {name: e.target.value.trim() || g.name}));
  main.querySelector('.likelihood').addEventListener('change', e=>{ e.target.className='likelihood '+e.target.value; updateGuest(g, {likelihood: e.target.value}); });
  main.querySelector('.rsvp').addEventListener('change', e=>{ e.target.className='rsvp '+e.target.value; updateGuest(g, {rsvp: e.target.value}); });
  main.querySelector('.step-minus').addEventListener('click', ()=>{
    const newPlusOnes = Math.max(0, (g.plusOnes||0)-1);
    updateGuest(g, {plusOnes: newPlusOnes, plusOnesTBD:false});
  });
  main.querySelector('.step-plus').addEventListener('click', ()=> updateGuest(g, {plusOnes: (g.plusOnesTBD?0:(g.plusOnes||0))+1, plusOnesTBD:false}));
  main.querySelector('.expand-btn').addEventListener('click', ()=>{ expandedGuestId = expandedGuestId===g.id? null : g.id; renderGuestApp(); });
  main.querySelector('.del-btn').addEventListener('click', ()=>{
    confirmAction('Are you sure you want to delete '+(g.name||'this guest')+'?', ()=>{ if(dbReady) db.collection('guests').doc(g.id).delete(); });
  });

  detail.querySelector('.plus-likelihood')?.addEventListener('change', e=>{ e.target.className='likelihood plus-likelihood '+e.target.value; updateGuest(g, {plusLikelihood: e.target.value}); });
  detail.querySelector('.plus-rsvp')?.addEventListener('change', e=>{ e.target.className='rsvp plus-rsvp '+e.target.value; updateGuest(g, {plusRsvp: e.target.value}); });

  const plusTbdCk = detail.querySelector('.tbd-ck');
  const plusNotes = detail.querySelector('.notes-field input[type=text]');
  plusTbdCk.addEventListener('change', ()=> updateGuest(g, {plusOnesTBD: plusTbdCk.checked, plusOnes: plusTbdCk.checked? 0 : (g.plusOnes||0)}));
  plusNotes.addEventListener('change', ()=> updateGuest(g, {plusOneNotes: plusNotes.value.trim()}));
  detail.querySelector('.email-field input').addEventListener('change', e=> updateGuest(g, {email: e.target.value.trim()}));
  detail.querySelector('.dietary-field input').addEventListener('change', e=> updateGuest(g, {dietary: e.target.value.trim()}));
  detail.querySelector('.table-field input').addEventListener('change', e=> updateGuest(g, {table: e.target.value.trim()}));
  detail.querySelector('.notes-field textarea').addEventListener('change', e=> updateGuest(g, {notes: e.target.value.trim()}));

  row.addEventListener('dragstart', e=>{ row.classList.add('dragging'); e.dataTransfer.setData('text/plain', g.id); e.dataTransfer.effectAllowed='move'; });
  row.addEventListener('dragend', ()=> row.classList.remove('dragging'));
  row.addEventListener('dragover', e=>{
    e.preventDefault();
    const rect = row.getBoundingClientRect();
    const before = (e.clientY - rect.top) < rect.height/2;
    row.classList.toggle('drag-over-top', before);
    row.classList.toggle('drag-over-bottom', !before);
  });
  row.addEventListener('dragleave', ()=>{ row.classList.remove('drag-over-top','drag-over-bottom'); });
  row.addEventListener('drop', e=>{
    e.preventDefault();
    row.classList.remove('drag-over-top','drag-over-bottom');
    const draggedId = e.dataTransfer.getData('text/plain');
    if(!draggedId || draggedId===g.id) return;
    const dragged = state.guests.find(x=>x.id===draggedId);
    if(!dragged || dragged.side!==side) return;
    const rect = row.getBoundingClientRect();
    const before = (e.clientY - rect.top) < rect.height/2;
    reorderGuests(side, draggedId, g.id, before);
  });

  return row;
}

function reorderGuests(side, draggedId, targetId, before){
  const list = guestsFor(side).slice();
  const fromIdx = list.findIndex(x=>x.id===draggedId);
  if(fromIdx<0) return;
  const [item] = list.splice(fromIdx,1);
  let toIdx = list.findIndex(x=>x.id===targetId);
  if(toIdx<0) toIdx = list.length;
  list.splice(before? toIdx : toIdx+1, 0, item);
  list.forEach((g,i)=>{
    const newOrder = i+1;
    if(g.order !== newOrder){
      g.order = newOrder;
      if(dbReady) db.collection('guests').doc(g.id).update({order:newOrder});
    }
  });
  renderGuestApp();
}

function updateGuest(g, data){
  Object.assign(g, data);
  if(dbReady) db.collection('guests').doc(g.id).update(data);
  else renderGuestApp();
}

function addGuest(side){
  const input = document.getElementById(side==='mine'?'addNameMine':'addNamePartner');
  const name = input.value.trim();
  if(!name) return;
  const existing = guestsFor(side);
  const maxOrder = existing.reduce((m,g)=>Math.max(m,g.order||0),0);
  const data = {name, side, likelihood:'likely', rsvp:'pending', plusOnes:0, plusOnesTBD:false, plusLikelihood:'likely', plusRsvp:'pending', plusOneNotes:'', dietary:'', table:'', notes:'', email:'', order:maxOrder+1};
  if(dbReady) db.collection('guests').add(data);
  input.value='';
}
document.querySelectorAll('.add-row button[data-side]').forEach(btn=>{
  btn.addEventListener('click', ()=> addGuest(btn.dataset.side));
});
document.getElementById('addNameMine').addEventListener('keydown', e=>{ if(e.key==='Enter') addGuest('mine'); });
document.getElementById('addNamePartner').addEventListener('keydown', e=>{ if(e.key==='Enter') addGuest('partner'); });

/* ---- paste-to-import ---- */
const ORPHAN_PLUS_RE = /^\(?\+\s*([0-9]+|[xX])\)?$/;
function stripBullet(line){
  return line.replace(/^[-*•]\s+/, '').replace(/^\[[ xX]\]\s*/, '').replace(/^\d+[.)]\s*/, '').trim();
}
function parseGuestLine(line){
  let text = stripBullet(line);
  let plusOnes = 0, plusOnesTBD = false;
  const m = text.match(/\(?\+\s*([0-9]+|[xX])\)?\s*$/);
  if(m){
    text = text.slice(0, m.index).trim().replace(/[-,]\s*$/,'').trim();
    if(/[xX]/.test(m[1])) plusOnesTBD = true;
    else plusOnes = parseInt(m[1],10);
  }
  return {name:text, plusOnes, plusOnesTBD};
}
/** A "+1"/"+X" written on its OWN line (common when pasting from Notes)
 *  describes the person on the line above, not a new guest. */
function parseGuestList(rawText){
  const entries = [];
  rawText.split('\n').map(l=>l.trim()).filter(Boolean).forEach(rawLine=>{
    const cleaned = stripBullet(rawLine);
    const orphan = cleaned.match(ORPHAN_PLUS_RE);
    if(orphan && entries.length){
      const prev = entries[entries.length-1];
      if(/[xX]/.test(orphan[1])){ prev.plusOnesTBD = true; prev.plusOnes = 0; }
      else { prev.plusOnesTBD = false; prev.plusOnes = (prev.plusOnes||0) + parseInt(orphan[1],10); }
      return;
    }
    const parsed = parseGuestLine(rawLine);
    if(parsed.name) entries.push(parsed);
  });
  return entries;
}
document.querySelectorAll('[data-paste-toggle]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const side = btn.dataset.pasteToggle;
    const panel = document.getElementById(side==='mine'?'pastePanelMine':'pastePanelPartner');
    panel.hidden = !panel.hidden;
  });
});
document.querySelectorAll('[data-paste-cancel]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const side = btn.dataset.pasteCancel;
    document.getElementById(side==='mine'?'pastePanelMine':'pastePanelPartner').hidden = true;
    document.getElementById(side==='mine'?'pasteTextMine':'pasteTextPartner').value='';
  });
});
document.querySelectorAll('[data-paste-import]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const side = btn.dataset.pasteImport;
    const textarea = document.getElementById(side==='mine'?'pasteTextMine':'pasteTextPartner');
    const entries = parseGuestList(textarea.value);
    if(!entries.length) return;
    let maxOrder = guestsFor(side).reduce((m,g)=>Math.max(m,g.order||0),0);
    entries.forEach(parsed=>{
      maxOrder += 1;
      const data = {name:parsed.name, side, likelihood:'likely', rsvp:'pending', plusOnes:parsed.plusOnes, plusOnesTBD:parsed.plusOnesTBD, plusLikelihood:'likely', plusRsvp:'pending', plusOneNotes:'', dietary:'', table:'', notes:'', email:'', order:maxOrder};
      if(dbReady) db.collection('guests').add(data);
    });
    textarea.value='';
    document.getElementById(side==='mine'?'pastePanelMine':'pastePanelPartner').hidden = true;
  });
});

document.getElementById('labelMine').addEventListener('change', e=>{
  state.labels.mineLabel = e.target.value;
  if(dbReady) db.collection('meta').doc('labels').set({mineLabel:e.target.value, partnerLabel:state.labels.partnerLabel});
});
document.getElementById('labelPartner').addEventListener('change', e=>{
  state.labels.partnerLabel = e.target.value;
  if(dbReady) db.collection('meta').doc('labels').set({mineLabel:state.labels.mineLabel, partnerLabel:e.target.value});
});

/* ---- export guest emails for pasting into an e-vite service ---- */
function csvField(v){ v = String(v==null?'':v); return /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v; }
document.getElementById('exportEmailsBtn').addEventListener('click', ()=>{
  const withEmail = state.guests.filter(g=> (g.email||'').trim());
  if(!withEmail.length){ alert("No guests have an email on file yet. Open a guest's row and add one, then try again."); return; }
  const rows = [['Name','Email','Side','RSVP']];
  withEmail.forEach(g=> rows.push([g.name, g.email.trim(), g.side==='mine'? (state.labels.mineLabel||'Mine') : (state.labels.partnerLabel||"Partner's"), g.rsvp]));
  const csv = rows.map(r=> r.map(csvField).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'guest-emails.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
