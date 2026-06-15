import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, PaperPlaneTilt, CaretDown, WhatsappLogo, Phone } from '@phosphor-icons/react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white font-poppins text-dark selection:bg-primary/20">
      
      {/* 1. Hero Section */}
      <section className="w-full bg-blush pt-32 pb-20 px-6 md:px-12 lg:px-20 relative">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-8 text-dark/40">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <span className="text-dark">Contact Us</span>
          </div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-black tracking-tighter mb-4"
          >
            Get in Touch
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-dark/60 text-base md:text-lg max-w-xl mb-6 leading-relaxed font-light"
          >
            We're based in Deira, Dubai — and we'd love to hear from you. <br className="hidden md:block" />
            Whether it's an order query, bulk request, or just a hello.
          </motion.p>

          {/* Location Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-white shadow-sm"
          >
            <MapPin size={18} weight="fill" className="text-primary" />
            <span className="text-sm font-semibold text-primary">Al Rafi Building, Deira, Dubai</span>
          </motion.div>
        </div>
      </section>

      {/* 2. Form and Map Split Section */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left: Form */}
          <div className="w-full lg:col-span-5">
            <h3 className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">Send a Message</h3>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8 text-dark">
              We'll reply within 24 hours.
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                className="w-full border border-dark/10 rounded-xl px-5 py-4 text-dark placeholder:text-dark/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />

              {/* Phone Field */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
                className="w-full border border-dark/10 rounded-xl px-5 py-4 text-dark placeholder:text-dark/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
              />

              {/* Subject */}
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-dark/10 rounded-xl px-5 py-4 text-dark placeholder:text-dark/40 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                >
                  <option value="" disabled>Subject</option>
                  <option value="Order Inquiry">Order Inquiry</option>
                  <option value="Bulk Request">Bulk Request</option>
                  <option value="General Question">General Question</option>
                  <option value="Feedback">Feedback</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-dark/40">
                  <CaretDown size={20} />
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full border border-dark/10 rounded-xl px-5 py-4 text-dark placeholder:text-dark/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                ></textarea>
                <div className="absolute bottom-4 right-5 text-xs text-dark/30 font-medium">
                  {formData.message.length} / 500
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-md shadow-primary/20"
              >
                SEND MESSAGE <PaperPlaneTilt size={20} weight="fill" />
              </button>

              {/* WhatsApp Alternative */}
              <div className="flex items-center justify-center gap-2 mt-4 text-sm font-medium text-dark/60">
                Or reach us directly on WhatsApp 
                <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-110 transition-transform">
                  <WhatsappLogo size={24} weight="fill" />
                </a>
              </div>
            </form>
          </div>

          {/* Right: Map */}
          <div className="w-full lg:col-span-7 h-[600px] lg:h-auto min-h-[500px] relative overflow-hidden border border-dark/5">
            <iframe 
              title="Deira Store Map"
              src="https://maps.google.com/maps?q=City+Nuts+General+Trading+LLC&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale-[20%]"
            ></iframe>

            {/* Floating Store Card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-[320px] bg-white rounded-2xl shadow-xl p-6 border border-dark/5 z-10">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} weight="fill" className="text-primary" />
                <h4 className="font-bold text-dark">City Nuts — Deira Store</h4>
              </div>
              <p className="text-xs text-dark/60 mb-4 leading-relaxed">
                Al Rafi Building, Shop 4 & 5<br />
                Near Naif Police Station<br />
                Sabhka, Deira — Dubai, UAE
              </p>
              <div className="space-y-1 mb-6">
                <p className="text-xs text-dark/60 flex items-center gap-2">
                  <span className="w-4 flex justify-center text-primary/50">🕒</span> Mon–Sat: 9AM — 7PM
                </p>
                <p className="text-xs text-primary font-medium flex items-center gap-2">
                  <span className="w-4 flex justify-center"></span> Sunday: Closed
                </p>
              </div>
              <a 
                href="https://maps.app.goo.gl/hJoU5ULfrXn8Xxoi9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary text-white text-sm font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Directions →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Bottom Contact Cards - Store Locations */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Gold Souq */}
          <div className="bg-white rounded-[2rem] p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow border border-dark/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blush rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="w-14 h-14 bg-blush text-primary rounded-full flex items-center justify-center mb-6">
              <MapPin size={28} weight="fill" />
            </div>
            <h3 className="text-xl font-black tracking-tight text-dark mb-4">Gold Souq, Dubai</h3>
            
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-dark/40 mt-1 shrink-0" weight="fill" />
                <p className="text-sm text-dark/60 leading-relaxed">Shop No 3 & 4, Al Othman Building, Opp Lito Palace, Gold Souq, Deira - Dubai</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-dark/40 mt-1 shrink-0" weight="fill" />
                <div className="text-sm text-dark/60 space-y-1">
                  <p>+971 4 242 9009</p>
                  <p>+971 52 303 2577</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PaperPlaneTilt size={18} className="text-dark/40 shrink-0" weight="fill" />
                <p className="text-sm text-dark/60">info@citynutsonline.com</p>
              </div>
            </div>

            <a href="https://maps.google.com/?q=Gold+Souq+Deira+Dubai" target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 rounded-xl bg-blush text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors duration-300">
              Direction →
            </a>
          </div>

          {/* Card 2: Naif */}
          <div className="bg-white rounded-[2rem] p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow border border-dark/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blush rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="w-14 h-14 bg-blush text-primary rounded-full flex items-center justify-center mb-6">
              <MapPin size={28} weight="fill" />
            </div>
            <h3 className="text-xl font-black tracking-tight text-dark mb-4">Naif, Dubai</h3>
            
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-dark/40 mt-1 shrink-0" weight="fill" />
                <p className="text-sm text-dark/60 leading-relaxed">ALRAFI BUILDING EYAL NASIR, Shop No 4 & 5 Near Naif Police Station, Sabhka, Deira - Dubai</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-dark/40 mt-1 shrink-0" weight="fill" />
                <div className="text-sm text-dark/60 space-y-1">
                  <p>+971 4 566 3003</p>
                  <p>+971 52 303 2577</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PaperPlaneTilt size={18} className="text-dark/40 shrink-0" weight="fill" />
                <p className="text-sm text-dark/60">info@citynutsonline.com</p>
              </div>
            </div>

            <a href="https://maps.app.goo.gl/hJoU5ULfrXn8Xxoi9" target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 rounded-xl bg-blush text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors duration-300">
              Direction →
            </a>
          </div>

          {/* Card 3: Sharjah */}
          <div className="bg-white rounded-[2rem] p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow border border-dark/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blush rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="w-14 h-14 bg-blush text-primary rounded-full flex items-center justify-center mb-6">
              <MapPin size={28} weight="fill" />
            </div>
            <h3 className="text-xl font-black tracking-tight text-dark mb-4">Sharjah, UAE</h3>
            
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-dark/40 mt-1 shrink-0" weight="fill" />
                <p className="text-sm text-dark/60 leading-relaxed">Showroom No C8, Bin Kamil Building, Near Rolla Mall, Sharjah - UAE</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-dark/40 mt-1 shrink-0" weight="fill" />
                <div className="text-sm text-dark/60 space-y-1">
                  <p>+971 6 510 3003</p>
                  <p>+971 52 303 2581</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PaperPlaneTilt size={18} className="text-dark/40 shrink-0" weight="fill" />
                <p className="text-sm text-dark/60">info@citynutsonline.com</p>
              </div>
            </div>

            <a href="https://maps.google.com/?q=Bin+Kamil+Building+Near+Rolla+Mall+Sharjah" target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 rounded-xl bg-[#FFF5F8] text-[#FF2D85] font-bold text-sm hover:bg-primary hover:text-white transition-colors duration-300">
              Direction →
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
