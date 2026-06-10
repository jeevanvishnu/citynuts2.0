import React from 'react';
import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
  TiktokLogo,
  Envelope,
  Phone,
  MapPin,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-charcoal text-white pt-20 pb-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand details */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold tracking-tight text-white uppercase">
              About City<span className="text-primary">nuts</span>
            </h4>
            
            <p className="text-sm text-white/60 leading-relaxed font-light">
              Nuts and seeds are good sources of protein, healthy fats, fibres, vitamins and minerals. Nuts and seeds regulate body weight as their fats are not fully absorbed and they regulate food intake.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: <FacebookLogo size={20} weight="fill" />, href: 'https://www.facebook.com/people/Citynuts/61580152072365/' },
                { icon: <TiktokLogo size={20} weight="fill" />, href: 'https://www.tiktok.com/@citynutsonline' },
                { icon: <InstagramLogo size={20} weight="fill" />, href: 'https://www.instagram.com/citynutsonline' },
                { icon: <WhatsappLogo size={20} weight="fill" />, href: 'https://web.whatsapp.com/send?phone=971523032582&text=' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Our Menu */}
          <div className="space-y-6 lg:pl-10">
            <h4 className="text-base font-semibold tracking-wider text-white uppercase">
              Our Menu
            </h4>
            <ul className="space-y-3 font-light text-sm text-white/60">
              {[
                'Dates',
                'Chocolates',
                'Spices',
                'Nuts',
                'Seeds',
                'Dry Fruits',
              ].map((cat) => (
                <li key={cat}>
                  <a
                    href="#products"
                    className="hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="h-1 w-0 bg-primary rounded-full transition-all duration-200 group-hover:w-2" />
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-6 lg:pl-5">
            <h4 className="text-base font-semibold tracking-wider text-white uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Shop', href: '#products' },
                { name: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-primary transition-colors duration-200 font-light flex items-center gap-1 group"
                  >
                    <span className="h-1 w-0 bg-primary rounded-full transition-all duration-200 group-hover:w-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-base font-semibold tracking-wider text-white uppercase">
              Contact Us
            </h4>
            
            <div className="space-y-4 text-sm font-light text-white/60">
              <div className="flex items-center gap-3">
                <Envelope size={18} className="text-primary shrink-0" />
                <span>info@citynutsonline.com</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>+971 52 303 2577</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary shrink-0 opacity-0" />
                  <span>04 566 3003</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">ALRAFI BUILDING EYAL NASIR, Shop No 4 & 5 Near Naif Police Station, Sabhka, Deira - Dubai</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5 opacity-0" />
                <span className="leading-relaxed">Sharjah Rolla, Khalid Bin Al Waleed Street, Near Rolla Mall, Sharjah - UAE</span>
              </div>
            </div>


          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-white/40">
          <p>Copyright &copy; {currentYear} CityNuts All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms & Condition</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
