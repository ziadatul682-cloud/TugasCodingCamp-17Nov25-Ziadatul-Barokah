// theme toggle + persist
const modeBtn = document.getElementById('mode-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('pw_mode'); // 'dark' or 'light'
if(saved === 'dark') document.body.classList.add('dark');

modeBtn && modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const now = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('pw_mode', now);
});

// Welcome dynamic (from localStorage.userEmail) - fallback "Tamu"
(function updateWelcome(){
  const email = localStorage.getItem('userEmail') || '';
  const name = email ? email.split('@')[0] : 'Tamu';
  const pretty = name ? (name.charAt(0).toUpperCase() + name.slice(1)) : 'Tamu';
  const el = document.getElementById('hero-welcome');
  if(el) el.textContent = `Welcome, ${pretty} di PT Atma Wijaya`;
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    if(!id || id === '#') return;
    const target = document.querySelector(id);
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* === Simple login modal behavior (no backend) === */
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const loginClose = document.getElementById('login-close');
const loginForm = document.getElementById('login-form');
const loginAnon = document.getElementById('login-anon');

loginBtn && loginBtn.addEventListener('click', ()=> loginModal && loginModal.setAttribute('aria-hidden','false'));
loginClose && loginClose.addEventListener('click', ()=> loginModal && loginModal.setAttribute('aria-hidden','true'));

loginForm && loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const em = document.getElementById('login-email').value;
  // If Firebase is set up, you can replace this block with signInWithEmailAndPassword
  // For demo: store into localStorage and update welcome
  localStorage.setItem('userEmail', em);
  updateWelcomeFromLocal();
  loginModal.setAttribute('aria-hidden','true');
});

loginAnon && loginAnon.addEventListener('click', ()=>{
  localStorage.setItem('userEmail','guest@atmawijaya.local');
  updateWelcomeFromLocal();
  loginModal && loginModal.setAttribute('aria-hidden','true');
});

/* === Welcome message logic (firebase-ready) === */
function updateWelcomeFromLocal(){
  // Prefer Firebase if available:
  if(window.firebaseAuthAvailable && window.getFirebaseUserEmail){
    const fbEmail = window.getFirebaseUserEmail();
    if(fbEmail){ setHeroWelcomeFromEmail(fbEmail); return; }
  }
  const email = localStorage.getItem('userEmail') || '';
  setHeroWelcomeFromEmail(email);
}

function setHeroWelcomeFromEmail(email){
  const name = email ? email.split('@')[0] : 'Tamu';
  const pretty = name ? (name.charAt(0).toUpperCase()+name.slice(1)) : 'Tamu';
  const el = document.getElementById('hero-welcome');
  if(el) el.textContent = `Welcome, ${pretty} di PT Atma Wijaya`;
}
updateWelcomeFromLocal();

/* === Optional: hook for Firebase Auth integration ===
   If you add firebase.js that exports onAuthStateChanged & getAuthUserEmail,
   set window.firebaseAuthAvailable = true and implement window.getFirebaseUserEmail to return email.
   Example in 'firebase.js' (module) you can call: window.firebaseAuthAvailable = true; window.getFirebaseUserEmail = () => auth.currentUser?.email || null;
*/

/* === Accessibility: close modal with Esc === */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    modal && modal.setAttribute('aria-hidden','true');
    loginModal && loginModal.setAttribute('aria-hidden','true');
  }
});
