/* Villa & Vow bootstrap, recovery and compatibility fixes. */

/* Load shared features with cache-busting so GitHub Pages/browser caches do not
   leave an old planner shell running after a deploy. */
document.write('<script src="firebase-sync.js?v=20260910-2"><\/script>');
document.write('<script src="js/style-gallery-enhancements.js?v=20260910-2"><\/script>');
document.write('<link rel="stylesheet" href="mobile-app.css?v=20260910-2">');
document.write('<script src="js/mobile-app.js?v=20260910-2"><\/script>');

(function(){
  var meta=document.querySelector('meta[name="viewport"]');
  if(!meta){meta=document.createElement('meta');meta.name='viewport';document.head.appendChild(meta);}
  meta.content='width=device-width, initial-scale=1, viewport-fit=cover';
  var theme=document.querySelector('meta[name="theme-color"]');
  if(!theme){theme=document.createElement('meta');theme.name='theme-color';document.head.appendChild(theme);}
  theme.content='#fbf3ec';
})();

/* app-2 calls esc() before app-3 originally defines it. */
window.esc = window.esc || function(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
};

/* Budget: only one euro symbol, aligned with the number. */
(function(){
  var style=document.createElement('style');
  style.textContent=`
    .budget-table .num-cell::before{content:none !important;display:none !important;}
    .budget-table .num-cell{white-space:nowrap;vertical-align:middle !important;}
    .budget-table .num-cell input{display:inline-block !important;width:calc(100% - 18px) !important;padding-left:6px !important;vertical-align:middle !important;text-align:right !important;}
  `;
  document.head.appendChild(style);
})();

/* Current app-2.js contains one malformed array separator (]},,). A syntax
   error means the whole venue/style bundle fails to parse. If that happens,
   fetch the current source, repair that exact typo, and execute the repaired
   bundle. This is intentionally narrow and can be removed after app-2 itself
   is cleaned up. */
function vvRecoverApp2(){
  if(typeof window.renderStyleSections==='function' && typeof window.renderVenues==='function') return Promise.resolve(true);
  return fetch('app-2.js?v=20260910-2',{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error('app-2 fetch '+r.status);return r.text();})
    .then(function(src){
      var repaired=src.replace(/\]\},\s*,\s*\{title:'Second Look \/ Party Outfit'/, "]},\n  {title:'Second Look / Party Outfit'");
      if(repaired===src) repaired=src.replace(']},,\n  {title:\'Second Look / Party Outfit\'', ']},\n  {title:\'Second Look / Party Outfit\'');
      (0,eval)(repaired);
      return true;
    })
    .catch(function(err){console.error('Villa & Vow could not recover app-2.js',err);return false;});
}

/* Counts must not depend on the style bundle. The original Firestore listener
   calls renderConsiderations(), but omits renderStart(), leaving Start Here and
   the sidebar stale even while the Things to Get page itself is correct. */
function vvInstallLiveCountFix(){
  if(typeof window.renderConsiderations==='function' && !window.renderConsiderations.__vvStartSync){
    var originalRenderConsiderations=window.renderConsiderations;
    var wrapped=function(){
      var out=originalRenderConsiderations.apply(this,arguments);
      if(typeof window.renderStart==='function') window.renderStart();
      return out;
    };
    wrapped.__vvStartSync=true;
    window.renderConsiderations=wrapped;
  }

  if(typeof window.toggleItem==='function' && !window.toggleItem.__vvImmediateSync){
    var originalToggle=window.toggleItem;
    var toggleWrapped=function(coll,it){
      /* dbReady/db are global lexical bindings in app-1, not window properties. */
      if(typeof dbReady!=='undefined' && dbReady && typeof db!=='undefined' && db){
        it.done=!it.done;
        if(coll==='todos' && typeof window.renderTodos==='function') window.renderTodos();
        if(coll==='considerations' && typeof window.renderConsiderations==='function') window.renderConsiderations();
        if(typeof window.renderStart==='function') window.renderStart();
        return db.collection(coll).doc(it.id).update({done:it.done}).catch(function(err){
          console.error('Could not save checklist change',err);
          it.done=!it.done;
          if(coll==='todos' && typeof window.renderTodos==='function') window.renderTodos();
          if(coll==='considerations' && typeof window.renderConsiderations==='function') window.renderConsiderations();
          if(typeof window.renderStart==='function') window.renderStart();
        });
      }
      return originalToggle.apply(this,arguments);
    };
    toggleWrapped.__vvImmediateSync=true;
    window.toggleItem=toggleWrapped;
  }
  if(typeof window.renderStart==='function') window.renderStart();
}

window.addEventListener('load',function(){
  vvRecoverApp2().then(function(){
    if(typeof window.renderVenueFilters==='function') window.renderVenueFilters();
    if(typeof window.renderVenues==='function') window.renderVenues();
    if(typeof window.renderStyleSections==='function') window.renderStyleSections();
    vvInstallLiveCountFix();

    ['venueSearch','venueRegionFilter','venueTagFilter'].forEach(function(id){
      var el=document.getElementById(id);
      if(el && typeof window.renderVenues==='function' && !el.__vvVenueListener){
        el.addEventListener(id==='venueSearch'?'input':'change',window.renderVenues);
        el.__vvVenueListener=true;
      }
    });
  });
  /* The database listeners can resolve just after load. Re-apply once more. */
  setTimeout(vvInstallLiveCountFix,1200);
});
