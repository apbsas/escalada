/* ─── EMAIL ─── */
(function(){
  const u = 'carolaescalada', d = 'gmail.com';
  const email = u + '@' + d;

  const el = document.getElementById('contacto-email');
  if(el) el.textContent = email;

  const btn = document.getElementById('footer-email-btn');
  const tip = document.getElementById('footer-email-tooltip');

  function resetTip(){
    tip.innerHTML = 'Copiar:<br>' + email;
    tip.classList.remove('is-copied');
  }

  if(btn && tip){
    btn.addEventListener('click', function(){
      navigator.clipboard.writeText(email).then(function(){
        tip.textContent = '¡Copiado!';
        tip.classList.add('is-copied');
        setTimeout(resetTip, 2000);
      }).catch(function(){
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        tip.textContent = '¡Copiado!';
        tip.classList.add('is-copied');
        setTimeout(resetTip, 2000);
      });
    });
  }
})();

/* ─── HEADER scroll ─── */
(function(){
  const header = document.getElementById('header');
  if(!header) return;
  const onScroll = function(){
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── BURGER MENU ─── */
(function(){
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('menu');
  const close  = document.getElementById('menu-close');
  if(!burger || !menu) return;

  function open(){
    menu.classList.add('is-open');
    menu.removeAttribute('aria-hidden');
    menu.removeAttribute('inert');
    burger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function shut(){
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden','true');
    menu.setAttribute('inert', '');
    burger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', open);
  if(close) close.addEventListener('click', shut);
  menu.querySelectorAll('[data-menu-link]').forEach(function(a){
    a.addEventListener('click', shut);
  });
  document.addEventListener('click', function(e){
    if(menu.classList.contains('is-open') && !menu.contains(e.target) && !burger.contains(e.target)){
      shut();
    }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') shut();
  });
})();

/* ─── TESTIMONIOS ─── */
(function(){
  const container = document.getElementById('testimonios-scroll');
  if(!container) return;

  const data = [
    { name: 'María Isabel Perón',  place: 'Posadas',        avatar: 'assets/avatar-1.png', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat dolor.' },
    { name: 'Brian Libarona',      place: 'La Plata',        avatar: 'assets/avatar-2.png', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.' },
    { name: 'Carla Méndez',        place: 'El Dorado',       avatar: 'assets/avatar-1.png', text: 'Excelente atención y un trato humano. Resolvieron mi caso con seriedad y rapidez ejemplar.' },
    { name: 'Roberto Salgado',     place: 'Villa Ballester', avatar: 'assets/avatar-2.png', text: 'Profesionales serios, claros y comprometidos. Recuperé lo que me correspondía.' },
    { name: 'Lucía Fernández',     place: 'San Martín',      avatar: 'assets/avatar-1.png', text: 'Me explicaron cada paso sin tecnicismos. Volvería a confiar en ellos sin dudarlo.' },
    { name: 'Diego Otamendi',      place: 'San Miguel',      avatar: 'assets/avatar-2.png', text: 'Trayectoria que se nota desde la primera consulta. Honestos y eficaces.' },
    { name: 'Paula Iriarte',       place: 'Resistencia',     avatar: 'assets/avatar-1.png', text: 'Acompañamiento real durante todo el proceso. No me sentí sola en ningún momento.' },
    { name: 'Jorge Varela',        place: 'Posadas',         avatar: 'assets/avatar-2.png', text: 'Logramos un acuerdo justo gracias a su asesoramiento. Muy recomendados.' },
    { name: 'Ana Belén Coria',     place: 'La Plata',        avatar: 'assets/avatar-1.png', text: 'Atención personalizada, respuestas rápidas y soluciones concretas a cada problema.' },
    { name: 'Ramiro Quiroga',      place: 'San Martín',      avatar: 'assets/avatar-2.png', text: 'Defendieron mis derechos con firmeza. El resultado superó mis expectativas iniciales.' },
  ];

  function makeCard(t){
    return (
      '<article class="testimonial">' +
        '<div class="testimonial__card">' +
          '<p class="testimonial__quote t-bastardilla">' + t.text + '</p>' +
        '</div>' +
        '<div class="testimonial__author">' +
          '<span class="testimonial__avatar" style="background-image:url(\'' + t.avatar + '\')"></span>' +
          '<span class="testimonial__author-info">' +
            '<span class="testimonial__name t-label-s">' + t.name + '</span>' +
            '<span class="testimonial__place">— ' + t.place + '</span>' +
          '</span>' +
        '</div>' +
      '</article>'
    );
  }

  /* Scroll infinito: duplicar datos 3 veces (suficiente buffer) */
  const repeated = [].concat(data, data, data);
  container.innerHTML = repeated.map(makeCard).join('');

  const prev = document.getElementById('t-prev');
  const next = document.getElementById('t-next');
  const wrap = document.getElementById('testimonios-scroll') && document.getElementById('testimonios-scroll').closest('.testimonios__scroll-wrap');

  function cardWidth(){
    const card = container.querySelector('.testimonial');
    if(!card) return 256;
    return card.getBoundingClientRect().width + 30; /* 30 = gap */
  }

  /* Posicionar en el segundo bloque al inicio (para poder hacer prev) */
  function initPosition(){
    var cw = cardWidth();
    container.scrollLeft = cw * data.length;
  }

  /* Scroll suave por una card */
  function scrollNext(){ container.scrollBy({ left: cardWidth(), behavior: 'smooth' }); }
  function scrollPrev(){ container.scrollBy({ left: -cardWidth(), behavior: 'smooth' }); }

  /* Teleport silencioso al otro extremo cuando llegamos a los límites del buffer */
  container.addEventListener('scroll', function(){
    var cw = cardWidth();
    var minEdge = cw * (data.length * 0.5);          /* cerca del inicio del primer bloque */
    var maxEdge = cw * (data.length * 2.4);           /* cerca del fin del tercer bloque */

    if(container.scrollLeft < minEdge){
      /* teleport al mismo offset pero en el bloque del medio */
      container.scrollLeft += cw * data.length;
    } else if(container.scrollLeft > maxEdge){
      container.scrollLeft -= cw * data.length;
    }
  }, { passive: true });

  if(next) next.addEventListener('click', scrollNext);
  if(prev) prev.addEventListener('click', scrollPrev);

  /* El gradiente derecho (::after) actúa como botón "next" */
  if(wrap){
    wrap.addEventListener('click', function(e){
      /* Solo si el click cae en la zona derecha (los últimos 120px) */
      var rect = wrap.getBoundingClientRect();
      if(e.clientX > rect.right - 120){
        scrollNext();
      }
    });
  }

  /* Deshabilitar prev/next no aplica en infinito — mantener siempre activos */
  if(prev) prev.removeAttribute('disabled');
  if(next) next.removeAttribute('disabled');

  /* Init position after a tick so layout is ready */
  setTimeout(initPosition, 0);
  window.addEventListener('resize', function(){ setTimeout(initPosition, 0); });
})();

/* ─── ANIMACIONES SCROLL ─── */
(function(){
  'use strict';

  var DUR  = 0.60;
  var STEP = DUR;

  if(!window.IntersectionObserver){
    document.querySelectorAll('.fade-el, .fade-tag').forEach(function(el){
      el.classList.add('is-visible');
    });
    var ls = document.querySelector('.logo-section');
    if(ls) ls.classList.add('is-visible');
    return;
  }

  /* ── Calcular y asignar delays a los .fade-tag ──
   *
   * Solo aplica a tags de sección (intro, etc.), NO a los tags dentro de .area
   * (las cards de prácticas muestran sus tags sin animación individual).
   *
   * FIX v6: Para los tags de sección, usamos el orden DOM para garantizar
   * que aparezcan de izquierda a derecha.
   */
  document.querySelectorAll('.tags[data-tag-base]').forEach(function(container){
    /* Saltar los tags dentro de cards de área */
    if(container.closest('.area')) return;

    var raw = container.getAttribute('data-tag-base');
    var n = parseFloat(raw);

    var baseDelay = isNaN(n) ? 0 : n * 0.10;

    var tags = Array.prototype.slice.call(container.querySelectorAll('.fade-tag'));
    tags.forEach(function(tag, i){
      var d = baseDelay + DUR + (i * STEP);
      tag.style.transitionDelay = d.toFixed(2) + 's';
    });
  });

  /* ── Above-the-fold: revelar inmediatamente ── */
  document.querySelectorAll('.fade-el, .fade-tag').forEach(function(el){
    var r = el.getBoundingClientRect();
    if(r.top >= 0 && r.bottom <= window.innerHeight){
      el.classList.add('is-visible');
    }
  });

  /* ── Observer principal ── */
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
      } else {
        if(entry.boundingClientRect.top < 0){
          entry.target.classList.remove('is-visible');
        }
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  });

  document.querySelectorAll('.fade-el, .fade-tag').forEach(function(el){
    observer.observe(el);
  });

  var logoSection = document.querySelector('.logo-section');
  if(logoSection){
    observer.observe(logoSection);
  }

})();
/* ─── fin ─── */
