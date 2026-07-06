// Aura & Volt - E-Commerce Engine
// Product Catalog Data
const products = [
  {
    id: 1,
    title: "Aura Double-Breasted Trench Coat",
    category: "clothing",
    price: 249.00,
    rating: 4.8,
    image: "images/trench_coat.jpg",
    badge: "Best Seller",
    specs: "Crafted with water-resistant cotton-gabardine weave, dynamic storm flaps, and a removable waist belt. Built to withstand shifting climates with class.",
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      { name: "Eleanor V.", rating: 5, comment: "Absolutely stunning structure and weight. Well worth the investment." },
      { name: "Marcus K.", rating: 4, comment: "Very elegant, fit is slightly oversized but styles beautifully." }
    ]
  },
  {
    id: 2,
    title: "Cozy Alpaca Cable Knit Sweater",
    category: "clothing",
    price: 129.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
    badge: "Trending",
    specs: "Spun from custom premium baby alpaca wool blend for optimal thermal insulation and plush texture. Features hand-knitted cable patterns.",
    sizes: ["XS", "S", "M", "L"],
    reviews: [
      { name: "Clara M.", rating: 5, comment: "Unbelievably soft and cozy. I wear it constantly!" }
    ]
  },
  {
    id: 3,
    title: "Urban Streetwear Cargo Pants",
    category: "clothing",
    price: 95.00,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=600&auto=format&fit=crop",
    badge: "New",
    specs: "Woven from durable heavyweight ripstop canvas, completed with modern technical double cargo pockets and cinched elastic ankle ties.",
    sizes: ["28", "30", "32", "34"],
    reviews: [
      { name: "Devon J.", rating: 4, comment: "Solid pants. Very durable for urban exploration." }
    ]
  },
  {
    id: 4,
    title: "Minimalist Silk Slip Dress",
    category: "clothing",
    price: 180.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    badge: "Limited Drop",
    specs: "Made from 100% fine grade mulberry silk, cut on the bias for a beautiful natural drape. Completed with high-shine adjustable straps.",
    sizes: ["XS", "S", "M", "L"],
    reviews: [
      { name: "Sophia L.", rating: 5, comment: "Feels like water. The sheen in candlelight is beautiful." }
    ]
  },
  {
    id: 5,
    title: "Volt Sound-Cancelling ANC Headphones",
    category: "electronics",
    price: 299.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    badge: "Studio Grade",
    specs: "Equipped with custom 40mm beryllium drivers, active hybrid noise cancellation (ANC), spatial high-resolution audio, and 40 hours of playtime.",
    options: ["Matte Black", "Space Gray", "Alabaster"],
    reviews: [
      { name: "Robert D.", rating: 5, comment: "Noise cancellation blocks out everything. Audio spectrum is flat and crisp." }
    ]
  },
  {
    id: 6,
    title: "Volt Magnetic 3-in-1 Charging Stand",
    category: "electronics",
    price: 89.00,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?q=80&w=600&auto=format&fit=crop",
    badge: "Workspace Gear",
    specs: "Charge your smartphone, smartwatch, and wireless earbuds simultaneously. Engineered with solid aluminum weight and leather contact pad.",
    options: ["Slate Black", "Tan Leather"],
    reviews: [
      { name: "Jordan P.", rating: 4, comment: "Cleans up desk clutter instantly. Magnet is strong." }
    ]
  },
  {
    id: 7,
    title: "Volt Tactile Mechanical Keyboard",
    category: "electronics",
    price: 159.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
    badge: "Custom Hot-Swap",
    specs: "Solid CNC aluminum case, gasket-mounted plate, and pre-lubed linear red switches. Outfitted with premium PBT double-shot keycaps.",
    options: ["Linear Red", "Tactile Brown"],
    reviews: [
      { name: "Nate H.", rating: 5, comment: "The typing sound is incredibly satisfying. Heavy and solid structure." }
    ]
  },
  {
    id: 8,
    title: "Aura Full-Grain Leather Watch Band",
    category: "electronics",
    price: 65.00,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    badge: "Handcrafted",
    specs: "Stitched with premium French linen thread and Horween full-grain leather. Finished with solid matte-black stainless steel buckles.",
    options: ["Classic Brown", "Midnight Black"],
    reviews: [
      { name: "Tyler B.", rating: 4, comment: "Durable band. Colors age nicely after daily wear." }
    ]
  }
];
// App State
let cart = JSON.parse(localStorage.getItem('auravolt_cart')) || [];
let activeFilter = 'all';
let searchQuery = '';
let activeSort = 'featured';
let currentTheme = localStorage.getItem('auravolt_theme') || 'light';
let customReviews = JSON.parse(localStorage.getItem('auravolt_reviews')) || {};
// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProducts();
  renderCart();
  setupEventListeners();
});
// Theme Management
function initTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
}
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('auravolt_theme', currentTheme);
  showToast(`Switched to ${currentTheme} mode`, 'info');
}
// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  // Filter Catalog
  let filtered = products.filter(p => {
    const matchesCategory = activeFilter === 'all' || p.category === activeFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  // Sort Catalog
  if (activeSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }
  // Clear and Build Cards
  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem 0; color: var(--text-secondary);">No products match your criteria.</div>`;
    return;
  }
  filtered.forEach(p => {
    const reviewsArr = customReviews[p.id] ? [...p.reviews, ...customReviews[p.id]] : p.reviews;
    const avgRating = (reviewsArr.reduce((sum, r) => sum + r.rating, 0) / reviewsArr.length).toFixed(1);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="card-img-wrapper">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="card-actions">
          <button class="card-btn add-quick-btn" data-id="${p.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Quick Add
          </button>
          <button class="card-btn details-btn" data-id="${p.id}" style="background-color: var(--bg-secondary); color: var(--text-primary);">
            Details
          </button>
        </div>
      </div>
      <div class="card-info">
        <span class="card-category">${p.category}</span>
        <h3 class="card-title select-title" data-id="${p.id}">${p.title}</h3>
        <div class="card-footer">
          <span class="card-price">$${p.price.toFixed(2)}</span>
          <div class="card-rating">
            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${avgRating}</span>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  // Bind Card Click Events
  grid.querySelectorAll('.add-quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const product = products.find(p => p.id === id);
      const selectedSize = product.sizes ? product.sizes[0] : null;
      const selectedOption = product.options ? product.options[0] : null;
      addToCart(product, 1, selectedSize, selectedOption);
    });
  });
  grid.querySelectorAll('.details-btn, .select-title').forEach(el => {
    el.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      openProductDetails(id);
    });
  });
}
// Cart Drawer Operations
function renderCart() {
  const list = document.getElementById('cart-items-list');
  const totalBadge = document.getElementById('cart-count-badge');
  const subtotalPrice = document.getElementById('cart-subtotal-price');
  
  if (!list || !totalBadge || !subtotalPrice) return;
  // Calculate items quantity count
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  totalBadge.innerText = totalCount;
  // Calculate prices
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  subtotalPrice.innerText = `$${subtotal.toFixed(2)}`;
  if (cart.length === 0) {
    list.innerHTML = `
      <div class="cart-empty-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <p>Your shopping cart is currently empty.</p>
      </div>
    `;
    return;
  }
  list.innerHTML = '';
  cart.forEach((item, index) => {
    const metaStr = item.size ? `Size: ${item.size}` : (item.option ? `Option: ${item.option}` : '');
    const itemNode = document.createElement('div');
    itemNode.className = 'cart-item';
    itemNode.innerHTML = `
      <img class="cart-item-img" src="${item.product.image}" alt="${item.product.title}">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.product.title}</h4>
        <div class="cart-item-meta">${metaStr}</div>
        <div class="cart-footer" style="padding: 0; border: none; background: none; margin-top: 0.25rem;">
          <span class="cart-item-price">$${(item.product.price * item.quantity).toFixed(2)}</span>
          <div class="cart-item-qty">
            <button class="cart-item-qty-btn qty-dec" data-index="${index}">-</button>
            <span class="cart-item-qty-val">${item.quantity}</span>
            <button class="cart-item-qty-btn qty-inc" data-index="${index}">+</button>
          </div>
        </div>
      </div>
      <button class="cart-item-remove" data-index="${index}" aria-label="Remove item">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
    `;
    list.appendChild(itemNode);
  });
  // Bind drawer list interactions
  list.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'));
      cart[idx].quantity++;
      saveCart();
    });
  });
  list.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'));
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
      } else {
        cart.splice(idx, 1);
      }
      saveCart();
    });
  });
  list.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'));
      const removedTitle = cart[idx].product.title;
      cart.splice(idx, 1);
      saveCart();
      showToast(`Removed "${removedTitle}" from cart`, 'info');
    });
  });
}
function addToCart(product, quantity, size, option) {
  // Check if identical item is already present
  const existingIndex = cart.findIndex(item => 
    item.product.id === product.id && 
    item.size === size && 
    item.option === option
  );
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity, size, option });
  }
  saveCart();
  showToast(`Added "${product.title}" to cart`, 'success');
  
  // Trigger slide-open drawer automatically to show addition
  document.getElementById('cart-drawer-overlay').classList.add('active');
}
function saveCart() {
  localStorage.setItem('auravolt_cart', JSON.stringify(cart));
  renderCart();
}
// Product Details Modal Builder
function openProductDetails(id) {
  const modal = document.getElementById('product-detail-modal');
  const body = document.getElementById('detail-modal-body');
  if (!modal || !body) return;
  const product = products.find(p => p.id === id);
  if (!product) return;
  const reviewsArr = customReviews[product.id] ? [...product.reviews, ...customReviews[product.id]] : product.reviews;
  const avgRating = (reviewsArr.reduce((sum, r) => sum + r.rating, 0) / reviewsArr.length).toFixed(1);
  // Set default selected variant
  let selectedSize = product.sizes ? product.sizes[0] : null;
  let selectedOption = product.options ? product.options[0] : null;
  let quantity = 1;
  // Build grid layout details template
  body.innerHTML = `
    <div class="detail-img-wrapper">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="detail-info">
      <h2 class="detail-title">${product.title}</h2>
      <div class="detail-rating-row">
        <div class="card-rating">
          <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span style="font-size: 1.1rem;">${avgRating}</span>
        </div>
        <span style="color: var(--text-secondary); font-size: 0.95rem;">(${reviewsArr.length} reviews)</span>
      </div>
      <div class="detail-price">$${product.price.toFixed(2)}</div>
      <p class="detail-description">${product.specs}</p>
      ${product.sizes ? `
        <div class="option-group">
          <div class="option-label">Select Size</div>
          <div class="option-selectors" id="size-selectors">
            ${product.sizes.map((s, idx) => `
              <button class="selector-btn ${idx === 0 ? 'active' : ''}" data-value="${s}">${s}</button>
            `).join('')}
          </div>
        </div>
      ` : ''}
      ${product.options ? `
        <div class="option-group">
          <div class="option-label">Select Accent Color/Style</div>
          <div class="option-selectors" id="option-selectors">
            ${product.options.map((o, idx) => `
              <button class="selector-btn ${idx === 0 ? 'active' : ''}" data-value="${o}">${o}</button>
            `).join('')}
          </div>
        </div>
      ` : ''}
      <div class="option-group">
        <div class="option-label">Quantity</div>
        <div class="quantity-control" style="width: max-content;">
          <button class="qty-btn" id="modal-qty-dec">-</button>
          <span class="qty-val" id="modal-qty-val">1</span>
          <button class="qty-btn" id="modal-qty-inc">+</button>
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary" id="modal-add-btn" style="flex-grow: 1;">Add to Shopping Cart</button>
      </div>
    </div>
    <!-- Review Section layout -->
    <div class="reviews-section">
      <div class="reviews-header">
        <h3>Reviews</h3>
        <button class="btn btn-secondary" id="write-review-btn" style="padding: 0.5rem 1.25rem; font-size: 0.9rem;">Write a Review</button>
      </div>
      <!-- Add Review Form -->
      <form id="review-form" class="hidden" style="margin-bottom: 2rem; background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--border-radius-sm);">
        <h4 style="margin-bottom: 1rem;">Share Your Experience</h4>
        <div class="form-row" style="margin-bottom: 1rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="rev-name">Your Name</label>
            <input type="text" id="rev-name" class="form-input" required placeholder="Alice">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="rev-rating">Rating</label>
            <select id="rev-rating" class="form-input" style="appearance: auto;" required>
              <option value="5">5 Stars (Excellent)</option>
              <option value="4">4 Stars (Good)</option>
              <option value="3">3 Stars (Average)</option>
              <option value="2">2 Stars (Poor)</option>
              <option value="1">1 Star (Very Poor)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="rev-comment">Review Description</label>
          <textarea id="rev-comment" class="form-input" rows="3" required placeholder="Tell us about the texture, quality, fit..."></textarea>
        </div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary" id="cancel-review-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Cancel</button>
          <button type="submit" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">Post Review</button>
        </div>
      </form>
      <div class="review-list">
        ${reviewsArr.map(r => `
          <div class="review-card">
            <div class="review-author">
              <span>${r.name}</span>
              <div class="card-rating">
                ${Array.from({length: r.rating}).map(() => `
                  <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                `).join('')}
              </div>
            </div>
            <p class="review-text">${r.comment}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  // Bind variant selectors
  if (product.sizes) {
    const sBtns = body.querySelectorAll('#size-selectors .selector-btn');
    sBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        sBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        selectedSize = e.currentTarget.getAttribute('data-value');
      });
    });
  }
  if (product.options) {
    const oBtns = body.querySelectorAll('#option-selectors .selector-btn');
    oBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        oBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        selectedOption = e.currentTarget.getAttribute('data-value');
      });
    });
  }
  // Bind Qty adjusters
  const qtyValNode = body.querySelector('#modal-qty-val');
  body.querySelector('#modal-qty-inc').addEventListener('click', () => {
    quantity++;
    qtyValNode.innerText = quantity;
  });
  body.querySelector('#modal-qty-dec').addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      qtyValNode.innerText = quantity;
    }
  });
  // Bind add button
  body.querySelector('#modal-add-btn').addEventListener('click', () => {
    addToCart(product, quantity, selectedSize, selectedOption);
    modal.classList.remove('active');
  });
  // Review Form handlers
  const revForm = body.querySelector('#review-form');
  const writeBtn = body.querySelector('#write-review-btn');
  const cancelBtn = body.querySelector('#cancel-review-btn');
  writeBtn.addEventListener('click', () => revForm.classList.remove('hidden'));
  cancelBtn.addEventListener('click', () => revForm.classList.add('hidden'));
  revForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = body.querySelector('#rev-name').value;
    const rating = parseInt(body.querySelector('#rev-rating').value);
    const comment = body.querySelector('#rev-comment').value;
    const newRev = { name, rating, comment };
    if (!customReviews[product.id]) {
      customReviews[product.id] = [];
    }
    customReviews[product.id].unshift(newRev);
    localStorage.setItem('auravolt_reviews', JSON.stringify(customReviews));
    showToast("Review submitted successfully", "success");
    
    // Reopen modal to show update and recalculate avg score
    openProductDetails(product.id);
    renderProducts(); // Update parent grid averages
  });
  modal.classList.add('active');
}
// Toast Feedback System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    ${type === 'success' ? `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    ` : `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
    `}
    <span>${message}</span>
  `;
  container.appendChild(toast);
  // Animate Entrance
  setTimeout(() => toast.classList.add('show'), 50);
  // Expire and Remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
// Confetti Effect
function triggerConfetti() {
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    
    // Random styling
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 85%, 60%)`;
    confetti.style.transform = `scale(${Math.random() * 0.6 + 0.6})`;
    confetti.style.animationDelay = `${Math.random() * 0.4}s`;
    
    document.body.appendChild(confetti);
    
    // Cleanup after animation completes
    setTimeout(() => confetti.remove(), 3200);
  }
}
// Event Listeners Binding
function setupEventListeners() {
  // Theme Toggle
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  // Nav scroll shrink
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
      header.style.padding = '0.5rem 0';
    } else {
      header.classList.remove('scrolled');
      header.style.padding = '0';
    }
  });
  // Nav Logo Home Redirect
  document.getElementById('logo-home').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // Filter Categories
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = e.currentTarget.getAttribute('data-category');
      setActiveCategory(cat);
      
      // Scroll to shop catalog
      document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
    });
  });
  // Catalog tab controls
  const tabBtns = document.querySelectorAll('.filter-tab');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.getAttribute('data-filter');
      setActiveCategory(filter);
    });
  });
  // Footer Category Filters
  document.querySelectorAll('.footer-filter-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = e.currentTarget.getAttribute('data-filter');
      setActiveCategory(filter);
      document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
    });
  });
  // Hero Section Redirects
  document.getElementById('hero-shop-clothing').addEventListener('click', () => {
    setActiveCategory('clothing');
    document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
  });
  
  document.getElementById('hero-shop-tech').addEventListener('click', () => {
    setActiveCategory('electronics');
    document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
  });
  // Live Search Filter (with debouncing delay)
  let searchDebounce;
  document.getElementById('search-input').addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchQuery = e.target.value.trim();
      renderProducts();
    }, 250);
  });
  // Sorting Control
  document.getElementById('sort-select').addEventListener('change', (e) => {
    activeSort = e.target.value;
    renderProducts();
  });
  // Cart Drawer togglers
  const cartDrawer = document.getElementById('cart-drawer-overlay');
  document.getElementById('cart-toggle').addEventListener('click', () => cartDrawer.classList.add('active'));
  document.getElementById('cart-close').addEventListener('click', () => cartDrawer.classList.remove('active'));
  
  // Close drawer on clicking background overlay outside drawer
  cartDrawer.addEventListener('click', (e) => {
    if (e.target === cartDrawer) cartDrawer.classList.remove('active');
  });
  // Details Modal Closer
  const detailModal = document.getElementById('product-detail-modal');
  document.getElementById('detail-close').addEventListener('click', () => detailModal.classList.remove('active'));
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) detailModal.classList.remove('active');
  });
  // Checkout Modal
  const checkoutModal = document.getElementById('checkout-modal');
  const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
  const checkoutClose = document.getElementById('checkout-close');
  const checkoutForm = document.getElementById('checkout-form');
  cartCheckoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast("Your cart is empty. Add products to continue.", "info");
      return;
    }
    // Close cart drawer, open checkout modal, init first step
    cartDrawer.classList.remove('active');
    initCheckoutFlow();
    checkoutModal.classList.add('active');
  });
  checkoutClose.addEventListener('click', () => checkoutModal.classList.remove('active'));
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) checkoutModal.classList.remove('active');
  });
  // Checkout Flow steps button handlers
  const step1 = document.getElementById('checkout-step-1');
  const step2 = document.getElementById('checkout-step-2');
  const step3 = document.getElementById('checkout-step-3');
  const ind1 = document.getElementById('step-1-indicator');
  const ind2 = document.getElementById('step-2-indicator');
  const ind3 = document.getElementById('step-3-indicator');
  // Next Step 1 -> 2
  document.getElementById('checkout-next-1').addEventListener('click', () => {
    // Validate Step 1 address inputs
    const name = document.getElementById('ship-name').value.trim();
    const email = document.getElementById('ship-email').value.trim();
    const address = document.getElementById('ship-address').value.trim();
    const city = document.getElementById('ship-city').value.trim();
    const zip = document.getElementById('ship-zip').value.trim();
    if (!name || !email || !address || !city || !zip) {
      showToast("Please fill in all shipping details.", "info");
      return;
    }
    
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter a valid email address.", "info");
      return;
    }
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    ind1.classList.remove('active');
    ind1.classList.add('completed');
    ind2.classList.add('active');
  });
  // Back Step 2 -> 1
  document.getElementById('checkout-prev-2').addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    ind2.classList.remove('active');
    ind1.classList.add('active');
    ind1.classList.remove('completed');
  });
  // Credit Card Real-Time formatting inputs
  const cardInput = document.getElementById('pay-cardnumber');
  cardInput.addEventListener('input', (e) => {
    // strip non digits
    let v = e.target.value.replace(/\D/g, '');
    // limit to 16 digits
    v = v.substring(0, 16);
    // group by 4
    let matches = v.match(/\d{1,4}/g);
    e.target.value = matches ? matches.join(' ') : '';
  });
  const expiryInput = document.getElementById('pay-expiry');
  expiryInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (v.length > 2) {
      e.target.value = `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    } else {
      e.target.value = v;
    }
  });
  const cvvInput = document.getElementById('pay-cvv');
  cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
  });
  // Submit payment form
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validate Step 2 payment inputs
    const cardholder = document.getElementById('pay-cardholder').value.trim();
    const cardnumber = document.getElementById('pay-cardnumber').value.replace(/\s/g, '');
    const expiry = document.getElementById('pay-expiry').value.trim();
    const cvv = document.getElementById('pay-cvv').value.trim();
    if (!cardholder || cardnumber.length < 16 || expiry.length < 5 || cvv.length < 3) {
      showToast("Please fill in complete credit card payment details.", "info");
      return;
    }
    // Success transaction state transition
    step2.classList.add('hidden');
    step3.classList.remove('hidden');
    ind2.classList.remove('active');
    ind2.classList.add('completed');
    ind3.classList.add('active');
    // Confetti effect & clear cart
    triggerConfetti();
    cart = [];
    saveCart();
    showToast("Payment verified. Order registered!", "success");
  });
  // Success screen exit
  document.getElementById('checkout-success-close').addEventListener('click', () => {
    checkoutModal.classList.remove('active');
  });
  // Footer / Newsletter subscription
  document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    showToast(`Subscribed "${input.value}" to drop alerts!`, 'success');
    input.value = '';
  });
}
function initCheckoutFlow() {
  // Reset steps displays
  document.getElementById('checkout-step-1').classList.remove('hidden');
  document.getElementById('checkout-step-2').classList.add('hidden');
  document.getElementById('checkout-step-3').classList.add('hidden');
  const ind1 = document.getElementById('step-1-indicator');
  const ind2 = document.getElementById('step-2-indicator');
  const ind3 = document.getElementById('step-3-indicator');
  ind1.className = 'step-indicator active';
  ind2.className = 'step-indicator';
  ind3.className = 'step-indicator';
  // Clear inputs
  document.getElementById('checkout-form').reset();
}
function setActiveCategory(cat) {
  activeFilter = cat;
  // Update navbar links classes
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (link.getAttribute('data-category') === cat) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  // Update tabs buttons classes
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-filter') === cat) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  renderProducts();
}