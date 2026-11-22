import React from 'react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export default function Footer({ setCurrentTab, setSelectedCategory }: FooterProps) {
  const handleNav = (tab: string, cat: string = 'All Products') => {
    setCurrentTab(tab);
    setSelectedCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101010] text-[#CCCCCC] border-t border-[#2A2A2A] pt-16 pb-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#D6A84B] flex items-center justify-center text-[#101010] text-xl font-black">
              📸
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wider text-white uppercase">
                Pixel<span className="text-[#D6A84B]">Pulse</span>
              </h2>
              <p className="text-[10px] text-[#A0A0A0] uppercase tracking-widest font-medium">
                Camera Rental Belagavi
              </p>
            </div>
          </div>
          <p className="text-sm text-[#A0A0A0] leading-relaxed">
            Capture More. Worry Less. Professional camera, lens, tripod, and lighting equipment rentals for students, creators, and photographers in Belagavi.
          </p>
          <div className="pt-2 text-sm text-[#D6A84B] font-semibold">
            Owner: Shivaprasad Nesaragi
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-base uppercase tracking-wider border-b border-[#2A2A2A] pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => handleNav('home')} className="hover:text-[#D6A84B] transition">
                🏠 Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('catalogue', 'All Products')} className="hover:text-[#D6A84B] transition">
                📦 Equipment Catalogue
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('catalogue', 'Canon Cameras')} className="hover:text-[#D6A84B] transition">
                📷 Canon Cameras
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('catalogue', 'Nikon Cameras')} className="hover:text-[#D6A84B] transition">
                📷 Nikon Cameras
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('packages')} className="hover:text-[#D6A84B] transition">
                🎁 Camera Packages
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('about')} className="hover:text-[#D6A84B] transition">
                ℹ️ About Us
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('contact')} className="hover:text-[#D6A84B] transition">
                📞 Contact & Directions
              </button>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-base uppercase tracking-wider border-b border-[#2A2A2A] pb-2">
            Rental Categories
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => handleNav('catalogue', 'DSLR Cameras')} className="hover:text-[#D6A84B] transition">
                🎥 DSLR Cameras
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('catalogue', 'Camera Lenses')} className="hover:text-[#D6A84B] transition">
                🔭 Camera Lenses
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('catalogue', 'Telephoto Lenses')} className="hover:text-[#D6A84B] transition">
                🔭 Telephoto Lenses
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('catalogue', 'Tripods')} className="hover:text-[#D6A84B] transition">
                📐 Tripods
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('catalogue', 'Ring Lights')} className="hover:text-[#D6A84B] transition">
                💡 Ring Lights & Lighting
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('catalogue', 'Photography Accessories')} className="hover:text-[#D6A84B] transition">
                🎒 Accessories & Bags
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-base uppercase tracking-wider border-b border-[#2A2A2A] pb-2">
            Contact PixelPulse
          </h3>
          <div className="space-y-2.5 text-sm">
            <p className="flex items-start gap-2">
              <span>📍</span>
              <span>199, Azam Nagar, Belagavi, Karnataka 590010, India</span>
            </p>
            <p className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+918970922580" className="hover:text-[#D6A84B] transition font-semibold">
                +91 89709 22580 (Call)
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span>💬</span>
              <a href="https://wa.me/918277750280" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6A84B] transition font-semibold">
                +91 82777 50280 (WhatsApp Catalogue)
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:pixelpulsecamerarental@gmail.com" className="hover:text-[#D6A84B] transition">
                pixelpulsecamerarental@gmail.com
              </a>
            </p>
            <div className="pt-2 flex gap-3 text-sm">
              <a href="https://instagram.com/pixelpulse_camera_rental" target="_blank" rel="noopener noreferrer" className="bg-[#1B1B1B] hover:bg-[#D6A84B] hover:text-[#101010] px-3 py-1.5 rounded transition font-medium">
                📸 Instagram
              </a>
              <a href="https://maps.app.goo.gl/JGrwVkQk2vJTMPRZ7" target="_blank" rel="noopener noreferrer" className="bg-[#1B1B1B] hover:bg-[#D6A84B] hover:text-[#101010] px-3 py-1.5 rounded transition font-medium">
                🗺️ Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-[#2A2A2A] text-center text-xs text-[#888888]">
        <p>© {new Date().getFullYear()} PixelPulse Camera Rental. All rights reserved. Owner: Shivaprasad Nesaragi.</p>
        <p className="mt-1">Capture More. Worry Less. | Belagavi, Karnataka</p>
      </div>
    </footer>
  );
}
