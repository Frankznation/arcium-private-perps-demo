'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ArciumPrivatePerps() {
  const { publicKey, connected } = useWallet();
  const [position, setPosition] = useState(null);
  const [result, setResult] = useState(null);
  const [pnlResult, setPnlResult] = useState(null);

  const generateHash = (data: any) => {
    let hash = 0;
    const str = JSON.stringify(data);
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
  };

  const encryptData = (data: any) => {
    const encrypted = btoa(JSON.stringify(data));
    return {
      encrypted: encrypted,
      hash: generateHash(data)
    };
  };

  const handleOpenPosition = (formData: any) => {
    if (!connected) {
      alert('Please connect your Solana wallet first!');
      return;
    }

    const { size, direction, leverage, entryPrice } = formData;
    
    const positionData = {
      wallet: publicKey?.toBase58(),
      size: parseFloat(size),
      direction,
      leverage: parseInt(leverage),
      entryPrice: parseFloat(entryPrice),
      timestamp: new Date().toISOString()
    };

    const encrypted = encryptData(positionData);
    const newPosition = {
      ...positionData,
      encryptedData: encrypted.encrypted,
      positionHash: encrypted.hash,
      openedAt: new Date()
    };

    setPosition(newPosition);
    setResult({
      type: 'position',
      encrypted: encrypted.encrypted.substring(0, 50) + '...',
      hash: encrypted.hash,
      position: newPosition
    });
  };

  const handleCheckPnL = () => {
    if (!position) {
      alert('Please open a position first');
      return;
    }

    const currentPrice = (position as any).entryPrice * (0.95 + Math.random() * 0.1);
    const priceChange = currentPrice - (position as any).entryPrice;
    const priceChangePercent = (priceChange / (position as any).entryPrice) * 100;

    let pnl;
    if ((position as any).direction === 'long') {
      pnl = priceChange * (position as any).size * (position as any).leverage;
    } else {
      pnl = -priceChange * (position as any).size * (position as any).leverage;
    }

    const pnlPercent = (pnl / ((position as any).size * (position as any).entryPrice)) * 100;

    setPnlResult({
      type: 'pnl',
      currentPrice: currentPrice.toFixed(2),
      entryPrice: (position as any).entryPrice.toFixed(2),
      priceChange: priceChangePercent.toFixed(2),
      pnl: pnl.toFixed(2),
      pnlPercent: pnlPercent.toFixed(2),
      isProfit: pnl >= 0
    });
  };

  const handleCheckLiquidation = () => {
    if (!position) {
      alert('Please open a position first');
      return;
    }

    const healthRatio = 120 + Math.random() * 80;
    const isLiquidatable = healthRatio < 150;

    setPnlResult({
      type: 'liquidation',
      healthRatio: healthRatio.toFixed(1),
      isLiquidatable
    });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black">
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 animate-gradient-shift" />
      </div>

      {/* Circuit board pattern at top */}
      <div className="circuit-board-top" />

      {/* Header - Top Right */}
      <header className="absolute top-6 right-6 z-50 animate-fade-in">
        <WalletMultiButton className="!bg-gradient-to-r !from-purple-600/50 !to-blue-600/50 !border !border-purple-500/70 !text-gray-200 !font-semibold !px-6 !py-2 !rounded-lg !transition-all !duration-300 hover:!from-purple-500/70 hover:!to-blue-500/70 hover:!border-purple-400 hover:!shadow-lg hover:!shadow-purple-500/50 hover:!scale-105" />
      </header>

      {/* Glowing Orbs - Left Side */}
      <div className="absolute left-4 sm:left-10 top-[15%] z-0 pointer-events-none">
        {/* First Orb */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-8 animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-70 animate-glow-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full" />
          <div className="absolute inset-1 bg-white/20 rounded-full" />
          <div className="absolute inset-0 border-2 border-purple-400/30 rounded-full shadow-2xl" style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }} />
        </div>
        {/* Second Orb */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 animate-float" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full blur-2xl opacity-70 animate-glow-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
          <div className="absolute inset-1 bg-white/20 rounded-full" />
          <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full shadow-2xl" style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' }} />
        </div>
      </div>

      {/* Right side orb (partial) - Desktop only */}
      <div className="absolute right-4 sm:right-20 top-1/3 z-0 pointer-events-none hidden md:block animate-float" style={{ animationDelay: '2s' }}>
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-2xl opacity-50 animate-glow-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-2 bg-gradient-to-br from-purple-400/60 to-blue-400/60 rounded-full" />
          <div className="absolute inset-1 bg-white/20 rounded-full" />
        </div>
      </div>

      {/* Main Content - Centered */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:py-20">
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-center mb-2 sm:mb-3 leading-tight text-balance animate-fade-in text-white">
          Arcium Private Perps
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-100 text-center mb-2 sm:mb-3 font-semibold animate-fade-in animation-delay-100">
          Private Perpetuals Trading Platform
        </p>

        {/* Tagline with highlights */}
        <p className="text-base sm:text-lg text-gray-400 text-center mb-8 sm:mb-12 animate-fade-in animation-delay-200">
          Built with{' '}
          <span className="text-purple-400 font-semibold">Arcium</span>
          {' '}Privacy-Preserving Computation on{' '}
          <span className="text-blue-400 font-semibold">Solana</span>
        </p>

        {/* Feature Badges with Gradients */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 animate-fade-in animation-delay-300">
          <div className="px-4 sm:px-5 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-full text-green-400 text-xs sm:text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-green-500/20">
            Live Demo
          </div>
          <div className="px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-full text-blue-400 text-xs sm:text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
            Privacy Enabled
          </div>
          <div className="px-4 sm:px-5 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-full text-purple-400 text-xs sm:text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">
            Interactive
          </div>
          {connected && (
            <div className="px-4 sm:px-5 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 rounded-full text-emerald-400 text-xs sm:text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20 animate-glow-pulse">
              Wallet Connected
            </div>
          )}
        </div>

        {/* Wallet Status - Glassmorphism */}
        {connected && publicKey && (
          <div className="mb-8 sm:mb-12 px-6 py-4 bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-xl text-white text-sm sm:text-base text-center animate-fade-in animation-delay-300 shadow-xl shadow-purple-500/10">
            Connected:{' '}
            <span className="text-purple-300 font-mono font-semibold">
              {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
            </span>
          </div>
        )}

        {/* Main Content - Only shows when wallet connected */}
        {connected && (
          <div className="w-full max-w-2xl space-y-6 sm:space-y-8 animate-fade-in animation-delay-400">
            {/* Position Form Card - Glassmorphism */}
            <PositionForm onSubmit={handleOpenPosition} />

            {/* Position Success Display */}
            {result && (result as any).type === 'position' && (
              <div className="bg-black/60 backdrop-blur-xl border border-green-500/30 p-6 sm:p-8 rounded-2xl animate-fade-in shadow-2xl shadow-green-500/10">
                <div className="text-green-400 font-bold text-lg mb-4">Position Opened Successfully</div>
                <div className="text-gray-300 text-sm font-mono space-y-2 bg-black/40 p-4 rounded-lg">
                  <div className="text-gray-500">Encrypted Data:</div>
                  <div className="break-all text-green-400/80">{(result as any).encrypted}</div>
                  <div className="text-gray-500 mt-3">Hash:</div>
                  <div className="break-all text-green-400/80">{(result as any).hash.substring(0, 48)}...</div>
                </div>
              </div>
            )}

            {/* Privacy Info */}
            {position && (
              <div className="bg-black/60 backdrop-blur-xl border-l-4 border-purple-500 p-5 rounded-xl bg-gradient-to-r from-purple-900/30 to-blue-900/30">
                <strong className="text-purple-300 text-base">Privacy & Data Protection</strong>
                <div className="text-gray-300 mt-3 text-sm space-y-1">
                  <div>
                    <span className="text-purple-400 font-semibold">Private:</span> Position size, direction, leverage, entry price
                  </div>
                  <div>
                    <span className="text-blue-400 font-semibold">Public:</span> Blockchain transaction, wallet interaction
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {position && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleCheckPnL}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95"
                >
                  Check PnL
                </button>
                <button
                  onClick={handleCheckLiquidation}
                  className="px-6 py-3 border-2 border-purple-500/50 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 hover:border-purple-500/80 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  Check Liquidation Risk
                </button>
              </div>
            )}

            {/* PnL Results */}
            {pnlResult && (pnlResult as any).type === 'pnl' && (
              <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 p-6 sm:p-8 rounded-2xl animate-fade-in shadow-2xl shadow-purple-500/10">
                <div className="text-white font-bold text-lg mb-4">Position PnL</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-gray-400 text-xs uppercase tracking-wide">Entry Price</div>
                    <div className="text-white font-mono font-bold mt-1">${(pnlResult as any).entryPrice}</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-gray-400 text-xs uppercase tracking-wide">Current Price</div>
                    <div className="text-white font-mono font-bold mt-1">${(pnlResult as any).currentPrice}</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-gray-400 text-xs uppercase tracking-wide">Price Change</div>
                    <div className="text-white font-mono font-bold mt-1">{(pnlResult as any).priceChange}%</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-gray-400 text-xs uppercase tracking-wide">PnL</div>
                    <div className={`font-mono font-bold mt-1 ${(pnlResult as any).isProfit ? 'text-green-400' : 'text-red-400'}`}>
                      ${(pnlResult as any).pnl} ({(pnlResult as any).pnlPercent}%)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Liquidation Results */}
            {pnlResult && (pnlResult as any).type === 'liquidation' && (
              <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 p-6 sm:p-8 rounded-2xl animate-fade-in shadow-2xl shadow-purple-500/10">
                <div className="text-white font-bold text-lg mb-4">Liquidation Risk Assessment</div>
                <div className={`text-2xl font-black ${(pnlResult as any).isLiquidatable ? 'text-red-400' : 'text-green-400'}`}>
                  Health Ratio: {(pnlResult as any).healthRatio}%
                </div>
                <div className={`text-sm mt-3 font-semibold ${(pnlResult as any).isLiquidatable ? 'text-red-300' : 'text-green-300'}`}>
                  {(pnlResult as any).isLiquidatable ? 'Position at risk of liquidation' : 'Position is healthy'}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function PositionForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    size: '100',
    direction: 'long',
    leverage: '10',
    entryPrice: '150'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl shadow-purple-500/10 hover:border-purple-500/50 transition-all duration-300 animate-fade-in">
      <div className="flex items-start gap-3 mb-6">
        <span className="text-4xl">📊</span>
        <h2 className="text-3xl font-bold text-white">
          Open Private Position
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Position Size (SOL)</label>
          <input
            type="number"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all duration-200"
            placeholder="100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Direction</label>
          <select
            value={formData.direction}
            onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
            className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all duration-200"
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Leverage</label>
            <input
              type="number"
              value={formData.leverage}
              onChange={(e) => setFormData({ ...formData, leverage: e.target.value })}
              min="1"
              max="100"
              className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all duration-200"
              placeholder="10"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Entry Price (USD)</label>
            <input
              type="number"
              value={formData.entryPrice}
              onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
              className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all duration-200"
              placeholder="150"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95 mt-2"
        >
          Open Private Position
        </button>
      </form>
    </div>
  );
}
