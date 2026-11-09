/* Kikosi Cha Wanaume Kenya | Kenya Men Association
   Vanilla JavaScript for the interactive parts of the site.
   Sections: 1 Menu · 2 Carousels · 3 Countdown · 4 Attendance calculator
             5 Contact form · 6 Chat assistant · 7 Donate · 8 Member area */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Mobile hamburger menu ------------------------------------------- */
  var menuBtn = $('menuBtn');
  var nav = $('mainNav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.classList.toggle('x', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  /* 2. Carousels (leaders, event posters, gathering gallery) ------------ */
  function initCarousel(id, intervalMs) {
    var track = $(id);
    if (!track) return;
    var paused = false, resumeTimer;
    function step(dir) {
      var first = track.firstElementChild;
      if (!first) return;
      track.scrollBy({ left: dir * (first.offsetWidth + 20), behavior: 'smooth' });
    }
    setInterval(function () {
      if (paused || reduceMotion || !track.firstElementChild) return;
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) track.scrollTo({ left: 0, behavior: 'smooth' }); else step(1);
    }, intervalMs);
    function pause() { paused = true; clearTimeout(resumeTimer); }
    function resume() { clearTimeout(resumeTimer); resumeTimer = setTimeout(function () { paused = false; }, 2500); }
    ['mouseenter', 'touchstart', 'focusin'].forEach(function (ev) { track.addEventListener(ev, pause, { passive: true }); });
    ['mouseleave', 'touchend', 'focusout'].forEach(function (ev) { track.addEventListener(ev, resume); });
    document.querySelectorAll('[data-prev="' + id + '"]').forEach(function (b) { b.addEventListener('click', function () { step(-1); }); });
    document.querySelectorAll('[data-next="' + id + '"]').forEach(function (b) { b.addEventListener('click', function () { step(1); }); });
  }
  initCarousel('lead-car', 3500);
  initCarousel('poster-car', 4000);
  initCarousel('gallery-car', 4500);

  /* 3. Countdown to the next event ------------------------------------- */
  var NEXT_EVENT = new Date('2026-11-14T09:00:00+03:00'); // Ignite Summit, KICC. Change for the next event.
  var countdown = $('countdown');
  function tick() {
    var ms = NEXT_EVENT - new Date();
    if (ms <= 0) { countdown.textContent = 'Happening now'; return; }
    countdown.textContent = Math.floor(ms / 864e5) + ' days ' + Math.floor(ms % 864e5 / 36e5) + ' hrs ' + Math.floor(ms % 36e5 / 6e4) + ' min to go';
  }
  tick();
  setInterval(tick, 30000);

  /* 4. Attendance calculator ------------------------------------------- */
  function calc() {
    var num = function (id) { return parseFloat($(id).value) || 0; };
    var registered = num('ac-r'), attended = num('ac-a'), next = num('ac-n');
    $('turnout').textContent = registered > 0 ? Math.round(attended / registered * 100) + '%' : '—';
    $('projected').textContent = (registered > 0 && next > 0) ? Math.round(next * attended / registered) + ' men' : '—';
  }
  ['ac-r', 'ac-a', 'ac-n'].forEach(function (id) { $(id).addEventListener('input', calc); });

  /* 5. Contact form: opens WhatsApp with the message pre-filled -------- */
  var WHATSAPP = '254785904087';
  function updateWaLink() {
    var text = 'Hello Kikosi Cha Wanaume Kenya,\n\nName: ' + $('cf-n').value +
      '\nPhone or email: ' + $('cf-p').value +
      '\nI am a: ' + $('cf-t').value +
      '\n\n' + $('cf-m').value;
    $('waSend').href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);
  }
  ['cf-n', 'cf-p', 'cf-m'].forEach(function (id) { $(id).addEventListener('input', updateWaLink); });
  $('cf-t').addEventListener('change', updateWaLink);
  updateWaLink();

  /* 6. KMA Assistant (keyword answers; swap ask() for a real AI API) ---- */
  var KB = [
    ['next event|ignite|kicc|when|date|summit', 'The next gathering is the Ignite Men Breakfast & Growth Summit on Saturday, 14 November 2026 at KICC, Nairobi. We start at 9:00 AM sharp.'],
    ['register|sign up|attend', 'To register, write your full name on the list in the group, or message us on WhatsApp at +254 785 904 087. Bringing a guest? Send their names too.'],
    ['donat|support|give|pay|mpesa|m-pesa|card', 'You can give from the Donate section by M-Pesa STK push or card. Our Ignite budget target is Ksh 250,000.'],
    ['speaker|guest', 'Our speakers are Ambassador Dr. John CW and Dr. Moimett, a Presidential Hero Award (2026) recipient.'],
    ['leader|role|docket|volunteer|join', 'Some dockets are open, including Administrative Secretary and Security & Intelligence. Tell us your area of interest on WhatsApp.'],
    ['train', 'Leadership training runs for one month, Tuesdays and Thursdays, 9:00 to 10:00 PM.'],
    ['contact|whatsapp|phone|call|number', 'WhatsApp us on +254 785 904 087.'],
    ['about|what is|kikosi|kma|who', 'Kikosi Cha Wanaume Kenya | Kenya Men Association is a brotherhood where men heal, rebuild and rediscover their purpose. Our motto is Restore the Pillar.']
  ];
  var FALLBACK = 'I am not sure about that. Please WhatsApp us on +254 785 904 087 and a leader will help.';
  var chatLog = $('chatLog'), chatInput = $('chat-i');
  function addBubble(text, mine) {
    var b = document.createElement('div');
    b.className = 'bub' + (mine ? ' me' : '');
    b.textContent = text;
    chatLog.appendChild(b);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  function answer(q) {
    var s = q.toLowerCase();
    for (var i = 0; i < KB.length; i++) {
      if (KB[i][0].split('|').some(function (w) { return s.indexOf(w) > -1; })) return KB[i][1];
    }
    return FALLBACK;
  }
  function ask(q) {
    q = (q || chatInput.value || '').trim();
    if (!q) return;
    chatInput.value = '';
    addBubble(q, true);
    setTimeout(function () { addBubble(answer(q), false); }, 350);
  }
  $('chatSend').addEventListener('click', function () { ask(); });
  chatInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); ask(); } });
  document.querySelectorAll('[data-q]').forEach(function (b) { b.addEventListener('click', function () { ask(b.getAttribute('data-q')); }); });

  /* 7. Donate: amount tiers and payment method ------------------------- */
  var amount = '$100';
  document.querySelectorAll('.tl[data-amt]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      amount = btn.getAttribute('data-amt');
      document.querySelectorAll('.tl[data-amt]').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      $('donateAmt').textContent = amount;
    });
  });
  document.querySelectorAll('.pt[data-method]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var method = btn.getAttribute('data-method');
      document.querySelectorAll('.pt[data-method]').forEach(function (b) { b.classList.toggle('on', b === btn); });
      $('panel-mpesa').hidden = method !== 'mpesa';
      $('panel-card').hidden = method !== 'card';
    });
  });
  $('donateBtn').addEventListener('click', function () {
    /* TODO: call your server here. The server talks to ePay / M-Pesa (STK push) and returns the result.
       Never put API keys in this file and never handle raw card numbers yourself. */
    $('donateMsg').textContent = 'Preview only: the ePay checkout for ' + amount + ' connects here.';
  });

  /* 8. Member area (sign up, login, reset password) -------------------- */
  document.querySelectorAll('[data-member]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      /* TODO: POST to /api/auth/signup, /api/auth/login or /api/auth/reset on your server. */
      $(btn.getAttribute('data-member') + 'Msg').textContent = 'Preview only: this connects to the KMA member database.';
    });
  });
});
