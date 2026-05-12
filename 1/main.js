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
    burger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function shut(){
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden','true');
    burger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', open);
  if(close) close.addEventListener('click', shut);
  menu.querySelectorAll('[data-menu-link]').forEach(function(a){
    a.addEventListener('click', shut);
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
    { name: 'María Isabel Perón',  avatar: '../assets/avatar-1.png', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat dolor.' },
    { name: 'Brian Libarona',      avatar: '../assets/avatar-2.png', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.' },
    { name: 'Carla Méndez',        avatar: '../assets/avatar-1.png', text: 'Excelente atención y un trato humano. Resolvieron mi caso con seriedad y rapidez ejemplar.' },
    { name: 'Roberto Salgado',     avatar: '../assets/avatar-2.png', text: 'Profesionales serios, claros y comprometidos. Recuperé lo que me correspondía.' },
    { name: 'Lucía Fernández',     avatar: '../assets/avatar-1.png', text: 'Me explicaron cada paso sin tecnicismos. Volvería a confiar en ellos sin dudarlo.' },
    { name: 'Diego Otamendi',      avatar: '../assets/avatar-2.png', text: 'Trayectoria que se nota desde la primera consulta. Honestos y eficaces.' },
    { name: 'Paula Iriarte',       avatar: '../assets/avatar-1.png', text: 'Acompañamiento real durante todo el proceso. No me sentí sola en ningún momento.' },
    { name: 'Jorge Varela',        avatar: '../assets/avatar-2.png', text: 'Logramos un acuerdo justo gracias a su asesoramiento. Muy recomendados.' },
    { name: 'Ana Belén Coria',     avatar: '../assets/avatar-1.png', text: 'Atención personalizada, respuestas rápidas y soluciones concretas a cada problema.' },
    { name: 'Ramiro Quiroga',      avatar: '../assets/avatar-2.png', text: 'Defendieron mis derechos con firmeza. El resultado superó mis expectativas iniciales.' },
  ];

  container.innerHTML = data.map(function(t){
    return (
      '<article class="testimonial">' +
        '<div class="testimonial__card">' +
          '<p class="testimonial__quote t-bastardilla">' + t.text + '</p>' +
        '</div>' +
        '<div class="testimonial__author">' +
          '<span class="testimonial__avatar" style="background-image:url(\'' + t.avatar + '\')"></span>' +
          '<span class="testimonial__name t-label-s">' + t.name + '</span>' +
        '</div>' +
      '</article>'
    );
  }).join('');

  const prev = document.getElementById('t-prev');
  const next = document.getElementById('t-next');
  if(!prev || !next) return;

  function cardWidth(){
    const card = container.querySelector('.testimonial');
    if(!card) return 256;
    return card.getBoundingClientRect().width + 16;
  }

  function update(){
    const max = container.scrollWidth - container.clientWidth - 1;
    prev.toggleAttribute('disabled', container.scrollLeft <= 1);
    next.toggleAttribute('disabled', container.scrollLeft >= max);
  }

  next.addEventListener('click', function(){ container.scrollBy({ left: cardWidth(), behavior: 'smooth' }); });
  prev.addEventListener('click', function(){ container.scrollBy({ left: -cardWidth(), behavior: 'smooth' }); });
  container.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
