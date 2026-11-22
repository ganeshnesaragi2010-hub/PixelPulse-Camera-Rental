import React from 'react';
import { Product, Category, PackageItem, Review, FAQ } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  categories: Category[];
  packages: PackageItem[];
  reviews: Review[];
  faqs: FAQ[];
  setCurrentTab: (tab: string) => void;
  setSelectedCategory: (cat: string) => void;
  onViewDetails: (product: Product) => void;
  onBookNow: (product: Product) => void;
  accentColor: string;
}

export default function Home({
  products,
  categories,
  packages,
  reviews,
  faqs,
  setCurrentTab,
  setSelectedCategory,
  onViewDetails,
  onBookNow,
  accentColor,
}: HomeProps) {
  const featuredProducts = products.filter((p) => p.featured && p.visible);
  const discountedProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.rentalPrice && p.visible);
  const newArrivals = products.filter((p) => p.newArrival && p.visible);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative bg-[#101010] text-white py-20 lg:py-32 overflow-hidden border-b border-[#2A2A2A]">
        {/* Background photo overlay */}
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=80"
            alt="Camera background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#1B1B1B] border border-[#333] px-4 py-1.5 rounded-full text-xs font-bold text-[#D6A84B] tracking-widest uppercase">
            <span>⚡</span> PixelPulse Camera Rental • Belagavi
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none">
            Your Next Shot <br />
            <span className="text-[#D6A84B]">Starts Here.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#CCCCCC] max-w-2xl mx-auto font-normal leading-relaxed">
            Rent professional cameras, lenses, tripods, and lighting equipment at affordable prices in Belagavi. Capture your moments with the right equipment without buying expensive gear.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentTab('catalogue');
                setSelectedCategory('All Products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-black px-8 py-4 rounded-xl text-base transition shadow-xl flex items-center justify-center gap-2"
            >
              <span>📦</span>
              <span>Explore Catalogue</span>
            </button>
            <button
              onClick={() => {
                setCurrentTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#1B1B1B] hover:bg-[#252525] border border-[#333] text-white font-bold px-8 py-4 rounded-xl text-base transition flex items-center justify-center gap-2"
            >
              <span>📞</span>
              <span>Call / WhatsApp Enquiry</span>
            </button>
          </div>

          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-[#222]">
            <div>
              <div className="text-2xl font-black text-[#D6A84B]">₹399/d</div>
              <div className="text-xs text-gray-400">Starting Rental Price</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#D6A84B]">100%</div>
              <div className="text-xs text-gray-400">Tested Equipment</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#D6A84B]">Azam Nagar</div>
              <div className="text-xs text-gray-400">Belagavi Pickup</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#D6A84B]">24/7</div>
              <div className="text-xs text-gray-400">WhatsApp Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">Browse Categories</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Shop By Equipment Type</h2>
          </div>
          <button
            onClick={() => {
              setCurrentTab('catalogue');
              setSelectedCategory('All Products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#D6A84B] hover:underline"
          >
            View All Categories →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setCurrentTab('catalogue');
                setSelectedCategory(cat.name);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-4 text-center cursor-pointer hover:border-[#D6A84B] transition-all group flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border border-[#333] group-hover:scale-105 transition">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-white font-bold text-sm group-hover:text-[#D6A84B] transition">
                {cat.name}
              </h3>
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cameras */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">Top Rated Gear</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Featured Cameras & Equipment</h2>
          </div>
          <button
            onClick={() => {
              setCurrentTab('catalogue');
              setSelectedCategory('All Products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#D6A84B] hover:underline"
          >
            Browse All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              accentColor={accentColor}
              onViewDetails={onViewDetails}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      </section>

      {/* Best Rental Deals */}
      {discountedProducts.length > 0 && (
        <section className="container mx-auto px-4 bg-[#141414] border border-[#262626] rounded-2xl py-12 px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs uppercase font-bold text-[#E53E3E] tracking-wider">Special Offers</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Best Rental Deals & Discounts</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                accentColor={accentColor}
                onViewDetails={onViewDetails}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        </section>
      )}

      {/* Rental Process Section */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">Simple 4-Step Process</span>
          <h2 className="text-3xl font-black text-white mt-1">How Rental Works</h2>
          <p className="text-sm text-gray-400 mt-2">
            Renting photography equipment in Belagavi is fast, transparent, and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B] text-[#D6A84B] font-black text-xl flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="text-white font-bold text-lg">Explore Equipment</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Browse our professional catalogue of Canon & Nikon cameras, telephoto lenses, tripods, and ring lights.
            </p>
          </div>

          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B] text-[#D6A84B] font-black text-xl flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="text-white font-bold text-lg">Choose Your Gear & Dates</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Select your preferred rental dates, add accessories, and view transparent rental prices in Indian Rupees (₹).
            </p>
          </div>

          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B] text-[#D6A84B] font-black text-xl flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="text-white font-bold text-lg">Send Booking Request</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Submit your booking form or connect instantly with PixelPulse on WhatsApp (+91 82777 50280) for instant confirmation.
            </p>
          </div>

          <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B] text-[#D6A84B] font-black text-xl flex items-center justify-center mx-auto">
              4
            </div>
            <h3 className="text-white font-bold text-lg">Confirm & Collect</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Collect your sanitized equipment from Azam Nagar, Belagavi, capture your amazing shots, and return when done!
            </p>
          </div>
        </div>
      </section>

      {/* Camera Packages */}
      {packages.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">Value Bundles</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Recommended Camera Packages</h2>
            </div>
            <button
              onClick={() => {
                setCurrentTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#D6A84B] hover:underline"
            >
              View Packages →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col sm:flex-row group hover:border-[#D6A84B] transition">
                <div className="sm:w-1/2 h-64 sm:h-auto">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-bold bg-[#D6A84B] text-[#101010] px-2 py-0.5 rounded">
                      Special Package
                    </span>
                    <h3 className="text-xl font-black text-white mt-2">{pkg.name}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{pkg.description}</p>
                    <ul className="mt-3 space-y-1 text-xs text-gray-300">
                      {pkg.includedItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-[#D6A84B]">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
                    <div>
                      <div className="text-xl font-black text-[#D6A84B]">₹{pkg.price} <span className="text-xs text-gray-400 font-normal">/ day</span></div>
                      <div className="text-xs text-gray-500 line-through">₹{pkg.originalPrice}</div>
                    </div>
                    <a
                      href={`https://wa.me/918277750280?text=Hi%20PixelPulse,%20I%20want%20to%20book%20the%20package:%20${pkg.name}%20(₹${pkg.price}/day)`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] text-xs font-black px-4 py-2.5 rounded-lg transition"
                    >
                      💬 Book Package
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Choose PixelPulse */}
      <section className="container mx-auto px-4 bg-[#141414] border border-[#262626] rounded-2xl py-12 px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">Trusted Rental Partner</span>
          <h2 className="text-3xl font-black text-white mt-1">Why Choose PixelPulse?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-3xl">💰</div>
            <h3 className="text-white font-bold text-lg">Affordable Pricing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Rent professional DSLR cameras starting at just ₹399/day with transparent pricing and no hidden charges.
            </p>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="text-3xl">🛡️</div>
            <h3 className="text-white font-bold text-lg">Prisitanly Maintained Gear</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              All cameras, lenses, tripods, and ring lights are thoroughly cleaned, tested, and fully charged before every rental.
            </p>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="text-3xl">📍</div>
            <h3 className="text-white font-bold text-lg">Convenient Belagavi Location</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Located centrally at Azam Nagar, Belagavi with quick pickup and supportive owner guidance by Shivaprasad Nesaragi.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      {reviews.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">Customer Feedback</span>
            <h2 className="text-3xl font-black text-white mt-1">What Our Renters Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{rev.date}</span>
                </div>
                <p className="text-sm text-gray-300 italic">"{rev.comment}"</p>
                <div className="text-xs font-bold text-[#D6A84B]">— {rev.author}, Belagavi</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">Got Questions?</span>
          <h2 className="text-3xl font-black text-white mt-1">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-6 space-y-2">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <span>❓</span> {faq.question}
              </h3>
              <p className="text-sm text-gray-400 pl-6 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Contact CTA */}
      <section className="container mx-auto px-4 bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 sm:p-12 text-center space-y-6">
        <span className="text-3xl">📍</span>
        <h2 className="text-3xl font-black text-white">Visit PixelPulse Camera Rental</h2>
        <p className="text-sm text-gray-300 max-w-xl mx-auto">
          199, Azam Nagar, Belagavi, Karnataka 590010, India<br />
          Call: +91 89709 22580 | WhatsApp Catalogue: +91 82777 50280
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="tel:+918970922580"
            className="bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-black px-6 py-3 rounded-xl transition text-sm"
          >
            📞 Call Now (+91 89709 22580)
          </a>
          <a
            href="https://wa.me/918277750280"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black px-6 py-3 rounded-xl transition text-sm"
          >
            💬 WhatsApp Catalogue (+91 82777 50280)
          </a>
          <a
            href="https://maps.app.goo.gl/JGrwVkQk2vJTMPRZ7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#333] hover:bg-[#444] text-white font-bold px-6 py-3 rounded-xl transition text-sm"
          >
            🗺️ Open Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
