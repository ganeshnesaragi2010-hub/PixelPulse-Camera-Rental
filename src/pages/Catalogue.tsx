import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

interface CatalogueProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onViewDetails: (product: Product) => void;
  onBookNow: (product: Product) => void;
  accentColor: string;
}

export default function Catalogue({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onViewDetails,
  onBookNow,
  accentColor,
}: CatalogueProps) {
  const [sortBy, setSortBy] = useState<'default' | 'low-high' | 'high-low' | 'discount'>('default');
  const [brandFilter, setBrandFilter] = useState<string>('All');

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.visible) return false;

      // Category filter
      if (selectedCategory !== 'All Products' && p.category !== selectedCategory) {
        if (selectedCategory === 'Canon Cameras' && p.brand !== 'Canon') return false;
        if (selectedCategory === 'Nikon Cameras' && p.brand !== 'Nikon') return false;
      }

      // Brand filter
      if (brandFilter !== 'All' && p.brand !== brandFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'low-high') return a.rentalPrice - b.rentalPrice;
      if (sortBy === 'high-low') return b.rentalPrice - a.rentalPrice;
      if (sortBy === 'discount') {
        const discA = a.originalPrice ? a.originalPrice - a.rentalPrice : 0;
        const discB = b.originalPrice ? b.originalPrice - b.rentalPrice : 0;
        return discB - discA;
      }
      return 0;
    });
  }, [products, selectedCategory, brandFilter, searchQuery, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header banner */}
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 text-center space-y-3">
        <span className="text-xs uppercase font-bold tracking-wider" style={{ color: accentColor }}>
          PixelPulse Equipment Catalogue
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Rent Professional Cameras & Lenses
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Explore DSLR cameras, telephoto lenses, tripods, and ring lights available for rent in Belagavi.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('All Products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            selectedCategory === 'All Products'
              ? 'text-[#101010]'
              : 'bg-[#1B1B1B] text-gray-300 hover:bg-[#252525] border border-[#2A2A2A]'
          }`}
          style={selectedCategory === 'All Products' ? { backgroundColor: accentColor } : {}}
        >
          📦 All Products ({products.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat.name
                ? 'text-[#101010]'
                : 'bg-[#1B1B1B] text-gray-300 hover:bg-[#252525] border border-[#2A2A2A]'
            }`}
            style={selectedCategory === cat.name ? { backgroundColor: accentColor } : {}}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="w-full md:w-96 relative">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search camera model, lens, brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#101010] border border-[#333] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#D6A84B]"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Brand filter */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Brand:</span>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            >
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="default">Default / Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="discount">Biggest Discounts</option>
            </select>
          </div>

          {(selectedCategory !== 'All Products' || brandFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All Products');
                setBrandFilter('All');
                setSearchQuery('');
                setSortBy('default');
              }}
              className="text-xs hover:underline font-semibold"
              style={{ color: accentColor }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center text-xs text-gray-400 px-1">
        <span>Showing {filteredProducts.length} equipment item(s)</span>
        <span>Category: <strong className="text-white">{selectedCategory}</strong></span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              accentColor={accentColor}
              onViewDetails={onViewDetails}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-16 text-center space-y-4">
          <div className="text-4xl">📭</div>
          <h3 className="text-xl font-black text-white">No Equipment Found</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            No products match your current search or category filter. Try clearing filters or search for another camera model.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All Products');
              setBrandFilter('All');
              setSearchQuery('');
            }}
            className="text-[#101010] font-black px-6 py-2.5 rounded-lg text-xs"
            style={{ backgroundColor: accentColor }}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
