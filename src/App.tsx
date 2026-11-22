import React, { useState, useEffect } from 'react';
import { Product, Category, PackageItem, Review, FAQ, Settings } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BookingModal from './components/BookingModal';

import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import Packages from './pages/Packages';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [bookingProduct, setBookingProduct] = useState<Product | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>('gold');

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [settings, setSettings] = useState<Settings>({
    businessName: 'PixelPulse Camera Rental',
    owner: 'Shivaprasad Nesaragi',
    tagline: 'Capture More. Worry Less.',
    address: '199, Azam Nagar, Belagavi, Karnataka 590010, India',
    callNumber: '+91 89709 22580',
    whatsappNumber: '+91 82777 50280',
    email: 'pixelpulsecamerarental@gmail.com',
    googleMaps: 'https://maps.app.goo.gl/JGrwVkQk2vJTMPRZ7',
    instagram: '@pixelpulse_camera_rental',
    facebook: 'PixelPulse Camera Rental',
  });
  const [bookings, setBookings] = useState<any[]>([]);

  const fetchAppData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      if (data) {
        if (data.products) setProducts(data.products);
        if (data.categories) setCategories(data.categories);
        if (data.packages) setPackages(data.packages);
        if (data.reviews) setReviews(data.reviews);
        if (data.faqs) setFaqs(data.faqs);
        if (data.settings) setSettings(data.settings);
        if (data.bookings) setBookings(data.bookings);
      }
    } catch (e) {
      console.error('Failed to fetch app data', e);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNow = (product: Product) => {
    setBookingProduct(product);
  };

  const getAccentColorHex = (theme: string) => {
    switch (theme) {
      case 'emerald': return '#38A169';
      case 'blue': return '#3182CE';
      case 'violet': return '#805AD5';
      case 'gold':
      default: return '#D6A84B';
    }
  };

  return (
    <div
      className="min-h-screen bg-[#101010] text-[#F4F4F4] flex flex-col font-sans selection:bg-[#D6A84B] selection:text-[#101010]"
      style={{ '--accent-color': getAccentColorHex(currentTheme) } as any}
    >
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'detail') setSelectedProduct(null);
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isAdminLoggedIn={isAdminLoggedIn}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            products={products}
            categories={categories}
            packages={packages}
            reviews={reviews}
            faqs={faqs}
            setCurrentTab={setCurrentTab}
            setSelectedCategory={setSelectedCategory}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
            accentColor={getAccentColorHex(currentTheme)}
          />
        )}

        {currentTab === 'catalogue' && (
          <Catalogue
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
            accentColor={getAccentColorHex(currentTheme)}
          />
        )}

        {currentTab === 'detail' && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => {
              setCurrentTab('catalogue');
              setSelectedProduct(null);
            }}
            onBookNow={handleBookNow}
          />
        )}

        {currentTab === 'packages' && (
          <Packages
            packages={packages}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'about' && <About />}

        {currentTab === 'contact' && <Contact />}

        {currentTab === 'admin' && (
          <Admin
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
            products={products}
            categories={categories}
            bookings={bookings}
            reviews={reviews}
            faqs={faqs}
            settings={settings}
            onRefreshData={fetchAppData}
          />
        )}
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Booking Modal */}
      {bookingProduct && (
        <BookingModal
          product={bookingProduct}
          onClose={() => setBookingProduct(null)}
          onSuccess={() => {
            fetchAppData();
            alert('Booking request submitted successfully! Opening WhatsApp...');
          }}
        />
      )}

      {/* Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}
