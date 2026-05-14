 /* ── Navbar blur on scroll ── */
 window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* ── Parallax ── */
  window.addEventListener('scroll', () => {
    const bg = document.querySelector('.hero-bg');
    if (bg) bg.style.backgroundPositionY = `calc(30% + ${window.scrollY * 0.25}px)`;
  });

  /* ── Category active + indicator ── */
  function setActive(el) {
    document.querySelectorAll('.cat').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    moveIndicator(el);
  }

  function moveIndicator(btn) {
    const cats = document.getElementById('categories');
    const indicator = cats.querySelector('.cat-indicator');
    if (!indicator) return;
    const cRect = cats.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    indicator.style.left = (bRect.left - cRect.left) + 'px';
    indicator.style.width = bRect.width + 'px';
  }

  window.addEventListener('load', () => {
    const cats = document.getElementById('categories');
    const indicator = document.createElement('div');
    indicator.className = 'cat-indicator';
    cats.appendChild(indicator);
    const active = cats.querySelector('.cat.active');
    if (active) setTimeout(() => moveIndicator(active), 700);
  });

  /* ── Buscar loading ── */
  function buscar() {
    const btn = document.getElementById('btn-buscar');
    btn.classList.add('loading');
    setTimeout(() => btn.classList.remove('loading'), 1800);
  }

  /* ── Rotating placeholder ── */
  const DESTINOS_LIST = ['Ex: Rio de Janeiro','Ex: Paris, França','Ex: Cancún, México','Ex: Fernando de Noronha','Ex: Buenos Aires','Ex: Lisboa, Portugal','Ex: Bariloche, Argentina','Ex: Gramado, RS','Ex: Nova York, EUA'];
  let phIdx = 0;
  const destInput = document.getElementById('dest-input');
  setInterval(() => {
    if (document.activeElement === destInput) return;
    phIdx = (phIdx + 1) % DESTINOS_LIST.length;
    destInput.placeholder = DESTINOS_LIST[phIdx];
  }, 2400);

  /* ── Autocomplete ── */
  const SUGESTOES = ['Rio de Janeiro, Brasil','São Paulo, Brasil','Salvador, Brasil','Florianópolis, Brasil','Fernando de Noronha, Brasil','Gramado, Brasil','Buenos Aires, Argentina','Bariloche, Argentina','Lisboa, Portugal','Paris, França','Cancún, México','Miami, EUA','Nova York, EUA'];
  function showAutocomplete(val) {
    const ac = document.getElementById('autocomplete');
    if (!val || val.length < 2) { ac.classList.remove('show'); return; }
    const filtered = SUGESTOES.filter(s => s.toLowerCase().includes(val.toLowerCase())).slice(0,5);
    if (!filtered.length) { ac.classList.remove('show'); return; }
    ac.innerHTML = filtered.map(s => `<div class="autocomplete-item" onmousedown="selectDest('${s}')"><svg class="pin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${s}</div>`).join('');
    ac.classList.add('show');
  }
  function selectDest(val) { destInput.value = val; document.getElementById('autocomplete').classList.remove('show'); }
  function hideAutocomplete() { document.getElementById('autocomplete').classList.remove('show'); }

  /* ── Best season ── */
  const SEASONS = {
    'rio':{'icon':'☀️','text':'Melhor época: Maio a Outubro'},
    'paris':{'icon':'🌸','text':'Melhor época: Abril a Junho'},
    'cancún':{'icon':'🌊','text':'Melhor época: Dezembro a Abril'},
    'noronha':{'icon':'🐠','text':'Melhor época: Agosto a Março'},
    'bariloche':{'icon':'⛷️','text':'Melhor época: Junho a Setembro'},
    'gramado':{'icon':'❄️','text':'Melhor época: Junho a Agosto'},
    'lisboa':{'icon':'🌤️','text':'Melhor época: Março a Outubro'},
    'miami':{'icon':'🌴','text':'Melhor época: Março a Maio'},
    'buenos':{'icon':'🥩','text':'Melhor época: Setembro a Novembro'},
  };
  function showBestSeason(val) {
    const el = document.getElementById('best-season');
    if (!val || val.length < 3) { el.classList.remove('show'); return; }
    const key = Object.keys(SEASONS).find(k => val.toLowerCase().includes(k));
    if (!key) { el.classList.remove('show'); return; }
    el.innerHTML = `<span>${SEASONS[key].icon}</span> ${SEASONS[key].text}`;
    el.classList.add('show');
  }
  function hideBestSeason() { document.getElementById('best-season').classList.remove('show'); }

  /* ── Auto-open volta ── */
  function autoOpenVolta() {
    const volta = document.getElementById('date-volta');
    setTimeout(() => { volta.type = 'date'; volta.focus(); }, 150);
  }

  /* ── Travellers ── */
  const counts = { adults:1, children:0, babies:0 };
  function changeCount(type, delta) {
    if (type==='adults') counts.adults = Math.max(1, counts.adults+delta);
    else if (type==='children') counts.children = Math.max(0, counts.children+delta);
    else counts.babies = Math.max(0, counts.babies+delta);
    document.getElementById(type==='adults'?'adults-val':type==='children'?'children-val':'babies-val').textContent = counts[type];
    updateViajantesLabel();
  }
  function updateViajantesLabel() {
    const parts = [`${counts.adults} adulto${counts.adults>1?'s':''}`];
    if (counts.children) parts.push(`${counts.children} criança${counts.children>1?'s':''}`);
    if (counts.babies) parts.push(`${counts.babies} bebê${counts.babies>1?'s':''}`);
    document.getElementById('viajantes-input').value = parts.join(', ');
  }
  function toggleTravellers() { document.getElementById('travellers-popup').classList.toggle('show'); }
  document.addEventListener('click', e => { if (!e.target.closest('.field-viajantes')) document.getElementById('travellers-popup').classList.remove('show'); });

  /* ── Popular chips ── */
  function selectChip(dest) {
    destInput.value = dest;
    destInput.focus();
    showBestSeason(dest);
  }

  /* ── Chatbot ── */
  function toggleChat() {
    const p = document.getElementById('chat-popup');
    p.style.display = p.style.display === 'none' ? 'block' : 'none';
  }
  document.getElementById('chat-popup').style.display = 'none';

  /* ── Particles ── */
  (function() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    function mkPt() { return { x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.5+.3, a:Math.random(), vx:(Math.random()-.5)*.18, vy:(Math.random()-.5)*.18, va:(Math.random()-.5)*.004 }; }
    function init() { resize(); pts = Array.from({length:80}, mkPt); }
    function draw() {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.a+=p.va;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        p.a=Math.max(.05,Math.min(.7,p.a));
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${p.a})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    init(); draw();
  })();