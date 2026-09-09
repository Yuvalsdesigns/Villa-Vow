/* Villa & Vow bootstrap and compatibility fixes. */

/* Load shared Firebase sync before the planner code. */
document.write('<script src="firebase-sync.js"><\/script>');

/* app-2 renders venue filters before app-3 originally defines esc().
   Define it up front so venue initialization cannot abort during page load. */
window.esc = window.esc || function(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
};

/* Budget: use the real euro text already rendered by app-1 and align it with
   the numeric input. The previous CSS also drew a pseudo euro, causing two. */
(function(){
  var style=document.createElement('style');
  style.textContent=`
    .budget-table .num-cell::before{content:none !important;display:none !important;}
    .budget-table .num-cell{white-space:nowrap;vertical-align:middle !important;}
    .budget-table .num-cell input{
      display:inline-block !important;
      width:calc(100% - 18px) !important;
      padding-left:6px !important;
      vertical-align:middle !important;
      text-align:right !important;
    }
  `;
  document.head.appendChild(style);
})();

/* After all planner scripts load, make checklist updates optimistic so the
   Start Here counters change immediately instead of waiting for Firestore's
   snapshot round trip. Also re-run venue initialization defensively. */
window.addEventListener('load', function(){
  if(typeof window.renderVenueFilters === 'function') window.renderVenueFilters();
  if(typeof window.renderVenues === 'function') window.renderVenues();

  ['venueSearch','venueRegionFilter','venueTagFilter'].forEach(function(id){
    var el=document.getElementById(id);
    if(el && typeof window.renderVenues === 'function'){
      el.addEventListener(id==='venueSearch' ? 'input' : 'change', window.renderVenues);
    }
  });

  if(typeof window.toggleItem === 'function'){
    var originalToggle=window.toggleItem;
    window.toggleItem=function(coll,it){
      if(window.dbReady){
        it.done=!it.done;
        if(coll==='todos' && typeof window.renderTodos==='function') window.renderTodos();
        if(coll==='considerations' && typeof window.renderConsiderations==='function') window.renderConsiderations();
        if(typeof window.renderStart==='function') window.renderStart();
        window.db.collection(coll).doc(it.id).update({done:it.done}).catch(function(err){
          console.error('Could not save checklist change',err);
          it.done=!it.done;
          if(coll==='todos' && typeof window.renderTodos==='function') window.renderTodos();
          if(coll==='considerations' && typeof window.renderConsiderations==='function') window.renderConsiderations();
          if(typeof window.renderStart==='function') window.renderStart();
        });
      }else{
        originalToggle(coll,it);
      }
    };
  }
});
