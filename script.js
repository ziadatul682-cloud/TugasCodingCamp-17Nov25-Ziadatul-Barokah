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
