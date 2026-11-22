import React from 'react';
import { PackageItem } from '../types';

interface PackagesProps {
  packages: PackageItem[];
  setCurrentTab: (tab: string) => void;
}

export default function Packages({ packages, setCurrentTab }: PackagesProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 text-center space-y-3">
        <span className="text-xs uppercase font-bold text-[#D6A84B] tracking-wider">
          Value Bundles & Kits
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Professional Camera Packages
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Complete photography bundles including DSLR cameras, tripods, ring lights, and memory cards at discounted rental rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col group hover:border-[#D6A84B] transition shadow-xl"
          >
            <div className="h-72 overflow-hidden bg-[#101010]">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="bg-[#D6A84B] text-[#101010] text-xs font-black px-3 py-1 rounded">
                  All-In-One Kit
                </span>
                <h3 className="text-2xl font-black text-white">{pkg.name}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{pkg.description}</p>
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-[#D6A84B] uppercase tracking-wider">
                    Included Equipment:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                    {pkg.includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#D6A84B]">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-[#D6A84B]">
                    ₹{pkg.price} <span className="text-xs text-gray-400 font-normal">/ day</span>
                  </div>
                  <div className="text-xs text-gray-500 line-through">₹{pkg.originalPrice} / day</div>
                </div>

                <a
                  href={`https://wa.me/918277750280?text=Hi%20PixelPulse,%20I%20want%20to%20book%20the%20package:%20${encodeURIComponent(pkg.name)}%20(₹${pkg.price}/day)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#D6A84B] hover:bg-[#c2963f] text-[#101010] font-black px-6 py-3 rounded-xl transition text-sm shadow-md"
                >
                  💬 Book via WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
