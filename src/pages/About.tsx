import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16 max-w-5xl">
      {/* Header */}
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">
          About PixelPulse Camera Rental
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase">
          Capture More. <span className="text-[#D6A84B]">Worry Less.</span>
        </h1>
        <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Your trusted destination for professional camera, lens, tripod, and lighting equipment rentals in Belagavi, Karnataka.
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">Our Story</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Empowering Creators & Photographers in Belagavi
            </h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Whether you are capturing special moments, exploring photography as a hobby, creating content for social media, or working on college and professional projects, PixelPulse helps you get the equipment you need without purchasing expensive gear.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Founded and managed by <strong className="text-white">Shivaprasad Nesaragi</strong>, our goal is to make high-end photography equipment accessible with affordable rental options, reliable equipment, and a simple rental experience.
          </p>
          <div className="pt-2">
            <div className="text-sm font-bold text-[#D6A84B]">Shivaprasad Nesaragi</div>
            <div className="text-xs text-gray-400">Founder & Owner, PixelPulse Camera Rental</div>
          </div>
        </div>

        <div className="h-96 rounded-2xl overflow-hidden border border-[#2A2A2A] shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
            alt="Camera gear"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-6 space-y-3">
          <div className="text-3xl">🎯</div>
          <h3 className="text-white font-bold text-lg">Our Mission</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            To provide reliable, well-maintained cameras and lighting equipment to every aspiring photographer and creator in Belagavi at honest prices.
          </p>
        </div>

        <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-6 space-y-3">
          <div className="text-3xl">⭐</div>
          <h3 className="text-white font-bold text-lg">Quality Assurance</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Every camera body, lens, and tripod is checked, sanitized, and tested before handover to ensure zero technical glitches during your shoot.
          </p>
        </div>

        <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl p-6 space-y-3">
          <div className="text-3xl">🤝</div>
          <h3 className="text-white font-bold text-lg">Customer Support</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Friendly guidance and instant booking support via WhatsApp (+91 82777 50280) and direct calls (+91 89709 22580).
          </p>
        </div>
      </div>
    </div>
  );
}
