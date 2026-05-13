/* ================================================
   AMA ProStock — Nigerian Inventory System
   script.js — Complete Business Logic
   Copyright © AMA Global Inc. All Rights Reserved.
   ================================================ */

'use strict';

/* ===================================================
   1. STATE — All app data lives here
=================================================== */
let state = {
  products: [],
  sales: [],
  stock: [],       // stock movement history
  expenses: [],
  investments: [],
  pin: '1234',
  theme: 'light',
  sheetsURL: '',
};

/* Sample Nigerian provision shop data */
const SAMPLE_PRODUCTS = [
  { id:'PRD001', name:'Dangote Rice 5kg',       category:'Rice',       costPrice:4500, sellPrice:5200, qty:120, supplier:'Dangote Agro', dateAdded:'2025-01-10' },
  { id:'PRD002', name:'Indomie Noodles (Carton)',category:'Noodles',    costPrice:3200, sellPrice:3900, qty:80,  supplier:'De-United Foods', dateAdded:'2025-01-12' },
  { id:'PRD003', name:'Milo Tin 400g',           category:'Beverages',  costPrice:1800, sellPrice:2200, qty:60,  supplier:'Nestlé Nigeria', dateAdded:'2025-01-15' },
  { id:'PRD004', name:'Bournvita 500g',           category:'Beverages',  costPrice:1950, sellPrice:2400, qty:45,  supplier:'Cadbury Nigeria', dateAdded:'2025-01-16' },
  { id:'PRD005', name:'Golden Penny Semovita 2kg',category:'Grains',    costPrice:1200, sellPrice:1500, qty:90,  supplier:'Flour Mills NG', dateAdded:'2025-01-18' },
  { id:'PRD006', name:'Peak Milk (Tin)',          category:'Dairy',      costPrice:550,  sellPrice:700,  qty:200, supplier:'FrieslandCampina', dateAdded:'2025-01-20' },
  { id:'PRD007', name:'Coca-Cola 50cl (Crate)',   category:'Soft Drinks',costPrice:2800, sellPrice:3500, qty:30,  supplier:'NBPLC', dateAdded:'2025-01-22' },
  { id:'PRD008', name:'Sprite 50cl (Crate)',      category:'Soft Drinks',costPrice:2700, sellPrice:3400, qty:25,  supplier:'NBPLC', dateAdded:'2025-01-22' },
  { id:'PRD009', name:'Maggi Seasoning (Pkt 100)',category:'Spices',     costPrice:900,  sellPrice:1200, qty:150, supplier:'Nestlé Nigeria', dateAdded:'2025-01-25' },
  { id:'PRD010', name:'Titus Sardines (Carton)',  category:'Provisions', costPrice:7500, sellPrice:9000, qty:20,  supplier:'Alhaji Musa Stores', dateAdded:'2025-01-28' },
  { id:'PRD011', name:'Vaseline Body Lotion 400ml',category:'Cosmetics', costPrice:1300, sellPrice:1700, qty:5,   supplier:'Unilever Nigeria', dateAdded:'2025-02-01' },
  { id:'PRD012', name:'Agege Bread (Loaf)',        category:'Bread',     costPrice:500,  sellPrice:650,  qty:3,   supplier:'Local Bakery Ikeja', dateAdded:'2025-02-05' },
  { id:'PRD013', name:'Pringles Original 165g',   category:'Snacks',    costPrice:1800, sellPrice:2300, qty:40,  supplier:'Kellogg Nigeria', dateAdded:'2025-02-08' },
  { id:'PRD014', name:'Dettol Soap (Pack of 3)',  category:'Household',  costPrice:1100, sellPrice:1400, qty:70,  supplier:'Reckitt Nigeria', dateAdded:'2025-02-10' },
  { id:'PRD015', name:'Tatashe Pepper 1kg',        category:'Spices',    costPrice:800,  sellPrice:1100, qty:0,   supplier:'Mile 12 Market', dateAdded:'2025-02-12' },
];

const SAMPLE_SALES = [
  { id:'SLE001', productId:'PRD001', productName:'Dangote Rice 5kg',       qty:5,  unitPrice:5200, revenue:26000, profit:3500, costPrice:4500, date:'2025-05-01' },
  { id:'SLE002', productId:'PRD002', productName:'Indomie Noodles (Carton)',qty:3,  unitPrice:3900, revenue:11700, profit:2100, costPrice:3200, date:'2025-05-02' },
  { id:'SLE003', productId:'PRD003', productName:'Milo Tin 400g',           qty:4,  unitPrice:2200, revenue:8800,  profit:1600, costPrice:1800, date:'2025-05-03' },
  { id:'SLE004', productId:'PRD007', productName:'Coca-Cola 50cl (Crate)',  qty:2,  unitPrice:3500, revenue:7000,  profit:1400, costPrice:2800, date:'2025-05-05' },
  { id:'SLE005', productId:'PRD009', productName:'Maggi Seasoning (Pkt 100)',qty:6, unitPrice:1200, revenue:7200,  profit:1800, costPrice:900,  date:'2025-05-07' },
  { id:'SLE006', productId:'PRD006', productName:'Peak Milk (Tin)',         qty:10, unitPrice:700,  revenue:7000,  profit:1500, costPrice:550,  date:'2025-05-08' },
  { id:'SLE007', productId:'PRD014', productName:'Dettol Soap (Pack of 3)', qty:5,  unitPrice:1400, revenue:7000,  profit:1500, costPrice:1100, date:'2025-05-09' },
  { id:'SLE008', productId:'PRD013', productName:'Pringles Original 165g',  qty:3,  unitPrice:2300, revenue:6900,  profit:1500, costPrice:1800, date:'2025-05-10' },
];

const SAMPLE_EXPENSES = [
  { id:'EXP001', title:'Shop Rent (May)',   category:'Shop Rent',   amount:45000, desc:'Monthly shop rent', date:'2025-05-01' },
  { id:'EXP002', title:'PHCN Bill',         category:'Electricity', amount:8500,  desc:'Electricity bill',  date:'2025-05-03' },
  { id:'EXP003', title:'Staff Wages',       category:'Staff Salary',amount:25000, desc:'Chidi salary May',  date:'2025-05-05' },
  { id:'EXP004', title:'Transport (Market)',category:'Transport',    amount:3000,  desc:'Market run trip',   date:'2025-05-07' },
  { id:'EXP005', title:'POS Terminal Fee',  category:'POS Charges', amount:1500,  desc:'Monthly POS charge',date:'2025-05-08' },
];

const SAMPLE_INVESTMENTS = [
  { id:'INV001', investor:'Chukwuemeka Obi', type:'Initial Capital',       amount:500000, notes:'Business startup capital', date:'2025-01-01' },
  { id:'INV002', investor:'Ngozi Obi',        type:'Additional Investment', amount:150000, notes:'Stock expansion Jan',      date:'2025-02-01' },
  { id:'INV003', investor:'Chukwuemeka Obi', type:'Withdrawal',            amount:50000,  notes:'Personal withdrawal',      date:'2025-04-01' },
];

/* ===================================================
   2. PERSISTENCE — localStorage
=================================================== */
function saveState() {
  try { localStorage.setItem('ama_prostock_state', JSON.stringify(state)); } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem('ama_prostock_state');
    if (raw) {
      const saved = JSON.parse(raw);
      state = { ...state, ...saved };
      return true;
    }
  } catch(e) {}
  return false;
}

function loadSampleData() {
  state.products    = SAMPLE_PRODUCTS.map(p => ({ ...p }));
  state.sales       = SAMPLE_SALES.map(s => ({ ...s }));
  state.expenses    = SAMPLE_EXPENSES.map(e => ({ ...e }));
  state.investments = SAMPLE_INVESTMENTS.map(i => ({ ...i }));
  state.stock       = [];
  saveState();
}

/* ===================================================
   3. UTILITY FUNCTIONS
=================================================== */
function fmt(n) {
  return '₦' + Number(n || 0).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function dateStr(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-NG', { day:'2-digit', month:'short', year:'numeric' });
}

function genId(prefix, list) {
  const nums = list.map(x => parseInt((x.id || '').replace(prefix, '')) || 0);
  const next  = (nums.length ? Math.max(...nums) : 0) + 1;
  return prefix + String(next).padStart(3, '0');
}

/* ===================================================
   4. PIN / LOCK SYSTEM
=================================================== */
let pinBuffer = '';

function pinInput(n) {
  if (pinBuffer.length >= 4) return;
  pinBuffer += n;
  updatePinDots();
  if (pinBuffer.length === 4) setTimeout(pinSubmit, 200);
}

function pinClear() {
  pinBuffer = pinBuffer.slice(0, -1);
  updatePinDots();
}

function updatePinDots() {
  for (let i = 0; i < 4; i++) {
    const d = document.getElementById('d' + i);
    if (!d) return;
    d.className = 'pin-dot' + (i < pinBuffer.length ? ' filled' : '');
  }
}

function pinSubmit() {
  if (pinBuffer === state.pin) {
    document.getElementById('lockScreen').style.display = 'none';
    document.getElementById('mainApp').classList.remove('hidden');
    initApp();
  } else {
    for (let i = 0; i < 4; i++) {
      const d = document.getElementById('d' + i);
      if (d) { d.className = 'pin-dot error'; }
    }
    document.getElementById('pinHint').textContent = '❌ Wrong PIN! Try again.';
    setTimeout(() => {
      pinBuffer = '';
      updatePinDots();
      document.getElementById('pinHint').textContent = 'Enter your 4-digit PIN (default: 1234)';
    }, 1200);
  }
}

function lockSystem() {
  document.getElementById('lockScreen').style.display = 'flex';
  document.getElementById('mainApp').classList.add('hidden');
  pinBuffer = '';
  updatePinDots();
}

function changePin() {
  const cur  = document.getElementById('currentPin').value.trim();
  const nw   = document.getElementById('newPin').value.trim();
  const conf = document.getElementById('confirmPin').value.trim();
  if (cur !== state.pin) { toast('❌ Current PIN is incorrect', 'error'); return; }
  if (!/^\d{4}$/.test(nw)) { toast('PIN must be exactly 4 digits', 'error'); return; }
  if (nw !== conf) { toast('New PINs do not match', 'error'); return; }
  state.pin = nw;
  saveState();
  toast('✅ PIN updated successfully!');
  document.getElementById('currentPin').value = '';
  document.getElementById('newPin').value = '';
  document.getElementById('confirmPin').value = '';
}

/* ===================================================
   5. THEME TOGGLE
=================================================== */
function toggleTheme() {
  const html = document.documentElement;
  state.theme = (html.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
  html.setAttribute('data-theme', state.theme);
  document.querySelector('.btn-theme').textContent = state.theme === 'dark' ? '☀️' : '🌙';
  saveState();
  refreshCharts();
}

/* ===================================================
   6. SIDEBAR & NAVIGATION
=================================================== */
function toggleSidebar() {
  const sb  = document.getElementById('sidebar');
  const ov  = document.getElementById('overlay');
  const open = sb.classList.toggle('open');
  ov.classList.toggle('visible', open);
}

function navigate(page) {
  /* Hide all pages */
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  /* Remove active nav */
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  /* Show target page */
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  /* Activate nav link */
  const link = document.querySelector('.nav-link[data-page="' + page + '"]');
  if (link) link.classList.add('active');
  /* Update header */
  const titles = {
    dashboard:'Dashboard', products:'Products', sales:'Sales',
    stock:'Stock Management', expenses:'Expenses', investments:'Capital & Investments',
    profitloss:'Profit & Loss Report', analytics:'Analytics', settings:'Settings'
  };
  document.getElementById('pageTitle').textContent = titles[page] || page;
  document.getElementById('pageBreadcrumb').textContent = 'Home / ' + (titles[page] || page);
  /* Close sidebar on mobile */
  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('visible');
  }
  /* Refresh page-specific content */
  switch(page) {
    case 'dashboard':   renderDashboard(); break;
    case 'products':    renderProducts(); break;
    case 'sales':       renderSales(); break;
    case 'stock':       renderStock(); break;
    case 'expenses':    renderExpenses(); break;
    case 'investments': renderInvestments(); break;
    case 'profitloss':  renderPL(); break;
    case 'analytics':   renderAnalytics(); break;
  }
}

/* ===================================================
   7. TOAST NOTIFICATIONS
=================================================== */
function toast(msg, type = 'success') {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = 'toast' + (type !== 'success' ? ' ' + type : '');
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => t.remove(), 300);
  }, 3200);
}

/* ===================================================
   8. MODAL HELPERS
=================================================== */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}

/* Close modals on backdrop click */
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

/* ===================================================
   9. PRODUCT MANAGEMENT
=================================================== */
function openAddProduct() {
  document.getElementById('productModalTitle').textContent = 'Add New Product';
  document.getElementById('editProductId').value = '';
  ['pName','pCostPrice','pSellPrice','pQty','pSupplier'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('pCategory').value = 'Rice';
  openModal('addProductModal');
}

function saveProduct() {
  const name      = document.getElementById('pName').value.trim();
  const category  = document.getElementById('pCategory').value;
  const costPrice = parseFloat(document.getElementById('pCostPrice').value) || 0;
  const sellPrice = parseFloat(document.getElementById('pSellPrice').value) || 0;
  const qty       = parseInt(document.getElementById('pQty').value) || 0;
  const supplier  = document.getElementById('pSupplier').value.trim();
  const editId    = document.getElementById('editProductId').value;

  if (!name) { toast('Product name is required', 'error'); return; }
  if (costPrice <= 0) { toast('Enter a valid cost price', 'error'); return; }
  if (sellPrice <= 0) { toast('Enter a valid selling price', 'error'); return; }

  if (editId) {
    const idx = state.products.findIndex(p => p.id === editId);
    if (idx !== -1) {
      state.products[idx] = { ...state.products[idx], name, category, costPrice, sellPrice, qty, supplier };
      toast('✅ Product updated!');
    }
  } else {
    const id = genId('PRD', state.products);
    state.products.push({ id, name, category, costPrice, sellPrice, qty, supplier, dateAdded: today() });
    toast('✅ Product added!');
  }
  saveState();
  closeModal('addProductModal');
  renderProducts();
  updateDashboardCards();
}

function editProduct(id) {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('productModalTitle').textContent = 'Edit Product';
  document.getElementById('editProductId').value = p.id;
  document.getElementById('pName').value       = p.name;
  document.getElementById('pCategory').value   = p.category;
  document.getElementById('pCostPrice').value  = p.costPrice;
  document.getElementById('pSellPrice').value  = p.sellPrice;
  document.getElementById('pQty').value        = p.qty;
  document.getElementById('pSupplier').value   = p.supplier || '';
  openModal('addProductModal');
}

function deleteProduct(id) {
  if (!confirm('Delete this product permanently?')) return;
  state.products = state.products.filter(p => p.id !== id);
  saveState();
  renderProducts();
  updateDashboardCards();
  toast('🗑 Product deleted', 'warn');
}

function renderProducts(list) {
  const data   = list || state.products;
  const tbody  = document.getElementById('productsTbody');
  const empty  = document.getElementById('productsEmpty');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!data.length) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  data.forEach(p => {
    let status, badge;
    if (p.qty === 0)  { status = 'Out of Stock'; badge = 'badge-out'; }
    else if (p.qty <= 10) { status = 'Low Stock'; badge = 'badge-low'; }
    else               { status = 'In Stock'; badge = 'badge-ok'; }
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code>${p.id}</code></td>
      <td><strong>${p.name}</strong></td>
      <td><span class="status-badge badge-ok" style="background:var(--bg);color:var(--text-secondary)">${p.category}</span></td>
      <td>${fmt(p.costPrice)}</td>
      <td>${fmt(p.sellPrice)}</td>
      <td><strong>${p.qty}</strong></td>
      <td>${p.supplier || '—'}</td>
      <td><span class="status-badge ${badge}">${status}</span></td>
      <td>
        <button class="tbl-btn tbl-edit" onclick="editProduct('${p.id}')">✏ Edit</button>
        <button class="tbl-btn tbl-del"  onclick="deleteProduct('${p.id}')">🗑 Del</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function filterProducts() {
  const q   = (document.getElementById('productSearch').value || '').toLowerCase();
  const cat = document.getElementById('categoryFilter').value;
  const filtered = state.products.filter(p =>
    (!q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || (p.supplier||'').toLowerCase().includes(q)) &&
    (!cat || p.category === cat)
  );
  renderProducts(filtered);
}

/* ===================================================
   10. SALES MANAGEMENT
=================================================== */
function populateSaleProductDropdown() {
  const sel = document.getElementById('saleProduct');
  if (!sel) return;
  sel.innerHTML = '<option value="">-- Select Product --</option>';
  state.products.filter(p => p.qty > 0).forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} (Qty: ${p.qty}) — ${fmt(p.sellPrice)}`;
    sel.appendChild(opt);
  });
}

function fillSalePrice() {
  const id = document.getElementById('saleProduct').value;
  const p  = state.products.find(x => x.id === id);
  if (p) document.getElementById('salePrice').value = p.sellPrice;
  calcSaleTotal();
}

function calcSaleTotal() {
  const id    = document.getElementById('saleProduct').value;
  const qty   = parseInt(document.getElementById('saleQty').value) || 0;
  const price = parseFloat(document.getElementById('salePrice').value) || 0;
  const p     = state.products.find(x => x.id === id);
  if (!p) { document.getElementById('salePreview').textContent = '₦0.00 | Profit: ₦0.00'; return; }
  const revenue = qty * price;
  const profit  = (price - p.costPrice) * qty;
  document.getElementById('salePreview').textContent =
    `Revenue: ${fmt(revenue)} | Profit: ${fmt(profit)}`;
}

function recordSale() {
  const id    = document.getElementById('saleProduct').value;
  const qty   = parseInt(document.getElementById('saleQty').value) || 0;
  const price = parseFloat(document.getElementById('salePrice').value) || 0;
  const p     = state.products.find(x => x.id === id);

  if (!p)  { toast('Select a product', 'error'); return; }
  if (qty <= 0) { toast('Enter a valid quantity', 'error'); return; }
  if (price <= 0) { toast('Enter a valid price', 'error'); return; }
  if (qty > p.qty) { toast(`Not enough stock! Available: ${p.qty}`, 'error'); return; }

  const revenue = qty * price;
  const profit  = (price - p.costPrice) * qty;
  const saleId  = genId('SLE', state.sales);

  /* Create sale record */
  state.sales.push({
    id: saleId, productId: p.id, productName: p.name,
    qty, unitPrice: price, revenue, profit, costPrice: p.costPrice, date: today()
  });

  /* Reduce product stock */
  const pidx = state.products.findIndex(x => x.id === id);
  const before = p.qty;
  state.products[pidx].qty -= qty;
  state.stock.push({ product: p.name, action: 'Sale', qty, before, after: state.products[pidx].qty, note: `Sale ${saleId}`, date: today() });

  saveState();
  closeModal('addSaleModal');
  renderSales();
  renderProducts();
  updateDashboardCards();
  toast(`✅ Sale recorded! Revenue: ${fmt(revenue)}`);
}

function deleteSale(id) {
  if (!confirm('Delete this sale record?')) return;
  state.sales = state.sales.filter(s => s.id !== id);
  saveState();
  renderSales();
  updateDashboardCards();
  toast('🗑 Sale deleted', 'warn');
}

function renderSales(list) {
  const data  = list || [...state.sales].reverse();
  const tbody = document.getElementById('salesTbody');
  const empty = document.getElementById('salesEmpty');
  if (!tbody) return;
  tbody.innerHTML = '';

  /* Mini stats */
  const t = today();
  const todaySalesAmt  = state.sales.filter(s => s.date === t).reduce((a, s) => a + s.revenue, 0);
  const todayProfitAmt = state.sales.filter(s => s.date === t).reduce((a, s) => a + s.profit, 0);
  if (document.getElementById('todaySales'))  document.getElementById('todaySales').textContent  = fmt(todaySalesAmt);
  if (document.getElementById('todayProfit')) document.getElementById('todayProfit').textContent = fmt(todayProfitAmt);
  if (document.getElementById('totalTxn'))    document.getElementById('totalTxn').textContent    = state.sales.length;

  if (!data.length) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  data.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code>${s.id}</code></td>
      <td>${s.productName}</td>
      <td>${s.qty}</td>
      <td>${fmt(s.unitPrice)}</td>
      <td><strong>${fmt(s.revenue)}</strong></td>
      <td style="color:var(--secondary);font-weight:600">${fmt(s.profit)}</td>
      <td>${dateStr(s.date)}</td>
      <td><button class="tbl-btn tbl-del" onclick="deleteSale('${s.id}')">🗑 Del</button></td>`;
    tbody.appendChild(tr);
  });
}

function filterSales() {
  const q    = (document.getElementById('salesSearch').value || '').toLowerCase();
  const date = document.getElementById('salesDateFilter').value;
  const filtered = [...state.sales].reverse().filter(s =>
    (!q || s.productName.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)) &&
    (!date || s.date === date)
  );
  renderSales(filtered);
}

/* ===================================================
   11. STOCK ADJUSTMENT
=================================================== */
function populateStockDropdown() {
  const sel = document.getElementById('stockProduct');
  if (!sel) return;
  sel.innerHTML = '<option value="">-- Select Product --</option>';
  state.products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} (Current Qty: ${p.qty})`;
    sel.appendChild(opt);
  });
}

function adjustStock() {
  const id     = document.getElementById('stockProduct').value;
  const action = document.getElementById('stockAction').value;
  const qty    = parseInt(document.getElementById('stockQty').value) || 0;
  const note   = document.getElementById('stockNote').value.trim() || '—';
  const p      = state.products.find(x => x.id === id);
  if (!p)    { toast('Select a product', 'error'); return; }
  if (qty <= 0) { toast('Enter a valid quantity', 'error'); return; }

  const pidx  = state.products.findIndex(x => x.id === id);
  const before = p.qty;
  if (action === 'add') {
    state.products[pidx].qty += qty;
  } else {
    if (qty > p.qty) { toast(`Cannot reduce by more than current stock (${p.qty})`, 'error'); return; }
    state.products[pidx].qty -= qty;
  }
  state.stock.push({ product: p.name, action: action === 'add' ? 'Stock In' : 'Stock Out', qty, before, after: state.products[pidx].qty, note, date: today() });
  saveState();
  closeModal('stockModal');
  renderStock();
  renderProducts();
  updateDashboardCards();
  toast(`✅ Stock ${action === 'add' ? 'increased' : 'reduced'} by ${qty}`);
}

function renderStock() {
  const data  = [...state.stock].reverse();
  const tbody = document.getElementById('stockTbody');
  const empty = document.getElementById('stockEmpty');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!data.length) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  data.forEach(s => {
    const isIn = s.action === 'Stock In';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${s.product}</strong></td>
      <td><span class="status-badge ${isIn ? 'badge-ok' : 'badge-low'}">${s.action}</span></td>
      <td>${s.qty}</td>
      <td>${s.before}</td>
      <td>${s.after}</td>
      <td>${s.note}</td>
      <td>${dateStr(s.date)}</td>`;
    tbody.appendChild(tr);
  });
}

/* ===================================================
   12. EXPENSE MANAGEMENT
=================================================== */
function saveExpense() {
  const editId   = document.getElementById('editExpenseId').value;
  const title    = document.getElementById('expTitle').value.trim();
  const category = document.getElementById('expCategory').value;
  const amount   = parseFloat(document.getElementById('expAmount').value) || 0;
  const desc     = document.getElementById('expDesc').value.trim();
  const date     = document.getElementById('expDate').value || today();

  if (!title)  { toast('Expense title required', 'error'); return; }
  if (amount <= 0) { toast('Enter a valid amount', 'error'); return; }

  if (editId) {
    const idx = state.expenses.findIndex(e => e.id === editId);
    if (idx !== -1) { state.expenses[idx] = { ...state.expenses[idx], title, category, amount, desc, date }; toast('✅ Expense updated!'); }
  } else {
    state.expenses.push({ id: genId('EXP', state.expenses), title, category, amount, desc, date });
    toast('✅ Expense added!');
  }
  saveState();
  closeModal('addExpenseModal');
  renderExpenses();
  updateDashboardCards();
  clearExpenseForm();
}

function clearExpenseForm() {
  ['expTitle','expAmount','expDesc','expDate'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('editExpenseId').value = '';
  document.getElementById('expCategory').value = 'Transport';
}

function editExpense(id) {
  const e = state.expenses.find(x => x.id === id);
  if (!e) return;
  document.getElementById('expenseModalTitle').textContent = 'Edit Expense';
  document.getElementById('editExpenseId').value = e.id;
  document.getElementById('expTitle').value      = e.title;
  document.getElementById('expCategory').value   = e.category;
  document.getElementById('expAmount').value     = e.amount;
  document.getElementById('expDesc').value       = e.desc || '';
  document.getElementById('expDate').value       = e.date;
  openModal('addExpenseModal');
}

function deleteExpense(id) {
  if (!confirm('Delete this expense?')) return;
  state.expenses = state.expenses.filter(e => e.id !== id);
  saveState();
  renderExpenses();
  updateDashboardCards();
  toast('🗑 Expense deleted', 'warn');
}

function renderExpenses(list) {
  const data  = list || [...state.expenses].reverse();
  const tbody = document.getElementById('expensesTbody');
  const empty = document.getElementById('expensesEmpty');
  if (!tbody) return;
  tbody.innerHTML = '';

  const t   = today();
  const mon = t.substring(0, 7);
  const total   = state.expenses.reduce((a, e) => a + e.amount, 0);
  const todayE  = state.expenses.filter(e => e.date === t).reduce((a, e) => a + e.amount, 0);
  const monthE  = state.expenses.filter(e => (e.date || '').startsWith(mon)).reduce((a, e) => a + e.amount, 0);
  if (document.getElementById('totalExpStat')) document.getElementById('totalExpStat').textContent = fmt(total);
  if (document.getElementById('todayExpStat')) document.getElementById('todayExpStat').textContent = fmt(todayE);
  if (document.getElementById('monthExpStat')) document.getElementById('monthExpStat').textContent = fmt(monthE);

  if (!data.length) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  data.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code>${e.id}</code></td>
      <td><strong>${e.title}</strong></td>
      <td><span class="status-badge badge-low">${e.category}</span></td>
      <td style="color:var(--danger);font-weight:700">${fmt(e.amount)}</td>
      <td>${e.desc || '—'}</td>
      <td>${dateStr(e.date)}</td>
      <td>
        <button class="tbl-btn tbl-edit" onclick="editExpense('${e.id}')">✏ Edit</button>
        <button class="tbl-btn tbl-del"  onclick="deleteExpense('${e.id}')">🗑 Del</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function filterExpenses() {
  const q   = (document.getElementById('expenseSearch').value || '').toLowerCase();
  const cat = document.getElementById('expenseCatFilter').value;
  const filtered = [...state.expenses].reverse().filter(e =>
    (!q || e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)) &&
    (!cat || e.category === cat)
  );
  renderExpenses(filtered);
}

/* ===================================================
   13. INVESTMENT / CAPITAL MANAGEMENT
=================================================== */
function saveInvestment() {
  const investor = document.getElementById('invInvestor').value.trim();
  const type     = document.getElementById('invType').value;
  const amount   = parseFloat(document.getElementById('invAmount').value) || 0;
  const notes    = document.getElementById('invNotes').value.trim();
  const date     = document.getElementById('invDate').value || today();

  if (!investor) { toast('Investor/source name required', 'error'); return; }
  if (amount <= 0) { toast('Enter a valid amount', 'error'); return; }

  state.investments.push({ id: genId('INV', state.investments), investor, type, amount, notes, date });
  saveState();
  closeModal('addInvestmentModal');
  renderInvestments();
  updateDashboardCards();
  toast('✅ Capital entry saved!');
  ['invInvestor','invAmount','invNotes','invDate'].forEach(id => document.getElementById(id).value = '');
}

function deleteInvestment(id) {
  if (!confirm('Delete this capital entry?')) return;
  state.investments = state.investments.filter(i => i.id !== id);
  saveState();
  renderInvestments();
  updateDashboardCards();
  toast('🗑 Entry deleted', 'warn');
}

function renderInvestments() {
  const data  = [...state.investments].reverse();
  const tbody = document.getElementById('investmentsTbody');
  const empty = document.getElementById('investmentsEmpty');
  if (!tbody) return;
  tbody.innerHTML = '';

  const invested   = state.investments.filter(i => i.type !== 'Withdrawal').reduce((a, i) => a + i.amount, 0);
  const withdrawn  = state.investments.filter(i => i.type === 'Withdrawal').reduce((a, i) => a + i.amount, 0);
  const net        = invested - withdrawn;
  if (document.getElementById('totalInvested'))  document.getElementById('totalInvested').textContent  = fmt(invested);
  if (document.getElementById('totalWithdrawn')) document.getElementById('totalWithdrawn').textContent = fmt(withdrawn);
  if (document.getElementById('netCapital'))      document.getElementById('netCapital').textContent     = fmt(net);

  if (!data.length) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  data.forEach(i => {
    const isWithdrawal = i.type === 'Withdrawal';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code>${i.id}</code></td>
      <td><strong>${i.investor}</strong></td>
      <td><span class="status-badge ${isWithdrawal ? 'badge-out' : 'badge-ok'}">${i.type}</span></td>
      <td style="color:${isWithdrawal ? 'var(--danger)' : 'var(--secondary)'};font-weight:700">
        ${isWithdrawal ? '-' : '+'}${fmt(i.amount)}
      </td>
      <td>${i.notes || '—'}</td>
      <td>${dateStr(i.date)}</td>
      <td><button class="tbl-btn tbl-del" onclick="deleteInvestment('${i.id}')">🗑 Del</button></td>`;
    tbody.appendChild(tr);
  });
}

/* ===================================================
   14. PROFIT & LOSS ENGINE
=================================================== */
function calcPL() {
  const revenue   = state.sales.reduce((a, s) => a + s.revenue, 0);
  const cogs      = state.sales.reduce((a, s) => a + (s.costPrice * s.qty), 0);
  const gross     = revenue - cogs;
  const expenses  = state.expenses.reduce((a, e) => a + e.amount, 0);
  const net       = gross - expenses;
  const invested  = state.investments.filter(i => i.type !== 'Withdrawal').reduce((a, i) => a + i.amount, 0);
  const withdrawn = state.investments.filter(i => i.type === 'Withdrawal').reduce((a, i) => a + i.amount, 0);
  const capital   = invested - withdrawn + net;
  return { revenue, cogs, gross, expenses, net, invested, withdrawn, capital };
}

function renderPL() {
  const pl = calcPL();
  document.getElementById('plRevenue').textContent  = fmt(pl.revenue);
  document.getElementById('plCOGS').textContent     = fmt(pl.cogs);
  document.getElementById('plGross').textContent    = fmt(pl.gross);
  document.getElementById('plExpenses').textContent = fmt(pl.expenses);
  document.getElementById('plNet').textContent      = fmt(Math.abs(pl.net));
  document.getElementById('plCapital').textContent  = fmt(pl.capital);

  const badge   = document.getElementById('plBadge');
  const netCard = document.getElementById('plNetCard');
  if (pl.net >= 0) {
    badge.textContent  = '✅ PROFIT';
    badge.className    = 'pl-badge badge-profit';
    netCard.style.borderTopColor = 'var(--secondary)';
    document.getElementById('plNet').style.color = 'var(--secondary)';
  } else {
    badge.textContent  = '❌ LOSS';
    badge.className    = 'pl-badge badge-loss';
    netCard.style.borderTopColor = 'var(--danger)';
    document.getElementById('plNet').style.color = 'var(--danger)';
  }

  renderPLCharts(pl);
}

/* ===================================================
   15. DASHBOARD CARDS & LOW STOCK
=================================================== */
function updateDashboardCards() {
  const pl        = calcPL();
  const totalQty  = state.products.reduce((a, p) => a + p.qty, 0);
  const stockVal  = state.products.reduce((a, p) => a + (p.costPrice * p.qty), 0);
  const lowItems  = state.products.filter(p => p.qty > 0 && p.qty <= 10);
  const outItems  = state.products.filter(p => p.qty === 0);
  const invested  = state.investments.filter(i => i.type !== 'Withdrawal').reduce((a, i) => a + i.amount, 0);
  const withdrawn = state.investments.filter(i => i.type === 'Withdrawal').reduce((a, i) => a + i.amount, 0);
  const capital   = invested - withdrawn + pl.net;

  setEl('statProducts',  state.products.length);
  setEl('statStock',     totalQty);
  setEl('statStockValue',fmt(stockVal));
  setEl('statRevenue',   fmt(pl.revenue));
  setEl('statProfit',    fmt(pl.net));
  setEl('statExpenses',  fmt(pl.expenses));
  setEl('statCapital',   fmt(capital));
  setEl('statLowStock',  lowItems.length + outItems.length);

  renderLowStockTable(lowItems, outItems);
  renderRecentSalesTable();
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function renderLowStockTable(low, out) {
  const tbody = document.getElementById('lowStockTable');
  const badge = document.getElementById('lowStockBadge');
  if (!tbody) return;
  const combined = [...out.map(p => ({ ...p, _status: 'Out' })), ...low.map(p => ({ ...p, _status: 'Low' }))];
  if (badge) badge.textContent = combined.length + ' items';
  tbody.innerHTML = '';
  if (!combined.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:1rem">All stocks are fine ✅</td></tr>';
    return;
  }
  combined.slice(0, 8).forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td><strong>${p.qty}</strong></td>
      <td><span class="status-badge ${p._status === 'Out' ? 'badge-out' : 'badge-low'}">${p._status === 'Out' ? 'Out of Stock' : 'Low Stock'}</span></td>`;
    tbody.appendChild(tr);
  });
}

function renderRecentSalesTable() {
  const tbody = document.getElementById('recentSalesTable');
  if (!tbody) return;
  tbody.innerHTML = '';
  const recent = [...state.sales].reverse().slice(0, 8);
  if (!recent.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:1rem">No sales yet 🛒</td></tr>';
    return;
  }
  recent.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.productName}</td><td>${s.qty}</td><td>${fmt(s.revenue)}</td><td>${dateStr(s.date)}</td>`;
    tbody.appendChild(tr);
  });
}

/* ===================================================
   16. CHARTS
=================================================== */
let charts = {};

function destroyChart(name) {
  if (charts[name]) { charts[name].destroy(); charts[name] = null; }
}

function chartColors() {
  return {
    green:  '#16a34a',
    blue:   '#3b82f6',
    amber:  '#f59e0b',
    red:    '#ef4444',
    purple: '#8b5cf6',
    orange: '#f97316',
    teal:   '#14b8a6',
    pink:   '#ec4899',
  };
}

function getChartDefaults() {
  const dark  = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    textColor:  dark ? '#94a3b8' : '#64748b',
    gridColor:  dark ? '#1e293b' : '#f1f5f9',
    bg:         dark ? '#1e293b' : '#ffffff',
  };
}

function renderDashboardCharts() {
  const c = chartColors();
  const d = getChartDefaults();

  /* Monthly Sales & Profit Bar Chart */
  destroyChart('sales');
  const months = getLast6Months();
  const salesData  = months.map(m => state.sales.filter(s => s.date && s.date.startsWith(m)).reduce((a, s) => a + s.revenue, 0));
  const profitData = months.map(m => state.sales.filter(s => s.date && s.date.startsWith(m)).reduce((a, s) => a + s.profit, 0));
  const labels     = months.map(m => { const [y, mo] = m.split('-'); return new Date(+y, +mo-1).toLocaleString('default',{month:'short'})+' '+y.slice(2); });

  const ctx1 = document.getElementById('salesChart');
  if (ctx1) {
    charts.sales = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Revenue', data: salesData,  backgroundColor: c.blue + '99',  borderColor: c.blue,  borderWidth: 2, borderRadius: 6 },
          { label: 'Profit',  data: profitData, backgroundColor: c.green + '99', borderColor: c.green, borderWidth: 2, borderRadius: 6 },
        ]
      },
      options: chartOptions(d, 'Monthly Revenue & Profit (₦)')
    });
  }

  /* Expense Doughnut */
  destroyChart('expense');
  const expCats = {};
  state.expenses.forEach(e => { expCats[e.category] = (expCats[e.category] || 0) + e.amount; });
  const expLabels = Object.keys(expCats);
  const expData   = Object.values(expCats);
  const expColors = [c.red, c.orange, c.amber, c.purple, c.teal, c.pink, c.blue, c.green, '#a78bfa'];
  const ctx2 = document.getElementById('expenseChart');
  if (ctx2 && expLabels.length) {
    charts.expense = new Chart(ctx2, {
      type: 'doughnut',
      data: { labels: expLabels, datasets: [{ data: expData, backgroundColor: expColors.slice(0, expLabels.length), borderWidth: 2, borderColor: d.bg }] },
      options: { responsive: true, plugins: { legend: { position: 'right', labels: { color: d.textColor, font: { family: 'Poppins', size: 11 }, padding: 12 } } } }
    });
  }
}

function renderPLCharts(pl) {
  const c = chartColors();
  const d = getChartDefaults();

  /* PL Bar */
  destroyChart('plChart');
  const ctx3 = document.getElementById('plChart');
  if (ctx3) {
    charts.plChart = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['Revenue', 'COGS', 'Gross Profit', 'Expenses', 'Net Profit'],
        datasets: [{ label: 'Amount (₦)', data: [pl.revenue, pl.cogs, pl.gross, pl.expenses, pl.net],
          backgroundColor: [c.blue, c.orange, c.amber, c.red, pl.net >= 0 ? c.green : c.red],
          borderRadius: 8, borderWidth: 0 }]
      },
      options: chartOptions(d, 'P&L Summary (₦)')
    });
  }

  /* Capital Doughnut */
  destroyChart('capitalChart');
  const ctx4 = document.getElementById('capitalChart');
  const invested  = state.investments.filter(i => i.type !== 'Withdrawal').reduce((a, i) => a + i.amount, 0);
  const withdrawn = state.investments.filter(i => i.type === 'Withdrawal').reduce((a, i) => a + i.amount, 0);
  if (ctx4) {
    charts.capitalChart = new Chart(ctx4, {
      type: 'doughnut',
      data: {
        labels: ['Invested', 'Withdrawn', 'Net Profit'],
        datasets: [{ data: [invested, withdrawn, Math.max(0, pl.net)],
          backgroundColor: [c.green, c.red, c.blue], borderWidth: 2, borderColor: d.bg }]
      },
      options: { responsive: true, plugins: { legend: { labels: { color: d.textColor, font: { family: 'Poppins', size: 11 } } } } }
    });
  }
}

function renderAnalytics() {
  const c = chartColors();
  const d = getChartDefaults();

  /* Top Products Bar */
  destroyChart('topProducts');
  const salesByProduct = {};
  state.sales.forEach(s => { salesByProduct[s.productName] = (salesByProduct[s.productName] || 0) + s.qty; });
  const sorted    = Object.entries(salesByProduct).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const ctx5 = document.getElementById('topProductsChart');
  if (ctx5) {
    charts.topProducts = new Chart(ctx5, {
      type: 'bar',
      data: {
        labels: sorted.map(x => x[0].length > 20 ? x[0].slice(0, 20) + '…' : x[0]),
        datasets: [{ label: 'Units Sold', data: sorted.map(x => x[1]),
          backgroundColor: c.blue + '99', borderColor: c.blue, borderWidth: 2, borderRadius: 6 }]
      },
      options: { ...chartOptions(d, 'Units Sold per Product'), indexAxis: 'y' }
    });
  }

  /* Stock by Category */
  destroyChart('categoryStock');
  const catStock = {};
  state.products.forEach(p => { catStock[p.category] = (catStock[p.category] || 0) + p.qty; });
  const ctx6 = document.getElementById('categoryStockChart');
  if (ctx6) {
    charts.categoryStock = new Chart(ctx6, {
      type: 'doughnut',
      data: {
        labels: Object.keys(catStock),
        datasets: [{ data: Object.values(catStock),
          backgroundColor: Object.values(c), borderWidth: 2, borderColor: d.bg }]
      },
      options: { responsive: true, plugins: { legend: { labels: { color: d.textColor, font: { family:'Poppins', size:11 } } } } }
    });
  }

  /* Monthly Revenue Line */
  destroyChart('monthlyRevenue');
  const months = getLast6Months();
  const labels = months.map(m => { const [y, mo] = m.split('-'); return new Date(+y, +mo-1).toLocaleString('default',{month:'short'}); });
  const ctx7 = document.getElementById('monthlyRevenueChart');
  if (ctx7) {
    charts.monthlyRevenue = new Chart(ctx7, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Revenue', data: months.map(m => state.sales.filter(s=>s.date&&s.date.startsWith(m)).reduce((a,s)=>a+s.revenue,0)),
            borderColor: c.blue, backgroundColor: c.blue + '22', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 4 },
          { label: 'Expenses', data: months.map(m => state.expenses.filter(e=>e.date&&e.date.startsWith(m)).reduce((a,e)=>a+e.amount,0)),
            borderColor: c.red, backgroundColor: c.red + '22', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 4 },
        ]
      },
      options: chartOptions(d, 'Revenue vs Expenses (₦)')
    });
  }

  /* Expense Category Bar */
  destroyChart('expenseCategory');
  const expCats = {};
  state.expenses.forEach(e => { expCats[e.category] = (expCats[e.category] || 0) + e.amount; });
  const ctx8 = document.getElementById('expenseCategoryChart');
  if (ctx8 && Object.keys(expCats).length) {
    charts.expenseCategory = new Chart(ctx8, {
      type: 'bar',
      data: {
        labels: Object.keys(expCats),
        datasets: [{ label: 'Amount (₦)', data: Object.values(expCats),
          backgroundColor: c.red + '99', borderColor: c.red, borderWidth: 2, borderRadius: 6 }]
      },
      options: chartOptions(d, 'Expense by Category (₦)')
    });
  }
}

function chartOptions(d, title) {
  return {
    responsive: true,
    plugins: {
      legend: { labels: { color: d.textColor, font: { family: 'Poppins', size: 11 } } },
      title:  { display: false },
      tooltip: { callbacks: { label: ctx => ' ₦' + Number(ctx.raw).toLocaleString('en-NG') } }
    },
    scales: {
      x: { ticks: { color: d.textColor, font: { family: 'Poppins', size: 10 } }, grid: { color: d.gridColor } },
      y: { ticks: { color: d.textColor, font: { family: 'Poppins', size: 10 }, callback: v => '₦' + (v >= 1000 ? (v/1000).toFixed(0)+'k' : v) }, grid: { color: d.gridColor } }
    }
  };
}

function getLast6Months() {
  const result = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push(d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'));
  }
  return result;
}

function refreshCharts() {
  /* Destroy all and re-render current page */
  Object.keys(charts).forEach(k => destroyChart(k));
  const activePage = document.querySelector('.page.active');
  if (!activePage) return;
  const id = activePage.id;
  if (id === 'page-dashboard')   renderDashboardCharts();
  if (id === 'page-profitloss')  renderPLCharts(calcPL());
  if (id === 'page-analytics')   renderAnalytics();
}

/* ===================================================
   17. DASHBOARD FULL RENDER
=================================================== */
function renderDashboard() {
  updateDashboardCards();
  renderDashboardCharts();
}

/* ===================================================
   18. GLOBAL SEARCH / AUTOCOMPLETE
=================================================== */
function globalSearchHandler() {
  const q   = document.getElementById('globalSearch').value.toLowerCase().trim();
  const dd  = document.getElementById('searchDropdown');
  if (!q) { dd.innerHTML = ''; return; }
  const results = state.products.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
  ).slice(0, 6);
  if (!results.length) { dd.innerHTML = '<div class="search-item" style="color:var(--text-muted)">No products found</div>'; return; }
  dd.innerHTML = results.map(p => `
    <div class="search-item" onclick="goToProduct('${p.id}')">
      <strong>${p.name}</strong> — ${p.category} | Qty: ${p.qty} | ${fmt(p.sellPrice)}
    </div>`).join('');
}

function goToProduct(id) {
  document.getElementById('globalSearch').value = '';
  document.getElementById('searchDropdown').innerHTML = '';
  navigate('products');
  setTimeout(() => {
    document.getElementById('productSearch').value = id;
    filterProducts();
  }, 100);
}

document.addEventListener('click', e => {
  if (!e.target.closest('.header-search')) {
    const dd = document.getElementById('searchDropdown');
    if (dd) dd.innerHTML = '';
  }
});

/* ===================================================
   19. RESET SYSTEM
=================================================== */
let pendingReset = '';

function confirmReset(type) {
  pendingReset = type;
  const msgs = {
    sales:       'This will permanently delete all sales records.',
    expenses:    'This will permanently delete all expense records.',
    investments: 'This will permanently delete all capital/investment records.',
    products:    'This will permanently delete all products and stock data.',
    all:         '⚠️ FULL SYSTEM RESET: All data will be completely erased including products, sales, expenses, investments and settings.'
  };
  document.getElementById('resetMessage').textContent = msgs[type] || 'Are you sure?';
  document.getElementById('resetPin').value = '';
  openModal('resetModal');
}

function executeReset() {
  const pin = document.getElementById('resetPin').value.trim();
  if (pin !== state.pin) { toast('❌ Wrong PIN! Reset cancelled', 'error'); return; }

  switch (pendingReset) {
    case 'sales':       state.sales = []; break;
    case 'expenses':    state.expenses = []; break;
    case 'investments': state.investments = []; break;
    case 'products':    state.products = []; state.stock = []; break;
    case 'all':
      state.products = []; state.sales = []; state.expenses = [];
      state.investments = []; state.stock = []; break;
  }
  saveState();
  closeModal('resetModal');
  toast(`✅ ${pendingReset === 'all' ? 'Full system' : pendingReset} reset complete.`, 'warn');
  renderDashboard();
  renderProducts();
  renderSales();
  renderExpenses();
  renderInvestments();
}

/* ===================================================
   20. BACKUP & RESTORE
=================================================== */
function exportBackup() {
  const data    = JSON.stringify(state, null, 2);
  const blob    = new Blob([data], { type: 'application/json' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href        = url;
  a.download    = 'ama_prostock_backup_' + today() + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('✅ Backup exported successfully!');
}

function importBackup(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!imported.products) { toast('Invalid backup file', 'error'); return; }
      if (!confirm('This will REPLACE all current data with the backup. Continue?')) return;
      state = { ...state, ...imported };
      saveState();
      toast('✅ Backup restored successfully!');
      renderDashboard();
      renderProducts();
    } catch {
      toast('❌ Invalid JSON backup file', 'error');
    }
  };
  reader.readAsText(file);
}

/* ===================================================
   21. CSV EXPORTS
=================================================== */
function downloadCSV(filename, headers, rows) {
  const csv  = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function exportProductsCSV() {
  downloadCSV('products_' + today() + '.csv',
    ['Product ID','Product Name','Category','Cost Price','Selling Price','Quantity','Supplier','Date Added'],
    state.products.map(p => [p.id, p.name, p.category, p.costPrice, p.sellPrice, p.qty, p.supplier, p.dateAdded])
  );
  toast('✅ Products exported to CSV!');
}

function exportSalesCSV() {
  downloadCSV('sales_' + today() + '.csv',
    ['Sale ID','Product','Qty','Unit Price','Revenue','Profit','Date'],
    state.sales.map(s => [s.id, s.productName, s.qty, s.unitPrice, s.revenue, s.profit, s.date])
  );
  toast('✅ Sales exported to CSV!');
}

function exportExpensesCSV() {
  downloadCSV('expenses_' + today() + '.csv',
    ['Expense ID','Title','Category','Amount','Description','Date'],
    state.expenses.map(e => [e.id, e.title, e.category, e.amount, e.desc || '', e.date])
  );
  toast('✅ Expenses exported to CSV!');
}

/* ===================================================
   22. GOOGLE SHEETS SYNC
=================================================== */
async function syncGoogleSheets() {
  const url = document.getElementById('sheetsURL').value.trim();
  if (!url) { toast('Paste your Google Sheets CSV URL first', 'error'); return; }
  toast('⏳ Syncing with Google Sheets…', 'warn');
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    const csv  = await response.text();
    const rows = parseCSV(csv);
    if (!rows.length) { toast('No data found in Google Sheets', 'error'); return; }

    /* Map CSV columns: ProductID | Name | Category | CostPrice | SellPrice | Qty | Supplier | DateAdded */
    const imported = rows.map(r => ({
      id:         r[0] || genId('PRD', state.products),
      name:       r[1] || 'Unknown',
      category:   r[2] || 'Provisions',
      costPrice:  parseFloat(r[3]) || 0,
      sellPrice:  parseFloat(r[4]) || 0,
      qty:        parseInt(r[5])   || 0,
      supplier:   r[6] || '',
      dateAdded:  r[7] || today(),
    }));

    state.products  = imported;
    state.sheetsURL = url;
    saveState();
    renderProducts();
    updateDashboardCards();
    toast(`✅ Synced ${imported.length} products from Google Sheets!`);
  } catch (err) {
    toast('❌ Sync failed. Check URL or CORS settings.', 'error');
  }
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  /* Skip header row */
  return lines.slice(1).map(line => {
    const result = []; let cur = ''; let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { result.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
    result.push(cur.trim());
    return result;
  }).filter(r => r.some(v => v));
}

/* ===================================================
   23. DATE DISPLAY
=================================================== */
function updateHeaderDate() {
  const el = document.getElementById('headerDate');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-NG', { weekday:'short', day:'2-digit', month:'short', year:'numeric' });
}

/* ===================================================
   24. APP INIT
=================================================== */
function initApp() {
  /* Apply saved theme */
  document.documentElement.setAttribute('data-theme', state.theme);
  document.querySelector('.btn-theme').textContent = state.theme === 'dark' ? '☀️' : '🌙';

  /* Restore saved sheets URL */
  if (state.sheetsURL && document.getElementById('sheetsURL')) {
    document.getElementById('sheetsURL').value = state.sheetsURL;
  }

  /* Populate dropdowns */
  populateSaleProductDropdown();
  populateStockDropdown();

  /* Set today's date in expense/investment forms */
  const t = today();
  if (document.getElementById('expDate'))  document.getElementById('expDate').value  = t;
  if (document.getElementById('invDate'))  document.getElementById('invDate').value  = t;

  /* Render dashboard */
  navigate('dashboard');
  updateHeaderDate();
  setInterval(updateHeaderDate, 60000);

  /* Auto-save every 30 seconds */
  setInterval(saveState, 30000);
}

/* ===================================================
   25. DOCUMENT READY
=================================================== */
document.addEventListener('DOMContentLoaded', () => {
  /* Load saved state or seed sample data */
  const loaded = loadState();
  if (!loaded || !state.products || !state.products.length) {
    loadSampleData();
  }

  /* Keyboard shortcut: Enter on PIN screen */
  document.addEventListener('keydown', e => {
    const lock = document.getElementById('lockScreen');
    if (lock && lock.style.display !== 'none') {
      if (e.key >= '0' && e.key <= '9') pinInput(parseInt(e.key));
      if (e.key === 'Backspace') pinClear();
      if (e.key === 'Enter') pinSubmit();
    }
  });

  /* Refresh product dropdowns before opening modals */
  document.getElementById('addSaleModal').addEventListener('click', () => {});
  const saleBtn = document.querySelector('[onclick="openModal(\'addSaleModal\')"]');
  if (saleBtn) {
    saleBtn.addEventListener('click', () => {
      populateSaleProductDropdown();
      document.getElementById('saleQty').value = '';
      document.getElementById('salePreview').textContent = '₦0.00 | Profit: ₦0.00';
    });
  }
  const stockBtn = document.querySelector('[onclick="openModal(\'stockModal\')"]');
  if (stockBtn) {
    stockBtn.addEventListener('click', () => populateStockDropdown());
  }

  /* Record Sale button on sales page */
  const saleBtnSales = document.querySelector('#page-sales .btn-primary');
  if (saleBtnSales) {
    saleBtnSales.addEventListener('click', () => populateSaleProductDropdown());
  }
});

/* ===================================================
   26. POPULATING DROPDOWNS ON MODAL OPEN
=================================================== */
/* Override openModal to refresh dropdowns each time */
const _openModal = openModal;
window.openModal = function(id) {
  if (id === 'addSaleModal') {
    populateSaleProductDropdown();
    const el = document.getElementById('saleQty');
    if (el) el.value = '';
    const pr = document.getElementById('salePreview');
    if (pr) pr.textContent = '₦0.00 | Profit: ₦0.00';
    const sp = document.getElementById('saleProduct');
    if (sp) sp.value = '';
    const sc = document.getElementById('salePrice');
    if (sc) sc.value = '';
  }
  if (id === 'stockModal') {
    populateStockDropdown();
    const sq = document.getElementById('stockQty');
    if (sq) sq.value = '';
    const sn = document.getElementById('stockNote');
    if (sn) sn.value = '';
    const sp2 = document.getElementById('stockProduct');
    if (sp2) sp2.value = '';
  }
  if (id === 'addProductModal') {
    const eid = document.getElementById('editProductId');
    if (eid && !eid.value) {
      document.getElementById('productModalTitle').textContent = 'Add New Product';
      ['pName','pCostPrice','pSellPrice','pQty','pSupplier'].forEach(i => { const el = document.getElementById(i); if(el) el.value=''; });
    }
  }
  if (id === 'addExpenseModal') {
    const eid = document.getElementById('editExpenseId');
    if (eid && !eid.value) {
      document.getElementById('expenseModalTitle').textContent = 'Add Expense';
      ['expTitle','expAmount','expDesc'].forEach(i => { const el = document.getElementById(i); if(el) el.value=''; });
      document.getElementById('expDate').value = today();
      document.getElementById('expCategory').value = 'Transport';
    }
  }
  if (id === 'addInvestmentModal') {
    ['invInvestor','invAmount','invNotes'].forEach(i => { const el = document.getElementById(i); if(el) el.value=''; });
    document.getElementById('invDate').value = today();
    document.getElementById('invType').value = 'Initial Capital';
  }
  _openModal(id);
};
