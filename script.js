(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s,c){return (c||document).querySelector(s)};
  var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var U = 'https://harmonyblissspa.com/wp-content/uploads/';
  var LOCAL = {"2025/05/LOGO-HARMONY-SPA-Photoroom-2-300x300.webp": "logo.webp", "2025/12/Harmony-Bliss-Spa-11.jpg": "Harmony-Bliss-Spa-11.jpg", "2025/12/WhatsApp-Image-2025-12-23-at-12.42.57-PM-1.jpeg": "gallery-12.42.57-1.jpeg", "2025/12/WhatsApp-Image-2025-12-23-at-12.42.58-PM-1.jpeg": "gallery-12.42.58-1.jpeg", "2026/01/الزمالك-3.webp": "zamalek-3.webp", "2026/01/الزمالك-5.webp": "zamalek-5.webp", "2026/01/سونستا-1.webp": "nasr-city-1.webp", "2026/01/سونستا-2.webp": "nasr-city-2.webp", "2026/01/سونستا-4-.webp": "nasr-city-4-.webp", "2026/01/شرم-الشيخ-1.webp": "sharm-1.webp", "2026/01/شرم-الشيخ-2.webp": "sharm-2.webp", "2026/01/شرم-الشيخ-3.webp": "sharm-3.webp", "2026/01/ليدي-1.webp": "ladies-1.webp", "2026/01/ليدي-4.webp": "ladies-4.webp", "2026/06/1st-Settlement-Branch_1.webp": "1st-Settlement-Branch_1.webp", "2026/06/1st-Settlement-Branch_3.webp": "1st-Settlement-Branch_3.webp", "2026/06/1st-Settlement-Branch_5.webp": "1st-Settlement-Branch_5.webp", "2026/06/harmony-bliss-spa-maadi-1.webp": "harmony-bliss-spa-maadi-1.webp", "2026/06/harmony-bliss-spa-maadi-2.webp": "harmony-bliss-spa-maadi-2.webp", "2026/06/harmony-bliss-spa-maadi-3.webp": "harmony-bliss-spa-maadi-3.webp", "2026/06/harmony-bliss-spa-maadi-5.webp": "harmony-bliss-spa-maadi-5.webp", "2026/06/harmony-bliss-spa-maadi-6.webp": "harmony-bliss-spa-maadi-6.webp"};
  function local(p){ return 'images/'+(LOCAL[p]||p.split('/').pop()); }
  function wire(img){
    img.referrerPolicy='no-referrer';
    function fb(){ var r=img.dataset.remote; if(r && img.src.indexOf(r)<0){ img.src=r; } else { img.style.visibility='hidden'; } }
    img.addEventListener('error',fb);
    if(img.complete && img.naturalWidth===0 && img.getAttribute('src')) fb();
  }
  var WA = '201123770959';

  /* Image fallback so a missing photo never leaves a broken icon */
  $$('img').forEach(wire);

  /* ---------- Reveal on scroll ---------- */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  $$('.rv,.clip').forEach(function(el){ io.observe(el); });

  /* ---------- Counters ---------- */
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target, to = parseFloat(el.dataset.count), dec = +el.dataset.dec||0, suf = el.dataset.suffix||'';
      cio.unobserve(el);
      if(reduce){ el.textContent = to.toFixed(dec)+suf; return; }
      var t0 = performance.now(), d = 1500;
      (function tick(t){
        var p = Math.min(1,(t-t0)/d), v = to*(1-Math.pow(1-p,3));
        el.textContent = v.toFixed(dec)+(p===1?suf:'');
        if(p<1) requestAnimationFrame(tick);
      })(t0);
    });
  },{threshold:.6});
  $$('[data-count]').forEach(function(el){ cio.observe(el); });

  /* ---------- Scroll engine: parallax, progress, nav, pinned story ---------- */
  var nav = $('#nav'), bar = $('#progress');
  var par = $$('[data-speed]'), pimgs = $$('[data-par]');
  var story = $('#story'), steps = $$('.step'), dots = $$('.dots i'), simgs = $$('.story-visual img');
  var ticking = false;

  function frame(){
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    bar.style.transform = 'scaleX('+(max>0?y/max:0)+')';
    nav.classList.toggle('scrolled', y>40);

    if(!reduce){
      par.forEach(function(el){
        var r = el.getBoundingClientRect();
        if(r.bottom < -200 || r.top > vh+200) return;
        var center = r.top + r.height/2 - vh/2;
        var s = parseFloat(el.dataset.speed);
        var base = el.classList.contains('outline') ? 'translateY(-50%) ' : (el.classList.contains('bgarch') ? 'translateX(-50%) ' : '');
        el.style.transform = base + 'translate3d(0,'+(-center*s).toFixed(1)+'px,0)';
      });
      pimgs.forEach(function(img){
        var r = img.parentElement.getBoundingClientRect();
        if(r.bottom < 0 || r.top > vh) return;
        var c = (r.top + r.height/2 - vh/2)/vh;
        img.style.transform = 'scale(1.15) translate3d(0,'+(c*-34*parseFloat(img.dataset.par)*10).toFixed(1)+'px,0)';
      });
    }

    if(story && window.innerWidth>980){
      var sr = story.getBoundingClientRect();
      var p = Math.max(0,Math.min(.999, -sr.top/(sr.height - vh)));
      var i = Math.min(steps.length-1, Math.floor(p*steps.length));
      steps.forEach(function(s,k){ s.classList.toggle('on',k===i); });
      dots.forEach(function(d,k){ d.classList.toggle('on',k===i); });
      simgs.forEach(function(m,k){ m.classList.toggle('on',k===i); });
    }
  }
  function req(){ if(!ticking){ ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',req);
  frame();

  /* ---------- Branch finder ---------- */
  var B = {
    maadi:{n:'Maadi',tag:'Cairo',d:'A calm retreat in the heart of Maadi. Massage, Moroccan bath, sauna, steam and jacuzzi with the branch’s own price list.',sel:'Maadi',link:'https://harmonyblissspa.com/branchs/spa-in-maadi/',
      img:['2026/06/harmony-bliss-spa-maadi-1.webp','2026/06/harmony-bliss-spa-maadi-3.webp','2026/06/harmony-bliss-spa-maadi-6.webp']},
    first:{n:'1st Settlement',tag:'New Cairo',d:'Professional massage and wellness close to home: Swedish, deep tissue, Thai and sports massage, Moroccan bath and recovery treatments.',sel:'1st Settlement, New Cairo',link:'https://harmonyblissspa.com/branchs/1st-settlement/',
      img:['2026/06/1st-Settlement-Branch_5.webp','2026/06/1st-Settlement-Branch_3.webp','2026/06/1st-Settlement-Branch_1.webp']},
    '5th':{n:'5th Settlement',tag:'Ladies only · New Cairo',d:'A dedicated ladies-only spa offering massage, Moroccan bath, hammam and sauna in a private space designed exclusively for women.',sel:'5th Settlement, New Cairo (Ladies only)',link:'https://harmonyblissspa.com/branchs/5th-settlement/',
      img:['2025/12/WhatsApp-Image-2025-12-23-at-12.42.58-PM-1.jpeg','2026/01/ليدي-4.webp','2026/01/ليدي-1.webp']},
    nasr:{n:'Nasr City',tag:'Cairo',d:'Swedish, deep tissue, Thai, hot stone and anti-stress massage, plus Moroccan bath, sauna and jacuzzi.',sel:'Nasr City',link:'https://harmonyblissspa.com/branchs/nasr-city/',
      img:['2026/01/سونستا-1.webp','2026/01/سونستا-2.webp','2026/01/سونستا-4-.webp']},
    zamalek:{n:'Zamalek Clinic',tag:'Cairo · clinic care',d:'Our clinic-style branch specialising in physiotherapy, medical massage, cupping (Hijama) and recovery, alongside relaxation massage.',sel:'Zamalek Clinic',link:'https://harmonyblissspa.com/branchs/zamalek-clinic/',
      img:['2026/01/الزمالك-3.webp','2026/01/الزمالك-5.webp','2025/12/Harmony-Bliss-Spa-11.jpg']},
    nabq:{n:'Nabq, Sharm El Sheikh',tag:'Red Sea',d:'A luxury spa by the Red Sea welcoming residents and visitors: massage, Moroccan bath, Turkish hammam, sauna, steam and jacuzzi.',sel:'Nabq, Sharm El Sheikh',link:'https://harmonyblissspa.com/branchs/sharm-elsheikh/',
      img:['2026/01/شرم-الشيخ-1.webp','2026/01/شرم-الشيخ-2.webp','2026/01/شرم-الشيخ-3.webp']}
  };
  var keys = Object.keys(B), cur = 'maadi';
  var tabs = $('#tabs'), main = $('#mainimg'), thumbs = $('#thumbs');
  keys.forEach(function(k){
    var b = document.createElement('button');
    b.className='tab'; b.setAttribute('role','tab'); b.dataset.k=k;
    b.innerHTML = '<strong>'+B[k].n+'</strong><span>'+B[k].tag+'</span>';
    b.addEventListener('click',function(){ pick(k); });
    tabs.appendChild(b);
  });
  function show(src){
    $$('img',main).forEach(function(i){ i.classList.remove('on'); });
    var ex = $$('img',main).filter(function(i){ return i.dataset.src===src; })[0];
    if(!ex){ ex = new Image(); ex.dataset.src = src; ex.dataset.remote = U+src; wire(ex); ex.src = local(src); ex.alt=''; main.appendChild(ex); }
    requestAnimationFrame(function(){ ex.classList.add('on'); });
    $$('button',thumbs).forEach(function(t){ t.classList.toggle('on', t.dataset.src===src); });
  }
  function pick(k){
    cur = k; var b = B[k];
    $$('.tab').forEach(function(t){ t.setAttribute('aria-selected', t.dataset.k===k); });
    main.innerHTML=''; thumbs.innerHTML='';
    b.img.forEach(function(s){
      var t = document.createElement('button'); t.dataset.src = s; t.setAttribute('aria-label','Show photo');
      var im = new Image(); im.dataset.remote = U+s; wire(im); im.src = local(s); im.alt=''; t.appendChild(im);
      t.addEventListener('click',function(){ show(s); });
      thumbs.appendChild(t);
    });
    show(b.img[0]);
    $('#pbadge').textContent = b.tag;
    $('#pname').textContent = b.n;
    $('#pdesc').textContent = b.d;
    $('#pdetails').href = b.link;
    var bk = $('#pbook'); bk.dataset.sel = b.sel;
  }
  $('#pbook').addEventListener('click',function(){ $('#f-branch').value = this.dataset.sel; branchNote(); });
  $$('[data-pick]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); pick(a.dataset.pick); }); });
  pick('maadi');

  /* ---------- Booking form → WhatsApp ---------- */
  $$('[data-wa]').forEach(function(a){
    a.addEventListener('click',function(){
      var sel = $('#f-service'), name = a.dataset.wa.replace('&amp;','&');
      Array.prototype.forEach.call(sel.options,function(o){ if(o.textContent===name) sel.value=o.value||o.textContent; });
    });
  });
  var notice = $('#notice');
  function branchNote(){ updateNotice(); }
  function updateNotice(){
    var msgs = [], br = $('#f-branch').value, d = $('#f-date').value;
    if(br.indexOf('Ladies')>-1) msgs.push('This branch is reserved exclusively for women.');
    if(d){ var day = new Date(d+'T12:00:00').getDay(); if(day===5) msgs.push('We are closed on Fridays. Please choose Saturday to Thursday.'); }
    notice.textContent = msgs.join(' ');
    notice.classList.toggle('show', msgs.length>0);
  }
  $('#f-branch').addEventListener('change',updateNotice);
  $('#f-date').addEventListener('change',updateNotice);
  var dEl = $('#f-date'); var today = new Date(); dEl.min = today.toISOString().slice(0,10);

  $('#bform').addEventListener('submit',function(e){
    e.preventDefault();
    var name = $('#f-name').value.trim();
    if(!name){ $('#f-name').focus(); notice.textContent='Please add your name so we can confirm your booking.'; notice.classList.add('show'); return; }
    var L = ['Hello Harmony Bliss Spa, I would like to book an appointment.',
      'Name: '+name,
      $('#f-phone').value ? 'Phone: '+$('#f-phone').value : '',
      $('#f-branch').value ? 'Branch: '+$('#f-branch').value : '',
      $('#f-service').value ? 'Treatment: '+$('#f-service').value : '',
      $('#f-date').value ? 'Date: '+$('#f-date').value : '',
      $('#f-time').value ? 'Time: '+$('#f-time').value : '',
      'Guests: '+$('#f-guests').value,
      $('#f-notes').value ? 'Notes: '+$('#f-notes').value : ''
    ].filter(Boolean).join('\n');
    window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(L),'_blank','noopener');
  });
})();
