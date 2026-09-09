/* Villa & Vow Style Gallery enhancements
   - correct matching imagery
   - bridal second-look direction
   - shared custom style uploads via Firestore */
(function(){
  'use strict';

  var customStyles=[];
  var customUnsub=null;
  var pendingCustomImage='';

  function waitForGallery(){
    if(typeof STYLE_PHOTOS==='undefined' || typeof STYLE_SECTIONS==='undefined' || typeof renderStyleSections!=='function'){
      setTimeout(waitForGallery,50);
      return;
    }

    /* Correct / replace broken or mismatched built-in images. */
    STYLE_PHOTOS.suitTux='https://thechichbride.com/wp-content/uploads/2024/12/Wedding_Outfit_For_Groom_00011_.jpg';
    STYLE_PHOTOS.flowerWild='https://i.pinimg.com/originals/05/a0/32/05a03292dd8a31bfa5a377934b14c001.png';
    STYLE_PHOTOS.venueTuscany='https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzU3NzYyOTgxNjc4OTI5OTUx/original/561ed566-1289-4ebf-a28b-129113469e3e.jpeg';
    STYLE_PHOTOS.inviteLetterpress='https://i.etsystatic.com/11733467/r/il/2fbca6/5749958983/il_1080xN.5749958983_qqr3.jpg';

    /* Keep the second look bridal, just lighter and easier to dance in. */
    STYLE_PHOTOS.secondMini='https://www.oliviabottega.com/cdn/shop/files/373A2851_ff1e0993-4edc-446d-ace8-49d91d5b4505.jpg?v=1724101194&width=1024';
    STYLE_PHOTOS.secondSlip='https://i.etsystatic.com/62002792/r/il/1768fe/7925049893/il_794xN.7925049893_mp2m.jpg';
    STYLE_PHOTOS.secondJumpsuit='https://weddingwild.b-cdn.net/from-ceremony-to-after-party-the-best-bridal-jumpsuits/dancing-bride-jumpsuit-wedding-reception-7ym9e__w672.webp';
    STYLE_PHOTOS.secondSparkle='https://assets-hvmag-com.s3-accelerate.amazonaws.com/2023/05/whvw_image002_2005507.jpg';
    STYLE_PHOTOS.secondShoes='https://www.etienne.ro/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/b/a/balerini-de-mireasa-albi-classic-etiennebridal-2_1.jpg';

    var second=STYLE_SECTIONS.find(function(s){return /^Second Look/i.test(s.title);});
    if(second){
      second.title='Second Look / Reception Outfit';
      second.tint='brass';
      second.items=[
        ['secondMini','Short bridal mini','Still unmistakably bridal in white or ivory, but lighter, shorter and much easier to dance in.'],
        ['secondSlip','Fluid satin slip','A soft white or ivory slip dress that keeps the wedding feeling while removing weight and structure.'],
        ['secondJumpsuit','White bridal jumpsuit / two-piece','A clean ivory tailoring option with room to move, especially good if you want trousers for the late-night party.'],
        ['secondSparkle','Tea-length bridal dress','A mid-calf white wedding look with less volume and no train, so you can move comfortably without losing the bridal silhouette.'],
        ['secondShoes','Comfortable bridal flats','White or ivory flats, low heels or elegant bridal sneakers for dancing without changing the overall wedding palette.']
      ];
    }

    /* Re-render once so the corrected references are visible immediately. */
    renderStyleSections();
    installCustomStyleSection();
    startCustomStyleSync();
    patchConsiderationDashboard();
  }

  function patchConsiderationDashboard(){
    if(typeof renderConsiderations!=='function' || renderConsiderations.__vvDashboardPatch) return;
    var original=renderConsiderations;
    renderConsiderations=function(){
      var result=original.apply(this,arguments);
      if(typeof renderStart==='function') renderStart();
      return result;
    };
    renderConsiderations.__vvDashboardPatch=true;
    if(typeof renderStart==='function') renderStart();
  }

  function installCustomStyleSection(){
    var wrap=document.getElementById('styleSections');
    if(!wrap) return;
    var existing=document.getElementById('vvCustomStylesSection');
    if(existing) existing.remove();

    var section=document.createElement('div');
    section.className='style-section vv-custom-style-section';
    section.id='vvCustomStylesSection';
    section.innerHTML=
      '<div class="style-head"><div><h3>Your own styles</h3><p class="vv-custom-intro">Drag in a reference image and save it with the same kind of name, description and category as the built-in gallery.</p></div></div>'+
      '<div class="vv-style-builder card">'+
        '<div class="vv-style-drop" id="vvStyleDrop"><strong>Drop an image here</strong><span>or tap to choose from your phone/computer</span><input id="vvStyleFile" type="file" accept="image/*" hidden></div>'+
        '<div class="vv-style-preview" id="vvStylePreviewWrap" style="display:none"><img id="vvStylePreview" alt="Custom style preview"></div>'+
        '<div class="vv-style-fields">'+
          '<label class="field">Category<select id="vvStyleCategory">'+categoryOptions()+'</select></label>'+
          '<label class="field">Style name<input id="vvStyleName" type="text" placeholder="e.g. Silk halter second look"></label>'+
          '<label class="field vv-style-description">Description<textarea id="vvStyleDescription" placeholder="What you like about it, where it could work, fabric, silhouette, details…"></textarea></label>'+
        '</div>'+
        '<div class="vv-style-actions"><button class="btn primary" id="vvSaveStyle" disabled>+ Add style</button><span id="vvStyleStatus"></span></div>'+
      '</div>'+
      '<div class="style-grid" id="vvCustomStyleGrid"></div>';
    wrap.appendChild(section);

    var drop=document.getElementById('vvStyleDrop');
    var input=document.getElementById('vvStyleFile');
    drop.addEventListener('click',function(){input.click();});
    input.addEventListener('change',function(){if(input.files&&input.files[0]) readCustomFile(input.files[0]);});
    ['dragenter','dragover'].forEach(function(evt){drop.addEventListener(evt,function(e){e.preventDefault();drop.classList.add('drag');});});
    ['dragleave','drop'].forEach(function(evt){drop.addEventListener(evt,function(e){e.preventDefault();drop.classList.remove('drag');});});
    drop.addEventListener('drop',function(e){
      var f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];
      if(f && /^image\//.test(f.type)) return readCustomFile(f);
      var url=(e.dataTransfer&&e.dataTransfer.getData('text/uri-list')) || (e.dataTransfer&&e.dataTransfer.getData('text/plain')) || '';
      if(/^https?:\/\//i.test(url.trim())) setCustomImage(url.trim());
    });
    document.getElementById('vvSaveStyle').addEventListener('click',saveCustomStyle);
    renderCustomStyles();
  }

  function categoryOptions(){
    return ['Dress silhouettes','Second Look / Reception Outfit',"Partner's attire",'Flowers & bouquet styles','Venue mood','Hair styles','Makeup looks','Shoes','Invitation styles','Décor & tablescape','Other']
      .map(function(x){return '<option value="'+escapeText(x)+'">'+escapeText(x)+'</option>';}).join('');
  }

  function readCustomFile(file){
    var status=document.getElementById('vvStyleStatus');
    if(!file || !/^image\//.test(file.type)){if(status)status.textContent='Please choose an image file.';return;}
    var reader=new FileReader();
    reader.onload=function(e){
      var img=new Image();
      img.onload=function(){
        var max=1100, scale=Math.min(1,max/Math.max(img.width,img.height));
        var c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);
        c.getContext('2d').drawImage(img,0,0,c.width,c.height);
        var q=.82,url=c.toDataURL('image/jpeg',q);
        while(url.length>420000 && q>.42){q-=.1;url=c.toDataURL('image/jpeg',q);}
        if(url.length>500000){if(status)status.textContent='That image is too large. Try a smaller photo.';return;}
        setCustomImage(url);
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function setCustomImage(url){
    pendingCustomImage=url;
    var wrap=document.getElementById('vvStylePreviewWrap'),img=document.getElementById('vvStylePreview'),save=document.getElementById('vvSaveStyle');
    if(img)img.src=url;if(wrap)wrap.style.display='block';if(save)save.disabled=false;
    var status=document.getElementById('vvStyleStatus');if(status)status.textContent='';
  }

  function saveCustomStyle(){
    var name=document.getElementById('vvStyleName').value.trim();
    var description=document.getElementById('vvStyleDescription').value.trim();
    var category=document.getElementById('vvStyleCategory').value;
    var status=document.getElementById('vvStyleStatus');
    if(!pendingCustomImage){status.textContent='Add an image first.';return;}
    if(!name){status.textContent='Give the style a name.';return;}
    var data={name:name,description:description,category:category,image:pendingCustomImage,createdAt:Date.now()};
    if(typeof dbReady!=='undefined' && dbReady && typeof db!=='undefined' && db){
      status.textContent='Saving…';
      db.collection('customStyles').add(data).then(function(){resetBuilder();status.textContent='Saved for both of you.';setTimeout(function(){status.textContent='';},1800);}).catch(function(err){console.error(err);status.textContent='Could not save this style.';});
    }else{
      data.id='local-style-'+Date.now();customStyles.unshift(data);resetBuilder();renderCustomStyles();status.textContent='Saved on this device only until shared sync reconnects.';
    }
  }

  function resetBuilder(){
    pendingCustomImage='';
    var file=document.getElementById('vvStyleFile');if(file)file.value='';
    var name=document.getElementById('vvStyleName');if(name)name.value='';
    var desc=document.getElementById('vvStyleDescription');if(desc)desc.value='';
    var prev=document.getElementById('vvStylePreviewWrap');if(prev)prev.style.display='none';
    var save=document.getElementById('vvSaveStyle');if(save)save.disabled=true;
  }

  function startCustomStyleSync(){
    if(customUnsub) return;
    var tries=0;
    var timer=setInterval(function(){
      tries++;
      if(typeof dbReady!=='undefined' && dbReady && typeof db!=='undefined' && db){
        clearInterval(timer);
        customUnsub=db.collection('customStyles').orderBy('createdAt','desc').onSnapshot(function(snap){
          customStyles=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
          renderCustomStyles();
        },function(err){console.error('Custom style sync error',err);});
      }else if(tries>60){clearInterval(timer);}
    },500);
  }

  function renderCustomStyles(){
    var grid=document.getElementById('vvCustomStyleGrid');if(!grid)return;
    grid.innerHTML='';
    if(!customStyles.length){grid.innerHTML='<div class="empty-board vv-style-empty">Your saved styles will appear here.</div>';return;}
    customStyles.forEach(function(s){
      var card=document.createElement('div');card.className='style-card vv-custom-style-card';
      card.innerHTML='<img class="style-img" src="'+escapeText(s.image||'')+'" alt="'+escapeText(s.name||'Custom style')+'">'+
        '<div class="style-photo-source">Your style · '+escapeText(s.category||'Other')+'</div><h5>'+escapeText(s.name||'Untitled')+'</h5><p>'+escapeText(s.description||'')+'</p>'+
        '<div class="vv-custom-buttons"><button class="btn small vv-pin-custom">Pin this</button><button class="btn small ghost vv-delete-custom">Delete</button></div>';
      card.querySelector('.vv-pin-custom').addEventListener('click',function(){
        var tag=tagForCategory(s.category);
        var data={type:'photo',imageDataUrl:s.image,title:s.name,note:s.description||'',tag:tag,createdAt:Date.now()};
        if(typeof dbReady!=='undefined'&&dbReady&&db)db.collection('pinboard').add(data);else if(typeof state!=='undefined'){localAdd(state.pins,data);renderBoard();renderStart();}
        if(typeof showTab==='function')showTab('board');
      });
      card.querySelector('.vv-delete-custom').addEventListener('click',function(){
        if(!confirm('Delete this custom style?'))return;
        if(typeof dbReady!=='undefined'&&dbReady&&db&&s.id)db.collection('customStyles').doc(s.id).delete();
        else {customStyles=customStyles.filter(function(x){return x.id!==s.id;});renderCustomStyles();}
      });
      grid.appendChild(card);
    });
  }

  function tagForCategory(cat){
    var c=(cat||'').toLowerCase();
    if(c.includes('dress')||c.includes('second'))return 'dress';
    if(c.includes('partner'))return 'suit';
    if(c.includes('flower'))return 'flowers';
    if(c.includes('venue')||c.includes('décor'))return 'venue';
    if(c.includes('hair'))return 'hair';
    if(c.includes('makeup'))return 'makeup';
    if(c.includes('invitation'))return 'stationery';
    return 'other';
  }

  function escapeText(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

  var css=document.createElement('style');
  css.textContent=`
    .vv-custom-style-section{margin-top:38px;padding-top:28px;border-top:1px solid var(--line);}
    .vv-custom-intro{font-size:12.5px;color:var(--ink-soft);margin-top:4px;}
    .vv-style-builder{padding:16px;margin:12px 0 18px;}
    .vv-style-drop{border:1.5px dashed var(--line);border-radius:12px;padding:22px;text-align:center;cursor:pointer;background:var(--surface-2);display:flex;flex-direction:column;gap:4px;color:var(--ink-soft);}
    .vv-style-drop strong{color:var(--ink);font-size:14px}.vv-style-drop span{font-size:11.5px}.vv-style-drop.drag{border-color:var(--brass);background:var(--brass-soft);}
    .vv-style-preview{margin-top:12px}.vv-style-preview img{width:100%;max-height:310px;object-fit:contain;border-radius:10px;background:var(--surface-2);}
    .vv-style-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.vv-style-description{grid-column:1/-1;}
    .vv-style-actions{display:flex;align-items:center;gap:10px;margin-top:12px}.vv-style-actions span{font-size:11.5px;color:var(--ink-soft);}
    .vv-custom-buttons{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}.vv-style-empty{grid-column:1/-1;padding:28px;}
    .style-section:has(.style-head h3){scroll-margin-top:20px;}
    @media(max-width:680px){.vv-style-fields{grid-template-columns:1fr}.vv-style-description{grid-column:auto;}}
  `;
  document.head.appendChild(css);

  if(document.readyState==='complete') waitForGallery();
  else window.addEventListener('load',waitForGallery,{once:true});
})();
