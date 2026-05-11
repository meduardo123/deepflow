/* =====================================================
   DEEPFLOW — Prototype JS
   Carrinho mock, mega menu, mobile menu, header scroll
   ===================================================== */

(() => {
  // ============ STATE ============
  const cart = [];

  // ============ ELEMENTS ============
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const header = $('#header');
  const megaMenu = $('#megaMenu');
  const navLinks = $$('.nav-link[data-menu]');

  const cartBtn = $('#cartBtn');
  const cartDrawer = $('#cartDrawer');
  const cartClose = $('#cartClose');
  const cartItemsEl = $('#cartItems');
  const cartEmpty = $('#cartEmpty');
  const cartFoot = $('#cartFoot');
  const cartCountEl = $('#cartCount');
  const cartHeaderCount = $('#cartHeaderCount');
  const cartSubtotalEl = $('#cartSubtotal');
  const emptyCloseBtn = $('#emptyCloseBtn');

  const overlay = $('#overlay');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobileMenu');
  const mobileMenuClose = $('#mobileMenuClose');

  // ============ HEADER SCROLL ============
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    lastScroll = y;
  }, { passive: true });

  // ============ MEGA MENU ============
  let megaTimer;
  const showMega = () => {
    clearTimeout(megaTimer);
    megaMenu.classList.add('is-open');
  };
  const hideMega = () => {
    megaTimer = setTimeout(() => megaMenu.classList.remove('is-open'), 120);
  };

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', showMega);
    link.addEventListener('mouseleave', hideMega);
  });
  megaMenu.addEventListener('mouseenter', showMega);
  megaMenu.addEventListener('mouseleave', hideMega);

  // ============ DRAWERS ============
  const openCart = () => {
    cartDrawer.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  };
  const closeCart = () => {
    cartDrawer.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  };
  const openMobile = () => {
    mobileMenu.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  };
  const closeMobile = () => {
    mobileMenu.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  emptyCloseBtn.addEventListener('click', closeCart);
  hamburger.addEventListener('click', openMobile);
  mobileMenuClose.addEventListener('click', closeMobile);

  overlay.addEventListener('click', () => {
    closeCart();
    closeMobile();
  });

  // ============ ESC ============
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeMobile();
    }
  });

  // ============ CART LOGIC ============
  const formatBRL = (n) =>
    'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const renderCart = () => {
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
      cartEmpty.style.display = 'flex';
      cartFoot.classList.remove('is-visible');
      cartCountEl.textContent = '0';
      cartBtn.classList.remove('has-items');
      cartHeaderCount.textContent = '(0)';
      return;
    }

    cartEmpty.style.display = 'none';
    cartFoot.classList.add('is-visible');

    cart.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item-img"></div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>Tamanho: A2 · Branco</p>
          <div class="cart-item-qty">
            <button data-action="dec" data-id="${item.id}" aria-label="Diminuir">−</button>
            <span>${item.qty}</span>
            <button data-action="inc" data-id="${item.id}" aria-label="Aumentar">+</button>
          </div>
        </div>
        <div class="cart-item-side">
          <span class="cart-item-price">${formatBRL(item.price * item.qty)}</span>
          <button class="cart-item-remove" data-action="remove" data-id="${item.id}">Remover</button>
        </div>
      `;
      cartItemsEl.appendChild(li);
    });

    const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    const count = cart.reduce((acc, i) => acc + i.qty, 0);

    cartSubtotalEl.textContent = formatBRL(total);
    cartCountEl.textContent = count;
    cartHeaderCount.textContent = `(${count})`;
    cartBtn.classList.add('has-items');
  };

  const addToCart = (id, name, price) => {
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, name, price, qty: 1 });
    renderCart();
    openCart();
  };

  // delegação para clicks em ações do carrinho
  cartItemsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (action === 'inc') item.qty += 1;
    else if (action === 'dec') {
      item.qty -= 1;
      if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
    } else if (action === 'remove') {
      cart.splice(cart.indexOf(item), 1);
    }
    renderCart();
  });

  // botões de adicionar dos cards de produto
  $$('.product-card').forEach(card => {
    const addBtn = card.querySelector('.product-quick-add');
    if (!addBtn) return;
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = card.dataset.product;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      addToCart(id, name, price);

      // mini feedback
      addBtn.textContent = '✓ adicionado';
      setTimeout(() => addBtn.textContent = '+ adicionar', 1400);
    });
  });

  // ============ INTERSECTION REVEALS ============
  const revealEls = $$('.section-head, .pillar, .category-card, .product-card, .editorial-text, .editorial-media');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = `opacity 0.8s var(--ease) ${i * 0.04}s, transform 0.8s var(--ease) ${i * 0.04}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    io.observe(el);
  });

  // boot
  renderCart();
})();
