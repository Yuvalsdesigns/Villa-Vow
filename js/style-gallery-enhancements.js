/* Villa & Vow Style Gallery DOM fixes.
   This version patches the rendered gallery directly so it still works even
   when app-2 has to be recovered at runtime. */
(function(){
  'use strict';

  const replacements = {
    'Classic tuxedo': {
      image:'https://www.alandavid.com/wp-content/uploads/2020/08/black-tie-wedding-tuxedo.jpg'
    },
    'Wildflower / loose': {
      image:'https://cdn0.hitched.co.uk/article/1807/original/1920/jpg/67081-wildflower-bouquet-pastel.jpeg'
    },
    'Tuscan rustic-elegant': {
      image:'https://cdn0.matrimonio.com/vendor/4259/3_2/1280/jpg/an209882_2_164259-167154925342839.jpeg'
    },
    'Classic letterpress': {
      image:'https://i.etsystatic.com/11733467/r/il/2fbca6/5749958983/il_1080xN.5749958983_qqr3.jpg'
    },
    'Mini party dress': {
      label:'Short bridal mini',
      desc:'Still unmistakably bridal in white or ivory, but lighter, shorter and much easier to dance in.',
      image:'https://www.oliviabottega.com/cdn/shop/files/373A2851_ff1e0993-4edc-446d-ace8-49d91d5b4505.jpg?v=1724101194&width=1024'
    },
    'Silk slip dress': {
      label:'Fluid satin slip',
      desc:'A soft white or ivory slip dress that keeps the wedding feeling while removing weight and structure.',
      image:'https://i.etsystatic.com/62002792/r/il/1768fe/7925049893/il_794xN.7925049893_mp2m.jpg'
    },
    'Bridal jumpsuit': {
      label:'White bridal jumpsuit / two-piece',
      desc:'A clean ivory tailoring option with room to move, especially good if you want trousers for the late-night party.',
      image:'https://weddingwild.b-cdn.net/from-ceremony-to-after-party-the-best-bridal-jumpsuits/dancing-bride-jumpsuit-wedding-reception-7ym9e__w672.webp'
    },
    'Embellished party dress': {
      label:'Tea-length bridal dress',
      desc:'A mid-calf white wedding look with less volume and no train, so you can move comfortably without losing the bridal silhouette.',
      image:'https://assets-hvmag-com.s3-accelerate.amazonaws.com/2023/05/whvw_image002_2005507.jpg'
    },
    'Dancing shoes': {
      label:'Comfortable bridal flats',
      desc:'White or ivory flats, low heels or elegant bridal sneakers for dancing without changing the overall wedding palette.',
      image:'https://www.etienne.ro/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/b/a/balerini-de-mireasa-albi-classic-etiennebridal-2_1.jpg'
    }
  };

  function patchGallery(){
    const root=document.getElementById('styleSections');
    if(!root || !root.querySelector('.style-card')) return false;

    root.querySelectorAll('.style-section').forEach(section=>{
      const heading=section.querySelector('.style-head h3');
      if(heading && heading.textContent.trim()==='Second Look / Party Outfit'){
        heading.textContent='Second Look / Reception Outfit';
      }
    });

    root.querySelectorAll('.style-card').forEach(card=>{
      const h=card.querySelector('h5');
      if(!h) return;
      const original=h.textContent.trim();
      const cfg=replacements[original];
      if(!cfg) return;
      if(cfg.label) h.textContent=cfg.label;
      const p=card.querySelector('p');
      if(p && cfg.desc) p.textContent=cfg.desc;
      let img=card.querySelector('img.style-img');
      if(!img){
        img=document.createElement('img');
        img.className='style-img';
        const icon=card.querySelector('.style-icon');
        if(icon) icon.replaceWith(img); else card.insertBefore(img,card.firstChild);
      }
      img.src=cfg.image;
      img.alt=cfg.label||original;
      img.style.display='block';
      img.onerror=function(){
        this.style.display='none';
        const src=card.querySelector('.style-photo-source');
        if(src) src.textContent='Image unavailable';
      };
      const src=card.querySelector('.style-photo-source');
      if(src) src.textContent='Matching visual · '+(cfg.label||original);
    });

    const legacy=document.getElementById('vvCustomStylesSection');
    if(legacy) legacy.style.display='none';
    return true;
  }

  function start(){
    let tries=0;
    const timer=setInterval(function(){
      tries++;
      if(patchGallery() || tries>120) clearInterval(timer);
    },100);

    const root=document.getElementById('styleSections');
    if(root && !root.__vvImageObserver){
      root.__vvImageObserver=true;
      let t;
      new MutationObserver(function(){
        clearTimeout(t);
        t=setTimeout(patchGallery,30);
      }).observe(root,{childList:true,subtree:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
