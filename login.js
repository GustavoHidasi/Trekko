/* ── Tab switching ── */
let currentTab = 'login';

function switchTab(tab) {
  if (tab === currentTab) return;

  const fromPanel = document.getElementById(currentTab + '-panel');
  const toPanel   = document.getElementById(tab + '-panel');
  const fromTab   = document.getElementById('tab-' + currentTab);
  const toTab     = document.getElementById('tab-' + tab);

  fromTab.classList.remove('active');
  toTab.classList.add('active');

  fromPanel.classList.add('exit');
  setTimeout(() => {
    fromPanel.style.display = 'none';
    fromPanel.classList.remove('exit');
    toPanel.style.display = 'block';
    toPanel.classList.add('enter');
    setTimeout(() => toPanel.classList.remove('enter'), 320);
    currentTab = tab;
  }, 200);
}

/* ── Eye toggle ── */
function toggleEye(inputId, btn) {
  const input = document.getElementById(inputId);
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  btn.querySelector('svg').innerHTML = isPass
    ? '<line x1="1" y1="1" x2="23" y2="23"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 12s4-8 11-8"/><path d="M22.94 12c-.36.68-.79 1.35-1.28 1.98"/>'
    : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
}

/* ── Clear error ── */
function clearError(input) {
  input.classList.remove('error');
}

/* ── Password strength ── */
function checkStrength(val) {
  const wrap = document.getElementById('strength-wrap');
  const label = document.getElementById('strength-label');
  const bars = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3'), document.getElementById('s4')];

  if (!val) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'flex';

  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = ['weak', 'fair', 'good', 'strong'];
  const labels = ['Fraca', 'Regular', 'Boa', 'Forte 💪'];
  const colors = { weak:'#ef4444', fair:'#f59e0b', good:'#84cc16', strong:'#22c55e' };

  bars.forEach((b, i) => {
    b.className = 'strength-bar ' + (i < score ? 'filled-' + levels[score - 1] : '');
  });

  label.textContent = labels[score - 1] || '';
  label.style.color = colors[levels[score - 1]] || 'rgba(255,255,255,.4)';
}

/* ── Validate ── */
function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

function showErr(inputId, msgId) {
  document.getElementById(inputId).classList.add('error');
  document.getElementById(msgId).classList.add('show');
}

/* ── Submit login ── */
function submitLogin() {
  const email = document.getElementById('login-email');
  const pass  = document.getElementById('login-password');
  let ok = true;

  document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('.field-inner input').forEach(i => i.classList.remove('error'));

  if (!validateEmail(email.value)) { showErr('login-email', 'login-email-err'); ok = false; }
  if (pass.value.length < 1) { showErr('login-password', 'login-pass-err'); ok = false; }

  if (!ok) return;

  const btn = document.getElementById('btn-login');
  btn.classList.add('loading');
  setTimeout(() => {
    btn.classList.remove('loading');
    // Simulate success — redirect or show state
    alert('Login bem-sucedido! Redirecionando...');
  }, 1600);
}

/* ── Submit register ── */
function submitRegister() {
  const fname = document.getElementById('reg-fname');
  const lname = document.getElementById('reg-lname');
  const email = document.getElementById('reg-email');
  const pass  = document.getElementById('reg-password');
  const terms = document.getElementById('reg-terms');
  let ok = true;

  document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('.field-inner input').forEach(i => i.classList.remove('error'));

  if (!fname.value.trim()) { showErr('reg-fname', 'reg-fname-err'); ok = false; }
  if (!lname.value.trim()) { showErr('reg-lname', 'reg-lname-err'); ok = false; }
  if (!validateEmail(email.value)) { showErr('reg-email', 'reg-email-err'); ok = false; }
  if (pass.value.length < 8) { showErr('reg-password', 'reg-pass-err'); ok = false; }
  if (!terms.checked) {
    terms.style.outline = '2px solid #ef4444';
    setTimeout(() => terms.style.outline = '', 2000);
    ok = false;
  }

  if (!ok) return;

  const btn = document.getElementById('btn-register');
  btn.classList.add('loading');
  setTimeout(() => {
    btn.classList.remove('loading');
    // Show success state
    document.querySelectorAll('#register-panel > *:not(#success-panel)').forEach(el => el.style.display = 'none');
    document.getElementById('success-panel').classList.add('show');
  }, 1800);
}

/* ── Social login ── */
function socialLogin(provider) {
  alert(`Redirecionando para login com ${provider}...`);
}

/* ── Forgot password ── */
function handleForgot(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  if (email && validateEmail(email)) {
    alert(`E-mail de redefinição enviado para: ${email}`);
  } else {
    alert('Informe seu e-mail no campo acima primeiro.');
    document.getElementById('login-email').focus();
  }
}

/* ── Particles ── */
(function() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function mkPt() { return { x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.4+.3, a:Math.random()*.5, vx:(Math.random()-.5)*.15, vy:(Math.random()-.5)*.15 }; }
  function init() { resize(); pts = Array.from({length:70}, mkPt); }
  function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${p.a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  init(); draw();
})();