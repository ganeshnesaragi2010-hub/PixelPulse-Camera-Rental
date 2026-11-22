import React from 'react';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12 max-w-5xl">
      {/* Header */}
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">
          Get in Touch with PixelPulse
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase">
          Contact & <span className="text-[#D6A84B]">Location</span>
        </h1>
        <p className="text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
          Ready to rent your next camera or equipment? Reach out to us directly or visit our pickup location in Belagavi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 space-y-6">
          <h3 className="text-2xl font-black text-white">Business Details</h3>
          
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-xl">🏢</span>
              <div>
                <strong className="text-white block">PixelPulse Camera Rental</strong>
                <span className="text-xs text-gray-400">Owner: Shivaprasad Nesaragi</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <div>
                <strong className="text-white block">Address</strong>
                <span>199, Azam Nagar, Belagavi, Karnataka 590010, India</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">📞</span>
              <div>
                <strong className="text-white block">Call Number (For Calls)</strong>
                <a href="tel:+918970922580" className="text-[#D6A84B] font-bold hover:underline">
                  +91 89709 22580
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">💬</span>
              <div>
                <strong className="text-white block">Catalogue / WhatsApp (For Bookings)</strong>
                <a href="https://wa.me/918277750280" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold hover:underline">
                  +91 82777 50280
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">✉️</span>
              <div>
                <strong className="text-white block">Email</strong>
                <a href="mailto:pixelpulsecamerarental@gmail.com" className="text-[#D6A84B] hover:underline">
                  pixelpulsecamerarental@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">📸</span>
              <div>
                <strong className="text-white block">Social Media</strong>
                <span className="text-xs text-gray-400">Instagram: @pixelpulse_camera_rental</span><br />
                <span className="text-xs text-gray-400">Facebook: PixelPulse Camera Rental</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2A2A2A] flex flex-wrap gap-3">
            <a
              href="tel:+918970922580"
              className="bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-black px-5 py-3 rounded-xl transition text-xs flex items-center gap-2"
            >
              <span>📞</span> Call Now
            </a>
            <a
              href="https://wa.me/918277750280?text=Hi%20PixelPulse,%20I%20have%20an%20enquiry%20regarding%20camera%20rentals."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black px-5 py-3 rounded-xl transition text-xs flex items-center gap-2"
            >
              <span>💬</span> WhatsApp Catalogue
            </a>
          </div>
        </div>

        {/* Map & Directions */}
        <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white">Location & Directions</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              We are conveniently situated in Azam Nagar, Belagavi. You can easily navigate to our pickup location using Google Maps.
            </p>
            <div className="bg-[#101010] border border-[#333] rounded-xl p-4 space-y-2">
              <div className="text-xs text-[#D6A84B] font-bold">📍 Google Maps Link</div>
              <a
                href="https://maps.app.goo.gl/JGrwVkQk2vJTMPRZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 underline break-all block"
              >
                https://maps.app.goo.gl/JGrwVkQk2vJTMPRZ7
              </a>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/JGrwVkQk2vJTMPRZ7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#333] hover:bg-[#444] text-white font-black py-4 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-lg text-center"
          >
            <span>🗺️</span> Get Directions on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
