import React, { useState } from 'react';
import { Product, Category, Booking, Review, FAQ, Settings } from '../types';

interface AdminProps {
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  products: Product[];
  categories: Category[];
  bookings: Booking[];
  reviews: Review[];
  faqs: FAQ[];
  settings: Settings;
  onRefreshData: () => void;
}

export default function Admin({
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  products,
  categories,
  bookings,
  reviews,
  faqs,
  settings,
  onRefreshData,
}: AdminProps) {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'products' | 'categories' | 'bookings' | 'reviews' | 'faqs' | 'settings' | 'password'>('dashboard');

  // Product Form state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [prodForm, setProdForm] = useState<{
    name: string;
    brand: string;
    category: string;
    rentalPrice: number;
    originalPrice: number;
    rentalPeriod: string;
    stock: number;
    status: 'Available' | 'Rented' | 'Unavailable' | 'Maintenance';
    featured: boolean;
    newArrival: boolean;
    visible: boolean;
    description: string;
    specifications: string;
    accessories: string;
    imagesStr: string;
  }>({
    name: '',
    brand: 'Canon',
    category: 'Canon Cameras',
    rentalPrice: 599,
    originalPrice: 899,
    rentalPeriod: 'per day',
    stock: 3,
    status: 'Available',
    featured: false,
    newArrival: false,
    visible: true,
    description: '',
    specifications: '',
    accessories: '',
    imagesStr: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  });

  // Category Form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImage, setNewCatImage] = useState('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80');

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAdminLoggedIn(true);
      } else {
        setLoginError(data.message || 'Incorrect password. Default is 2216.');
      }
    } catch (err) {
      setLoginError('Connection error.');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const images = prodForm.imagesStr.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = {
      ...prodForm,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    };

    try {
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProduct.id, ...payload }),
        });
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      setEditingProduct(null);
      setIsAddingProduct(false);
      onRefreshData();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      onRefreshData();
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    onRefreshData();
  };

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm('Delete this booking record?')) {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      onRefreshData();
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCatName, description: newCatDesc, image: newCatImage, visible: true }),
    });
    setNewCatName('');
    setNewCatDesc('');
    onRefreshData();
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Delete this category?')) {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      onRefreshData();
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg('');
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      setPassMsg(data.message);
      if (data.success) {
        setOldPassword('');
        setNewPassword('');
      }
    } catch (err) {
      setPassMsg('Error changing password.');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 max-w-md w-full space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="text-4xl">🔒</div>
            <h2 className="text-2xl font-black text-white">PixelPulse Admin Login</h2>
            <p className="text-xs text-gray-400">
              Owner Access Only (Initial Password: <strong className="text-[#D6A84B]">2216</strong>)
            </p>
          </div>

          {loginError && (
            <div className="bg-[#C53030]/20 border border-[#C53030] text-red-200 text-xs p-3 rounded-lg">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                Admin Password *
              </label>
              <input
                type="password"
                required
                placeholder="Enter password (e.g. 2216)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D6A84B]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-black py-3 rounded-xl transition text-sm"
            >
              Login to Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.status === 'Available').length;
  const rentedProducts = products.filter((p) => p.status === 'Rented').length;
  const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'Confirmed').length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">
            Owner Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            PixelPulse Admin Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Owner: Shivaprasad Nesaragi • Manage products, prices, stock, and bookings.
          </p>
        </div>

        <button
          onClick={() => setIsAdminLoggedIn(false)}
          className="bg-[#C53030]/20 hover:bg-[#C53030]/40 border border-[#C53030] text-red-200 text-xs font-bold px-4 py-2 rounded-lg transition"
        >
          🚪 Logout Admin
        </button>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'dashboard', label: '📊 Dashboard Stats', count: null },
          { id: 'products', label: '📦 Products', count: totalProducts },
          { id: 'categories', label: '🏷️ Categories', count: categories.length },
          { id: 'bookings', label: '📅 Bookings', count: pendingBookings },
          { id: 'reviews', label: '⭐ Reviews', count: reviews.length },
          { id: 'faqs', label: '❓ FAQs', count: faqs.length },
          { id: 'password', label: '🔒 Change Password', count: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
              activeAdminTab === tab.id
                ? 'bg-[#D6A84B] text-[#101010]'
                : 'bg-[#1B1B1B] text-gray-300 hover:bg-[#252525] border border-[#2A2A2A]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && tab.count > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeAdminTab === tab.id ? 'bg-[#101010] text-[#D6A84B]' : 'bg-[#D6A84B] text-[#101010]'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB: DASHBOARD STATS */}
      {activeAdminTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-5 space-y-1">
              <div className="text-xs text-gray-400 uppercase font-semibold">Total Products</div>
              <div className="text-3xl font-black text-white">{totalProducts}</div>
            </div>
            <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-5 space-y-1">
              <div className="text-xs text-emerald-400 uppercase font-semibold">Available Gear</div>
              <div className="text-3xl font-black text-emerald-400">{availableProducts}</div>
            </div>
            <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-5 space-y-1">
              <div className="text-xs text-amber-400 uppercase font-semibold">Rented Out</div>
              <div className="text-3xl font-black text-amber-400">{rentedProducts}</div>
            </div>
            <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-5 space-y-1">
              <div className="text-xs text-[#D6A84B] uppercase font-semibold">Pending Requests</div>
              <div className="text-3xl font-black text-[#D6A84B]">{pendingBookings}</div>
            </div>
          </div>

          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black text-white">Recent Booking Requests</h3>
            {bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#2A2A2A] text-gray-400">
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Equipment</th>
                      <th className="pb-3">Dates</th>
                      <th className="pb-3">Total</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2A2A]">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-[#222]">
                        <td className="py-3 font-bold text-white">{b.customerName}<br /><span className="text-gray-400 font-normal">{b.phone}</span></td>
                        <td className="py-3 text-gray-300">{b.productName}</td>
                        <td className="py-3 text-gray-400">{b.startDate} to {b.endDate}</td>
                        <td className="py-3 text-[#D6A84B] font-bold">₹{b.totalPrice}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' : b.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-700 text-gray-300'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button onClick={() => setActiveAdminTab('bookings')} className="text-[#D6A84B] hover:underline">
                            Manage →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-gray-400">No bookings recorded yet.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB: PRODUCTS MANAGEMENT */}
      {activeAdminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-white">Manage Products & Pricing</h3>
            <button
              onClick={() => {
                setEditingProduct(null);
                setProdForm({
                  name: '',
                  brand: 'Canon',
                  category: categories[0]?.name || 'Canon Cameras',
                  rentalPrice: 599,
                  originalPrice: 899,
                  rentalPeriod: 'per day',
                  stock: 3,
                  status: 'Available',
                  featured: false,
                  newArrival: false,
                  visible: true,
                  description: '',
                  specifications: '',
                  accessories: '',
                  imagesStr: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
                });
                setIsAddingProduct(true);
              }}
              className="bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-black px-4 py-2 rounded-xl text-xs transition"
            >
              ➕ Add New Product
            </button>
          </div>

          {/* Add / Edit Product Modal / Form */}
          {(isAddingProduct || editingProduct) && (
            <div className="bg-[#1B1B1B] border border-[#D6A84B] rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-black text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h4>
                <button
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.brand}
                    onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Category *</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Rental Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.rentalPrice}
                    onChange={(e) => setProdForm({ ...prodForm, rentalPrice: Number(e.target.value) })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Original Price (₹) (for Discount)</label>
                  <input
                    type="number"
                    value={prodForm.originalPrice}
                    onChange={(e) => setProdForm({ ...prodForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Rental Period</label>
                  <input
                    type="text"
                    value={prodForm.rentalPeriod}
                    onChange={(e) => setProdForm({ ...prodForm, rentalPeriod: e.target.value })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={prodForm.stock}
                    onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Status</label>
                  <select
                    value={prodForm.status}
                    onChange={(e: any) => setProdForm({ ...prodForm, status: e.target.value })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-1">Image URLs (comma separated)</label>
                  <input
                    type="text"
                    value={prodForm.imagesStr}
                    onChange={(e) => setProdForm({ ...prodForm, imagesStr: e.target.value })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={prodForm.description}
                    onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-1">Specifications</label>
                  <input
                    type="text"
                    value={prodForm.specifications}
                    onChange={(e) => setProdForm({ ...prodForm, specifications: e.target.value })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-1">Accessories Included</label>
                  <input
                    type="text"
                    value={prodForm.accessories}
                    onChange={(e) => setProdForm({ ...prodForm, accessories: e.target.value })}
                    className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div className="flex items-center gap-4 sm:col-span-2 pt-2">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prodForm.featured}
                      onChange={(e) => setProdForm({ ...prodForm, featured: e.target.checked })}
                      className="accent-[#D6A84B]"
                    />
                    Featured
                  </label>
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prodForm.newArrival}
                      onChange={(e) => setProdForm({ ...prodForm, newArrival: e.target.checked })}
                      className="accent-[#D6A84B]"
                    />
                    New Arrival
                  </label>
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prodForm.visible}
                      onChange={(e) => setProdForm({ ...prodForm, visible: e.target.checked })}
                      className="accent-[#D6A84B]"
                    />
                    Visible on Website
                  </label>
                </div>

                <div className="sm:col-span-2 pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-black px-6 py-2.5 rounded-lg text-xs"
                  >
                    Save Product
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="bg-[#333] text-white px-6 py-2.5 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#2A2A2A] text-gray-400">
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#222]">
                      <td className="p-4">
                        <img src={p.images?.[0]} alt="" className="w-12 h-12 object-cover rounded-lg border border-[#333]" />
                      </td>
                      <td className="p-4 font-bold text-white">
                        {p.name}
                        {p.featured && <span className="ml-2 bg-[#D6A84B] text-[#101010] text-[9px] px-1.5 py-0.5 rounded">Featured</span>}
                      </td>
                      <td className="p-4 text-gray-300">{p.category}</td>
                      <td className="p-4 text-[#D6A84B] font-bold">₹{p.rentalPrice} <span className="text-[10px] text-gray-400">/{p.rentalPeriod || 'day'}</span></td>
                      <td className="p-4 text-gray-300">{p.stock}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProdForm({
                              name: p.name,
                              brand: p.brand,
                              category: p.category,
                              rentalPrice: p.rentalPrice,
                              originalPrice: p.originalPrice || 0,
                              rentalPeriod: p.rentalPeriod || 'per day',
                              stock: p.stock,
                              status: p.status,
                              featured: p.featured,
                              newArrival: p.newArrival,
                              visible: p.visible,
                              description: p.description,
                              specifications: p.specifications,
                              accessories: p.accessories,
                              imagesStr: p.images.join(', '),
                            });
                            setIsAddingProduct(false);
                          }}
                          className="bg-[#252525] hover:bg-[#333] text-white px-3 py-1.5 rounded transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="bg-red-500/20 hover:bg-red-500/40 text-red-300 px-3 py-1.5 rounded transition"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CATEGORIES MANAGEMENT */}
      {activeAdminTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black text-white">Add New Category</h3>
            <form onSubmit={handleAddCategory} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <input
                type="text"
                required
                placeholder="Category Name"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Description"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white"
              />
              <button
                type="submit"
                className="bg-[#D6A84B] text-[#101010] font-black px-6 py-2 rounded-lg"
              >
                Add Category
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={cat.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <h4 className="text-white font-bold text-sm">{cat.name}</h4>
                    <p className="text-[11px] text-gray-400">{cat.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: BOOKINGS MANAGEMENT */}
      {activeAdminTab === 'bookings' && (
        <div className="space-y-6">
          <h3 className="text-xl font-black text-white">Manage Customer Bookings</h3>
          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#2A2A2A] text-gray-400">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Equipment & Accessories</th>
                    <th className="p-4">Rental Dates</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Update Status / Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A]">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#222]">
                      <td className="p-4 font-bold text-white">
                        {b.customerName}
                        <br />
                        <a href={`tel:${b.phone}`} className="text-[#D6A84B] font-normal hover:underline">{b.phone}</a>
                      </td>
                      <td className="p-4 text-gray-300">
                        <strong className="text-white">{b.productName}</strong>
                        {b.accessories?.length > 0 && <div className="text-[10px] text-gray-400">+ {b.accessories.join(', ')}</div>}
                      </td>
                      <td className="p-4 text-gray-300">{b.startDate} to {b.endDate}</td>
                      <td className="p-4 text-[#D6A84B] font-bold">₹{b.totalPrice}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' : b.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-700 text-gray-300'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                          className="bg-[#101010] border border-[#333] rounded px-2 py-1 text-white text-xs"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Rented">Rented Out</option>
                          <option value="Returned">Returned</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="bg-red-500/20 hover:bg-red-500/40 text-red-300 px-2 py-1 rounded"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: REVIEWS & FAQS */}
      {activeAdminTab === 'reviews' && (
        <div className="space-y-6">
          <h3 className="text-xl font-black text-white">Customer Reviews</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#D6A84B]">{r.author}</span>
                  <span className="text-gray-500">{r.date}</span>
                </div>
                <p className="text-xs text-gray-300">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAdminTab === 'faqs' && (
        <div className="space-y-6">
          <h3 className="text-xl font-black text-white">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id} className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-4 space-y-1">
                <h4 className="text-white font-bold text-sm">{f.question}</h4>
                <p className="text-xs text-gray-400">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: CHANGE PASSWORD */}
      {activeAdminTab === 'password' && (
        <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 max-w-md space-y-6">
          <h3 className="text-xl font-black text-white">Change Admin Password</h3>

          {passMsg && (
            <div className="bg-[#222] border border-[#333] text-sm p-3 rounded-lg text-amber-300">
              {passMsg}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Current Password *</label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">New Password *</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-black py-3 rounded-xl transition text-sm"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
