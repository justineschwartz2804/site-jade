// Comportement de la landing page — repris à l'identique de la logique
// du design de référence (Chef a domicile - Landing.dc.html).
(function () {
  'use strict';

  var $ = function (name) { return document.querySelector('[data-ref="' + name + '"]'); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  var state = { filter: 'Tout', formula: 'La semaine', guests: 2, sent: false, sending: false, sendError: false, contenu: null };

  // ---------------------------------------------------------------- animations
  var hLemon = $('hLemon'), hTomato = $('hTomato'), hFig = $('hFig');
  var transRef = $('transRef'), waveFill = $('waveFill'), waveRibbon = $('waveRibbon'), ribbonText = $('ribbonText');
  var rFig = $('rFig'), rPome = $('rPome'), rPepper = $('rPepper');
  var rdvWave = $('rdvWave'), rdvCurve = $('rdvCurve'), rdvLemon = $('rdvLemon'), rdvLen = 0;
  var mx = 0, my = 0, t = 0;

  window.addEventListener('pointermove', function (e) {
    mx = e.clientX / window.innerWidth * 2 - 1;
    my = e.clientY / window.innerHeight * 2 - 1;
  }, { passive: true });

  // Citron qui roule sur la vague noire au-dessus de « Prendre rendez-vous »
  function updateRdvLemon() {
    var w = rdvWave, c = rdvCurve, l = rdvLemon; if (!w || !c || !l) return;
    var rect = w.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.85)));
    var W = rect.width, H = rect.height, d = l.offsetWidth, r = d / 2;
    if (!rdvLen) rdvLen = c.getTotalLength();
    var xv = 1440 * (0.06 + 0.8 * p);
    var lo = 0, hi = rdvLen;
    for (var i = 0; i < 18; i++) { var m = (lo + hi) / 2; if (c.getPointAtLength(m).x < xv) lo = m; else hi = m; }
    var pt = c.getPointAtLength(lo), pt2 = c.getPointAtLength(Math.min(rdvLen, lo + 4));
    var sx = W / 1440, sy = H / 140;
    var ang = Math.atan2((pt2.y - pt.y) * sy, (pt2.x - pt.x) * sx);
    var px = pt.x * sx, py = pt.y * sy;
    var ox = px + Math.sin(ang) * r, oy = py - Math.cos(ang) * r;
    var roll = (px / r) * 57.3;
    l.style.transform = 'translate(' + (ox - r).toFixed(1) + 'px,' + (oy - r + 4).toFixed(1) + 'px) rotate(' + roll.toFixed(1) + 'deg)';
  }

  function updateHero() {
    var hp = Math.min(1, window.scrollY / 700);
    var set = function (el, v) { if (el) el.style.transform = v; };
    set(hLemon, 'translate(' + (-mx * 18) + 'px,' + (-my * 10 + hp * 160 + Math.sin(t * 0.8) * 6) + 'px) rotate(' + (-14 + hp * 150 + Math.sin(t * 0.5) * 3) + 'deg)');
    set(hTomato, 'translate(' + (mx * 26) + 'px,' + (my * 14 + hp * 120 + Math.sin(t * 0.9 + 1) * 8) + 'px) rotate(' + (12 - hp * 110 + Math.sin(t * 0.6) * 4) + 'deg) scale(' + (1 - hp * 0.15) + ')');
    set(hFig, 'translate(' + (mx * 44) + 'px,' + (my * 22 - hp * 260 + Math.sin(t * 1.3) * 10) + 'px) rotate(' + (Math.sin(t) * 8 + hp * 220) + 'deg)');
  }

  function updateWave() {
    if (!transRef) return;
    var r = transRef.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    var A = 70 - 55 * p, ph = p * Math.PI * 2.2;
    var line = function (off) {
      var pts = [];
      for (var x = -1600; x <= 1640; x += 40) pts.push(x + ',' + (170 + off + A * Math.sin(x / 1440 * Math.PI * 3 + ph)).toFixed(1));
      return pts;
    };
    var w = line(0);
    waveFill && waveFill.setAttribute('d', 'M' + w[0] + ' L' + w.slice(1).join(' L') + ' L1640,320 L-1600,320 Z');
    waveRibbon && waveRibbon.setAttribute('d', 'M' + line(52).join(' L'));
    ribbonText && ribbonText.setAttribute('startOffset', String(200 + p * 1300));
    var W = r.width, H = r.height, s = Math.max(W / 1440, H / 320), ox = (W - 1440 * s) / 2, oy = H - 320 * s;
    var yAt = function (x) { return 170 + A * Math.sin(x / 1440 * Math.PI * 3 + ph); };
    var surf = function (el, fx, w, h2, sink, spin) {
      if (!el) return;
      var px = W * fx, sx = (px - ox) / s, y = oy + yAt(sx) * s;
      var ang = Math.atan2((yAt(sx + 6) - yAt(sx - 6)) * s, 12 * s) * 57.3;
      var bob = Math.sin(t * 1.6 + fx * 9) * 4;
      el.style.transform = 'translate(' + (px - w / 2) + 'px,' + (y - h2 + sink + bob) + 'px) rotate(' + (ang + spin) + 'deg)';
    };
    surf(rFig, 0.14 + p * 0.1, 96, 106, 18, Math.sin(t) * 6);
    surf(rPome, 0.48 + p * 0.06, 124, 130, 22, p * 40 - 20);
    surf(rPepper, 0.84 - p * 0.08, 108, 124, 20, -10 + Math.sin(t * 0.8) * 8);
  }

  function loop(ms) { t = ms / 1000; updateHero(); updateWave(); updateRdvLemon(); requestAnimationFrame(loop); }
  requestAnimationFrame(loop);

  // --------------------------------------------------------------- réalisations
  var fallback = [
    { name: 'Aubergines rôties, yaourt & grenade', tag: 'végétarien', cat: 'Semaine', bg: '#f4a6b8', photo: 'aubergines' },
    { name: 'Poulet citron confit & herbes', tag: 'dîner', cat: 'Dîners', bg: '#ffd60a', photo: 'poulet rôti' },
    { name: 'Salade de lentilles, feta & menthe', tag: 'meal prep', cat: 'Semaine', bg: '#7cc48a', photo: 'salade lentilles' },
    { name: 'Shakshuka verte', tag: 'brunch', cat: 'Dîners', bg: '#b9d98a', photo: 'shakshuka' },
    { name: 'Gâteau polenta, citron & pistache', tag: 'dessert', cat: 'Desserts', bg: '#ffe46b', photo: 'gâteau citron' },
    { name: 'Riz aux herbes, pois chiches & tahini', tag: 'meal prep', cat: 'Semaine', bg: '#f7c59f', photo: 'riz herbes' }
  ];

  function allDishes() {
    var c = state.contenu;
    var src = (c && Array.isArray(c.realisations)) ? c.realisations.map(function (r) {
      return { name: r.titre || '', tag: r.label || '', cat: r.categorie || '', bg: r.couleur || '#f1efe6', photo: r.photo || '' };
    }) : fallback;
    return src.map(function (d) {
      var isImg = /\.(jpe?g|png|webp|avif|gif)$/i.test(d.photo) || /^https?:/.test(d.photo);
      d.img = isImg ? d.photo : ''; d.hasImg = isImg;
      return d;
    });
  }

  var filtersEl = $('filters'), dishesEl = $('dishes');

  function renderGallery() {
    var all = allDishes();
    var cats = ['Tout'];
    all.forEach(function (d) { if (d.cat && cats.indexOf(d.cat) === -1) cats.push(d.cat); });
    filtersEl.innerHTML = cats.map(function (l) {
      var on = state.filter === l;
      return '<button data-filter="' + esc(l) + '" style="padding:10px 18px;border-radius:999px;border:1.5px solid #141412;background:' + (on ? '#141412' : 'transparent') + ';color:' + (on ? '#fdfcf8' : '#141412') + ';font-weight:600;font-size:15px;cursor:pointer">' + esc(l) + '</button>';
    }).join('');
    var list = state.filter === 'Tout' ? all : all.filter(function (d) { return d.cat === state.filter; });
    dishesEl.innerHTML = list.map(function (d) {
      var inner = d.hasImg
        ? '<img src="' + esc(d.img) + '" alt="' + esc(d.name) + '" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">'
        : '<div style="position:absolute;inset:0;background:repeating-linear-gradient(135deg,rgba(20,20,18,0.06) 0 2px,transparent 2px 14px)"></div>' +
          '<span style="position:relative;font-family:\'JetBrains Mono\',monospace;font-size:12px;background:#fdfcf8;padding:6px 10px;border-radius:6px">photo · ' + esc(d.photo) + '</span>';
      return '<figure style="margin:0;display:flex;flex-direction:column;gap:14px">' +
        '<div style="aspect-ratio:4/5;border-radius:24px;background:' + esc(d.bg) + ';position:relative;display:flex;align-items:flex-end;padding:16px;overflow:hidden">' + inner + '</div>' +
        '<figcaption style="display:flex;justify-content:space-between;align-items:baseline;gap:12px">' +
          '<span style="font-weight:700;font-size:19px;letter-spacing:-0.01em">' + esc(d.name) + '</span>' +
          '<span style="font-family:\'Instrument Serif\',serif;font-style:italic;font-size:18px;color:#5a5a52;white-space:nowrap">' + esc(d.tag) + '</span>' +
        '</figcaption></figure>';
    }).join('');
  }

  filtersEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-filter]');
    if (b) { state.filter = b.getAttribute('data-filter'); renderGallery(); }
  });

  // ------------------------------------------------------------------ formulaire
  var form = $('form'), formulasEl = $('formulas'), guestsEl = $('guests'), submitBtn = $('submit'), errorEl = $('error');
  var sentEl = null;

  function renderForm() {
    formulasEl.innerHTML = ['La semaine', 'Le dîner', 'À la carte'].map(function (l) {
      return '<button type="button" data-formula="' + esc(l) + '" style="padding:10px 18px;border-radius:999px;border:1.5px solid #141412;background:' + (state.formula === l ? '#ffd60a' : 'transparent') + ';font-weight:600;font-size:15px;cursor:pointer;color:#141412">' + esc(l) + '</button>';
    }).join('');
    form.elements.formule.value = state.formula;
    form.elements.personnes.value = String(state.guests);
    guestsEl.textContent = String(state.guests);
    submitBtn.textContent = state.sending ? 'Envoi en cours…' : 'Envoyer ma demande';
    errorEl.hidden = !state.sendError;

    form.style.display = state.sent ? 'none' : 'flex';
    if (state.sent && !sentEl) {
      sentEl = document.createElement('div');
      sentEl.setAttribute('style', 'background:#ffd60a;color:#141412;border-radius:28px;padding:48px;display:flex;flex-direction:column;gap:16px;justify-content:center');
      sentEl.innerHTML =
        '<span style="font-weight:900;font-size:48px;letter-spacing:-0.03em;line-height:1">Merci !</span>' +
        '<p style="margin:0;font-size:18px;line-height:1.5">Demande reçue pour la formule <strong>' + esc(state.formula) + '</strong>, ' + state.guests + ' personne(s). Je vous réponds sous 48 h pour caler notre appel.</p>' +
        '<button style="align-self:flex-start;padding:12px 20px;border-radius:999px;border:1.5px solid #141412;background:transparent;font-weight:700;cursor:pointer">Nouvelle demande</button>';
      sentEl.querySelector('button').addEventListener('click', function () {
        state.sent = false;
        form.reset();
        renderForm();
      });
      form.after(sentEl);
    } else if (!state.sent && sentEl) {
      sentEl.remove();
      sentEl = null;
    }
  }

  formulasEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-formula]');
    if (b) { state.formula = b.getAttribute('data-formula'); renderForm(); }
  });
  $('dec').addEventListener('click', function () { state.guests = Math.max(1, state.guests - 1); renderForm(); });
  $('inc').addEventListener('click', function () { state.guests = Math.min(12, state.guests + 1); renderForm(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var url = (state.contenu && state.contenu.formspree) || '';
    if (!url) { state.sent = true; renderForm(); return; }
    state.sending = true; state.sendError = false; renderForm();
    fetch(url, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw 0; state.sent = true; state.sending = false; renderForm(); })
      .catch(function () { state.sending = false; state.sendError = true; renderForm(); });
  });

  // --------------------------------------------------------------- contenu.json
  renderGallery();
  renderForm();
  fetch('contenu.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (c) { state.contenu = c; renderGallery(); })
    .catch(function () {});
})();
