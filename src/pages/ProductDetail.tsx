import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product | null;
  onBack: () => void;
  onBookNow: (product: Product) => void;
}

export default function ProductDetail({ product, onBack, onBookNow }: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Product not found</h2>
        <button
          onClick={onBack}
          className="bg-[#D6A84B] text-[#101010] font-black px-6 py-2.5 rounded-lg text-sm"
        >
          ← Back to Catalogue
        </button>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.rentalPrice;
  const discountAmount = hasDiscount ? product.originalPrice! - product.rentalPrice : 0;
  const discountPercentage = hasDiscount ? Math.round((discountAmount / product.originalPrice!) * 100) : 0;

  const whatsappUrl = `https://wa.me/918277750280?text=Hi%20PixelPulse%20Camera%20Rental,%20I%20want%20to%20enquire%20about%20renting%20${encodeURIComponent(product.name)}%20(₹${product.rentalPrice}/${product.rentalPeriod || 'day'}).`;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="text-xs font-bold text-[#D6A84B] hover:underline flex items-center gap-1"
      >
        <span>←</span> Back to Catalogue
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl overflow-hidden h-96 sm:h-[450px]">
            <img
              src={product.images?.[activeImageIndex] || product.images?.[0] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === idx ? 'border-[#D6A84B]' : 'border-[#2A2A2A] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider bg-[#1B1B1B] border border-[#2A2A2A] px-3 py-1 rounded-full">
                {product.brand} • {product.category}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  product.status === 'Available'
                    ? 'bg-[#2F855A]/20 text-emerald-400 border border-[#2F855A]'
                    : 'bg-[#C53030]/20 text-red-400 border border-[#C53030]'
                }`}
              >
                {product.status} (Stock: {product.stock})
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white">{product.name}</h1>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-6 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 uppercase font-semibold">Rental Price</div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-black text-[#D6A84B]">₹{product.rentalPrice}</span>
                <span className="text-sm text-gray-400 capitalize">/ {product.rentalPeriod || 'day'}</span>
              </div>
              {hasDiscount && (
                <div className="text-xs text-gray-400 line-through mt-0.5">
                  Original Price: ₹{product.originalPrice} (Save ₹{discountAmount} / {discountPercentage}%)
                </div>
              )}
            </div>

            {hasDiscount && (
              <div className="bg-[#E53E3E]/20 border border-[#E53E3E] text-red-300 text-xs font-black px-3 py-1.5 rounded-lg">
                {discountPercentage}% OFF
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Description</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div className="space-y-2">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">Technical Specifications</h3>
              <p className="text-sm text-gray-300 bg-[#1B1B1B] border border-[#2A2A2A] p-4 rounded-xl leading-relaxed">
                {product.specifications}
              </p>
            </div>
          )}

          {/* Accessories included */}
          {product.accessories && (
            <div className="space-y-2">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">Accessories Included</h3>
              <p className="text-sm text-emerald-400 bg-[#1B1B1B] border border-[#2A2A2A] p-4 rounded-xl leading-relaxed">
                📦 {product.accessories}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#2A2A2A]">
            <button
              onClick={() => onBookNow(product)}
              disabled={product.status !== 'Available'}
              className={`flex-1 font-black py-4 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-xl ${
                product.status === 'Available'
                  ? 'bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010]'
                  : 'bg-[#333] text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>📦</span>
              <span>{product.status === 'Available' ? 'Book This Equipment' : 'Currently Rented'}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-4 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-xl"
            >
              <span>💬</span>
              <span>WhatsApp Enquiry</span>
            </a>
          </div>

          <div className="text-xs text-gray-500 text-center pt-2">
            📍 Pickup Location: 199, Azam Nagar, Belagavi, Karnataka 590010 | Call: +91 89709 22580
          </div>
        </div>
      </div>
    </div>
  );
}
