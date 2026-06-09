import React from 'react';
import { Truck, ShieldCheck, Wallet } from '@phosphor-icons/react';

const features = [
  {
    icon: <Wallet size={32} weight="duotone" className="text-primary" />,
    title: 'Pay on Delivery',
    subtitle: 'citynutsonline',
    description: 'We will provide cash on delivery'
  },
  {
    icon: <ShieldCheck size={32} weight="duotone" className="text-primary" />,
    title: '100% Quality Guaranteed',
    subtitle: 'citynutsonline',
    description: 'Totally good quality products delivered'
  },
  {
    icon: <Truck size={32} weight="duotone" className="text-primary" />,
    title: 'Free Shipping above 1200',
    subtitle: 'citynutsonline',
    description: 'We provide free shipping on orders above 1200'
  }
];

export const InformationBanner: React.FC = () => {
  return (
    <section className="bg-[#FDFCFB] py-12 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 p-4">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                {feature.icon}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">{feature.subtitle}</p>
                <h4 className="text-lg font-extrabold text-charcoal">{feature.title}</h4>
                <p className="text-sm text-gray-500 max-w-[250px] mx-auto">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
