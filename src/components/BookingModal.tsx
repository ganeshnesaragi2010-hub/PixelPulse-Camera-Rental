import React, { useState } from 'react';
import { Product } from '../types';

interface BookingModalProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookingModal({ product, onClose, onSuccess }: BookingModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!product) return null;

  // Calculate days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = startDate && endDate && end >= start ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 : 1;
  const baseTotal = product.rentalPrice * diffDays;
  const accessoriesTotal = selectedAccessories.length * 200 * diffDays; // approx ₹200/day per accessory
  const totalPrice = baseTotal + accessoriesTotal;

  const handleAccessoryToggle = (acc: string) => {
    if (selectedAccessories.includes(acc)) {
      setSelectedAccessories(selectedAccessories.filter((a) => a !== acc));
    } else {
      setSelectedAccessories([...selectedAccessories, acc]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !startDate || !endDate) {
      setError('Please fill in all required fields (Name, Phone, Start Date, End Date).');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const bookingData = {
        customerName,
        phone,
        productName: product.name,
        accessories: selectedAccessories,
        startDate,
        endDate,
        totalPrice,
        message,
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (data.success) {
        // Open WhatsApp with pre-filled message
        const accessoriesText = selectedAccessories.length > 0 ? ` with accessories: ${selectedAccessories.join(', ')}` : '';
        const whatsappText = `Hello PixelPulse Camera Rental!%0A%0AI would like to book equipment:%0A👤 Name: ${customerName}%0A📞 Phone: ${phone}%0A📷 Equipment: ${product.name}${accessoriesText}%0A📅 Dates: ${startDate} to ${endDate} (${diffDays} days)%0A💰 Estimated Total: ₹${totalPrice}%0A%0APlease confirm availability!`;
        const whatsappUrl = `https://wa.me/918277750280?text=${whatsappText}`;
        
        window.open(whatsappUrl, '_blank');
        onSuccess();
        onClose();
      } else {
        setError(data.message || 'Failed to submit booking.');
      }
    } catch (err) {
      setError('Server connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative my-8">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl bg-[#252525] w-8 h-8 rounded-full flex items-center justify-center transition"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">
            PixelPulse Rental Booking
          </span>
          <h2 className="text-2xl font-black mt-1">Book {product.name}</h2>
          <p className="text-xs text-gray-400 mt-1">
            Rental Rate: ₹{product.rentalPrice} / {product.rentalPeriod || 'day'} • Pickup at Azam Nagar, Belagavi
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-[#C53030]/20 border border-[#C53030] text-red-200 text-xs p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Patil"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D6A84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
              Phone Number / WhatsApp *
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D6A84B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                Rental Start Date *
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D6A84B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                Rental End Date *
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D6A84B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-300 mb-2">
              Add Optional Accessories (₹200/day each)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['Tripod', 'Ring Light', 'Telephoto Lens (70-300mm)', 'Extra Battery & SD Card'].map((acc) => (
                <label
                  key={acc}
                  className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${
                    selectedAccessories.includes(acc)
                      ? 'border-[#D6A84B] bg-[#D6A84B]/10 text-white font-bold'
                      : 'border-[#333] bg-[#101010] text-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAccessories.includes(acc)}
                    onChange={() => handleAccessoryToggle(acc)}
                    className="accent-[#D6A84B]"
                  />
                  <span>{acc}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
              Additional Note / Requirements
            </label>
            <textarea
              rows={2}
              placeholder="Any specific instructions or timings..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#101010] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D6A84B]"
            />
          </div>

          {/* Pricing summary */}
          <div className="bg-[#101010] p-4 rounded-xl border border-[#2A2A2A] space-y-1 text-sm">
            <div className="flex justify-between text-gray-400 text-xs">
              <span>Rental duration:</span>
              <span className="font-semibold text-white">{diffDays} day(s)</span>
            </div>
            <div className="flex justify-between text-gray-400 text-xs">
              <span>Equipment base:</span>
              <span>₹{product.rentalPrice} × {diffDays} = ₹{baseTotal}</span>
            </div>
            {selectedAccessories.length > 0 && (
              <div className="flex justify-between text-gray-400 text-xs">
                <span>Accessories ({selectedAccessories.length}):</span>
                <span>₹{accessoriesTotal}</span>
              </div>
            )}
            <div className="pt-2 border-t border-[#2A2A2A] flex justify-between items-center text-base font-black">
              <span>Estimated Total:</span>
              <span className="text-[#D6A84B] text-xl">₹{totalPrice}</span>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#252525] hover:bg-[#333] text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-black py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
            >
              <span>💬</span>
              <span>{submitting ? 'Submitting...' : 'Confirm via WhatsApp'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
