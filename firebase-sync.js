/* Villa & Vow shared Firebase sync */
(function(){
  'use strict';
  const firebaseConfig={apiKey:'AIzaSyDnQSdLpgV1vgTRlcBjqIIwf7xHiSzea3Y',authDomain:'villa-vow.firebaseapp.com',projectId:'villa-vow',storageBucket:'villa-vow.firebasestorage.app',messagingSenderId:'65197840335',appId:'1:65197840335:web:360890c8235776ca19e4ba'};
  let firebaseReady=null,auth=null,firestore=null;
  const PLANNER_WORKER_URL='https://villa-vow.yuvalsh99.workers.dev';
  function loadScript(src){return new Promise((resolve,reject)=>{const existing=Array.from(document.scripts).find(s=>s.src===src);if(existing){if(existing.dataset.loaded==='1')return resolve();existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});return;}const s=document.createElement('script');s.src=src;s.async=false;s.addEventListener('load',()=>{s.dataset.loaded='1';resolve();},{once:true});s.addEventListener('error',reject,{once:true});document.head.appendChild(s);});}
  async function ensureFirebase(){if(firebaseReady)return firebaseReady;firebaseReady=(async()=>{await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js');await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js');if(!firebase.apps.length)firebase.initializeApp(firebaseConfig);auth=firebase.auth();firestore=firebase.firestore();await new Promise(resolve=>{const stop=auth.onAuthStateChanged(()=>{stop();resolve();},()=>resolve());});installAuthUi();return{auth,firestore};})();return firebaseReady;}
  async function ensureWeddingSeed(db){const setupRef=db.collection('meta').doc('setup');const setup=await setupRef.get();if(setup.exists)return;if(typeof SEED_TODOS==='undefined'||typeof SEED_CONSIDERATIONS==='undefined'||typeof SEED_BUDGET==='undefined')return;const batch=db.batch();SEED_TODOS.forEach(([category,text],i)=>batch.set(db.collection('todos').doc('seed-todo-'+i),{category,text,done:false,order:i}));SEED_CONSIDERATIONS.forEach(([category,text],i)=>batch.set(db.collection('considerations').doc('seed-consid-'+i),{category,text,done:false,order:i}));SEED_BUDGET.forEach((row,i)=>batch.set(db.collection('budget').doc('seed-budget-'+i),Object.assign({},row,{order:i})));batch.set(setupRef,{seeded:true,seededAt:firebase.firestore.FieldValue.serverTimestamp(),version:1});await batch.commit();}
  function installAuthUi(){if(document.getElementById('vvAuthBox'))return;const box=document.createElement('div');box.id='vvAuthBox';box.style.cssText='position:fixed;right:18px;top:16px;z-index:9999;background:rgba(255,253,250,.98);border:1px solid rgba(84,66,65,.16);box-shadow:0 8px 28px rgba(44,35,35,.10);border-radius:14px;padding:9px 11px;font:12px Karla,system-ui,sans-serif;color:#493f3e;max-width:min(390px,calc(100vw - 36px));';document.body.appendChild(box);updateAuthUi(auth.currentUser);auth.onAuthStateChanged(updateAuthUi);}
  function updateAuthUi(user){const box=document.getElementById('vvAuthBox');if(!box)return;if(user){box.innerHTML='<div style="display:flex;align-items:center;gap:8px"><span>Shared as '+escapeHtml(user.email||'signed-in user')+'</span><button id="vvSignOut" type="button" style="border:0;border-radius:999px;padding:7px 10px;background:#6d3f4b;color:white;font:600 11px Karla;cursor:pointer">Sign out</button></div>';document.getElementById('vvSignOut').onclick=async()=>{await auth.signOut();location.reload();};}else{box.innerHTML='<div style="font-weight:600;margin-bottom:6px">Sign in to share edits</div><div style="display:flex;gap:6px;flex-wrap:wrap"><input id="vvEmail" type="email" placeholder="Email" autocomplete="email" style="width:175px;padding:7px;border:1px solid #d8cfcb;border-radius:8px"><input id="vvPassword" type="password" placeholder="Password" autocomplete="current-password" style="width:130px;padding:7px;border:1px solid #d8cfcb;border-radius:8px"><button id="vvEmailSignIn" type="button" style="border:0;border-radius:999px;padding:7px 10px;background:#6d3f4b;color:white;font:600 11px Karla;cursor:pointer">Sign in</button></div><div style="margin-top:6px"><button id="vvReset" type="button" style="border:0;background:none;padding:0;color:#6d3f4b;text-decoration:underline;cursor:pointer;font:11px Karla">Forgot password?</button></div>';document.getElementById('vvEmailSignIn').onclick=emailSignIn;document.getElementById('vvReset').onclick=resetPassword;}}
  function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  async function emailSignIn(){const email=document.getElementById('vvEmail').value.trim();const password=document.getElementById('vvPassword').value;if(!email||!password)return alert('Enter your email and password.');try{await auth.signInWithEmailAndPassword(email,password);location.reload();}catch(err){alert('Sign-in failed. Check the email/password, or make sure this account has been created in Firebase Authentication.');}}
  async function resetPassword(){const email=document.getElementById('vvEmail').value.trim();if(!email)return alert('Enter your email first, then click Forgot password.');try{await auth.sendPasswordResetEmail(email);alert('Password reset email sent.');}catch(err){alert('Could not send the reset email. Make sure the account exists.');}}
  const existingClaude=window.claude||{};const existingUse=typeof existingClaude.use==='function'?existingClaude.use.bind(existingClaude):null;window.claude=existingClaude;window.claude.use=async function(name){
    if(name==='db'){try{const services=await ensureFirebase();if(!services.auth.currentUser)return null;await ensureWeddingSeed(services.firestore);return services.firestore;}catch(err){console.error('Villa & Vow Firebase sync error:',err);return null;}}
    if(name==='sample'){
      try{
        const services=await ensureFirebase();
        if(!services.auth.currentUser)return null;
        return async function(turns,opts){
          const idToken=await services.auth.currentUser.getIdToken();
          const messages=turns.filter(t=>t.role==='user'||t.role==='assistant').map(t=>({role:t.role,content:t.content}));
          const resp=await fetch(PLANNER_WORKER_URL,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+idToken},body:JSON.stringify({messages})});
          const data=await resp.json();
          if(!resp.ok)throw Object.assign(new Error(data.error||'planner request failed'),{code:resp.status});
          const text=data.text||'';
          if(opts&&typeof opts.onText==='function')opts.onText({text});
          return{text};
        };
      }catch(err){console.error('Villa & Vow planner sync error:',err);return null;}
    }
    if(existingUse)return existingUse(name);return null;
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>ensureFirebase().catch(console.error),{once:true});else ensureFirebase().catch(console.error);
})();
