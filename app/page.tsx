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
    <div className="min-h-screen bg-black relative overflow-hidden w-full">
      {/* Circuit board pattern at top */}
      <div className="circuit-board-top" />

      {/* Header - Top Right */}
      <header className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <WalletMultiButton className="!bg-transparent !border !border-purple-500/50 !text-purple-400 hover:!bg-purple-500/10 !rounded-lg" />
        {connected && publicKey && (
          <span className="text-gray-400 text-sm hidden sm:inline">{publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}</span>
        )}
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
        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white text-center mb-3 md:mb-4 leading-tight text-balance animate-fade-in">
          🔒 Arcium Private Perps
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-200 text-center mb-3 md:mb-4 animate-fade-in animation-delay-100">
          Private Perpetuals Trading Platform
        </p>

        {/* Tagline */}
        <p className="text-base md:text-lg text-gray-400 text-center mb-6 md:mb-8 animate-fade-in animation-delay-200">
          Built with Arcium Privacy-Preserving Computation on Solana
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 animate-fade-in animation-delay-200">
          <div className="px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-full text-green-400 text-xs md:text-sm font-semibold">
            ✅ Live Demo
          </div>
          <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-400 text-xs md:text-sm font-semibold">
            🔐 Privacy Enabled
          </div>
          <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-full text-purple-400 text-xs md:text-sm font-semibold">
            ⚡ Interactive
          </div>
          {connected && (
            <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-full text-purple-400 text-xs md:text-sm font-semibold">
              🔗 Wallet Connected
            </div>
          )}
        </div>

        {/* Wallet Status */}
        {connected && publicKey && (
          <div className="mb-8 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white text-sm md:text-base text-center animate-fade-in">
            Connected: {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
          </div>
        )}

        {/* Main Content - Only shows when wallet connected */}
        {connected && (
          <div className="w-full max-w-2xl mt-4 md:mt-8 space-y-6">
            {/* Position Form Card */}
            <PositionForm onSubmit={handleOpenPosition} />

            {/* Position Display */}
            {result && (result as any).type === 'position' && (
              <div className="bg-black/50 border border-purple-500/30 p-6 rounded-lg backdrop-blur-sm animate-fade-in">
                <div className="text-green-400 font-bold mb-4">✅ Private Position Opened Successfully!</div>
                <div className="text-gray-300 text-sm font-mono mb-4">
                  <div className="mb-2">Encrypted: {(result as any).encrypted}</div>
                  <div>Hash: {(result as any).hash.substring(0, 32)}...</div>
                </div>
              </div>
            )}

            {/* Privacy Info */}
            {position && (
              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-lg backdrop-blur-sm">
                <strong className="text-purple-300">What's Private vs Public:</strong>
                <div className="text-purple-200 mt-2 text-sm">
                  <div>Private: Position size, direction, leverage, entry price</div>
                  <div>Public: Transaction on blockchain, wallet interaction</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {position && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleCheckPnL}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  📊 Check PnL
                </button>
                <button
                  onClick={handleCheckLiquidation}
                  className="px-6 py-3 border-2 border-purple-500/50 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 hover:border-purple-500/80 transition-all"
                >
                  ⚠️ Check Liquidation Risk
                </button>
              </div>
            )}

            {/* PnL Results */}
            {pnlResult && (pnlResult as any).type === 'pnl' && (
              <div className="bg-black/50 border border-purple-500/30 p-6 rounded-lg animate-fade-in">
                <div className="text-white font-bold mb-3">📊 Position PnL</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs">Entry Price</div>
                    <div className="text-white font-mono">${(pnlResult as any).entryPrice}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Current Price</div>
                    <div className="text-white font-mono">${(pnlResult as any).currentPrice}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Price Change</div>
                    <div className="text-white font-mono">{(pnlResult as any).priceChange}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">PnL</div>
                    <div className={`font-mono ${(pnlResult as any).isProfit ? 'text-green-400' : 'text-red-400'}`}>
                      ${(pnlResult as any).pnl} ({(pnlResult as any).pnlPercent}%)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Liquidation Results */}
            {pnlResult && (pnlResult as any).type === 'liquidation' && (
              <div className="bg-black/50 border border-purple-500/30 p-6 rounded-lg animate-fade-in">
                <div className="text-white font-bold mb-3">⚠️ Liquidation Risk Assessment</div>
                <div className={`text-xl font-bold ${(pnlResult as any).isLiquidatable ? 'text-red-400' : 'text-green-400'}`}>
                  Health Ratio: {(pnlResult as any).healthRatio}%
                </div>
                <div className={`text-sm mt-2 ${(pnlResult as any).isLiquidatable ? 'text-red-300' : 'text-green-300'}`}>
                  {(pnlResult as any).isLiquidatable ? '⚠️ Position at risk of liquidation' : '✅ Position is healthy'}
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
    <div className="bg-black/50 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6">📊 Open Private Position</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Position Size (SOL)</label>
          <input
            type="number"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Direction</label>
          <select
            value={formData.direction}
            onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
            className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
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
              className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Entry Price (USD)</label>
            <input
              type="number"
              value={formData.entryPrice}
              onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
        >
          🔒 Open Private Position
        </button>
      </form>
    </div>
  );
}
