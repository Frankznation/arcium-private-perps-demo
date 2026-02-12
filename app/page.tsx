'use client';

export default function ArciumRTG() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden w-full">
      {/* Circuit board pattern at top */}
      <div className="circuit-board-top" />

      {/* Header - Top Right */}
      <header className="absolute top-6 right-6 z-50 flex items-center gap-2">
        <button className="text-gray-300 text-sm font-medium hover:text-white transition-colors">
          &gt;&gt; PORTAL
        </button>
        <span className="text-gray-400 text-xs">neryn</span>
      </header>

      {/* Glowing Orbs - Left Side */}
      <div className="absolute left-6 md:left-10 top-1/4 z-0">
        {/* First Orb */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 rounded-full blur-xl opacity-60 animate-pulse-glow" />
          <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full" />
          <div className="absolute inset-0 border border-purple-400/30 rounded-full" style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }} />
        </div>
        {/* Second Orb */}
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full blur-xl opacity-60 animate-pulse-glow"
            style={{ animationDelay: '1s' }}
          />
          <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
          <div className="absolute inset-0 border border-blue-400/30 rounded-full" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }} />
        </div>
      </div>

      {/* Right side orb (partial) */}
      <div className="absolute right-6 md:right-20 top-1/3 z-0 hidden md:block">
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-40" />
          <div className="absolute inset-2 bg-gradient-to-br from-purple-400/50 to-blue-400/50 rounded-full" />
        </div>
      </div>

      {/* Main Content - Centered */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 md:py-20">
        {/* Purple Badge */}
        <div className="mb-6 md:mb-8 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-md animate-fade-in">
          <span className="text-white text-xs md:text-sm font-semibold tracking-widest">RETROACTIVE TOKEN GRANTS</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white text-center mb-4 md:mb-6 leading-tight text-balance animate-fade-in animation-delay-100">
          The{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 italic">
            &lt;Encrypted&gt;
          </span>{' '}
          Future is built for you
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-base md:text-lg lg:text-xl text-center mb-8 md:mb-12 max-w-2xl text-pretty animate-fade-in animation-delay-200">
          Contribute to activities under consideration for RTGs and grow alongside Arcium and its
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center animate-fade-in animation-delay-200">
          <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base md:text-lg rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
            SEE OPPORTUNITIES &gt;&gt;
          </button>
          <button className="px-6 md:px-8 py-3 md:py-4 border-2 border-purple-500/50 text-purple-400 font-semibold text-base md:text-lg rounded-lg hover:bg-purple-500/10 hover:border-purple-500/80 transition-all duration-200">
            READ ABOUT RTGS
          </button>
        </div>
      </main>
    </div>
  );
}
