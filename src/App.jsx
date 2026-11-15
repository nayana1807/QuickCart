import React, { useMemo, useState } from 'react';
import {
  ShoppingBag, Store, Bike, LayoutDashboard, Search, MapPin, Clock3,
  Plus, Minus, ShoppingCart, Menu, Bell, ChevronDown, ArrowUpRight,
  Package, CheckCircle2, CircleDollarSign, Users, TrendingUp, MoreHorizontal,
  Check, X, Truck, MapPinned, Box, IndianRupee, RefreshCw, SlidersHorizontal,
  Leaf, Sparkles, Phone, CalendarDays, Activity, LogOut, Settings, Eye
} from 'lucide-react';

const initialProducts = [
  { id: 1, name: 'Amul Taaza Milk', detail: '1 L · Pouch', price: 68, category: 'Dairy', emoji: '🥛', color: 'mint', stock: 24 },
  { id: 2, name: 'Fresh Bananas', detail: '6 pcs · Robusta', price: 42, category: 'Fruits', emoji: '🍌', color: 'yellow', stock: 18 },
  { id: 3, name: 'Farm Eggs', detail: '6 pcs · Regular', price: 54, category: 'Dairy', emoji: '🥚', color: 'cream', stock: 12 },
  { id: 4, name: 'Whole Wheat Bread', detail: '400 g · Fresh', price: 45, category: 'Bakery', emoji: '🍞', color: 'peach', stock: 16 },
  { id: 5, name: 'Red Tomatoes', detail: '500 g · Farm fresh', price: 32, category: 'Vegetables', emoji: '🍅', color: 'pink', stock: 30 },
  { id: 6, name: 'Aashirvaad Atta', detail: '5 kg · Whole wheat', price: 285, category: 'Staples', emoji: '🌾', color: 'cream', stock: 9 },
  { id: 7, name: 'Greek Yogurt', detail: '400 g · Plain', price: 95, category: 'Dairy', emoji: '🥣', color: 'lavender', stock: 14 },
  { id: 8, name: 'Orange Juice', detail: '1 L · No added sugar', price: 110, category: 'Beverages', emoji: '🍊', color: 'yellow', stock: 7 }
];


const money = (n) => `₹${Number(n).toFixed(0)}`;
const initialOrders = [
  { id: '#QC-1048', customer: 'Aarav Mehta', items: 'Milk, Eggs, Bread', amount: 167, status: 'Preparing', time: '2 min ago' },
  { id: '#QC-1047', customer: 'Diya Sharma', items: 'Bananas, Tomatoes', amount: 74, status: 'Ready for pickup', time: '8 min ago' },
  { id: '#QC-1046', customer: 'Kabir Rao', items: 'Atta, Greek Yogurt', amount: 380, status: 'Delivered', time: '22 min ago' }
];

const navItems = [
  { id: 'customer', label: 'Customer', icon: ShoppingBag, sub: 'Shopping experience' },
  { id: 'store', label: 'Store panel', icon: Store, sub: 'Manage store orders' },
  { id: 'delivery', label: 'Delivery', icon: Bike, sub: 'Delivery partner app' },
  { id: 'admin', label: 'Admin', icon: LayoutDashboard, sub: 'Platform overview' }
];

function App() {
  const [active, setActive] = useState('customer');
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [orders, setOrders] = useState(initialOrders);
  const [storeOpen, setStoreOpen] = useState(true);
  const [riderOnline, setRiderOnline] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [notice, setNotice] = useState('');
  const [showCart, setShowCart] = useState(false);

  const categories = ['All', 'Dairy', 'Fruits', 'Vegetables', 'Bakery', 'Staples', 'Beverages'];
  const filtered = useMemo(() => products.filter(p =>
    (category === 'All' || p.category === category) &&
    `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  ), [products, category, search]);

  const cartItems = products.filter(p => cart[p.id] > 0);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const deliveryFee = subtotal > 0 && subtotal < 199 ? 20 : 0;
  const total = subtotal + deliveryFee;

  const flash = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2600);
  };

  const updateCart = (id, delta) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
    setOrderPlaced(false);
  };

  const placeOrder = () => {
    if (!count) return;
    const next = {
      id: `#QC-${1049 + orders.length - initialOrders.length}`,
      customer: 'You',
      items: cartItems.map(p => `${p.name} × ${cart[p.id]}`).join(', '),
      amount: total,
      status: 'New order',
      time: 'Just now'
    };
    setOrders(prev => [next, ...prev]);
    setCart({});
    setOrderPlaced(true);
    setShowCart(false);
    flash('Demo order placed successfully!');
    setActive('customer');
  };

  const changeOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    flash(`${id} updated to ${status}`);
  };

  const resetDemo = () => {
    setProducts(initialProducts);
    setCart({});
    setOrders(initialOrders);
    setStoreOpen(true);
    setRiderOnline(true);
    setOrderPlaced(false);
    setSearch('');
    setCategory('All');
    flash('Demo data has been reset');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark"><ShoppingBag size={20} strokeWidth={2.6}/></div>
          <div><div className="brand-name">quickcart<span>.</span></div><div className="brand-caption">QUICK COMMERCE</div></div>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            return <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => setActive(item.id)}>
              <span className="nav-icon"><Icon size={18}/></span>
              <span className="nav-copy"><strong>{item.label}</strong><small>{item.sub}</small></span>
              {active === item.id && <span className="active-dot"/>}
            </button>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><Sparkles size={17}/></div>
            <strong>Demo workspace</strong>
            <p>Explore each role to see how the platform works together.</p>
            <button onClick={resetDemo}>Reset demo <RefreshCw size={13}/></button>
          </div>
          <div className="profile-row">
            <div className="avatar">QC</div>
            <div className="profile-copy"><strong>QuickCart Demo</strong><small>Prototype account</small></div>
            <MoreHorizontal size={18} className="muted"/>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand"><div className="brand-mark"><ShoppingBag size={18}/></div><strong>quickcart<span>.</span></strong></div>
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>{navItems.find(n => n.id === active)?.label}</strong></div>
          <div className="top-actions">
            <div className="demo-pill"><span/> Live demo data</div>
            <button className="icon-button notification" aria-label="Notifications"><Bell size={18}/><i/></button>
            <div className="top-avatar">QC</div>
          </div>
        </header>

        <div className="page-content">
          {active === 'customer' && <CustomerView {...{products, filtered, categories, category, setCategory, search, setSearch, cart, updateCart, count, subtotal, deliveryFee, total, cartItems, placeOrder, showCart, setShowCart, orderPlaced, storeOpen}}/>}
          {active === 'store' && <StoreView {...{orders, products, setProducts, storeOpen, setStoreOpen, changeOrderStatus}}/>}
          {active === 'delivery' && <DeliveryView {...{orders, riderOnline, setRiderOnline, changeOrderStatus}}/>}
          {active === 'admin' && <AdminView {...{orders, products, resetDemo, changeOrderStatus}}/>}
        </div>
        <footer className="footer"><span>© 2026 QuickCart prototype</span><span><span className="footer-dot"/> Sample data · Not connected to live services</span></footer>
      </main>

      {notice && <div className="toast"><CheckCircle2 size={17}/>{notice}</div>}
    </div>
  );
}

function PageHeading({eyebrow, title, description, right}) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{right && <div className="heading-actions">{right}</div>}</div>;
}

function Metric({label, value, change, icon: Icon, tone='green'}) {
  return <div className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={19}/></div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-change"><TrendingUp size={13}/>{change}</div></div>;
}

function CustomerView(props) {
  const {filtered, categories, category, setCategory, search, setSearch, cart, updateCart, count, subtotal, deliveryFee, total, cartItems, placeOrder, showCart, setShowCart, storeOpen} = props;
  return <>
    <PageHeading eyebrow="CUSTOMER EXPERIENCE" title="Good afternoon, there 👋" description="Everything you need, delivered to your door in minutes."
      right={<button className="outline-button" onClick={() => setShowCart(true)}><ShoppingCart size={16}/> Cart <span className="count-badge">{count}</span></button>}/>
    <div className="delivery-banner">
      <div className="banner-copy"><div className="banner-kicker"><span className="live-dot"/> QUICK DELIVERY</div><h2>Your daily essentials,<br/><em>right on time.</em></h2><p>Fresh picks from stores around your neighbourhood.</p><div className="banner-meta"><span><MapPin size={14}/> Gachibowli, Hyderabad</span><span><Clock3 size={14}/> 10–20 min delivery</span></div></div>
      <div className="banner-art"><div className="art-circle circle-one"/><div className="art-circle circle-two"/><div className="grocery-bag">🛍️</div><div className="floating-emoji e1">🥑</div><div className="floating-emoji e2">🥛</div><div className="floating-emoji e3">🍊</div><div className="banner-sticker"><Sparkles size={13}/> Fresh & fast</div></div>
    </div>
    <div className="section-heading"><div><h2>Shop by category</h2><p>Find what you need, faster</p></div></div>
    <div className="category-strip">
      {[
        ['All','✨'],['Dairy','🥛'],['Fruits','🍎'],['Vegetables','🥦'],['Bakery','🍞'],['Staples','🌾'],['Beverages','🧃']
      ].map(([name,emoji]) => <button key={name} onClick={() => setCategory(name)} className={`category-chip ${category === name ? 'selected' : ''}`}><span>{emoji}</span>{name}</button>)}
    </div>
    <div className="section-heading product-heading"><div><h2>Popular near you</h2><p>Handpicked essentials from trusted stores</p></div><div className="search-box"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."/></div></div>
    {!storeOpen && <div className="notice-bar"><Clock3 size={16}/> The demo store is currently closed. You can still explore the catalogue.</div>}
    <div className="product-grid">
      {filtered.map(p => <div className="product-card" key={p.id}>
        <div className={`product-visual ${p.color}`}><span className="product-emoji">{p.emoji}</span><span className="fresh-tag">FRESH PICK</span></div>
        <div className="product-info"><div className="product-category">{p.category}</div><h3>{p.name}</h3><p>{p.detail}</p><div className="product-buy"><strong>{money(p.price)}</strong>{(cart[p.id] || 0) === 0 ? <button className="add-button" onClick={() => updateCart(p.id, 1)} disabled={!storeOpen}><Plus size={15}/> ADD</button> : <div className="quantity-control"><button onClick={() => updateCart(p.id, -1)}><Minus size={13}/></button><strong>{cart[p.id]}</strong><button onClick={() => updateCart(p.id, 1)}><Plus size={13}/></button></div>}</div></div>
      </div>)}
      {filtered.length === 0 && <div className="empty-state">No products match your search. Try another keyword.</div>}
    </div>
    <div className="trust-row"><span><Leaf size={16}/> Quality checked</span><span><Truck size={16}/> Fast local delivery</span><span><CheckCircle2 size={16}/> Secure checkout demo</span></div>
    {showCart && <div className="modal-backdrop" onClick={() => setShowCart(false)}><div className="cart-drawer" onClick={e => e.stopPropagation()}>
      <div className="drawer-header"><div><div className="eyebrow">YOUR BASKET</div><h2>Shopping cart <span className="muted">({count})</span></h2></div><button className="icon-button" onClick={() => setShowCart(false)}><X size={19}/></button></div>
      {cartItems.length === 0 ? <div className="empty-cart"><div>🛒</div><h3>Your cart is empty</h3><p>Add a few essentials to get started.</p><button className="primary-button" onClick={() => setShowCart(false)}>Continue shopping</button></div> : <>
        <div className="cart-lines">{cartItems.map(p => <div className="cart-line" key={p.id}><div className={`mini-product ${p.color}`}>{p.emoji}</div><div className="cart-line-info"><strong>{p.name}</strong><small>{p.detail}</small><b>{money(p.price)}</b></div><div className="quantity-control"><button onClick={() => updateCart(p.id,-1)}><Minus size={12}/></button><strong>{cart[p.id]}</strong><button onClick={() => updateCart(p.id,1)}><Plus size={12}/></button></div></div>)}</div>
        <div className="bill"><div><span>Item total</span><strong>{money(subtotal)}</strong></div><div><span>Delivery fee</span><strong>{deliveryFee ? money(deliveryFee) : 'FREE'}</strong></div><div className="bill-total"><span>To pay</span><strong>{money(total)}</strong></div></div>
        <button className="primary-button full-button" onClick={placeOrder}>Place demo order <ArrowUpRight size={17}/></button><p className="demo-note">This is a prototype. No real payment will be collected.</p>
      </>}
    </div></div>}
  </>;
}

function StoreView({orders, products, setProducts, storeOpen, setStoreOpen, changeOrderStatus}) {
  const activeOrders = orders.filter(o => !['Delivered','Rejected'].includes(o.status));
  const toggleStock = (id, delta) => setProducts(prev => prev.map(p => p.id === id ? {...p, stock: Math.max(0,p.stock+delta)} : p));
  return <>
    <PageHeading eyebrow="STORE OPERATIONS" title="Store dashboard" description="Manage incoming orders, inventory and your store availability."
      right={<button className={`status-toggle ${storeOpen ? 'on' : ''}`} onClick={() => setStoreOpen(!storeOpen)}><span/>{storeOpen ? 'Store is open' : 'Store is closed'}</button>}/>
    <div className="store-profile-card"><div className="store-avatar"><Store size={23}/></div><div className="store-profile-copy"><h2>Ratnadeep · Gachibowli</h2><p><MapPin size={13}/> Gachibowli, Hyderabad <span className="bullet">·</span> Store ID: QC-ST-001</p></div><div className="store-profile-right"><span className="rating">★ 4.8</span><span className="store-tag">PARTNER STORE</span></div></div>
    <div className="metric-grid three"><Metric label="Orders today" value={orders.length + 28} change="+12% vs yesterday" icon={Package}/><Metric label="Today's revenue" value={money(12480)} change="+8.4% this week" icon={CircleDollarSign} tone="purple"/><Metric label="Pending orders" value={activeOrders.length} change="Needs attention" icon={Clock3} tone="orange"/></div>
    <div className="two-column-layout">
      <section className="panel"><div className="panel-heading"><div><h2>Incoming orders</h2><p>Review and update customer orders</p></div><span className="soft-count">{activeOrders.length} active</span></div>
        <div className="order-list">{orders.slice(0,5).map(o => <div className="order-row" key={o.id}><div className="order-symbol"><ShoppingBag size={17}/></div><div className="order-main"><strong>{o.id} <span className="muted">· {o.customer}</span></strong><p>{o.items}</p><small>{o.time}</small></div><div className="order-end"><strong>{money(o.amount)}</strong><StatusPill status={o.status}/>{o.status === 'New order' && <div className="row-actions"><button className="tiny-accept" onClick={() => changeOrderStatus(o.id,'Preparing')}><Check size={13}/> Accept</button><button className="tiny-reject" onClick={() => changeOrderStatus(o.id,'Rejected')}><X size={13}/></button></div>}{o.status === 'Preparing' && <button className="tiny-accept" onClick={() => changeOrderStatus(o.id,'Ready for pickup')}>Mark ready</button>}</div></div>)}</div>
      </section>
      <section className="panel inventory-panel"><div className="panel-heading"><div><h2>Inventory snapshot</h2><p>Update stock quantities</p></div><button className="text-button">View all <ArrowUpRight size={14}/></button></div>
        <div className="inventory-list">{products.slice(0,6).map(p => <div className="inventory-row" key={p.id}><div className={`inventory-emoji ${p.color}`}>{p.emoji}</div><div className="inventory-name"><strong>{p.name}</strong><small>{p.category}</small></div><div className={`stock-count ${p.stock < 10 ? 'low' : ''}`}>{p.stock} left</div><div className="stock-adjust"><button onClick={() => toggleStock(p.id,-1)}><Minus size={12}/></button><button onClick={() => toggleStock(p.id,1)}><Plus size={12}/></button></div></div>)}</div>
      </section>
    </div>
  </>;
}

function StatusPill({status}) {
  const cls = status.toLowerCase().replaceAll(' ','-');
  return <span className={`status-pill ${cls}`}>{status}</span>;
}

function DeliveryView({orders, riderOnline, setRiderOnline, changeOrderStatus}) {
  const deliverable = orders.find(o => ['Ready for pickup','Picked up','Out for delivery'].includes(o.status));
  const completed = orders.filter(o => o.status === 'Delivered').length;
  return <>
    <PageHeading eyebrow="DELIVERY PARTNER" title="Your delivery hub" description="Stay on top of your assigned deliveries and daily earnings."
      right={<button className={`status-toggle ${riderOnline ? 'on' : ''}`} onClick={() => setRiderOnline(!riderOnline)}><span/>{riderOnline ? 'You are online' : 'You are offline'}</button>}/>
    <div className="rider-welcome"><div className="rider-welcome-text"><div className="banner-kicker"><span className="live-dot"/> RIDER SPACE</div><h2>Hey, Rohan! Ready to roll?</h2><p>{riderOnline ? 'You are visible to the dispatch team and can receive new tasks.' : 'You are offline and will not receive new delivery requests.'}</p></div><div className="rider-illustration">🛵</div></div>
    <div className="metric-grid three"><Metric label="Today's earnings" value="₹640" change="+₹120 from yesterday" icon={IndianRupee}/><Metric label="Deliveries completed" value={completed + 8} change="Great work today!" icon={CheckCircle2} tone="purple"/><Metric label="Average delivery time" value="18 min" change="2 min faster this week" icon={Clock3} tone="orange"/></div>
    <div className="two-column-layout delivery-layout">
      <section className="panel current-task"><div className="panel-heading"><div><h2>Current delivery task</h2><p>Your next assigned order</p></div><span className="soft-count">LIVE TASK</span></div>
        {deliverable ? <><div className="task-id">{deliverable.id} <StatusPill status={deliverable.status}/></div><div className="route-card"><div className="route-line"><div className="route-point pickup"><Store size={15}/></div><div className="route-detail"><small>PICKUP FROM</small><strong>Ratnadeep · Gachibowli</strong><span>Financial District Road, Hyderabad</span></div></div><div className="route-connector"/><div className="route-line"><div className="route-point drop"><MapPin size={15}/></div><div className="route-detail"><small>DELIVER TO</small><strong>{deliverable.customer}</strong><span>My Home Bhooja, Hyderabad</span></div></div></div><div className="task-summary"><span>{deliverable.items}</span><strong>{money(deliverable.amount)}</strong></div>
          {deliverable.status === 'Ready for pickup' && <button className="primary-button full-button" disabled={!riderOnline} onClick={() => changeOrderStatus(deliverable.id,'Picked up')}><Package size={16}/> Confirm pickup</button>}
          {deliverable.status === 'Picked up' && <button className="primary-button full-button" disabled={!riderOnline} onClick={() => changeOrderStatus(deliverable.id,'Out for delivery')}><Truck size={16}/> Start delivery</button>}
          {deliverable.status === 'Out for delivery' && <button className="primary-button full-button" disabled={!riderOnline} onClick={() => changeOrderStatus(deliverable.id,'Delivered')}><CheckCircle2 size={16}/> Confirm delivery</button>}
          {!riderOnline && <p className="inline-warning">Go online to update this delivery.</p>}
        </> : <div className="empty-task"><div>🎉</div><h3>All caught up!</h3><p>No active deliveries right now. Stay online for your next task.</p></div>}
      </section>
      <section className="panel"><div className="panel-heading"><div><h2>Today's activity</h2><p>Your delivery performance</p></div><CalendarDays size={18} className="muted"/></div><div className="activity-stats"><div><span>Completed</span><strong>{completed + 8}</strong><div className="progress-track"><i style={{width:'78%'}}/></div></div><div><span>Distance covered</span><strong>24.6 <small>km</small></strong><div className="progress-track"><i style={{width:'62%'}}/></div></div><div><span>Customer rating</span><strong>4.9 <small>/ 5.0</small></strong><div className="progress-track"><i style={{width:'94%'}}/></div></div></div><div className="tip-card"><Sparkles size={17}/><div><strong>Rider tip</strong><p>Double-check the order items before leaving the store. A smooth handoff makes a happy customer.</p></div></div></section>
    </div>
  </>;
}

function AdminView({orders, products, resetDemo, changeOrderStatus}) {
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const active = orders.filter(o => !['Delivered','Rejected'].includes(o.status)).length;
  return <>
    <PageHeading eyebrow="PLATFORM MANAGEMENT" title="Platform overview" description="Monitor orders, stores, delivery operations and platform health."
      right={<button className="outline-button" onClick={resetDemo}><RefreshCw size={15}/> Reset demo</button>}/>
    <div className="metric-grid four"><Metric label="Total orders today" value={orders.length + 128} change="+18.2% vs yesterday" icon={ShoppingBag}/><Metric label="Gross order value" value="₹48,290" change="+11.6% this week" icon={CircleDollarSign} tone="purple"/><Metric label="Active customers" value="1,284" change="+6.8% this month" icon={Users} tone="orange"/><Metric label="Avg. delivery time" value="16 min" change="3 min faster" icon={Clock3} tone="blue"/></div>
    <div className="admin-grid">
      <section className="panel"><div className="panel-heading"><div><h2>Order management</h2><p>Recent platform orders</p></div><button className="text-button">All orders <ArrowUpRight size={14}/></button></div>
        <div className="table-wrap"><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>AMOUNT</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{orders.slice(0,6).map(o => <tr key={o.id}><td><strong>{o.id}</strong><small>{o.time}</small></td><td>{o.customer}<small className="item-cell">{o.items}</small></td><td><strong>{money(o.amount)}</strong></td><td><StatusPill status={o.status}/></td><td><button className="table-action" onClick={() => changeOrderStatus(o.id, o.status === 'Delivered' ? 'Preparing' : 'Delivered')} title="Toggle demo status"><Eye size={15}/></button></td></tr>)}</tbody></table></div>
      </section>
      <section className="panel ops-panel"><div className="panel-heading"><div><h2>Operations pulse</h2><p>Live demo snapshot</p></div><Activity size={18} className="muted"/></div><div className="ops-list"><div><span className="ops-icon green"><Store size={16}/></span><div><strong>Partner stores</strong><small>4 stores onboarded</small></div><span className="ops-value">4 / 5</span></div><div><span className="ops-icon purple"><Bike size={16}/></span><div><strong>Delivery partners</strong><small>Online and available</small></div><span className="ops-value">8 / 12</span></div><div><span className="ops-icon orange"><Package size={16}/></span><div><strong>Orders in progress</strong><small>Awaiting fulfilment</small></div><span className="ops-value">{active}</span></div><div><span className="ops-icon blue"><CheckCircle2 size={16}/></span><div><strong>Delivered orders</strong><small>Successfully completed</small></div><span className="ops-value">{delivered + 124}</span></div></div><div className="health-card"><div><span className="health-dot"/> Platform status</div><strong>All systems operational</strong></div></section>
    </div>
    <div className="admin-bottom"><div className="panel mini-panel"><div className="panel-heading"><div><h2>Top categories</h2><p>By order volume</p></div></div><div className="category-bars">{[['Dairy','82%',82],['Fruits & vegetables','68%',68],['Staples','54%',54],['Beverages','37%',37]].map(([name,label,w])=><div className="bar-row" key={name}><div><span>{name}</span><strong>{label}</strong></div><div className="bar-track"><i style={{width:`${w}%`}}/></div></div>)}</div></div><div className="panel mini-panel"><div className="panel-heading"><div><h2>Inventory alerts</h2><p>Products running low</p></div><span className="alert-count">{products.filter(p=>p.stock<10).length} alerts</span></div><div className="alert-list">{products.filter(p=>p.stock<10).map(p=><div key={p.id}><span className="alert-product">{p.emoji}</span><strong>{p.name}</strong><span className="low-stock">{p.stock} left</span></div>)}</div></div></div>
  </>;
}

export default App;
