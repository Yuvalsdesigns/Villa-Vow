/* Villa & Vow bootstrap and compatibility layer. */

/* Firebase must be available before app-1 initialises the shared database. */
document.write('<script src="firebase-sync.js?v=20260910-6"><\/script>');
document.write('<link rel="stylesheet" href="mobile-app.css?v=20260910-6">');

(function(){
  var meta=document.querySelector('meta[name="viewport"]');
  if(!meta){meta=document.createElement('meta');meta.name='viewport';document.head.appendChild(meta);}
  meta.content='width=device-width, initial-scale=1, viewport-fit=cover';
})();

/* app-2 uses esc() while building venue filters. Define it before app-2. */
window.esc=window.esc||function(s){
  return String(s==null?'':s).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
};

function vvLoadScript(src){
  return new Promise(function(resolve,reject){
    var s=document.createElement('script');s.src=src;s.async=false;
    s.onload=resolve;s.onerror=reject;document.body.appendChild(s);
  });
}

/* app-2 in the original export has one extra comma in STYLE_SECTIONS. Because
   a syntax error prevents the entire file from executing, recover the same
   source, repair only that typo, expose the style data globally, then execute. */
function vvRecoverApp2(){
  if(typeof window.renderStyleSections==='function'&&typeof window.renderVenues==='function')return Promise.resolve();
  return fetch('app-2.js?v=20260910-6',{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error('app-2 fetch '+r.status);return r.text();})
    .then(function(src){
      src=src.replace(/\]\},\s*,\s*\{title:'Second Look \/ Party Outfit'/,"]},\n  {title:'Second Look / Party Outfit'");
      src=src.replace('const STYLE_PHOTOS =','window.STYLE_PHOTOS =');
      src=src.replace('const STYLE_SECTIONS =','window.STYLE_SECTIONS =');
      (0,eval)(src);
      if(typeof window.renderStyleSections!=='function')throw new Error('Style bundle did not initialise');
    });
}

function vvInstallCountFix(){
  if(typeof window.renderConsiderations==='function'&&!window.renderConsiderations.__vvStartSync){
    var original=window.renderConsiderations;
    window.renderConsiderations=function(){var out=original.apply(this,arguments);if(typeof window.renderStart==='function')window.renderStart();return out;};
    window.renderConsiderations.__vvStartSync=true;
  }
  if(typeof window.renderStart==='function')window.renderStart();
}

window.addEventListener('load',function(){
  vvRecoverApp2().then(function(){
    if(typeof window.renderVenueFilters==='function')window.renderVenueFilters();
    if(typeof window.renderVenues==='function')window.renderVenues();
    if(typeof window.renderStyleSections==='function')window.renderStyleSections();
    vvInstallCountFix();

    /* These depend on the recovered style renderer, so load them afterwards. */
    return vvLoadScript('js/style-gallery-enhancements.js?v=20260910-6')
      .then(function(){return vvLoadScript('js/category-custom-styles.js?v=20260910-6');})
      .then(function(){return vvLoadScript('js/mobile-app.js?v=20260910-6');})
      .then(function(){return vvLoadScript('js/mobile-and-style-fixes.js?v=20260910-6');});
  }).catch(function(err){console.error('Villa & Vow bootstrap error',err);});
  setTimeout(vvInstallCountFix,1200);
});
