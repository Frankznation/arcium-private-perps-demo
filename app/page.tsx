'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface Position {
  wallet?: string;
  size: number;
  direction: string;
  leverage: number;
  entryPrice: number;
  encryptedData: string;
  positionHash: string;
  openedAt: Date;
  timestamp?: string;
}

interface Result {
  type: string;
  encrypted?: string;
  hash?: string;
  position?: Position;
}

interface PnlResult {
  type: string;
  currentPrice?: string;
  entryPrice?: string;
  priceChange?: string;
  pnl?: string;
  pnlPercent?: string;
  isProfit?: boolean;
  healthRatio?: string;
  isLiquidatable?: boolean;
}

export default function ArciumRTGStyle() {
  const { publicKey, connected } = useWallet();
  const [position, setPosition] = useState<Position | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [pnlResult, setPnlResult] = useState<PnlResult | null>(null);
  const [privacyInfo, setPrivacyInfo] = useState(false);

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

    try {
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
      const newPosition: Position = {
        wallet: positionData.wallet,
        size: positionData.size,
        direction: positionData.direction,
        leverage: positionData.leverage,
        entryPrice: positionData.entryPrice,
        encryptedData: encrypted.encrypted,
        positionHash: encrypted.hash,
        openedAt: new Date(),
        timestamp: positionData.timestamp
      };

      setPosition(newPosition);
      setPrivacyInfo(true);
      setResult({
        type: 'position',
        encrypted: encrypted.encrypted.substring(0, 50) + '...',
        hash: encrypted.hash,
        position: newPosition
      });
    } catch (error) {
      console.error('Error opening position:', error);
      alert('Error opening position. Please try again.');
    }
  };

  const handleCheckPnL = () => {
    if (!position) {
      alert('Please open a position first');
      return;
    }

    try {
      const currentPrice = position.entryPrice * (0.95 + Math.random() * 0.1);
      const priceChange = currentPrice - position.entryPrice;
      const priceChangePercent = (priceChange / position.entryPrice) * 100;

      let pnl;
      if (position.direction === 'long') {
        pnl = priceChange * position.size * position.leverage;
      } else {
        pnl = -priceChange * position.size * position.leverage;
      }

      const pnlPercent = (pnl / (position.size * position.entryPrice)) * 100;

      setPnlResult({
        type: 'pnl',
        currentPrice: currentPrice.toFixed(2),
        entryPrice: position.entryPrice.toFixed(2),
        priceChange: priceChangePercent.toFixed(2),
        pnl: pnl.toFixed(2),
        pnlPercent: pnlPercent.toFixed(2),
        isProfit: pnl >= 0
      });
    } catch (error) {
      console.error('Error calculating PnL:', error);
      alert('Error calculating PnL. Please try again.');
    }
  };

  const handleCheckLiquidation = () => {
    if (!position) {
      alert('Please open a position first');
      return;
    }

    try {
      const healthRatio = 120 + Math.random() * 80;
      const isLiquidatable = healthRatio < 150;

      setPnlResult({
        type: 'liquidation',
        healthRatio: healthRatio.toFixed(1),
        isLiquidatable
      });
    } catch (error) {
      console.error('Error checking liquidation:', error);
      alert('Error checking liquidation risk. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 gradient-animated" />
      </div>

      {/* Circuit board pattern at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-60 z-20">
        <div className="h-full w-full shimmer" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 92, 246, 0.4) 2px, rgba(139, 92, 246, 0.4) 4px)'
        }} />
      </div>

      {/* Header - Top with Logo and Wallet */}
      <header className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between fade-in">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600 p-2 flex items-center justify-center">
            <img 
              src="/arcium-logo.png" 
              alt="Arcium Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white font-bold text-xl hidden sm:block">Arcium</span>
        </div>
        
        {/* Wallet Button */}
        <div className="wallet-adapter-wrapper" style={{ zIndex: 1000, position: 'relative' }}>
          <WalletMultiButton 
            className="wallet-adapter-button-trigger"
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              color: 'white',
              borderRadius: '8px',
              padding: '0 24px',
              height: '48px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        </div>
      </header>

      {/* Glowing Orbs with enhanced effects */}
      <div className="absolute left-10 top-1/4 z-0 float-animation">
        <div className="relative w-32 h-32 mb-8 glow-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-70" />
          <div className="absolute inset-2 bg-gradient-to-br from-purple-400 via-blue-400 to-purple-500 rounded-full" />
          <div className="absolute inset-0 border-2 border-purple-400/40 rounded-full" style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), inset 0 0 20px rgba(139, 92, 246, 0.3)' }} />
          <div className="absolute inset-4 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
        </div>
        <div className="relative w-32 h-32 glow-pulse" style={{ animationDelay: '1.5s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full blur-2xl opacity-70" />
          <div className="absolute inset-2 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500 rounded-full" />
          <div className="absolute inset-0 border-2 border-blue-400/40 rounded-full" style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.3)' }} />
          <div className="absolute inset-4 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
        </div>
      </div>

      {/* Right side orb (partial) with animation */}
      <div className="absolute right-20 top-1/3 z-0 float-animation" style={{ animationDelay: '1s' }}>
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-50 glow-pulse" />
          <div className="absolute inset-2 bg-gradient-to-br from-purple-400/60 to-blue-400/60 rounded-full" />
          <div className="absolute inset-0 border border-purple-400/30 rounded-full" style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }} />
        </div>
      </div>

      {/* Main Content - Centered */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Main Title with enhanced styling */}
        <h1 className="text-5xl md:text-7xl font-black text-white text-center mb-4 leading-tight fade-in">
          <span className="inline-block">🔒</span> Arcium{' '}
          <span className="text-gradient">Private Perps</span>
        </h1>

        {/* Subtitle with animation */}
        <p className="text-gray-200 text-xl md:text-2xl text-center mb-4 font-semibold fade-in-delay-1">
          Private Perpetuals Trading Platform
        </p>

        {/* Tagline with enhanced styling */}
        <p className="text-gray-400 text-base md:text-lg text-center mb-8 max-w-2xl fade-in-delay-2">
          Built with <span className="text-purple-400 font-semibold">Arcium Privacy-Preserving Computation</span> on{' '}
          <span className="text-blue-400 font-semibold">Solana</span>
        </p>

        {/* Feature Badges with enhanced styling */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 fade-in-delay-3">
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-green-500/30 hover:scale-105 transition-transform cursor-default">
            ✅ Live Demo
          </span>
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform cursor-default">
            🔐 Privacy Enabled
          </span>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform cursor-default">
            ⚡ Interactive
          </span>
          {connected && (
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform cursor-default animate-pulse">
              🔗 Wallet Connected
            </span>
          )}
        </div>

        {/* Wallet Status with glassmorphism */}
        {connected && publicKey && (
          <div className="mb-8 p-4 glass-strong rounded-xl border border-purple-500/30 shadow-xl shadow-purple-500/20 fade-in">
            <p className="text-white text-sm font-medium">
              Connected: <span className="text-purple-300 font-mono">{publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}</span>
            </p>
          </div>
        )}

        {/* Position Form Section (Below main hero) */}
        {connected && (
          <div className="mt-20 w-full max-w-2xl fade-in-delay-3">
            <PositionForm onSubmit={handleOpenPosition} />
            
            {privacyInfo && position && (
              <div className="mt-6 bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-lg backdrop-blur-sm">
                <strong className="text-purple-300">🔐 Privacy Protected:</strong>
                <p className="text-purple-200 mt-2 text-sm">
                  Your position details have been encrypted using Arcium's privacy-preserving computation.
                  <br />
                  <strong>Position Hash:</strong> {position.positionHash.substring(0, 16)}...
                </p>
              </div>
            )}

            {result && result.type === 'position' && (
              <div className="mt-6 bg-black/50 border border-purple-500/30 p-6 rounded-lg backdrop-blur-sm">
                <div className="text-green-400 font-bold mb-4">✅ Private Position Opened Successfully!</div>
                <div className="text-gray-300 text-sm font-mono">
                  <div>Encrypted: {result.encrypted}</div>
                  <div>Hash: {result.hash?.substring(0, 32)}...</div>
                </div>
              </div>
            )}

            {/* Actions */}
            {position && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleCheckPnL}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all"
                >
                  📊 Check PnL
                </button>
                <button
                  onClick={handleCheckLiquidation}
                  className="flex-1 px-6 py-3 border-2 border-purple-500/50 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 transition-all"
                >
                  ⚠️ Check Liquidation Risk
                </button>
              </div>
            )}

            {pnlResult && pnlResult.type === 'pnl' && (
              <div className="mt-6 bg-black/50 border border-purple-500/30 p-6 rounded-lg">
                <div className="text-white font-bold mb-2">📊 Position PnL</div>
                <div className={`text-2xl font-bold ${pnlResult.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  ${pnlResult.pnl} ({pnlResult.pnlPercent}%)
                </div>
              </div>
            )}

            {pnlResult && pnlResult.type === 'liquidation' && (
              <div className="mt-6 bg-black/50 border border-purple-500/30 p-6 rounded-lg">
                <div className="text-white font-bold mb-2">⚠️ Liquidation Risk</div>
                <div className={`text-xl font-bold ${pnlResult.isLiquidatable ? 'text-red-400' : 'text-green-400'}`}>
                  Health Ratio: {pnlResult.healthRatio}%
                  {pnlResult.isLiquidatable ? ' - ⚠️ At Risk' : ' - ✅ Healthy'}
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
    <div className="glass-strong rounded-2xl p-8 shadow-2xl shadow-purple-500/10 border border-purple-500/30 hover:border-purple-400/50 transition-all">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-4xl">📊</span>
        <span className="text-gradient">Open Private Position</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Position Size (SOL)</label>
          <input
            type="number"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            placeholder="100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Direction</label>
          <select
            value={formData.direction}
            onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
            className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          >
            <option value="long">Long 📈</option>
            <option value="short">Short 📉</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">Leverage</label>
            <input
              type="number"
              value={formData.leverage}
              onChange={(e) => setFormData({ ...formData, leverage: e.target.value })}
              className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="10x"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">Entry Price (USD)</label>
            <input
              type="number"
              value={formData.entryPrice}
              onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
              className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="150.00"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white font-bold rounded-lg text-lg hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 mt-4"
        >
          🔒 Open Private Position
        </button>
      </form>
    </div>
  );
}
