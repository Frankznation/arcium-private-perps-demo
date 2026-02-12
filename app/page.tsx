'use client';

import { useState } from 'react';

export default function ArciumRTGPortal() {
  const [username, setUsername] = useState('neryn');

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Circuit board pattern - top horizontal line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-800" />

      {/* Animated glowing orbs on the left */}
      <div className="absolute left-8 top-1/3 transform -translate-y-1/2 z-10">
        {/* Top orb */}
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border border-purple-500 border-opacity-40 rounded-full" />
          <div className="absolute inset-2 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 rounded-full blur-2xl opacity-60 animate-pulse" />
          <div className="absolute inset-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-lg opacity-40" />
        </div>

        {/* Bottom orb */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border border-purple-500 border-opacity-40 rounded-full" />
          <div className="absolute inset-2 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-lg opacity-40" />
        </div>
      </div>

      {/* Partial orb on right side - bottom */}
      <div className="absolute -right-12 bottom-12 w-40 h-40 border border-purple-400 border-opacity-20 rounded-full opacity-30" />

      {/* Header - Portal button and username */}
      <div className="absolute top-8 right-8 z-20 flex items-center gap-6">
        <button className="text-white text-sm font-mono hover:text-purple-400 transition-colors">
          {'>> PORTAL'}
        </button>
        <div className="text-white text-sm font-light">{username}</div>
      </div>

      {/* Main content - centered */}
      <div className="relative h-full min-h-screen flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Purple badge */}
          <div className="inline-block mb-8 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full">
            <p className="text-white text-xs font-bold uppercase tracking-widest">
              Retroactive Token Grants
            </p>
          </div>

          {/* Main title with special Encrypted styling */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The{' '}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent italic font-extrabold">
              {'<Encrypted>'}
            </span>
            {' '}Future is built for you
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Contribute to activities under consideration for RTGs and grow alongside Arcium and its
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary button */}
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 text-lg">
              <span className="relative z-10">SEE OPPORTUNITIES {'>>'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity blur" />
            </button>

            {/* Secondary button */}
            <button className="px-8 py-4 border-2 border-purple-400 text-purple-300 font-bold rounded-lg hover:bg-purple-950 hover:bg-opacity-30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 text-lg">
              READ ABOUT RTGS
            </button>
          </div>
        </div>
      </div>

      {/* Background glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/2 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-5" />
        <div className="absolute right-1/4 top-1/3 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-5" />
      </div>

      <style jsx>{`
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.8);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        * {
          animation: fade-in 0.8s ease-out forwards;
        }

        h1 {
          animation-delay: 0.2s;
        }

        p {
          animation-delay: 0.4s;
        }

        button {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}
