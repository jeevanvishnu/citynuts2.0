import React from 'react';

export const VideoHero: React.FC = () => {
  return (
    <section id="home" className="w-full bg-white relative mt-[76px] lg:mt-[88px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="relative w-full overflow-hidden shadow-sm rounded-2xl md:rounded-3xl bg-gray-50 flex items-center justify-center">
          <video 
            className="w-full h-auto max-h-[70vh] object-cover" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/banner/banner-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};
