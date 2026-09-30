"use strict";
/* ---------------- EMAIL TEMPLATES ---------------- */
const EMAIL_TEMPLATES = [
  {title:'Venue inquiry (villa / masseria)', to:'The venue coordinator', subject:'Wedding inquiry: [proposed date], approx. [guest count] guests',
   body:`Dear [Venue name] team,

My partner and I are currently planning our destination wedding for [proposed date] for approximately [guest count] guests, and your property is at the top of our shortlist. We would love to learn more about the possibility of hosting our celebration at [Venue name].

We have a few specific questions regarding your venue and hosting capabilities:

**Availability:** Is the property available for a 2-day event around [proposed date]? We would specifically prefer [first choice dates] or [second choice dates]. We would like to host a casual dinner for the first night, and have the wedding the next day.

**Capacity:** What is the maximum guest capacity you can host for the ceremony and dinner?

**Ceremony & Weather Contingency:** Do you have an outdoor space suitable for a wedding ceremony under a chuppah (an open canopy structure)? Could you also confirm if an indoor backup space is included for the ceremony and the party in case of bad weather?

**Accommodations:** Could you clarify if there are on-site rooms which can sleep all our guests for the [number] nights at the dates indicated above? Otherwise, are there recommended hotels or accommodations nearby?

**Catering:** To respect our religious requirements, we will need to bring in a certified external kosher caterer for the wedding dinner. Do you allow external caterers, and what are your guidelines regarding kitchen access or setup space for outside catering teams?

**Partying & Music Policy:** Could you please share your policies regarding music, noise restrictions, and end times for parties?

**Day-After Amenities:** Is there a pool, and are all outdoor spaces available for guests to relax the day after the wedding and during the whole stay?

Could you please share your availability for [proposed date], your wedding brochure, and your pricing packages for exclusive buyouts?

We look forward to hearing from you.

Warm regards,
Yuval and Yohan`},
  {title:'Kosher caterer inquiry', to:'The catering company', subject:'Kosher catering inquiry: destination wedding, [region], [proposed date]',
   body:`Hello [Caterer name],

We're planning a kosher wedding at [venue name] in [region] on [proposed date], for approximately [guest count] guests. Could you let us know:

- Whether you travel to and cater events in [region], and your availability for that date
- Your certification and which rabbinical authority supervises it
- Whether you bring your own mobile kitchen or require specific facilities on-site (we're happy to connect you directly with the venue)
- Menu style options (plated, buffet, family-style) and approximate pricing per person
- The lead time you need to confirm a booking. We understand this can be as much as 12–18 months for kosher catering in Europe
- Whether you're also able to cater a welcome dinner the night before

Happy to jump on a call whenever suits you. Thank you so much!

Best,
[Your names]`},
  {title:'Rabbi / officiant inquiry', to:'Your rabbi or officiant', subject:'Officiant inquiry: destination wedding, [region], [proposed date]',
   body:`Dear Rabbi [name],

We're getting married on [proposed date] at [venue name] in [region], and would be honored if you'd consider officiating. A few questions:

- Are you available to travel for that date, and is there anything specific you'd need from the venue beforehand (a private room, a particular ceremony layout)?
- Are you comfortable performing the ceremony with kosher catering provided by an outside company, and is there anything you'd want to confirm with them directly (kashrut standard, mashgiach)?
- Do you have requirements around witnesses, and could you help us think through the ketubah?
- What are your fees, including travel and accommodation for the wedding weekend?

Thank you so much for considering it. We'd love to talk further.

Warmly,
[Your names]`},
  {title:'Florist inquiry', to:'The florist', subject:'Florist inquiry: wedding on [proposed date], [venue / region]',
   body:`Hello [florist name],

We're getting married at [venue name] on [proposed date] and love your style. Could you share:

- Your availability for that date, and whether you travel to [region] or are local to the venue
- Whether you can build a floral chuppah, or work with a rented chuppah frame
- Approximate pricing for bouquets, a chuppah installation, and reception centerpieces for [guest count] guests
- Whether the flowers we love (moodboard attached) are realistic for that season and region, or what you'd suggest instead

We'd love to set up a call and share our moodboard. Thank you!

Best,
[Your names]`},
  {title:'DJ / band inquiry', to:'The DJ or band', subject:'DJ/band inquiry: wedding on [proposed date], [venue / region]',
   body:`Hello,

We're getting married on [proposed date] at [venue name], with guests joining from Israel, France, and [region]. We're looking for a DJ or band who can:

- Play a mixed set, Israeli and French favorites alongside international dance music
- Cover the ceremony/cocktail hour and the evening reception, plus (if useful) a lighter set for a pool-day gathering the next day
- Bring their own sound equipment suited to an outdoor setting

Could you let us know your availability for that date, your rates, and whether you take song requests and a do-not-play list in advance? Thank you!

Best,
[Your names]`},
  {title:'Photographer / videographer inquiry', to:'The photographer/videographer', subject:'Photography & video inquiry: wedding on [proposed date], [venue / region]',
   body:`Hello [name],

We love your work and are getting married on [proposed date] at [venue name] in [region]. Could you share:

- Your availability for that date, and whether you're local or would need travel and accommodation covered
- Package options (photo only, video only, or both), and whether you offer multi-day coverage for a welcome dinner and pool-day gathering
- Turnaround time for photos and any highlight video
- Pricing and what's included

We'd love to see a full gallery from a recent wedding. Thank you!

Best,
[Your names]`},
  {title:'Hair & makeup artist inquiry', to:'The hair/makeup artist', subject:'Hair & makeup inquiry: wedding on [proposed date], [venue / region]',
   body:`Hello [name],

We're getting married on [proposed date] at [venue name], and I'd love to book you for hair and makeup. Could you tell me:

- Your availability for a trial and for the wedding day itself, and whether you travel to [region]
- Whether you're experienced working outdoors in warm or humid climates
- Pricing for the bride, and rates for additional family members or bridesmaids
- What products you use, in case of allergies

Thank you so much!

Best,
[Your name]`},
  {title:'Dájas Douro Valley: feasibility inquiry', to:'Dájas Douro Valley', subject:'Wedding inquiry: private full-property rental, [proposed date], approx. [guest count] guests', highlight:true,
   body:`Hello Dájas Douro Valley team,

My partner and I are planning our wedding for [proposed date], and Dájas caught our eye for its setting on the river. We understand you're not primarily set up as a wedding venue, so we wanted to check a few things before getting our hopes up:

1. Do you host weddings at the property, and would a full, exclusive rental of the villas be possible for our date, for around [guest count] guests staying on-site (plus any day guests)?
2. Is there an outdoor space that could hold a Jewish wedding ceremony under a chuppah (an open canopy structure), and an indoor room we could move into if the weather turns?
3. Our catering needs to be kosher, prepared by an outside kosher caterer with their own kitchen supervision (a mashgiach). Would you be able to host an external catering team, and could we discuss your kitchen setup with them in advance?
4. What's the sleeping capacity across the villas, and is a private, full-property buyout possible for two to three nights: arrival, the ceremony day, and a relaxed pool day the day after?
5. Are there any restrictions on outdoor music or amplified sound in the evening, and is the pool available for a private group day after the wedding?
6. Could you share pricing for a full-property buyout across [number] nights for approximately [guest count] guests, and your booking and deposit process?

We'd be so grateful for any photos of the spaces, or a call to walk through logistics. Thank you so much for your time!

Warmly,
[Your names]`},
  {title:'Guest favor gifting request (local producer/brand)', to:'A local winery, olive oil producer, or small brand', subject:'Wedding favor gifting request: [proposed date], [venue / region]', highlight:true,
   body:`Hello [producer/brand name],

We're getting married on [proposed date] at [venue name] in [region], with around [guest count] guests joining us from across Europe and Israel for the weekend. We love your [product, e.g. Port wine / olive oil / honey] and think it would be a beautiful way to share a taste of the region with our guests as a wedding favor.

Would you be open to providing [number] mini bottles/jars at a discounted rate, or as a gifted collaboration in exchange for us featuring your name on the favor tags and mentioning you to our guests during the weekend? We're happy to include a small card about your story with each one.

No worries at all if this isn't something you do, just wanted to ask, since your product means a lot to us for this location. Thank you for considering it!

Warmly,
[Your names]`},
  {title:'Bridesmaid gift collaboration request (small brand)', to:'A small beauty, jewelry, or robe/pajama brand', subject:'Bridal party gifting request: small wedding, [proposed date]', highlight:true,
   body:`Hi [brand name] team,

I'm getting married on [proposed date] and I'm putting together getting-ready gifts for my [number] bridesmaids. I love your [product, e.g. robes / jewelry / skincare set] and think they'd be perfect.

I know I'm not an influencer with a big following, but I'd love to feature your product on the morning of the wedding (photos with the full bridal party) and tag you afterward, if you'd be willing to gift or discount [number] pieces for the group. Happy to send more details about the day if that's helpful.

Thank you so much for considering it, and congratulations on your gorgeous products either way!

Warmly,
[Your name]`},
];
/* The starter ideas below used to be this hardcoded, read-only array -
   now just the offline fallback (see renderGiftIdeas) for when there's no
   Firestore connection at all. The real, editable source is the
   'giftIdeas' collection, seeded once from this exact same content by
   ensureGiftIdeasMigration in firebase-sync.js, so the couple can add
   their own ideas alongside these instead of being stuck with a fixed list. */
const GIFT_IDEA_GROUPS = [
  {group:'Bridesmaid gifts', tint:'blush'},
  {group:'Guest favors', tint:'coral'},
];
const GIFT_IDEA_LOCAL_SEED = [
  {group:'Bridesmaid gifts', how:'diy', title:'Monogrammed robe or pajama set', note:'Buy plain robes/pajamas and personalize with a Cricut iron-on vinyl monogram or name, no sewing machine needed.'},
  {group:'Bridesmaid gifts', how:'diy', title:'Embroidered pouch or handkerchief', note:'A simple hand-embroidered initial on a small makeup pouch or hankie, using your sewing skills.'},
  {group:'Bridesmaid gifts', how:'diy', title:'Personalized tote bag', note:'Plain canvas tote + Cricut vinyl name or a small floral design in your wedding colors.'},
  {group:'Bridesmaid gifts', how:'diy', title:'"Getting ready" kit', note:'Robe + a mini bottle of something local (see the producer gifting template) + a handwritten note, tied together. Costs little beyond the robe.'},
  {group:'Bridesmaid gifts', how:'brand', title:'Skincare, jewelry, or robe brand set', note:'Use the bridesmaid gifting template to ask a small brand for a discounted or gifted set for the group.'},
  {group:'Guest favors', how:'brand', title:'Mini local wine or olive oil bottles', note:'Douro is Port wine country and Iseo sits right by Franciacorta. A local producer is a very natural, on-theme favor. Use the producer gifting template.'},
  {group:'Guest favors', how:'diy', title:'Custom favor tags or labels', note:'Cricut-cut labels or stickers for jars of jam, honey, or the mini bottles above. Ties every favor together visually for almost no cost.'},
  {group:'Guest favors', how:'budget', title:'Seed packets or mini candles', note:'Cheap, useful, no expiry pressure, easy to source in bulk.'},
  {group:'Guest favors', how:'budget', title:'Sunscreen or fan favors', note:'Genuinely useful for a hot pool-day weekend, and easy to label with a Cricut sticker.'},
];
const GIFT_HOW_LABEL = {diy:'d.i.y', brand:'Ask a brand', budget:'Budget buy'};
function updateGiftIdea(idea, data){
  Object.assign(idea, data);
  if(dbReady) db.collection('giftIdeas').doc(idea.id).update(data);
  else renderGiftIdeas();
}
function giftIdeaCard(idea, tint){
  const card = document.createElement('div'); card.className='style-card';
  const howOptions = Object.keys(GIFT_HOW_LABEL).map(k=> '<option value="'+k+'"'+(idea.how===k?' selected':'')+'>'+GIFT_HOW_LABEL[k]+'</option>').join('');
  card.innerHTML = '<select class="gift-idea-how-edit tint-'+tint+'" style="font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;padding:2px 8px;border-radius:20px;margin-bottom:6px;">'+howOptions+'</select>'
    + '<textarea class="gift-idea-title-edit" rows="1" placeholder="Idea">'+esc(idea.title)+'</textarea>'
    + '<textarea class="gift-idea-note-edit" rows="2" placeholder="Short note on how to do it">'+esc(idea.note)+'</textarea>'
    + (idea.id ? '<button class="btn small ghost del-gift-idea" type="button">Delete</button>' : '');
  const titleTa = card.querySelector('.gift-idea-title-edit');
  const noteTa = card.querySelector('.gift-idea-note-edit');
  // Not sized here: the card isn't attached to the document yet at this
  // point, so scrollHeight would read 0 and lock the box too short (the
  // browser's own textarea min-height then masks this for a short line,
  // which is why it looked fine at first, but a longer note past that
  // floor was left clipped). renderGiftIdeas() sizes every card in one
  // pass right after they're all appended, once layout is real.
  titleTa.addEventListener('input', ()=> autoGrowTextarea(titleTa));
  noteTa.addEventListener('input', ()=> autoGrowTextarea(noteTa));
  titleTa.addEventListener('change', ()=> updateGiftIdea(idea, {title: titleTa.value.trim()}));
  noteTa.addEventListener('change', ()=> updateGiftIdea(idea, {note: noteTa.value.trim()}));
  card.querySelector('.gift-idea-how-edit').addEventListener('change', e=> updateGiftIdea(idea, {how: e.target.value}));
  card.querySelector('.del-gift-idea')?.addEventListener('click', ()=>{
    confirmAction('Delete "'+(idea.title||'this idea')+'"?', ()=>{
      if(dbReady) db.collection('giftIdeas').doc(idea.id).delete();
      else { state.giftIdeas = state.giftIdeas.filter(x=>x.id!==idea.id); renderGiftIdeas(); }
    });
  });
  return card;
}
function addGiftIdeaCard(group){
  const card = document.createElement('div'); card.className='budget-add'; card.style.cssText='align-items:flex-end;margin-bottom:16px;';
  card.innerHTML = '<label class="field">Idea<input type="text" class="gift-idea-title" placeholder="e.g. Personalized tote bag"></label>'
    + '<label class="field">How<select class="gift-idea-how"><option value="diy">d.i.y</option><option value="brand">Ask a brand</option><option value="budget">Budget buy</option></select></label>'
    + '<label class="field">Note<input type="text" class="gift-idea-note" placeholder="Short note on how to do it"></label>'
    + '<button class="btn primary small" type="button">+ Add idea</button>';
  card.querySelector('button').addEventListener('click', ()=>{
    const titleInput = card.querySelector('.gift-idea-title');
    const title = titleInput.value.trim();
    const note = card.querySelector('.gift-idea-note').value.trim();
    const how = card.querySelector('.gift-idea-how').value;
    if(!title) return;
    const data = {group, how, title, note, order:Date.now()};
    if(dbReady) db.collection('giftIdeas').add(data);
    else { localAdd(state.giftIdeas, data); renderGiftIdeas(); }
    titleInput.value=''; card.querySelector('.gift-idea-note').value='';
  });
  return card;
}
function renderGiftIdeas(){
  const wrap = document.getElementById('giftIdeas'); if(!wrap) return;
  if(syncUnavailable && state.giftIdeas.length===0){
    state.giftIdeas = GIFT_IDEA_LOCAL_SEED.map((g,i)=>({id:'local-gift-'+i, ...g, order:i}));
  }
  wrap.innerHTML='';
  GIFT_IDEA_GROUPS.forEach(g=>{
    const section = document.createElement('div'); section.className='style-section';
    const head = document.createElement('div'); head.className='style-head';
    head.innerHTML = '<h3 class="tint-text-'+g.tint+'">'+g.group+'</h3>';
    section.appendChild(head);
    section.appendChild(addGiftIdeaCard(g.group));
    const grid = document.createElement('div'); grid.className='style-grid';
    state.giftIdeas.filter(idea=> idea.group===g.group).forEach(idea=> grid.appendChild(giftIdeaCard(idea, g.tint)));
    section.appendChild(grid);
    wrap.appendChild(section);
  });
  resizeAllGiftIdeaTextareas();
}
/* A textarea's scrollHeight reads 0 - not just while it's detached from the
   document, but also whenever an ancestor (here, the DIY tab itself while
   some other tab is open) is display:none - so a card built while this tab
   wasn't the active one still ends up locked too short despite the pass at
   the end of renderGiftIdeas() above. showTab() below re-runs this the
   moment the DIY tab actually becomes visible, the same fix already in
   place for the Budget table's own textareas via resizeAllBudgetNotes(). */
function resizeAllGiftIdeaTextareas(){ document.querySelectorAll('#giftIdeas .gift-idea-title-edit, #giftIdeas .gift-idea-note-edit').forEach(autoGrowTextarea); }

/* Bridesmaid gifts & guest favors moved here from Templates/Gift Ideas
   since most of it ends up being d.i.y - this section's own editable
   budget lines live in the exact same Firestore 'budget' collection as
   the main Budget page (not a separate store), just filtered down to
   gift/favor categories, so a change here shows up there and vice versa.
   Matches any of the old combined seed category ("Gifts & favors") and
   the two more specific ones this page's own "+ Add line" now offers,
   so nothing already entered disappears from view after this split. */
const GIFT_BUDGET_CATEGORIES = ['bridesmaid gifts','guest favors','gifts & favors'];
function renderGiftBudgetSection(){
  const body = document.getElementById('giftBudgetBody');
  if(!body) return;
  const lines = state.budget.filter(b=> GIFT_BUDGET_CATEGORIES.includes(String(b.category||'').trim().toLowerCase()));
  if(!lines.length){
    body.innerHTML = '<p style="color:var(--ink-faint);font-size:13px;">'
      + (typeof canEdit!=='undefined' && !canEdit ? 'Budget details are private and not shown here.' : 'No gift or favor budget lines yet, add one below.')
      + '</p>';
    return;
  }
  const breakdown = typeof budgetCategoryBreakdown==='function' ? budgetCategoryBreakdown() : null;
  body.innerHTML = '<div class="table-scroll"><table class="budget-table"><thead><tr><th>Category</th><th>Item</th><th>Estimate (€)</th><th>Actual (€)</th><th>Paid</th><th>Notes</th><th>Invoice</th><th></th></tr></thead><tbody id="giftBudgetTbody"></tbody></table></div>';
  const tbody = document.getElementById('giftBudgetTbody');
  lines.forEach(b=>{
    const tr = document.createElement('tr');
    tr.dataset.id = b.id;
    const catColor = breakdown ? budgetCategoryColor(breakdown.colorByKey, b.category) : null;
    tr.innerHTML = '<td><span class="budget-cat-cell">'+(catColor?'<span class="budget-row-swatch" style="background:'+catColor+'"></span>':'')+'<textarea class="cat-input" rows="1" placeholder="Category">'+esc(b.category)+'</textarea></span></td><td><textarea class="item-input" rows="1" placeholder="Item">'+esc(b.item)+'</textarea></td>'
      +'<td class="num-cell mono"><input type="number" data-k="est" value="'+(b.estCost??'')+'"></td>'
      +'<td class="num-cell mono"><input type="number" data-k="act" value="'+(b.actCost??'')+'"></td>'
      +'<td></td><td></td><td class="invoice-cell"></td><td></td>';
    tbody.appendChild(tr);
    const paidCell = tr.children[4];
    const pill = document.createElement('button'); pill.className='paid-pill'+(b.paid?'':' no'); pill.textContent = b.paid?'Paid':'Unpaid';
    pill.addEventListener('click', ()=> updateBudget(b,{paid:!b.paid}));
    paidCell.appendChild(pill);
    const notesCell = tr.children[5];
    const ni = document.createElement('textarea'); ni.className='notes-input'; ni.rows=1; ni.value=b.notes||''; ni.placeholder='-';
    ni.addEventListener('input', ()=> autoGrowTextarea(ni));
    ni.addEventListener('change', ()=> updateBudget(b,{notes:ni.value}));
    notesCell.appendChild(ni);
    buildInvoiceCell(tr.children[6], b);
    const delCell = tr.children[7];
    const delBtn = document.createElement('button'); delBtn.className='btn ghost small'; delBtn.innerHTML = svg(ICON.trash);
    delBtn.addEventListener('click', ()=>{
      const label = b.item ? '"'+b.item+'"' : 'this line';
      confirmAction('Are you sure you want to delete '+label+'?', ()=>{
        if(dbReady) db.collection('budget').doc(b.id).delete();
        else { state.budget = state.budget.filter(x=>x.id!==b.id); renderGiftBudgetSection(); if(typeof renderBudget==='function') renderBudget(); }
      });
    });
    delCell.appendChild(delBtn);
    tr.querySelector('input[data-k="est"]').addEventListener('change', e=> updateBudget(b,{estCost:Number(e.target.value)||0}));
    tr.querySelector('input[data-k="act"]').addEventListener('change', e=> updateBudget(b,{actCost:Number(e.target.value)||0}));
    const catTa = tr.querySelector('.cat-input');
    autoGrowTextarea(catTa);
    catTa.addEventListener('input', ()=> autoGrowTextarea(catTa));
    catTa.addEventListener('change', ()=> updateBudget(b,{category:catTa.value.trim()}));
    const itemTa = tr.querySelector('.item-input');
    autoGrowTextarea(itemTa);
    itemTa.addEventListener('input', ()=> autoGrowTextarea(itemTa));
    itemTa.addEventListener('change', ()=> updateBudget(b,{item:itemTa.value.trim()}));
  });
}
document.getElementById('btnAddGiftBudget')?.addEventListener('click', ()=>{
  const cat = document.getElementById('gbCategory'), item = document.getElementById('gbItem'), est = document.getElementById('gbEst'), act = document.getElementById('gbAct');
  if(!item.value.trim()) return;
  const data = {category:cat.value, item:item.value.trim(), estCost:Number(est.value)||0, actCost:Number(act.value)||0, paid:false, notes:'', order:Date.now()};
  if(dbReady) db.collection('budget').add(data);
  else { localAdd(state.budget, data); renderGiftBudgetSection(); if(typeof renderBudget==='function') renderBudget(); }
  item.value=''; est.value=''; act.value='';
});
renderGiftBudgetSection();

/* ---- Email Templates: editable, rich-text (bold + bullet lists), synced ----
   Templates used to be hardcoded strings with a **bold** markdown-ish
   marker, shown via white-space:pre-wrap - which depends on the browser
   preserving literal newlines, and broke down to one unbroken block of
   text wherever that CSS didn't apply. They're real HTML now
   (state.emailTemplates, synced through Firestore like everything else),
   edited in place with a small contenteditable toolbar (Bold / bullet
   list / numbered list), and rendered with actual <p>/<ul><li> tags - so
   paragraphs and bullets are correct everywhere without depending on
   preserved whitespace, and the couple can rewrite the wording themselves
   instead of asking for a change every time. */
const EMAIL_ALLOWED_TAGS = new Set(['P','BR','B','STRONG','I','EM','UL','OL','LI','DIV']);
function sanitizeEmailHtml(html){
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  (function walk(parent){
    Array.from(parent.childNodes).forEach(node=>{
      if(node.nodeType===Node.TEXT_NODE) return;
      if(node.nodeType!==Node.ELEMENT_NODE){ parent.removeChild(node); return; }
      walk(node);
      if(EMAIL_ALLOWED_TAGS.has(node.tagName)){
        while(node.attributes.length) node.removeAttribute(node.attributes[0].name);
      }else{
        while(node.firstChild) parent.insertBefore(node.firstChild, node);
        parent.removeChild(node);
      }
    });
  })(tpl.content);
  return tpl.innerHTML;
}
/* One-time conversion of the old **bold** / "- bullet" seed text into real
   HTML - only used to migrate the original templates into Firestore the
   first time (see ensureEmailTemplatesMigration in firebase-sync.js). */
function templateBodyToHtml(raw){
  const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  return raw.split(/\n{2,}/).map(block=>{
    const lines = block.split('\n').filter(l=>l.length);
    if(lines.length && lines.every(l=>/^[-•]\s+/.test(l))){
      return '<ul>'+lines.map(l=> '<li>'+inline(l.replace(/^[-•]\s+/,''))+'</li>').join('')+'</ul>';
    }
    return '<p>'+lines.map(inline).join('<br>')+'</p>';
  }).join('');
}
/* innerText (not textContent) so paragraph/list block boundaries become
   real line breaks the same way a browser visually renders them - but it
   needs the element attached and laid out first, hence the detached,
   off-screen host div. */
function htmlToPlainText(html){
  const div = document.createElement('div');
  div.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
  div.innerHTML = html;
  div.querySelectorAll('li').forEach(li=> li.prepend(document.createTextNode('- ')));
  document.body.appendChild(div);
  const text = div.innerText;
  document.body.removeChild(div);
  return text.trim();
}
function updateEmailTemplate(t, data){
  Object.assign(t, data);
  if(dbReady) db.collection('emailTemplates').doc(t.id).update(data);
  else renderEmails();
}
function addEmailTemplate(){
  const maxOrder = state.emailTemplates.reduce((m,t)=>Math.max(m,t.order||0),0);
  const data = {title:'New template', to:'', subject:'', bodyHtml:'<p>Write your email here…</p>', order:maxOrder+1};
  if(dbReady) db.collection('emailTemplates').add(data);
  else { localAdd(state.emailTemplates, data); renderEmails(); }
}
function deleteEmailTemplate(t){
  confirmAction('Delete the "'+(t.title||'Untitled')+'" template? This can\'t be undone.', ()=>{
    if(dbReady) db.collection('emailTemplates').doc(t.id).delete();
    else { state.emailTemplates = state.emailTemplates.filter(x=>x.id!==t.id); renderEmails(); }
  });
}
function renderEmails(){
  const wrap = document.getElementById('emailCards'); if(!wrap) return;
  if(syncUnavailable && state.emailTemplates.length===0){
    state.emailTemplates = EMAIL_TEMPLATES.map((t,i)=>({id:'local-email-'+i, title:t.title, to:t.to, subject:t.subject, bodyHtml:templateBodyToHtml(t.body), order:i}));
  }
  wrap.innerHTML='';
  (state.emailTemplates||[]).forEach(t=>{
    const card = document.createElement('div'); card.className='email-card';
    card.innerHTML =
        '<div class="email-head">'
          +'<input class="email-title-input" value="'+esc(t.title)+'" readonly>'
          +'<div class="email-head-actions">'
            +'<button type="button" class="btn small ghost edit-btn">Edit</button>'
            +'<button type="button" class="btn small copy-btn rz-safe">Copy</button>'
            +'<button type="button" class="icon-btn del-btn" title="Delete template">'+svg(ICON.trash)+'</button>'
          +'</div>'
        +'</div>'
        +'<label class="email-meta-field">To<input class="email-to-input" value="'+esc(t.to)+'" readonly></label>'
        +'<label class="email-meta-field">Subject<input class="email-subject-input" value="'+esc(t.subject)+'" readonly></label>'
        +'<div class="email-toolbar" hidden>'
          +'<button type="button" data-cmd="bold" title="Bold"><b>B</b></button>'
          +'<button type="button" data-cmd="insertUnorderedList" title="Bullet list">• List</button>'
          +'<button type="button" data-cmd="insertOrderedList" title="Numbered list">1. List</button>'
          +'<button type="button" data-cmd="removeFormat" title="Clear formatting">Clear</button>'
        +'</div>'
        +'<div class="email-body-view" spellcheck="false">'+t.bodyHtml+'</div>'
        +'<div class="email-edit-actions" hidden>'
          +'<button type="button" class="btn small ghost cancel-btn">Cancel</button>'
          +'<button type="button" class="btn primary small save-btn">Save changes</button>'
        +'</div>';
    wrap.appendChild(card);

    const titleInput = card.querySelector('.email-title-input');
    const toInput = card.querySelector('.email-to-input');
    const subjectInput = card.querySelector('.email-subject-input');
    const toolbar = card.querySelector('.email-toolbar');
    const bodyEl = card.querySelector('.email-body-view');
    const editBtn = card.querySelector('.edit-btn');
    const copyBtn = card.querySelector('.copy-btn');
    const delBtn = card.querySelector('.del-btn');
    const editActions = card.querySelector('.email-edit-actions');
    const cancelBtn = card.querySelector('.cancel-btn');
    const saveBtn = card.querySelector('.save-btn');
    let preEditHtml = null;

    function setEditing(on){
      titleInput.readOnly = !on;
      toInput.readOnly = !on;
      subjectInput.readOnly = !on;
      bodyEl.contentEditable = on ? 'true' : 'false';
      toolbar.hidden = !on;
      editActions.hidden = !on;
      // .btn sets its own display:inline-flex unconditionally, which beats
      // the hidden attribute's UA display:none at equal specificity - an
      // inline style always wins over that regardless.
      editBtn.style.display = on ? 'none' : '';
      copyBtn.style.display = on ? 'none' : '';
      card.classList.toggle('editing', on);
      if(on){ preEditHtml = bodyEl.innerHTML; bodyEl.focus(); }
    }
    editBtn.addEventListener('click', ()=> setEditing(true));
    cancelBtn.addEventListener('click', ()=>{
      titleInput.value = t.title; toInput.value = t.to; subjectInput.value = t.subject;
      bodyEl.innerHTML = preEditHtml;
      setEditing(false);
    });
    saveBtn.addEventListener('click', ()=>{
      updateEmailTemplate(t, {
        title: titleInput.value.trim() || 'Untitled',
        to: toInput.value.trim(),
        subject: subjectInput.value.trim(),
        bodyHtml: sanitizeEmailHtml(bodyEl.innerHTML),
      });
      setEditing(false);
    });
    toolbar.querySelectorAll('button[data-cmd]').forEach(btn=>{
      btn.addEventListener('mousedown', e=> e.preventDefault());
      btn.addEventListener('click', ()=>{ bodyEl.focus(); document.execCommand(btn.dataset.cmd); });
    });
    delBtn.addEventListener('click', ()=> deleteEmailTemplate(t));
    copyBtn.addEventListener('click', async ()=>{
      const plainText = 'Subject: '+t.subject+'\n\n'+htmlToPlainText(t.bodyHtml);
      const html = 'Subject: <b>'+esc(t.subject)+'</b><br><br>'+t.bodyHtml;
      try{
        if(window.ClipboardItem){
          await navigator.clipboard.write([new ClipboardItem({
            'text/plain': new Blob([plainText], {type:'text/plain'}),
            'text/html': new Blob([html], {type:'text/html'})
          })]);
        }else{
          await navigator.clipboard.writeText(plainText);
        }
        copyBtn.textContent='Copied';
      }catch(e){
        const range = document.createRange(); range.selectNodeContents(bodyEl);
        const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
        copyBtn.textContent='Select & copy manually';
      }
      setTimeout(()=> copyBtn.textContent='Copy', 1800);
    });
  });
}
document.getElementById('btnAddEmailTemplate')?.addEventListener('click', addEmailTemplate);
renderGiftIdeas();

/* ---------------- WEDDING DIY ---------------- */
/* Same server-side-fetch trick used for Pinterest pins: ask the Worker to
   fetch the page and read its og:image/twitter:image meta tag, since most
   sites set one for social-share previews. Works for a wide range of
   links, not just Pinterest, but still needs a real image tag on the page. */
async function fetchLinkPreviewThumbnail(url, onSuccess, onError){
  console.log('[DIY thumb] starting fetch for', url, 'worker:', window.VV_WORKER_URL);
  try{
    const user = window.firebase && firebase.auth && firebase.auth().currentUser;
    console.log('[DIY thumb] signed in user:', user && user.email);
    if(!user || !window.VV_WORKER_URL){ onError('Sign in first, then try again.'); return; }
    const idToken = await user.getIdToken();
    let resp;
    try{
      resp = await fetch(window.VV_WORKER_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+idToken},
        body: JSON.stringify({action:'resolveLinkPreview', url})
      });
    }catch(networkErr){
      console.error('[DIY thumb] network/fetch error (likely CORS or offline)', networkErr);
      onError('Could not reach the server (network or CORS error). Check your internet connection and try again.');
      return;
    }
    console.log('[DIY thumb] response status', resp.status);
    let data; try{ data = await resp.json(); }catch(e){ data = null; }
    console.log('[DIY thumb] response body', data);
    if(!resp.ok || !data || !data.thumbnailUrl){
      const serverMsg = data && data.error;
      if(serverMsg === 'messages array is required'){
        onError("The Cloudflare Worker is still running the old code, it doesn't know about thumbnail fetching yet. Paste the latest cloudflare-worker/index.js into the Cloudflare dashboard and redeploy it, then try this button again.");
        return;
      }
      onError(serverMsg || 'Could not find a preview image on that page.');
      return;
    }
    console.log('[DIY thumb] success', data.thumbnailUrl);
    onSuccess(data.thumbnailUrl, data.title||'');
  }catch(e){ console.error('[DIY thumb] unexpected error', e); onError('Request failed: '+(e&&e.message||e)); }
}
/* Same Worker fetch as fetchLinkPreviewThumbnail above, but asks for the
   page's rough plain text instead of its preview image, action
   resolvePageText, so a venue's brochure/listing page can feed the same
   keyword auto-fill already used for pasted email replies and PDFs.
   Needs the Worker's cloudflare-worker/index.js redeployed (paste + Deploy
   in the Cloudflare dashboard) before this action exists server-side. */
async function fetchPageText(url, onSuccess, onError){
  try{
    const user = window.firebase && firebase.auth && firebase.auth().currentUser;
    if(!user || !window.VV_WORKER_URL){ onError('Sign in first, then try again.'); return; }
    const idToken = await user.getIdToken();
    let resp;
    try{
      resp = await fetch(window.VV_WORKER_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+idToken},
        body: JSON.stringify({action:'resolvePageText', url})
      });
    }catch(networkErr){
      console.error('[page text] network/fetch error (likely CORS or offline)', networkErr);
      onError('Could not reach the server (network or CORS error). Check your internet connection and try again.');
      return;
    }
    let data; try{ data = await resp.json(); }catch(e){ data = null; }
    if(!resp.ok || !data || !data.text){
      const serverMsg = data && data.error;
      if(serverMsg === 'messages array is required'){
        onError("The Cloudflare Worker is still running the old code, it doesn't know about page-text fetching yet. Paste the latest cloudflare-worker/index.js into the Cloudflare dashboard and redeploy it, then try this button again.");
        return;
      }
      onError(serverMsg || 'Could not find any readable text on that page.');
      return;
    }
    onSuccess(data.text, data.title||'');
  }catch(e){ console.error('[page text] unexpected error', e); onError('Request failed: '+(e&&e.message||e)); }
}
let pendingDiyThumb = '';
function resizeDataUrlForDiyThumb(dataUrl, onDone){
  const img = new Image();
  img.onload = ()=>{
    const max = 300, scale = Math.min(1, max/Math.max(img.width,img.height));
    const canvas = document.createElement('canvas'); canvas.width=Math.round(img.width*scale); canvas.height=Math.round(img.height*scale);
    canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
    let q=.8, url=canvas.toDataURL('image/jpeg',q);
    while(url.length>150000 && q>.4){ q-=.1; url=canvas.toDataURL('image/jpeg',q); }
    onDone(url);
  };
  img.onerror = ()=> onDone(dataUrl);
  img.src = dataUrl;
}
function readDiyThumb(file){
  if(!file || !/^image\//.test(file.type)) return;
  const reader = new FileReader();
  reader.onload = e=>{
    resizeDataUrlForDiyThumb(e.target.result, url=>{
      pendingDiyThumb = url;
      const preview = document.getElementById('diyThumbPreview');
      preview.src = url; preview.style.display='inline-block';
    });
  };
  reader.readAsDataURL(file);
}
document.getElementById('diyThumbInput').addEventListener('change', e=>{ if(e.target.files[0]) readDiyThumb(e.target.files[0]); });
function setDiyFetchStatus(msg, isError){
  const el = document.getElementById('diyFetchStatus');
  if(!el) return;
  if(!msg){ el.style.display='none'; return; }
  el.textContent = msg;
  el.style.color = isError ? 'var(--danger)' : 'var(--ink-faint)';
  el.style.display = 'block';
}
function runDiyThumbFetch(rawUrl){
  let url = rawUrl.trim();
  if(!url) return;
  if(!/^https?:\/\//i.test(url)) url = 'https://'+url;
  const btn = document.getElementById('diyFetchThumbBtn');
  btn.disabled = true; btn.textContent = 'Fetching…';
  setDiyFetchStatus('Fetching thumbnail...');
  fetchLinkPreviewThumbnail(url,
    (thumbnailUrl)=>{
      const preview = document.getElementById('diyThumbPreview');
      const finish = (finalUrl)=>{
        pendingDiyThumb = finalUrl;
        preview.src = finalUrl; preview.style.display='inline-block';
        btn.disabled = false; btn.textContent = 'Fetch thumbnail from link';
        setDiyFetchStatus('Thumbnail found.');
      };
      if(/^data:/.test(thumbnailUrl)) resizeDataUrlForDiyThumb(thumbnailUrl, finish);
      else finish(thumbnailUrl);
    },
    (reason)=>{
      setDiyFetchStatus("Couldn't fetch a thumbnail: "+reason+" You can still upload one instead.", true);
      btn.disabled = false; btn.textContent = 'Fetch thumbnail from link';
    }
  );
}
document.getElementById('diyFetchThumbBtn')?.addEventListener('click', ()=>{
  const url = document.getElementById('diyUrl').value.trim();
  setDiyFetchStatus('');
  if(!url){ setDiyFetchStatus('Paste a link above first, then try fetching a thumbnail.', true); return; }
  runDiyThumbFetch(url);
});
/* Auto-fetch as soon as a link is pasted, same as the Pinterest board does,
   so saving an idea doesn't silently require remembering a separate button. */
document.getElementById('diyUrl')?.addEventListener('blur', ()=>{
  const url = document.getElementById('diyUrl').value.trim();
  if(!url || pendingDiyThumb) return;
  runDiyThumbFetch(url);
});

document.getElementById('diySaveBtn').addEventListener('click', ()=>{
  const urlInput = document.getElementById('diyUrl');
  const descInput = document.getElementById('diyDesc');
  let url = urlInput.value.trim();
  const description = descInput.value.trim();
  if(!url || !description){ alert('Add both a link and a short description.'); return; }
  if(!/^https?:\/\//i.test(url)) url = 'https://'+url;
  const data = {url, description, thumbnail: pendingDiyThumb, createdAt: Date.now()};
  if(dbReady) db.collection('diyIdeas').add(data).catch(err=>{ console.error('[DIY] add failed', err); alert('Could not save this idea: '+err.message); });
  else { localAdd(state.diyIdeas, data); renderDiyIdeas(); }
  urlInput.value=''; descInput.value=''; pendingDiyThumb='';
  document.getElementById('diyThumbPreview').style.display='none';
  document.getElementById('diyThumbInput').value='';
  setDiyFetchStatus('');
});

let editingDiyId = null, editingDiyThumb = '';
function readDiyEditThumb(file){
  if(!file || !/^image\//.test(file.type)) return;
  const reader = new FileReader();
  reader.onload = e=>{
    resizeDataUrlForDiyThumb(e.target.result, url=>{
      editingDiyThumb = url;
      const preview = document.getElementById('diyEditThumbPreview');
      if(preview){ preview.src = url; preview.style.display='inline-block'; }
    });
  };
  reader.readAsDataURL(file);
}
function renderDiyIdeas(){
  const wrap = document.getElementById('diyGrid'); if(!wrap) return;
  wrap.innerHTML='';
  if(!state.diyIdeas.length){ wrap.innerHTML = '<p style="color:var(--ink-faint);font-size:13px;">No saved ideas yet. Paste a link above to start your d.i.y collection.</p>'; return; }
  state.diyIdeas.forEach(idea=>{
    const card = document.createElement('div'); card.className='card diy-card';
    const editing = editingDiyId === idea.id;
    let host = idea.url;
    try{ host = new URL(idea.url).hostname.replace(/^www\./,''); }catch(e){}
    card.innerHTML =
      (idea.thumbnail ? '<img src="'+esc(idea.thumbnail)+'" class="diy-thumb" alt="">' : '<div class="diy-thumb diy-thumb-empty">'+svg(ICON.scissors)+'</div>')
      + '<div class="diy-body">'
      + (editing
          ? '<label class="field" style="margin-bottom:8px;">Link<input type="text" class="diy-url-edit" value="'+esc(idea.url)+'"></label>'
            + '<textarea class="diy-desc-edit" rows="3">'+esc(idea.description)+'</textarea>'
            + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">'
            + '<button class="btn small ghost" type="button" id="diyEditFetchThumbBtn">Fetch thumbnail from link</button>'
            + '<label class="btn small ghost" style="cursor:pointer;">'+(idea.thumbnail?'Or change it':'Or upload one')+'<input type="file" id="diyEditThumbInput" accept="image/*" style="display:none;"></label>'
            + '<img id="diyEditThumbPreview" src="'+esc(editingDiyThumb||'')+'" style="'+(editingDiyThumb?'':'display:none;')+'width:32px;height:32px;object-fit:cover;border-radius:6px;">'
            + '</div>'
            + '<p id="diyEditFetchStatus" style="display:none;font-size:13px;margin:4px 0 0;"></p>'
          : '<p class="diy-desc">'+esc(idea.description)+'</p>')
      + '<div class="diy-meta"><a href="'+esc(idea.url)+'" target="_blank" rel="noopener">'+esc(host)+' ↗</a></div>'
      + '<div class="diy-actions">'
      + (editing ? '<button class="btn small save-diy">Save</button>' : '<button class="btn small ghost edit-diy">Edit</button>')
      + '<button class="btn small danger-outline del-diy">Delete</button>'
      + '</div></div>';
    card.querySelector('.edit-diy')?.addEventListener('click', ()=>{ editingDiyId = idea.id; editingDiyThumb = idea.thumbnail||''; renderDiyIdeas(); });
    card.querySelector('#diyEditThumbInput')?.addEventListener('change', e=>{ if(e.target.files[0]) readDiyEditThumb(e.target.files[0]); });
    card.querySelector('#diyEditFetchThumbBtn')?.addEventListener('click', ()=>{
      const btn = card.querySelector('#diyEditFetchThumbBtn');
      const statusEl = card.querySelector('#diyEditFetchStatus');
      const setStatus = (msg, isError)=>{
        if(!statusEl) return;
        if(!msg){ statusEl.style.display='none'; return; }
        statusEl.textContent = msg;
        statusEl.style.color = isError ? 'var(--danger)' : 'var(--ink-faint)';
        statusEl.style.display = 'block';
      };
      btn.disabled = true; btn.textContent = 'Fetching…';
      setStatus('Fetching thumbnail...');
      fetchLinkPreviewThumbnail(idea.url,
        (thumbnailUrl)=>{
          const preview = card.querySelector('#diyEditThumbPreview');
          const finish = (finalUrl)=>{
            editingDiyThumb = finalUrl;
            preview.src = finalUrl; preview.style.display='inline-block';
            btn.disabled = false; btn.textContent = 'Fetch thumbnail from link';
            setStatus('Thumbnail found.');
          };
          if(/^data:/.test(thumbnailUrl)) resizeDataUrlForDiyThumb(thumbnailUrl, finish);
          else finish(thumbnailUrl);
        },
        (reason)=>{
          setStatus("Couldn't fetch a thumbnail: "+reason+" You can still upload one instead.", true);
          btn.disabled = false; btn.textContent = 'Fetch thumbnail from link';
        }
      );
    });
    card.querySelector('.save-diy')?.addEventListener('click', ()=>{
      const text = card.querySelector('.diy-desc-edit').value.trim();
      let url = card.querySelector('.diy-url-edit').value.trim();
      if(!text || !url) return;
      if(!/^https?:\/\//i.test(url)) url = 'https://'+url;
      const data = {url, description:text, thumbnail: editingDiyThumb};
      if(dbReady) db.collection('diyIdeas').doc(idea.id).update(data).catch(err=>{ console.error('[DIY] update failed', err); alert('Could not save: '+err.message); });
      else Object.assign(idea, data);
      editingDiyId = null; editingDiyThumb=''; renderDiyIdeas();
    });
    card.querySelector('.del-diy').addEventListener('click', ()=>{
      confirmAction('Delete this saved idea?', ()=>{
        if(dbReady) db.collection('diyIdeas').doc(idea.id).delete().catch(err=>{ console.error('[DIY] delete failed', err); alert('Could not delete: '+err.message); });
        else { state.diyIdeas = state.diyIdeas.filter(x=>x.id!==idea.id); renderDiyIdeas(); }
      });
    });
    wrap.appendChild(card);
  });
}
renderDiyIdeas();



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

function normalizePinterestBoardUrl(raw){
  raw=(raw||'').trim();
  if(!raw) return null;
  try{
    const u=new URL(raw);
    const host=u.hostname.toLowerCase();
    if(host==='pin.it' || host==='www.pin.it') return {short:true,url:raw};
    if(host!=='pinterest.com' && !host.endsWith('.pinterest.com')) return null;
    const parts=u.pathname.split('/').filter(Boolean);
    if(parts.length<2 || parts[0].toLowerCase()==='pin') return null;
    const clean='https://www.pinterest.com/'+parts.slice(0,2).map(encodeURIComponent).join('/')+'/';
    return {short:false,url:clean};
  }catch(e){ return null; }
}
function renderPinterestBoard(url){
  const shelf=document.getElementById('pinterestBoardShelf'); if(!shelf) return;
  const normalized=normalizePinterestBoardUrl(url);
  if(!normalized){
    shelf.innerHTML='<div class="warn">That does not look like a Pinterest board URL.</div>'; return;
  }
  if(normalized.short){
    localStorage.setItem('vv_pinterest_board_url',normalized.url);
    shelf.innerHTML='<div class="warn">Pinterest short links need to be opened once first. Open this link, then copy the full board URL from the address bar and paste it here: <a target="_blank" rel="noopener" href="'+esc(normalized.url)+'">Open Pinterest ↗</a></div>';
    return;
  }
  url=normalized.url;
  const input=document.getElementById('pinterestBoardUrl'); if(input) input.value=url;
  localStorage.setItem('vv_pinterest_board_url',url);
  shelf.innerHTML='<a data-pin-do="embedBoard" data-pin-board-width="900" data-pin-scale-height="420" data-pin-scale-width="110" href="'+esc(url)+'"></a>';
  ensurePinterestWidgets();
  setTimeout(()=>{ if(window.PinUtils && window.PinUtils.build) window.PinUtils.build(); },250);
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
    const s=document.createElement('script'); s.src='https://assets.pinterest.com/js/pinit.js'; s.async=true; s.dataset.vvPinterest='1'; s.onload=()=>{ if(window.PinUtils && window.PinUtils.build) window.PinUtils.build(); }; document.head.appendChild(s);
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
      // Sized for a full-screen lightbox view, not just the small grid
      // tile: a pin's photo is the same stored image either way, and the
      // old 1000px/230KB cap (picked with only the tiny grid thumbnail in
      // mind) looked visibly soft once stretched to fill a screen. 1600px
      // and a much higher size ceiling still leaves plenty of headroom
      // under Firestore's 1MiB-per-document limit (a pin's few other
      // fields add only a few dozen bytes).
      let quality = 0.82, maxW = 1600;
      const scale = Math.min(1, maxW/img.width);
      const w = Math.round(img.width*scale), h = Math.round(img.height*scale);
      const canvas = document.createElement('canvas'); canvas.width=w; canvas.height=h;
      const ctx = canvas.getContext('2d'); ctx.drawImage(img,0,0,w,h);
      function tryQuality(q){
        const url = canvas.toDataURL('image/jpeg', q);
        return url;
      }
      let url = tryQuality(quality);
      while(url.length > 700000 && quality > 0.3){ quality -= 0.1; url = tryQuality(quality); }
      if(url.length > 700000){
        warn.textContent = 'This image is still too large after compression. Try a smaller or simpler photo.';
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
    document.getElementById('photoWarn').textContent='Could not save, the image may be too large. Try a smaller photo.';
    document.getElementById('photoWarn').style.display='block';
  });
  else { localAdd(state.pins,data); renderBoard(); renderStart(); }
  closeModal();
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
    if(!url && !title){ warn.textContent = "Clipboard didn't look like a saved pin, paste the link below by hand."; warn.style.display='block'; }
  }catch(e){
    warn.textContent = "Couldn't read the clipboard. Your browser may need permission, or there's nothing copied yet. Paste the link below by hand.";
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
  const title = document.getElementById('linkTitle').value.trim();
  const note = document.getElementById('linkNote').value.trim();
  const tag = document.getElementById('linkTag').value;
  const parsed = window.classifyPinterestUrl && window.classifyPinterestUrl(url);
  let data;
  if(parsed && (parsed.kind==='pin' || parsed.kind==='short' || parsed.kind==='board')){
    data = {type:'pinterest', pinterestKind:parsed.kind, url:parsed.url, title:title||(parsed.kind==='board'?'Pinterest Board':'Pinterest Pin'), note, tag, createdAt:Date.now()};
  }else{
    data = {type:'link', url, title:title||url, note, tag, createdAt:Date.now()};
  }
  if(dbReady) db.collection('pinboard').add(data);
  else { localAdd(state.pins,data); renderBoard(); renderStart(); }
  document.getElementById('linkUrl').value=''; document.getElementById('linkTitle').value=''; document.getElementById('linkNote').value='';
  closeModal();
});

/* ---------------- MOBILE NAV ---------------- */
/* Same horizontally-scrollable strip as the desktop header (see app-1.js
   showTab/updateTabsScrollArrow): every tab is reachable by swiping or
   tapping the fade-edged arrow, instead of the 5 extra tabs being hidden
   behind a separate "More" bottom sheet. Reuses TABS/svg() from app-1.js
   rather than keeping a second, separate icon/label list in sync. */
let mobileNavUpdateArrow = null;
function buildMobileNav(){
  if(document.getElementById('vvMobileNav')) return;
  const nav = document.createElement('nav'); nav.id='vvMobileNav'; nav.setAttribute('aria-label','Wedding planner navigation');
  const arrowLeft = document.createElement('button'); arrowLeft.type='button'; arrowLeft.id='vvMobileNavArrowLeft'; arrowLeft.className='vv-mobile-nav-arrow vv-mobile-nav-arrow-left'; arrowLeft.setAttribute('aria-label','Show earlier tabs'); arrowLeft.textContent='‹';
  nav.appendChild(arrowLeft);
  const scroll = document.createElement('div'); scroll.className='mobile-nav-scroll';
  TABS.forEach(t=>{
    const b = document.createElement('button'); b.type='button'; b.className='tabtint-'+TAB_TINTS[t.id]; b.dataset.tab=t.id;
    b.innerHTML = svg(t.icon) + '<span>'+t.label+'</span>';
    b.addEventListener('click', ()=> showTab(t.id));
    scroll.appendChild(b);
  });
  nav.appendChild(scroll);
  const arrow = document.createElement('button'); arrow.type='button'; arrow.id='vvMobileNavArrow'; arrow.className='vv-mobile-nav-arrow vv-mobile-nav-arrow-right'; arrow.setAttribute('aria-label','Show more tabs'); arrow.textContent='›';
  nav.appendChild(arrow);
  document.body.appendChild(nav);
  arrow.addEventListener('click', ()=> scroll.scrollBy({left:180, behavior:'smooth'}));
  arrowLeft.addEventListener('click', ()=> scroll.scrollBy({left:-180, behavior:'smooth'}));
  mobileNavUpdateArrow = function(){
    const hasMore = scroll.scrollWidth - scroll.clientWidth - scroll.scrollLeft > 4;
    arrow.classList.toggle('visible', hasMore);
    arrowLeft.classList.toggle('visible', scroll.scrollLeft > 4);
  };
  scroll.addEventListener('scroll', mobileNavUpdateArrow);
  window.addEventListener('resize', mobileNavUpdateArrow);
  setTimeout(mobileNavUpdateArrow, 0);
  /* showTab() already restored the right page before this script even
     loaded (app-1.js runs first and calls it once on startup), but that
     first call happened before syncMobileNav existed to highlight the
     matching bottom-nav button, so the nav looked reset even though the
     content wasn't. Sync it now to whatever is actually showing. */
  const currentView = document.querySelector('.view.active');
  if(currentView) syncMobileNav(currentView.id.replace('view-',''));
}
function syncMobileNav(activeId){
  document.querySelectorAll('#vvMobileNav button[data-tab]').forEach(b=> b.classList.toggle('active', b.dataset.tab===activeId));
  const activeBtn = document.querySelector('#vvMobileNav button[data-tab="'+activeId+'"]');
  if(activeBtn) activeBtn.scrollIntoView({inline:'nearest', block:'nearest', behavior:'smooth'});
  if(mobileNavUpdateArrow) setTimeout(mobileNavUpdateArrow, 260);
}
buildMobileNav();

"use strict";
/* ---------------- PLANNER ASSISTANT ---------------- */
const SYSTEM_PROMPT = "You are the on-call wedding planner inside \"Villa and Vow\", a planning app for a destination wedding in Europe. The couple wants a chuppah, a rabbi, and kosher catering, with guests flying in from Israel and France. They're leaning toward a villa or masseria where guests stay together for about two days, with a pool party the day after the wedding, or a walkable cluster of budget hotels/Airbnbs as backup if one property can't sleep everyone. Four regions are shortlisted in the app: Tuscany, Puglia, Provence and the Algarve. "
  + "Answer warmly and specifically, like an expert in this niche (kosher wedding logistics in Europe, Jewish wedding customs, destination-wedding travel logistics). Use short paragraphs or bullet points, not long essays. If asked to draft something (an email, a timeline, vow ideas, a toast outline) just write it well and completely. "
  + "You do NOT have live access to real vendor names, current prices, or availability in any specific town. Never invent a caterer, rabbi, planner or price. When that's what's being asked, say plainly that you don't have real vendor data and suggest exactly who to ask instead (the venue coordinator, a local kosher caterer, a Jewish destination-wedding planner). Use the live app data given to you to make answers specific to where they actually are in planning.";

let sampleFn = null, plannerHistory = [];
let plannerAuthRetryAttached = false;
async function initPlanner(){
  try{
    if(!window.claude || !window.claude.use) return;
    sampleFn = await window.claude.use('sample');
  }catch(e){ sampleFn = null; }
  document.getElementById('plannerFab').style.display = sampleFn ? '' : 'none';
  // window.claude.use('sample') needs a signed-in Firebase user, and this
  // only ran once, at page load. If sign-in was still resolving (a slower
  // or first-time connection, more likely on mobile) or hadn't happened
  // yet, the assistant button was hidden and stayed hidden even after
  // actually signing in, with no visible error and no way to get it back
  // short of a full page refresh, indistinguishable from "just doesn't
  // work". Retry once sign-in actually completes, instead of only ever
  // checking this one time.
  if(!sampleFn && !plannerAuthRetryAttached && window.firebase && firebase.auth){
    plannerAuthRetryAttached = true;
    firebase.auth().onAuthStateChanged(user=>{ if(user) initPlanner(); });
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
      {role:'assistant', content: "Understood, I have the full picture of where things stand. What would you like help with?"},
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
    /* e.code is set from the Worker's HTTP response status (a number,
       e.g. 401/429/502), not the string values this used to check for
       ('not_granted'/'rate_limited'), so those branches could never
       actually match and every failure fell through to the same generic
       message, hiding whatever the real problem was. Surface the actual
       error text from the Worker (already a real, specific message, see
       the Worker's own error responses) so a real failure is diagnosable
       instead of always looking identical. */
    const status = e && e.code;
    let msg = (e && e.message) || "Something went wrong reaching your planner. Try again in a moment.";
    if(status === 429){ msg = "Your planner is fielding a lot of questions right now. Try again shortly."; }
    console.error('[Planner]', status, e && e.message, e);
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