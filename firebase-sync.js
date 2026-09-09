/* Villa & Vow shared Firebase sync
   Uses Firebase Auth + Firestore while preserving the existing Claude-style db API
   expected by the planner code. */
(function(){
  'use strict';

  const firebaseConfig = {
    apiKey: 'AIzaSyDnQSdLpgV1vgTRlcBjqIIwf7xHiSzea3Y',
    authDomain: 'villa-vow.firebaseapp.com',
    projectId: 'villa-vow',
    storageBucket: 'villa-vow.firebasestorage.app',
    messagingSenderId: '65197840335',
    appId: '1:65197840335:web:360890c8235776ca19e4ba'
  };

  let firebaseReady = null;
  let auth = null;
  let firestore = null;
  let initialAuthResolved = false;
  let initialUser = null;

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const existing = Array.from(document.scripts).find(s=>s.src===src);
      if(existing){
        if(existing.dataset.loaded==='1') return resolve();
        existing.addEventListener('load', resolve, {once:true});
        existing.addEventListener('error', reject, {once:true});
        return;
      }
      const s=document.createElement('script');
      s.src=src;
      s.async=false;
      s.addEventListener('load',()=>{s.dataset.loaded='1';resolve();},{once:true});
      s.addEventListener('error',reject,{once:true});
      document.head.appendChild(s);
    });
  }

  async function ensureFirebase(){
    if(firebaseReady) return firebaseReady;
    firebaseReady=(async()=>{
      await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
      await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js');
      await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js');
      if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      auth=firebase.auth();
      firestore=firebase.firestore();
      await new Promise(resolve=>{
        const stop=auth.onAuthStateChanged(user=>{
          initialUser=user||null;
          initialAuthResolved=true;
          stop();
          resolve();
        },()=>{ initialAuthResolved=true; resolve(); });
      });
      installAuthUi();
      return {auth,firestore};
    })();
    return firebaseReady;
  }

  async function ensureWeddingSeed(db){
    const setupRef=db.collection('meta').doc('setup');
    const setup=await setupRef.get();
    if(setup.exists) return;

    // These constants are defined by app-1.js before initDb() calls this function.
    if(typeof SEED_TODOS==='undefined' || typeof SEED_CONSIDERATIONS==='undefined' || typeof SEED_BUDGET==='undefined') return;

    const batch=db.batch();
    SEED_TODOS.forEach(([category,text],i)=>{
      batch.set(db.collection('todos').doc('seed-todo-'+i), {category,text,done:false,order:i});
    });
    SEED_CONSIDERATIONS.forEach(([category,text],i)=>{
      batch.set(db.collection('considerations').doc('seed-consid-'+i), {category,text,done:false,order:i});
    });
    SEED_BUDGET.forEach((row,i)=>{
      batch.set(db.collection('budget').doc('seed-budget-'+i), Object.assign({},row,{order:i}));
    });
    batch.set(setupRef,{seeded:true,seededAt:firebase.firestore.FieldValue.serverTimestamp(),version:1});
    await batch.commit();
  }

  function installAuthUi(){
    if(document.getElementById('vvAuthBox')) return;
    const box=document.createElement('div');
    box.id='vvAuthBox';
    box.style.cssText='position:fixed;right:18px;top:16px;z-index:9999;background:rgba(255,253,250,.96);border:1px solid rgba(84,66,65,.16);box-shadow:0 8px 28px rgba(44,35,35,.10);border-radius:14px;padding:9px 11px;font:12px Karla,system-ui,sans-serif;color:#493f3e;display:flex;align-items:center;gap:8px;max-width:min(360px,calc(100vw - 36px));';
    box.innerHTML='<span id="vvAuthText">Checking shared sync…</span><button id="vvAuthButton" type="button" style="border:0;border-radius:999px;padding:7px 10px;background:#6d3f4b;color:white;font:600 11px Karla,system-ui,sans-serif;cursor:pointer;white-space:nowrap">Sign in</button>';
    document.body.appendChild(box);
    updateAuthUi(auth.currentUser);
    auth.onAuthStateChanged(updateAuthUi);
  }

  function updateAuthUi(user){
    const text=document.getElementById('vvAuthText');
    const btn=document.getElementById('vvAuthButton');
    if(!text||!btn) return;
    if(user){
      text.textContent='Shared as '+(user.email||user.displayName||'Google user');
      btn.textContent='Sign out';
      btn.onclick=async()=>{ await auth.signOut(); location.reload(); };
    }else{
      text.textContent='Sign in to share edits';
      btn.textContent='Continue with Google';
      btn.onclick=async()=>{
        try{
          const provider=new firebase.auth.GoogleAuthProvider();
          provider.setCustomParameters({prompt:'select_account'});
          await auth.signInWithPopup(provider);
          location.reload();
        }catch(err){
          if(err && (err.code==='auth/popup-blocked'||err.code==='auth/cancelled-popup-request')){
            const provider=new firebase.auth.GoogleAuthProvider();
            await auth.signInWithRedirect(provider);
          }else if(err && err.code!=='auth/popup-closed-by-user'){
            alert('Google sign-in could not start. '+(err.message||''));
          }
        }
      };
    }
  }

  const existingClaude=window.claude||{};
  const existingUse=typeof existingClaude.use==='function' ? existingClaude.use.bind(existingClaude) : null;
  window.claude=existingClaude;
  window.claude.use=async function(name){
    if(name==='db'){
      try{
        const services=await ensureFirebase();
        if(!services.auth.currentUser) return null;
        await ensureWeddingSeed(services.firestore);
        return services.firestore;
      }catch(err){
        console.error('Villa & Vow Firebase sync error:',err);
        return null;
      }
    }
    if(existingUse) return existingUse(name);
    return null;
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>ensureFirebase().catch(console.error),{once:true});
  }else{
    ensureFirebase().catch(console.error);
  }
})();
