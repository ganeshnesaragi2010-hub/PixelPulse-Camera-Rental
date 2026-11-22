import React from 'react';

export default function WhatsAppButton() {
  const whatsappUrl = 'https://wa.me/918277750280?text=Hi%20PixelPulse%20Camera%20Rental,%20I%20would%20like%20to%20enquire%20about%20renting%20camera%20equipment.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-300 hover:scale-110 group"
      title="Chat on WhatsApp"
    >
      💬
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-bold px-0 group-hover:px-2 text-white">
        WhatsApp Enquiry
      </span>
    </a>
  );
}
