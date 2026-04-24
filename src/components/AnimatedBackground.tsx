import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800"></div>
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20"></div>
      
      {/* Geometric shapes - static for clean look */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-white/4 rounded-full blur-3xl"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Decorative elements - minimal and clean */}
      <div className="absolute top-20 left-10 text-white/20 text-2xl">🔒</div>
      <div className="absolute top-40 right-20 text-white/20 text-2xl">🛡️</div>
      <div className="absolute bottom-40 left-20 text-white/20 text-2xl">🔐</div>
      <div className="absolute bottom-20 right-10 text-white/20 text-2xl">🔑</div>
      
      {/* Subtle light rays */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent transform rotate-12"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent transform -rotate-12"></div>
    </div>
  );
};

export default AnimatedBackground;