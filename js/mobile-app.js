/* Villa & Vow mobile app shell */
(function(){
  'use strict';
  var mq=window.matchMedia('(max-width: 820px)');
  function icon(name){
    var paths={
      home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M9.5 20v-6h5v6"/>',
      check:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l1.5 1.5L12 7"/><path d="M14 8h3"/><path d="M8 14l1.5 1.5L12 13"/><path d="M14 14h3"/>',
      board:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 16l3-4 2 2 3-4 2 6"/><circle cx="9" cy="9" r="1"/>',
      venue:'<path d="M3 20h18"/><path d="M5 20V9l7-5 7 5v11"/><path d="M9 20v-6h6v6"/>',
      more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true">'+paths[name]+'</svg>';
  }
  function build(){
    if(!mq.matches || document.getElementById('vvMobileNav')) return;
    var nav=document.createElement('nav');nav.id='vvMobileNav';nav.setAttribute('aria-label','Wedding planner navigation');
    var primary=[['start','home','Home'],['todo','check','Checklist'],['board','board','Moodboard'],['venues','venue','Venues']];
    primary.forEach(function(x){
      var b=document.createElement('button');b.type='button';b.dataset.tab=x[0];b.innerHTML=icon(x[1])+'<span>'+x[2]+'</span>';
      b.addEventListener('click',function(){go(x[0]);});nav.appendChild(b);
    });
    var more=document.createElement('button');more.type='button';more.id='vvMoreButton';more.innerHTML=icon('more')+'<span>More</span>';more.addEventListener('click',openMore);nav.appendChild(more);
    document.body.appendChild(nav);

    var overlay=document.createElement('div');overlay.id='vvMobileMore';overlay.innerHTML='<div class="sheet"><div class="handle"></div></div>';
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeMore();});
    document.body.appendChild(overlay);
    var sheet=overlay.querySelector('.sheet');
    [['budget','Budget'],['style','Style Gallery'],['considerations','Things to Get'],['emails','Email Templates'],['guestapp','Guest App']].forEach(function(x){
      var b=document.createElement('button');b.type='button';b.textContent=x[1];b.addEventListener('click',function(){closeMore();go(x[0]);});sheet.appendChild(b);
    });
    syncActive();
  }
  function go(tab){
    if(typeof window.showTab==='function') window.showTab(tab);
    else {
      var view=document.getElementById('view-'+tab);
      if(view){document.querySelectorAll('.view').forEach(function(v){v.classList.remove('active');});view.classList.add('active');}
    }
    window.scrollTo({top:0,behavior:'smooth'});setTimeout(syncActive,30);
  }
  function openMore(){var o=document.getElementById('vvMobileMore');if(o)o.classList.add('open');}
  function closeMore(){var o=document.getElementById('vvMobileMore');if(o)o.classList.remove('open');}
  function syncActive(){
    var active=document.querySelector('.view.active');var id=active?active.id.replace('view-',''):'';
    document.querySelectorAll('#vvMobileNav button[data-tab]').forEach(function(b){b.classList.toggle('active',b.dataset.tab===id);});
    var more=document.getElementById('vvMoreButton');if(more)more.classList.toggle('active',['budget','style','considerations','emails','guestapp'].indexOf(id)>-1);
  }
  var observer=new MutationObserver(syncActive);
  function init(){build();document.querySelectorAll('.view').forEach(function(v){observer.observe(v,{attributes:true,attributeFilter:['class']});});}
  mq.addEventListener&&mq.addEventListener('change',function(){if(mq.matches)build();});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
