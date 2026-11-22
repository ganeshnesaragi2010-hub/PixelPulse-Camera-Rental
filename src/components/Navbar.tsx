import React, { useState } from 'react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isAdminLoggedIn: boolean;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  isAdminLoggedIn,
  currentTheme,
  setCurrentTheme,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const handleNavClick = (tab: string, category: string = 'All Products') => {
    setCurrentTab(tab);
    setSelectedCategory(category);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setThemeDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themes = [
    { id: 'gold', name: '👑 Gold & Black (Default)', color: '#D6A84B' },
    { id: 'emerald', name: '🌿 Emerald Studio', color: '#38A169' },
    { id: 'blue', name: '🌊 Cinematic Blue', color: '#3182CE' },
    { id: 'violet', name: '🔮 Royal Violet', color: '#805AD5' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#101010]/95 backdrop-blur-md border-b border-[#2A2A2A] text-white">
      {/* Top bar info */}
      <div className="bg-[#1B1B1B] text-xs py-1.5 px-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center border-b border-[#2A2A2A] text-[#CCCCCC]">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-4">
            <span>📍 199, Azam Nagar, Belagavi, Karnataka</span>
            <span className="hidden md:inline">📞 +91 89709 22580</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#D6A84B] font-semibold">⚡ Capture More. Worry Less.</span>
            
            {/* Theme Switcher dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="bg-[#252525] hover:bg-[#333] text-white text-xs px-2.5 py-1 rounded flex items-center gap-1 transition"
              >
                <span>🎨 Theme</span>
              </button>
              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1B1B1B] border border-[#333] rounded-xl shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3 py-1 text-gray-400 uppercase font-bold text-[10px]">Select Theme</div>
                  {themes.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => {
                        setCurrentTheme(th.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-[#2A2A2A] flex items-center gap-2 ${currentTheme === th.id ? 'text-[#D6A84B] font-bold bg-[#252525]' : 'text-gray-300'}`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: th.color }}></span>
                      <span>{th.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('admin')}
              className="text-xs bg-[#252525] hover:bg-[#D6A84B] hover:text-[#101010] text-[#D6A84B] px-2.5 py-0.5 rounded transition font-medium"
            >
              🔒 {isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#D6A84B] flex items-center justify-center text-[#101010] text-2xl font-black shadow-md group-hover:scale-105 transition">
            📸
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-white uppercase leading-tight">
              Pixel<span className="text-[#D6A84B]">Pulse</span>
            </h1>
            <p className="text-[10px] text-[#A0A0A0] uppercase tracking-widest font-medium">
              Camera Rental Belagavi
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-sm">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition hover:text-[#D6A84B] ${currentTab === 'home' ? 'text-[#D6A84B] font-bold underline underline-offset-8' : 'text-[#DDDDDD]'}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'All Products')}
            className={`transition hover:text-[#D6A84B] ${currentTab === 'catalogue' && selectedCategory === 'All Products' ? 'text-[#D6A84B] font-bold underline underline-offset-8' : 'text-[#DDDDDD]'}`}
          >
            Catalogue
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'Canon Cameras')}
            className={`transition hover:text-[#D6A84B] ${selectedCategory === 'Canon Cameras' ? 'text-[#D6A84B] font-bold underline underline-offset-8' : 'text-[#DDDDDD]'}`}
          >
            Canon
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'Nikon Cameras')}
            className={`transition hover:text-[#D6A84B] ${selectedCategory === 'Nikon Cameras' ? 'text-[#D6A84B] font-bold underline underline-offset-8' : 'text-[#DDDDDD]'}`}
          >
            Nikon
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'Camera Lenses')}
            className={`transition hover:text-[#D6A84B] ${selectedCategory === 'Camera Lenses' ? 'text-[#D6A84B] font-bold underline underline-offset-8' : 'text-[#DDDDDD]'}`}
          >
            Lenses
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'Tripods')}
            className={`transition hover:text-[#D6A84B] ${selectedCategory === 'Tripods' ? 'text-[#D6A84B] font-bold underline underline-offset-8' : 'text-[#DDDDDD]'}`}
          >
            Accessories
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className={`transition hover:text-[#D6A84B] ${currentTab === 'packages' ? 'text-[#D6A84B] font-bold underline underline-offset-8' : 'text-[#DDDDDD]'}`}
          >
            Packages
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition hover:text-[#D6A84B] ${currentTab === 'about' ? 'text-[#D6A84B] font-bold underline underline-offset-8' : 'text-[#DDDDDD]'}`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition hover:text-[#D6A84B] ${currentTab === 'contact' ? 'text-[#D6A84B] font-bold underline underline-offset-8' : 'text-[#DDDDDD]'}`}
          >
            Contact
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Search Toggle Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg bg-[#1B1B1B] hover:bg-[#2A2A2A] text-white text-lg transition"
            title="Search Equipment"
          >
            🔍
          </button>

          {/* Quick Book Button */}
          <button
            onClick={() => handleNavClick('catalogue')}
            className="hidden sm:inline-flex items-center gap-2 bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-bold px-4 py-2 rounded-lg text-sm transition shadow-md"
          >
            📦 Rent Gear Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#1B1B1B] text-white text-xl"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="bg-[#1B1B1B] border-t border-[#2A2A2A] px-4 py-3">
          <div className="container mx-auto flex items-center gap-2">
            <span className="text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search cameras, lenses, tripods, ring lights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setCurrentTab('catalogue');
                  setSearchOpen(false);
                }
              }}
              className="w-full bg-[#101010] border border-[#333333] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#D6A84B]"
              autoFocus
            />
            <button
              onClick={() => {
                setCurrentTab('catalogue');
                setSearchOpen(false);
              }}
              className="bg-[#D6A84B] text-[#101010] font-bold px-4 py-2 rounded-lg text-sm"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1B1B1B] border-t border-[#2A2A2A] px-4 py-5 space-y-3">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 px-3 rounded hover:bg-[#252525] font-medium"
          >
            🏠 Home
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'All Products')}
            className="block w-full text-left py-2 px-3 rounded hover:bg-[#252525] font-medium"
          >
            📦 Full Catalogue
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'Canon Cameras')}
            className="block w-full text-left py-2 px-3 rounded hover:bg-[#252525] font-medium"
          >
            📷 Canon Cameras
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'Nikon Cameras')}
            className="block w-full text-left py-2 px-3 rounded hover:bg-[#252525] font-medium"
          >
            📷 Nikon Cameras
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'Camera Lenses')}
            className="block w-full text-left py-2 px-3 rounded hover:bg-[#252525] font-medium"
          >
            🔭 Camera Lenses & Telephoto
          </button>
          <button
            onClick={() => handleNavClick('catalogue', 'Tripods')}
            className="block w-full text-left py-2 px-3 rounded hover:bg-[#252525] font-medium"
          >
            💡 Tripods & Ring Lights
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className="block w-full text-left py-2 px-3 rounded hover:bg-[#252525] font-medium"
          >
            🎁 Camera Packages
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 px-3 rounded hover:bg-[#252525] font-medium"
          >
            ℹ️ About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 px-3 rounded hover:bg-[#252525] font-medium"
          >
            📞 Contact & Location
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className="block w-full text-left py-2 px-3 rounded bg-[#252525] text-[#D6A84B] font-bold"
          >
            🔒 Admin Dashboard
          </button>
        </div>
      )}
    </header>
  );
}
