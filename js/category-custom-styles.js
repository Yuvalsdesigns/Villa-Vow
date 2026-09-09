/* Villa & Vow: add custom styles directly inside each Style Gallery category. */
(function(){
  'use strict';
  var customStyles=[];
  var subscribed=false;
  var activeCategory='';
  var pendingImage='';

  function wait(){
    if(typeof renderStyleSections!=='function' || !document.getElementById('styleSections')){setTimeout(wait,60);return;}
    hideLegacySection();
    decorateCategories();
    subscribe();
    observeGallery();
  }

  function hideLegacySection(){
    var legacy=document.getElementById('vvCustomStylesSection');
    if(legacy) legacy.style.display='none';
  }

  function categorySections(){
    return Array.from(document.querySelectorAll('#styleSections > .style-section')).filter(function(sec){
      var h=sec.querySelector('.style-head h3');
      if(!h) return false;
      var title=h.textContent.trim();
      return title && title!=='Beauty countdown' && title!=='Your own styles';
    });
  }

  function decorateCategories(){
    hideLegacySection();
    categorySections().forEach(function(sec){
      var head=sec.querySelector('.style-head');
      var h=head&&head.querySelector('h3');
      var grid=sec.querySelector('.style-grid');
      if(!head||!h||!grid) return;
      var category=h.textContent.trim();
      sec.dataset.vvCategory=category;
      if(!head.querySelector('.vv-add-style-category')){
        var btn=document.createElement('button');
        btn.type='button';btn.className='btn small vv-add-style-category';btn.textContent='+ Add style';
        btn.addEventListener('click',function(){openModal(category);});
        head.appendChild(btn);
      }
      renderCategoryCustom(sec,grid,category);
    });
  }

  function renderCategoryCustom(sec,grid,category){
    grid.querySelectorAll('.vv-category-custom-card').forEach(function(x){x.remove();});
    customStyles.filter(function(s){return normalize(s.category)===normalize(category);}).forEach(function(s){
      var card=document.createElement('div');card.className='style-card vv-category-custom-card';
      card.innerHTML='<img class="style-img" src="'+escText(s.image||'')+'" alt="'+escText(s.name||'Custom style')+'">'+
        '<div class="style-photo-source">Your style</div><h5>'+escText(s.name||'Untitled')+'</h5><p>'+escText(s.description||'')+'</p>'+
        '<div class="vv-category-custom-actions"><button class="btn small vv-pin">Pin this</button><button class="btn small ghost vv-delete">Delete</button></div>';
      card.querySelector('.vv-pin').addEventListener('click',function(){
        var data={type:'photo',imageDataUrl:s.image,title:s.name,note:s.description||'',tag:tagForCategory(category),createdAt:Date.now()};
        if(typeof dbReady!=='undefined'&&dbReady&&typeof db!=='undefined'&&db) db.collection('pinboard').add(data);
        else if(typeof state!=='undefined'){localAdd(state.pins,data);renderBoard();renderStart();}
        if(typeof showTab==='function') showTab('board');
      });
      card.querySelector('.vv-delete').addEventListener('click',function(){
        if(!confirm('Delete this style?')) return;
        if(typeof dbReady!=='undefined'&&dbReady&&typeof db!=='undefined'&&db&&s.id) db.collection('customStyles').doc(s.id).delete();
      });
      grid.appendChild(card);
    });
  }

  function normalize(v){
    var x=String(v||'').trim().toLowerCase();
    if(x==='second look / party outfit') x='second look / reception outfit';
    return x;
  }

  function subscribe(){
    if(subscribed) return;
    var attempts=0;
    var timer=setInterval(function(){
      attempts++;
      if(typeof dbReady!=='undefined'&&dbReady&&typeof db!=='undefined'&&db){
        clearInterval(timer);subscribed=true;
        db.collection('customStyles').orderBy('createdAt','desc').onSnapshot(function(snap){
          customStyles=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
          decorateCategories();
        },function(err){console.error('Category custom style sync error',err);});
      }else if(attempts>80) clearInterval(timer);
    },400);
  }

  function ensureModal(){
    var m=document.getElementById('vvCategoryStyleModal');if(m)return m;
    m=document.createElement('div');m.id='vvCategoryStyleModal';m.className='vv-cat-modal';
    m.innerHTML='<div class="vv-cat-modal-card">'+
      '<button type="button" class="vv-cat-close" aria-label="Close">×</button>'+
      '<div class="eyebrow">Add to <span id="vvCatLabel"></span></div><h3>Add your own style</h3>'+
      '<div class="vv-cat-drop" id="vvCatDrop"><strong>Drop an image here</strong><span>or tap to choose a photo</span><input id="vvCatFile" type="file" accept="image/*" hidden></div>'+
      '<div id="vvCatPreviewWrap" class="vv-cat-preview" style="display:none"><img id="vvCatPreview" alt="Style preview"></div>'+
      '<label class="field">Style name<input id="vvCatName" type="text" placeholder="e.g. Square-neck silk A-line"></label>'+
      '<label class="field">Description<textarea id="vvCatDesc" placeholder="What you like about it, fabric, silhouette, styling notes…"></textarea></label>'+
      '<div class="vv-cat-actions"><span id="vvCatStatus"></span><button type="button" class="btn primary" id="vvCatSave" disabled>Add style</button></div>'+
    '</div>';
    document.body.appendChild(m);
    m.querySelector('.vv-cat-close').onclick=closeModal;
    m.addEventListener('click',function(e){if(e.target===m)closeModal();});
    var drop=document.getElementById('vvCatDrop'),file=document.getElementById('vvCatFile');
    drop.onclick=function(){file.click();};
    file.onchange=function(){if(file.files&&file.files[0])readFile(file.files[0]);};
    ['dragenter','dragover'].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.add('drag');});});
    ['dragleave','drop'].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.remove('drag');});});
    drop.addEventListener('drop',function(e){var f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];if(f&&/^image\//.test(f.type))readFile(f);});
    document.getElementById('vvCatSave').onclick=save;
    return m;
  }

  function openModal(category){
    activeCategory=category;pendingImage='';
    var m=ensureModal();
    document.getElementById('vvCatLabel').textContent=category;
    document.getElementById('vvCatName').value='';document.getElementById('vvCatDesc').value='';document.getElementById('vvCatFile').value='';
    document.getElementById('vvCatPreviewWrap').style.display='none';document.getElementById('vvCatSave').disabled=true;document.getElementById('vvCatStatus').textContent='';
    m.classList.add('open');
  }
  function closeModal(){var m=document.getElementById('vvCategoryStyleModal');if(m)m.classList.remove('open');}

  function readFile(file){
    var status=document.getElementById('vvCatStatus');
    if(!file||!/^image\//.test(file.type)){status.textContent='Please choose an image.';return;}
    var r=new FileReader();r.onload=function(e){
      var img=new Image();img.onload=function(){
        var max=1100,scale=Math.min(1,max/Math.max(img.width,img.height));var c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);
        var q=.82,url=c.toDataURL('image/jpeg',q);while(url.length>420000&&q>.42){q-=.1;url=c.toDataURL('image/jpeg',q);}if(url.length>500000){status.textContent='Image is too large. Try a smaller one.';return;}
        pendingImage=url;document.getElementById('vvCatPreview').src=url;document.getElementById('vvCatPreviewWrap').style.display='block';document.getElementById('vvCatSave').disabled=false;status.textContent='';
      };img.src=e.target.result;
    };r.readAsDataURL(file);
  }

  function save(){
    var name=document.getElementById('vvCatName').value.trim(),desc=document.getElementById('vvCatDesc').value.trim(),status=document.getElementById('vvCatStatus');
    if(!pendingImage){status.textContent='Add an image first.';return;}if(!name){status.textContent='Give the style a name.';return;}
    if(typeof dbReady==='undefined'||!dbReady||typeof db==='undefined'||!db){status.textContent='Shared sync is not connected yet.';return;}
    status.textContent='Saving…';document.getElementById('vvCatSave').disabled=true;
    db.collection('customStyles').add({name:name,description:desc,category:activeCategory,image:pendingImage,createdAt:Date.now()}).then(function(){closeModal();}).catch(function(err){console.error(err);status.textContent='Could not save style.';document.getElementById('vvCatSave').disabled=false;});
  }

  function tagForCategory(cat){var c=(cat||'').toLowerCase();if(c.includes('dress')||c.includes('second'))return'dress';if(c.includes('partner'))return'suit';if(c.includes('flower'))return'flowers';if(c.includes('venue')||c.includes('décor'))return'venue';if(c.includes('hair'))return'hair';if(c.includes('makeup'))return'makeup';if(c.includes('invitation'))return'stationery';return'other';}
  function escText(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

  function observeGallery(){
    var root=document.getElementById('styleSections');if(!root||root.__vvCatObserved)return;root.__vvCatObserved=true;
    var t=null;new MutationObserver(function(){clearTimeout(t);t=setTimeout(function(){hideLegacySection();decorateCategories();},50);}).observe(root,{childList:true,subtree:true});
  }

  var css=document.createElement('style');css.textContent=`
    #vvCustomStylesSection{display:none!important}.vv-add-style-category{margin-left:auto;white-space:nowrap}.vv-category-custom-actions{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}
    .vv-cat-modal{position:fixed;inset:0;z-index:120;background:rgba(35,26,24,.48);display:none;align-items:center;justify-content:center;padding:18px}.vv-cat-modal.open{display:flex}.vv-cat-modal-card{position:relative;width:min(500px,100%);max-height:90vh;overflow:auto;background:var(--surface);border-radius:18px;padding:22px;box-shadow:var(--shadow-md);display:flex;flex-direction:column;gap:12px}.vv-cat-close{position:absolute;right:14px;top:10px;border:0;background:none;font-size:28px;color:var(--ink-faint);cursor:pointer}.vv-cat-drop{border:1.5px dashed var(--line);border-radius:12px;padding:24px;text-align:center;cursor:pointer;background:var(--surface-2);display:flex;flex-direction:column;gap:4px}.vv-cat-drop.drag{border-color:var(--brass);background:var(--brass-soft)}.vv-cat-drop span{font-size:11.5px;color:var(--ink-soft)}.vv-cat-preview img{display:block;width:100%;max-height:300px;object-fit:contain;border-radius:10px;background:var(--surface-2)}.vv-cat-actions{display:flex;justify-content:flex-end;align-items:center;gap:10px}.vv-cat-actions span{margin-right:auto;font-size:11.5px;color:var(--ink-soft)}
    @media(max-width:680px){.style-section .style-head{align-items:center!important}.vv-add-style-category{font-size:11px!important;padding:6px 8px!important}.vv-cat-modal{align-items:flex-end;padding:0}.vv-cat-modal-card{border-radius:20px 20px 0 0;max-height:88dvh;padding-bottom:calc(22px + env(safe-area-inset-bottom))}}
  `;document.head.appendChild(css);

  if(document.readyState==='complete')wait();else window.addEventListener('load',wait,{once:true});
})();
