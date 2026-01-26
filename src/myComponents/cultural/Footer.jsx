import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react'; // Using a sparkle icon to match the OJUS logo style

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white pt-20 pb-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-6 text-white" />
            <h2 className="text-2xl font-bold tracking-tighter italic uppercase">Ojus</h2>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
            Between dreams and reality — where creativity transcends boundaries.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <nav className="flex flex-col space-y-2 text-sm text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/floor-1" className="hover:text-white transition-colors">Floor 1</Link>
            <Link href="/floor-2" className="hover:text-white transition-colors">Floor 2</Link>
            <Link href="/floor-3" className="hover:text-white transition-colors">Floor 3</Link>
            <Link href="/floor-4" className="hover:text-white transition-colors">Floor 4</Link>
          </nav>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="flex flex-col space-y-2 text-sm text-neutral-400">
            <p>Email: <span className="text-neutral-300">info@reverieetheria.edu</span></p>
            <p>Phone: <span className="text-neutral-300">+91 98765 43210</span></p>
            <p>Location: <span className="text-neutral-300">College Campus</span></p>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="mt-20 pt-8 border-t border-neutral-800 text-center">
        <p className="text-xs text-neutral-500 tracking-widest">
          © {currentYear} Reverie Etheria. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;