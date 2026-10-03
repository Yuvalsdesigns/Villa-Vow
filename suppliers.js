"use strict";

/* ---------------- SUPPLIERS (photographers, caterers, florists, etc.) ----------------
   Deliberately kept separate from the Venues/Venue Replies code in app-2.js: new
   Firestore collections (suppliers, supplierContacts), new state keys, new modals,
   nothing existing touched. Mirrors that pair's core features (add/edit/delete with
   a photo, a details form, a contacted/shortlist log) without the venue-only extras
   that don't apply here (map pin, region/capacity filters, PDF/link auto-fill). */

const SUPPLIER_CATEGORIES = ['Photographer', 'Videographer', 'Caterer', 'Florist', 'Music & DJ', 'Hair & Makeup', 'Officiant', 'Planner / Coordinator', 'Other'];

const SUPPLIER_EXTRA_FIELDS = [
  ['contactName', 'Contact person', 'e.g. Maria (owner / lead photographer)'],
  ['availability', 'Availability for your date', 'e.g. Confirmed available, needs a deposit to hold'],
  ['whatsIncluded', "What's included", 'e.g. 8 hours coverage, 2 shooters, online gallery'],
  ['depositPolicy', 'Deposit / cancellation policy', 'e.g. 30% deposit, refundable until 60 days out'],
];

const SUPPLIER_CONTACT_FIELDS = [
  ['priceQuote', 'Price / quote received', 'e.g. €2,500 for 8 hours, 2 photographers'],
  ['availability', 'Availability for your date', 'e.g. Confirmed available'],
  ['whatsIncluded', "What's included", 'e.g. Engagement shoot, online gallery, 2 albums'],
  ['depositPolicy', 'Deposit / cancellation policy', 'e.g. 25% deposit, refundable until 30 days out'],
];

function resizeDataUrlForSupplierPhoto(dataUrl, onDone){
  const img = new Image();
  img.onload = ()=>{
    const max = 900, scale = Math.min(1, max/Math.max(img.width,img.height));
    const canvas = document.createElement('canvas'); canvas.width=Math.round(img.width*scale); canvas.height=Math.round(img.height*scale);
    canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
    let q=.8, url=canvas.toDataURL('image/jpeg',q);
    while(url.length>350000 && q>.4){ q-=.1; url=canvas.toDataURL('image/jpeg',q); }
    onDone(url);
  };
  img.onerror = ()=> onDone(dataUrl);
  img.src = dataUrl;
}

/* A vendor's Instagram is often all they give out, no separate photo/caterer
   website at all, so this is its own field rather than folded into Website.
   Typing a bare handle (with or without the @) is turned into a real link at
   render time, a full URL (already pasted from the share sheet, say) is left
   exactly as given. */
function normalizeInstagramLink(value){
  const v = (value||'').trim();
  if(!v) return '';
  if(/^https?:\/\//i.test(v)) return v;
  return 'https://instagram.com/'+v.replace(/^@/,'');
}

/* ---------------- SUPPLIERS TAB ---------------- */
let editingSupplierId = null;
function renderSupplierCategoryOptions(selectId, includeAll){
  const sel = document.getElementById(selectId);
  if(!sel || sel.dataset.filled) return;
  sel.dataset.filled = '1';
  sel.innerHTML = (includeAll ? '<option value="">All categories</option>' : '<option value="">Choose a category…</option>')
    + SUPPLIER_CATEGORIES.map(c=>'<option value="'+esc(c)+'">'+esc(c)+'</option>').join('');
}
renderSupplierCategoryOptions('supplierCategoryFilter', true);

function ensureSupplierModal(){
  let m = document.getElementById('supplierModal');
  if(m) return m;
  m = document.createElement('div'); m.id='supplierModal'; m.className='modal-backdrop';
  m.innerHTML = '<div class="modal">'
    + '<button class="close-x" id="supModalClose">'+svg(ICON.x)+'</button>'
    + '<h3 id="supModalTitle">Add a supplier</h3>'
    + '<label class="field">Name / business<input type="text" id="supName" placeholder="e.g. Studio Luce Photography"></label>'
    + '<label class="field">Category<select id="supCategory"></select></label>'
    + '<label class="field">Price (optional)<input type="text" id="supPrice" placeholder="e.g. €2,500 or TBD: inquire"></label>'
    + '<label class="field">Website (optional)<input type="url" id="supWebsite" placeholder="https://…"></label>'
    + '<label class="field">Instagram (optional)<input type="text" id="supInstagram" placeholder="@theirhandle or https://instagram.com/…"></label>'
    + '<label class="field">Photo URL<input type="url" id="supImage" placeholder="Paste a direct picture link, or fetch/upload one below"></label>'
    + '<div class="drop-zone" id="supDropZone">Click to choose a photo, or drag one here</div>'
    + '<input type="file" id="supFileInput" accept="image/*" style="display:none;">'
    + '<button class="btn small ghost" id="supFetchWebsite" type="button" style="align-self:flex-start;">Fetch photo from website</button>'
    + '<div class="field">'
      + '<label>Fetch a photo from Instagram (paste a link to one specific photo or reel, not your profile page)</label>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;">'
        + '<input type="url" id="supInstagramPhotoLink" placeholder="https://instagram.com/p/…" style="flex:1;min-width:220px;">'
        + '<button class="btn small ghost" id="supFetchInstagram" type="button">Fetch from this link</button>'
      + '</div>'
    + '</div>'
    + '<div id="supPreviewWrap" style="display:none;"><img id="supPreview" style="width:100%;border-radius:8px;max-height:180px;object-fit:cover;"></div>'
    + SUPPLIER_EXTRA_FIELDS.map(([key,label,placeholder])=> '<label class="field">'+esc(label)+'<input type="text" id="sup_'+key+'" placeholder="'+esc(placeholder)+'"></label>').join('')
    + '<label class="field">Notes (optional)<textarea id="supNotes" rows="2" placeholder="Anything else worth remembering"></textarea></label>'
    + '<p class="warn" id="supWarn" style="display:none;"></p>'
    + '<div class="modal-foot"><button class="btn danger-outline" id="supDelete" style="display:none;margin-right:auto;">Delete</button><button class="btn" id="supCancel">Cancel</button><button class="btn primary" id="supSave">Save</button></div>'
    + '</div>';
  document.body.appendChild(m);
  renderSupplierCategoryOptions('supCategory', false);
  const close = ()=> m.classList.remove('open');
  m.querySelector('#supModalClose').addEventListener('click', close);
  m.querySelector('#supCancel').addEventListener('click', close);
  m.querySelector('#supImage').addEventListener('input', updateSupplierPreview);
  const drop = m.querySelector('#supDropZone'), file = m.querySelector('#supFileInput');
  drop.addEventListener('click', ()=> file.click());
  file.addEventListener('change', ()=>{ if(file.files[0]) readSupplierPhoto(file.files[0]); });
  ['dragover','dragleave','drop'].forEach(evt=>{
    drop.addEventListener(evt, e=>{
      e.preventDefault();
      drop.classList.toggle('drag', evt==='dragover');
      if(evt==='drop' && e.dataTransfer.files[0]) readSupplierPhoto(e.dataTransfer.files[0]);
    });
  });
  m.querySelector('#supFetchWebsite').addEventListener('click', fetchSupplierPhotoFromWebsite);
  m.querySelector('#supFetchInstagram').addEventListener('click', fetchSupplierPhotoFromInstagram);
  m.querySelector('#supSave').addEventListener('click', saveSupplier);
  m.querySelector('#supDelete').addEventListener('click', ()=>{
    if(!editingSupplierId) return;
    const id = editingSupplierId;
    const s = state.suppliers.find(x=>x.id===id);
    confirmAction('Delete "'+(s ? s.name : 'this supplier')+'"? This can\'t be undone.', ()=>{
      if(dbReady) db.collection('suppliers').doc(id).delete().catch(err=> console.error(err));
      else { state.suppliers = state.suppliers.filter(x=>x.id!==id); renderSuppliers(); }
      close();
    });
  });
  return m;
}
function updateSupplierPreview(){
  const m = document.getElementById('supplierModal');
  const url = m.querySelector('#supImage').value.trim();
  const wrap = m.querySelector('#supPreviewWrap');
  if(url){ m.querySelector('#supPreview').src = url; wrap.style.display='block'; }
  else wrap.style.display='none';
}
function readSupplierPhoto(file){
  const m = document.getElementById('supplierModal');
  const warn = m.querySelector('#supWarn'); warn.style.display='none';
  if(!file || !/^image\//.test(file.type)){ warn.textContent='Please choose an image.'; warn.style.display='block'; return; }
  const reader = new FileReader();
  reader.onload = e=>{
    resizeDataUrlForSupplierPhoto(e.target.result, url=>{
      m.querySelector('#supImage').value = url;
      updateSupplierPreview();
    });
  };
  reader.readAsDataURL(file);
}
/* Same og:image lookup the Venues modal already uses (fetchLinkPreviewThumbnail,
   via the shared Worker), just pointed at whichever of the supplier's two
   link fields the couple picks a button for, instead of only ever reading
   one "website" field. */
function fetchSupplierPhotoFromUrl(url, btn, idleLabel){
  const m = document.getElementById('supplierModal');
  const warn = m.querySelector('#supWarn'); warn.style.display='none';
  btn.disabled = true; btn.textContent='Fetching…';
  fetchLinkPreviewThumbnail(url,
    (thumbUrl)=>{
      btn.disabled = false; btn.textContent=idleLabel;
      if(/^data:/.test(thumbUrl)){
        resizeDataUrlForSupplierPhoto(thumbUrl, resizedUrl=>{
          m.querySelector('#supImage').value = resizedUrl;
          updateSupplierPreview();
        });
      } else {
        m.querySelector('#supImage').value = thumbUrl;
        updateSupplierPreview();
      }
    },
    (err)=>{
      btn.disabled = false; btn.textContent=idleLabel;
      warn.textContent = err+' You can still paste a direct picture link into the Photo URL field, or upload one instead.';
      warn.style.display='block';
    }
  );
}
function fetchSupplierPhotoFromWebsite(){
  const m = document.getElementById('supplierModal');
  const website = m.querySelector('#supWebsite').value.trim();
  const warn = m.querySelector('#supWarn'); warn.style.display='none';
  if(!website){ warn.textContent='Paste their website above first.'; warn.style.display='block'; return; }
  fetchSupplierPhotoFromUrl(website, m.querySelector('#supFetchWebsite'), 'Fetch photo from website');
}
function fetchSupplierPhotoFromInstagram(){
  const m = document.getElementById('supplierModal');
  const link = m.querySelector('#supInstagramPhotoLink').value.trim();
  const warn = m.querySelector('#supWarn'); warn.style.display='none';
  if(!link){ warn.textContent='Paste a link to a specific Instagram photo or reel above first.'; warn.style.display='block'; return; }
  fetchSupplierPhotoFromUrl(normalizeInstagramLink(link), m.querySelector('#supFetchInstagram'), 'Fetch from this link');
}
function openSupplierModal(existing){
  editingSupplierId = existing ? existing.id : null;
  const m = ensureSupplierModal();
  m.querySelector('#supModalTitle').textContent = existing ? 'Edit supplier' : 'Add a supplier';
  m.querySelector('#supName').value = existing ? (existing.name||'') : '';
  m.querySelector('#supCategory').value = existing ? (existing.category||'') : '';
  m.querySelector('#supPrice').value = existing ? (existing.price||'') : '';
  m.querySelector('#supWebsite').value = existing ? (existing.website||'') : '';
  m.querySelector('#supInstagram').value = existing ? (existing.instagram||'') : '';
  m.querySelector('#supInstagramPhotoLink').value = existing ? (existing.instagramPhotoLink||'') : '';
  m.querySelector('#supImage').value = existing ? (existing.image||'') : '';
  SUPPLIER_EXTRA_FIELDS.forEach(([key])=>{ m.querySelector('#sup_'+key).value = existing ? (existing[key]||'') : ''; });
  m.querySelector('#supNotes').value = existing ? (existing.notes||'') : '';
  m.querySelector('#supFileInput').value='';
  updateSupplierPreview();
  m.querySelector('#supWarn').style.display='none';
  m.querySelector('#supDelete').style.display = existing ? 'inline-flex' : 'none';
  m.classList.add('open');
}
function saveSupplier(){
  const m = document.getElementById('supplierModal');
  const warn = m.querySelector('#supWarn');
  const name = m.querySelector('#supName').value.trim();
  if(!name){ warn.textContent='Give the supplier a name.'; warn.style.display='block'; return; }
  const data = {
    name,
    category: m.querySelector('#supCategory').value,
    price: m.querySelector('#supPrice').value.trim(),
    website: m.querySelector('#supWebsite').value.trim(),
    instagram: m.querySelector('#supInstagram').value.trim(),
    instagramPhotoLink: m.querySelector('#supInstagramPhotoLink').value.trim(),
    image: m.querySelector('#supImage').value.trim(),
    notes: m.querySelector('#supNotes').value.trim(),
  };
  SUPPLIER_EXTRA_FIELDS.forEach(([key])=>{ data[key] = m.querySelector('#sup_'+key).value.trim(); });
  if(editingSupplierId){
    const id = editingSupplierId;
    if(dbReady) db.collection('suppliers').doc(id).update(data).catch(err=>{ console.error(err); warn.textContent='Could not save changes.'; warn.style.display='block'; });
    else { const existing = state.suppliers.find(s=>s.id===id); if(existing) Object.assign(existing, data); renderSuppliers(); }
  } else {
    data.favorited = false; data.contacted = false; data.createdAt = Date.now();
    if(dbReady) db.collection('suppliers').add(data).catch(err=>{ console.error(err); warn.textContent='Could not save this supplier.'; warn.style.display='block'; });
    else { localAdd(state.suppliers, data); renderSuppliers(); }
  }
  m.classList.remove('open');
}
document.getElementById('addSupplierBtn')?.addEventListener('click', ()=> openSupplierModal(null));

function updateSupplierFields(s, data){
  Object.assign(s, data);
  if(dbReady) db.collection('suppliers').doc(s.id).update(data);
  else renderSuppliers();
}

function renderSuppliers(){
  const grid = document.getElementById('supplierGrid'); if(!grid) return;
  const q = (document.getElementById('supplierSearch')?.value||'').trim().toLowerCase();
  const category = document.getElementById('supplierCategoryFilter')?.value||'';
  const contactedFilter = document.getElementById('supplierContactedFilter')?.value||'';
  const shortlistedFilter = document.getElementById('supplierShortlistedFilter')?.value||'';
  grid.innerHTML = '';
  const filtered = (state.suppliers||[]).filter(s=>{
    const hay = [s.name, s.category, s.notes].join(' ').toLowerCase();
    return (!q || hay.includes(q))
      && (!category || s.category===category)
      && (!contactedFilter || (contactedFilter==='contacted' ? s.contacted : !s.contacted))
      && (!shortlistedFilter || (shortlistedFilter==='shortlisted' ? s.favorited : !s.favorited));
  });
  if(!filtered.length){
    grid.innerHTML = '<div class="empty-board" style="grid-column:1/-1;">'+(state.suppliers.length ? 'No matches yet. Try a broader search.' : 'No suppliers yet. Click "+ Add a supplier" once you start reaching out to someone.')+'</div>';
    return;
  }
  filtered.forEach(s=>{
    const linkedReply = (state.supplierContacts||[]).find(c=>c.supplierId===s.id);
    const card = document.createElement('div'); card.className='venue-card'; card.dataset.supplierId = s.id;
    card.innerHTML = '<div class="venue-hero has-image supplier-hero-fix">'
      + (s.image ? '<img class="venue-hero-img" src="'+esc(s.image)+'" alt="'+esc(s.name)+'" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'image-failed\')">' : '')
      + (s.category ? '<span class="price">'+esc(s.category)+'</span>' : '')
      + (s.price ? '<span class="price" style="margin-left:6px;background:rgba(0,0,0,.4)">'+esc(s.price)+'</span>' : '')
      + '<button class="icon-btn edit-supplier" title="Edit this supplier" style="position:absolute;top:8px;right:38px;">'+svg(ICON.pencil)+'</button>'
      + '<button class="icon-btn del-supplier" title="Delete this supplier" style="position:absolute;top:8px;right:8px;">'+svg(ICON.trash)+'</button>'
      + '</div>'
      + '<div class="venue-body">'
      + '<div><h3>'+esc(s.name)+'</h3></div>'
      + (linkedReply && linkedReply.decision ? '<span class="decision-badge '+linkedReply.decision+'">'+(linkedReply.decision==='explore'?'Explore more':'Not a fit')+'</span>' : '')
      + (s.website || s.instagram ? '<div style="display:flex;gap:10px;flex-wrap:wrap;">'
          + (s.website ? '<a class="src-link" target="_blank" rel="noopener" href="'+esc(s.website)+'">Website ↗</a>' : '')
          + (s.instagram ? '<a class="src-link" target="_blank" rel="noopener" href="'+esc(normalizeInstagramLink(s.instagram))+'">Instagram ↗</a>' : '')
        + '</div>' : '')
      + (()=>{
          const bullets = SUPPLIER_EXTRA_FIELDS.filter(([key])=> (s[key]||'').trim()).map(([key,label])=> '<li><b>'+esc(label)+':</b> '+esc(s[key])+'</li>').join('');
          return bullets ? '<ul class="venue-contact-bullets">'+bullets+'</ul>' : '';
        })()
      + (s.notes ? '<p class="venue-contact-notes"><b>Notes:</b> '+esc(s.notes)+'</p>' : '')
      + '<div class="venue-foot"><button class="heart'+(s.favorited?' on':'')+'">'+svg(ICON.heart)+'</button><span style="font-size:11.5px;color:var(--ink-faint)">'+(s.favorited?'Shortlisted':'Tap to shortlist')+'</span>'
      + '<button class="btn small ghost contacted-toggle'+(s.contacted?' active':'')+'">'+svg(ICON.check2)+'<span>'+(s.contacted?'Contacted':'Mark contacted')+'</span></button>'
      + (linkedReply ? '<button class="btn small link-btn reply-link">View reply →</button>' : '<button class="btn small ghost log-reply-link">+ Log a reply</button>')
      + '</div>'
      + '</div>';
    card.querySelector('.heart').addEventListener('click', ()=> updateSupplierFields(s, {favorited: !s.favorited}));
    card.querySelector('.contacted-toggle').addEventListener('click', ()=> updateSupplierFields(s, {contacted: !s.contacted}));
    const replyBtn = card.querySelector('.reply-link');
    if(replyBtn) replyBtn.addEventListener('click', ()=> jumpToSupplierReply(linkedReply.id));
    const logReplyBtn = card.querySelector('.log-reply-link');
    if(logReplyBtn) logReplyBtn.addEventListener('click', ()=> openSupplierContactModal(null, s));
    card.querySelector('.edit-supplier').addEventListener('click', ()=> openSupplierModal(s));
    card.querySelector('.del-supplier').addEventListener('click', ()=>{
      confirmAction('Delete "'+s.name+'" from your suppliers list?', ()=>{
        if(dbReady) db.collection('suppliers').doc(s.id).delete().catch(err=> console.error(err));
        else { state.suppliers = state.suppliers.filter(x=>x.id!==s.id); renderSuppliers(); }
      });
    });
    grid.appendChild(card);
  });
}
['supplierSearch','supplierCategoryFilter','supplierContactedFilter','supplierShortlistedFilter'].forEach(id=>document.getElementById(id)?.addEventListener('input', renderSuppliers));

/* ---------------- SUPPLIERS YOU'VE CONTACTED ---------------- */
let editingSupplierContactId = null, pendingSupplierContactThumb = '', pendingSupplierContactSupplierId = '';
function ensureSupplierContactModal(){
  let m = document.getElementById('supplierContactModal');
  if(m) return m;
  m = document.createElement('div'); m.id='supplierContactModal'; m.className='modal-backdrop';
  m.innerHTML = '<div class="modal">'
    + '<button class="close-x" id="scModalClose">'+svg(ICON.x)+'</button>'
    + '<h3 id="scModalTitle">Add a supplier reply</h3>'
    + '<label class="field">Supplier name<input type="text" id="scName" placeholder="e.g. Studio Luce Photography"></label>'
    + '<label class="field">Our decision<select id="scDecision">'
      + '<option value="">No decision yet</option>'
      + '<option value="explore">Explore more</option>'
      + '<option value="not-fit">Not a fit</option>'
    + '</select></label>'
    + '<div class="drop-zone" id="scDropZone">Click to choose a photo, or drag one here</div>'
    + '<input type="file" id="scFileInput" accept="image/*" style="display:none;">'
    + '<div id="scPreviewWrap" style="display:none;"><img id="scPreview" style="width:100%;border-radius:8px;max-height:180px;object-fit:cover;"></div>'
    + SUPPLIER_CONTACT_FIELDS.map(([key,label,placeholder])=> '<label class="field">'+esc(label)+'<input type="text" id="sc_'+key+'" placeholder="'+esc(placeholder)+'"></label>').join('')
    + '<label class="field">Their full reply (paste it here for reference)<textarea id="scRawReply" rows="5" placeholder="Paste their email reply…"></textarea></label>'
    + '<label class="field">Your notes<textarea id="scNotes" rows="2" placeholder="Your own thoughts on this one"></textarea></label>'
    + '<p class="warn" id="scWarn" style="display:none;"></p>'
    + '<div class="modal-foot"><button class="btn danger-outline" id="scDelete" style="display:none;margin-right:auto;">Delete</button><button class="btn" id="scCancel">Cancel</button><button class="btn primary" id="scSave">Save</button></div>'
    + '</div>';
  document.body.appendChild(m);
  const close = ()=> m.classList.remove('open');
  m.querySelector('#scModalClose').addEventListener('click', close);
  m.querySelector('#scCancel').addEventListener('click', close);
  const drop = m.querySelector('#scDropZone'), file = m.querySelector('#scFileInput');
  drop.addEventListener('click', ()=> file.click());
  file.addEventListener('change', ()=>{ if(file.files[0]) readSupplierContactThumb(file.files[0]); });
  ['dragover','dragleave','drop'].forEach(evt=>{
    drop.addEventListener(evt, e=>{
      e.preventDefault();
      drop.classList.toggle('drag', evt==='dragover');
      if(evt==='drop' && e.dataTransfer.files[0]) readSupplierContactThumb(e.dataTransfer.files[0]);
    });
  });
  m.querySelector('#scSave').addEventListener('click', saveSupplierContact);
  m.querySelector('#scDelete').addEventListener('click', ()=>{
    if(!editingSupplierContactId) return;
    const id = editingSupplierContactId;
    confirmAction('Delete this supplier reply? This can\'t be undone.', ()=>{
      if(dbReady) db.collection('supplierContacts').doc(id).delete().catch(err=> console.error(err));
      else { state.supplierContacts = state.supplierContacts.filter(x=>x.id!==id); renderSupplierContacts(); renderSuppliers(); }
      close();
    });
  });
  return m;
}
function readSupplierContactThumb(file){
  const m = document.getElementById('supplierContactModal');
  const warn = m.querySelector('#scWarn'); warn.style.display='none';
  if(!file || !/^image\//.test(file.type)){ warn.textContent='Please choose an image.'; warn.style.display='block'; return; }
  const reader = new FileReader();
  reader.onload = e=>{
    resizeDataUrlForSupplierPhoto(e.target.result, url=>{
      pendingSupplierContactThumb = url;
      m.querySelector('#scPreview').src = url;
      m.querySelector('#scPreviewWrap').style.display='block';
    });
  };
  reader.readAsDataURL(file);
}
function openSupplierContactModal(existing, prefillSupplier){
  editingSupplierContactId = existing ? existing.id : null;
  pendingSupplierContactThumb = existing ? (existing.thumbnail||'') : '';
  pendingSupplierContactSupplierId = existing ? (existing.supplierId||'') : (prefillSupplier ? prefillSupplier.id : '');
  const m = ensureSupplierContactModal();
  m.querySelector('#scModalTitle').textContent = existing ? 'Edit supplier reply' : 'Add a supplier reply';
  m.querySelector('#scName').value = existing ? (existing.name||'') : (prefillSupplier ? prefillSupplier.name : '');
  m.querySelector('#scDecision').value = existing ? (existing.decision||'') : '';
  SUPPLIER_CONTACT_FIELDS.forEach(([key])=>{ m.querySelector('#sc_'+key).value = existing ? (existing[key]||'') : ''; });
  m.querySelector('#scRawReply').value = existing ? (existing.rawReply||'') : '';
  m.querySelector('#scNotes').value = existing ? (existing.notes||'') : '';
  const previewWrap = m.querySelector('#scPreviewWrap');
  if(pendingSupplierContactThumb){ m.querySelector('#scPreview').src = pendingSupplierContactThumb; previewWrap.style.display='block'; }
  else previewWrap.style.display='none';
  m.querySelector('#scFileInput').value='';
  m.querySelector('#scWarn').style.display='none';
  m.querySelector('#scDelete').style.display = existing ? 'inline-flex' : 'none';
  m.classList.add('open');
}
function saveSupplierContact(){
  const m = document.getElementById('supplierContactModal');
  const warn = m.querySelector('#scWarn');
  const name = m.querySelector('#scName').value.trim();
  if(!name){ warn.textContent='Give the supplier a name.'; warn.style.display='block'; return; }
  const data = {name, thumbnail: pendingSupplierContactThumb, supplierId: pendingSupplierContactSupplierId, decision: m.querySelector('#scDecision').value, rawReply: m.querySelector('#scRawReply').value.trim(), notes: m.querySelector('#scNotes').value.trim()};
  SUPPLIER_CONTACT_FIELDS.forEach(([key])=>{ data[key] = m.querySelector('#sc_'+key).value.trim(); });
  if(editingSupplierContactId){
    const id = editingSupplierContactId;
    if(dbReady) db.collection('supplierContacts').doc(id).update(data).catch(err=>{ console.error(err); warn.textContent='Could not save changes.'; warn.style.display='block'; });
    else { const existing = state.supplierContacts.find(c=>c.id===id); if(existing) Object.assign(existing, data); renderSupplierContacts(); renderSuppliers(); }
    m.classList.remove('open');
    jumpToSupplierReply(id);
  } else {
    data.createdAt = Date.now();
    if(dbReady){
      db.collection('supplierContacts').add(data).then(ref=> jumpToSupplierReply(ref.id)).catch(err=>{ console.error(err); warn.textContent='Could not save this reply.'; warn.style.display='block'; });
    } else {
      const saved = localAdd(state.supplierContacts, data);
      renderSupplierContacts();
      renderSuppliers();
      jumpToSupplierReply(saved.id);
    }
    m.classList.remove('open');
  }
}
document.getElementById('addSupplierContactBtn')?.addEventListener('click', ()=> openSupplierContactModal(null));
function renderSupplierContacts(){
  const wrap = document.getElementById('supplierContactsGrid'); if(!wrap) return;
  wrap.innerHTML = '';
  if(!state.supplierContacts.length){ wrap.innerHTML = '<p style="color:var(--ink-faint);font-size:13px;">No replies logged yet. When a supplier answers you, click "+ Add a reply" and paste in the details.</p>'; return; }
  const decisionFilter = document.getElementById('scDecisionFilter')?.value||'';
  const filtered = state.supplierContacts.filter(c=> !decisionFilter || (c.decision||'')===(decisionFilter==='none'?'':decisionFilter));
  if(!filtered.length){ wrap.innerHTML = '<p style="color:var(--ink-faint);font-size:13px;">No replies match this filter.</p>'; return; }
  filtered.forEach(c=>{
    const decision = c.decision||'';
    const card = document.createElement('div'); card.className='card venue-contact-card decision-'+(decision||'none');
    card.dataset.contactId = c.id;
    const linkedSupplier = c.supplierId ? state.suppliers.find(x=>x.id===c.supplierId) : null;
    const bullets = SUPPLIER_CONTACT_FIELDS.filter(([key])=> (c[key]||'').trim()).map(([key,label])=> '<li><b>'+esc(label)+':</b> '+esc(c[key])+'</li>').join('');
    card.innerHTML =
      (c.thumbnail ? '<img src="'+esc(c.thumbnail)+'" class="venue-contact-thumb" alt="">' : '')
      + '<div class="venue-contact-body">'
      + '<h4>'+esc(c.name)+'</h4>'
      + '<select class="decision-select '+(decision||'none')+'">'
        + '<option value=""'+(!decision?' selected':'')+'>No decision yet</option>'
        + '<option value="explore"'+(decision==='explore'?' selected':'')+'>Explore more</option>'
        + '<option value="not-fit"'+(decision==='not-fit'?' selected':'')+'>Not a fit</option>'
      + '</select>'
      + (linkedSupplier ? '<p class="venue-contact-backlink">Linked to "'+esc(linkedSupplier.name)+'" on the Suppliers tab</p>' : '')
      + (bullets ? '<ul class="venue-contact-bullets">'+bullets+'</ul>' : '<p style="font-size:12.5px;color:var(--ink-faint);">No details filled in yet, click Edit to add some.</p>')
      + (c.notes ? '<p class="venue-contact-notes"><b>Notes:</b> '+esc(c.notes)+'</p>' : '')
      + (c.rawReply ? '<details class="venue-contact-raw"><summary>Show their full reply</summary><p>'+esc(c.rawReply)+'</p></details>' : '')
      + '<div class="diy-actions">'
      + '<button class="btn small ghost edit-sc">Edit</button>'
      + '<button class="btn small danger-outline del-sc">Delete</button>'
      + '</div></div>';
    card.querySelector('.decision-select').addEventListener('change', e=>{
      const val = e.target.value;
      e.target.className = 'decision-select '+(val||'none');
      card.className = 'card venue-contact-card decision-'+(val||'none');
      if(dbReady) db.collection('supplierContacts').doc(c.id).update({decision: val}).catch(err=> console.error(err));
      else { c.decision = val; renderSuppliers(); }
    });
    card.querySelector('.edit-sc').addEventListener('click', ()=> openSupplierContactModal(c));
    card.querySelector('.del-sc').addEventListener('click', ()=>{
      confirmAction('Delete this supplier reply? This can\'t be undone.', ()=>{
        if(dbReady) db.collection('supplierContacts').doc(c.id).delete().catch(err=> console.error(err));
        else { state.supplierContacts = state.supplierContacts.filter(x=>x.id!==c.id); renderSupplierContacts(); renderSuppliers(); }
      });
    });
    wrap.appendChild(card);
  });
}
renderSupplierContacts();
document.getElementById('scDecisionFilter')?.addEventListener('input', renderSupplierContacts);
function jumpToSupplierReply(contactId){
  showTab('supplierreplies');
  const filterEl = document.getElementById('scDecisionFilter');
  if(filterEl && filterEl.value){ filterEl.value=''; renderSupplierContacts(); }
  setTimeout(()=>{
    const card = document.querySelector('.venue-contact-card[data-contact-id="'+contactId+'"]');
    if(!card) return;
    card.scrollIntoView({behavior:'smooth', block:'center'});
    card.classList.add('highlight');
    setTimeout(()=> card.classList.remove('highlight'), 2200);
  }, 260);
}

renderSuppliers();
