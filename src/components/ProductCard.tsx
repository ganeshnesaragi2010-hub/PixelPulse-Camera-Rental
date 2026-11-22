import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  accentColor: string;
  onViewDetails: (product: Product) => void;
  onBookNow: (product: Product) => void;
}

export default function ProductCard({ product, accentColor, onViewDetails, onBookNow }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.rentalPrice;
  const discountAmount = hasDiscount ? product.originalPrice! - product.rentalPrice : 0;
  const discountPercentage = hasDiscount ? Math.round((discountAmount / product.originalPrice!) * 100) : 0;

  // Dynamic status badge styling
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-[#2F855A] text-white';
      case 'Rented':
        return 'bg-[#D69E2E] text-[#101010] font-bold';
      case 'Maintenance':
        return 'bg-[#805AD5] text-white';
      case 'Unavailable':
      default:
        return 'bg-[#C53030] text-white';
    }
  };

  return (
    <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#D6A84B] transition-all duration-300 flex flex-col group shadow-lg">
      {/* Image container */}
      <div className="relative h-56 bg-[#101010] overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.featured && (
            <span className="bg-[#D6A84B] text-[#101010] text-[11px] font-black px-2.5 py-0.5 rounded shadow">
              ⭐ Featured
            </span>
          )}
          {product.newArrival && (
            <span className="bg-[#FFFFFF] text-[#101010] text-[11px] font-black px-2.5 py-0.5 rounded shadow">
              ✨ New
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#E53E3E] text-white text-[11px] font-black px-2.5 py-0.5 rounded shadow">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Dynamic Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded shadow ${getStatusBadgeStyle(product.status)}`}>
            {product.status === 'Available' ? '🟢 Available' : product.status === 'Rented' ? '🟠 Rented' : product.status === 'Maintenance' ? '🔧 Maintenance' : '🔴 Unavailable'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-xs text-[#A0A0A0] uppercase font-semibold tracking-wider mb-1">
            {product.brand} • {product.category}
          </div>
          <h3
            onClick={() => onViewDetails(product)}
            className="text-white font-bold text-lg hover:text-[#D6A84B] cursor-pointer transition line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#999999] line-clamp-2 mt-1.5">
            {product.description}
          </p>
        </div>

        {/* Price and Action */}
        <div className="pt-3 border-t border-[#2A2A2A] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-[#D6A84B]">
                ₹{product.rentalPrice}
              </span>
              <span className="text-xs text-[#888] capitalize">
                / {product.rentalPeriod || 'day'}
              </span>
            </div>
            {hasDiscount && (
              <div className="text-xs text-[#999] line-through">
                ₹{product.originalPrice}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="bg-[#252525] hover:bg-[#333333] text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
            >
              👁️ View
            </button>
            <button
              onClick={() => onBookNow(product)}
              disabled={product.status !== 'Available'}
              className={`text-xs font-bold px-3 py-2 rounded-lg transition ${
                product.status === 'Available'
                  ? 'bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010]'
                  : 'bg-[#333] text-[#777] cursor-not-allowed'
              }`}
            >
              📦 Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
