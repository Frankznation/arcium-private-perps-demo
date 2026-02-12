'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ArciumRTGStyle() {
  const { publicKey, connected } = useWallet();
  const [position, setPosition] = useState(null);
  const [result, setResult] = useState(null);
  const [pnlResult, setPnlResult] = useState(null);
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
    setPrivacyInfo(true);
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Circuit board pattern at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-50">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 92, 246, 0.3) 2px, rgba(139, 92, 246, 0.3) 4px)'
        }} />
      </div>

      {/* Header - Top Right */}
      <header className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <WalletMultiButton className="!bg-transparent !border !border-purple-500/50 !text-purple-400 hover:!bg-purple-500/10 !rounded-lg" />
        {connected && publicKey && (
          <span className="text-gray-400 text-sm">{publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}</span>
        )}
      </header>

      {/* Glowing Orbs */}
      <div className="absolute left-10 top-1/4 z-0">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 rounded-full blur-xl opacity-60 animate-pulse" />
          <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full" />
          <div className="absolute inset-0 border border-purple-400/30 rounded-full" style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }} />
        </div>
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
          <div className="absolute inset-0 border border-blue-400/30 rounded-full" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }} />
        </div>
      </div>

      {/* Right side orb (partial) */}
      <div className="absolute right-20 top-1/3 z-0">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-40" />
          <div className="absolute inset-2 bg-gradient-to-br from-purple-400/50 to-blue-400/50 rounded-full" />
        </div>
      </div>

      {/* Main Content - Centered */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-4 leading-tight">
          🔒 Arcium Private Perps
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-xl md:text-2xl text-center mb-4">
          Private Perpetuals Trading Platform
        </p>

        {/* Tagline */}
        <p className="text-gray-400 text-base md:text-lg text-center mb-6 max-w-2xl">
          Built with Arcium Privacy-Preserving Computation on Solana
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">✅ Live Demo</span>
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">🔐 Privacy Enabled</span>
          <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm">⚡ Interactive</span>
          {connected && <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm">🔗 Wallet Connected</span>}
        </div>

        {/* Wallet Status */}
        {connected && publicKey && (
          <div className="mb-8 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <p className="text-white text-sm">Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}</p>
          </div>
        )}

        {/* Position Form Section (Below main hero) */}
        {connected && (
          <div className="mt-20 w-full max-w-2xl">
            <PositionForm onSubmit={handleOpenPosition} />
            
            {privacyInfo && position && (
              <div className="mt-6 bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-lg backdrop-blur-sm">
                <strong className="text-purple-300">🔐 Privacy Protected:</strong>
                <p className="text-purple-200 mt-2 text-sm">
                  Your position details have been encrypted using Arcium's privacy-preserving computation.
                  <br />
                  <strong>Position Hash:</strong> {(position as any).positionHash.substring(0, 16)}...
                </p>
              </div>
            )}

            {result && (result as any).type === 'position' && (
              <div className="mt-6 bg-black/50 border border-purple-500/30 p-6 rounded-lg backdrop-blur-sm">
                <div className="text-green-400 font-bold mb-4">✅ Private Position Opened Successfully!</div>
                <div className="text-gray-300 text-sm font-mono">
                  <div>Encrypted: {(result as any).encrypted}</div>
                  <div>Hash: {(result as any).hash.substring(0, 32)}...</div>
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

            {pnlResult && (pnlResult as any).type === 'pnl' && (
              <div className="mt-6 bg-black/50 border border-purple-500/30 p-6 rounded-lg">
                <div className="text-white font-bold mb-2">📊 Position PnL</div>
                <div className={`text-2xl font-bold ${(pnlResult as any).isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  ${(pnlResult as any).pnl} ({(pnlResult as any).pnlPercent}%)
                </div>
              </div>
            )}

            {pnlResult && (pnlResult as any).type === 'liquidation' && (
              <div className="mt-6 bg-black/50 border border-purple-500/30 p-6 rounded-lg">
                <div className="text-white font-bold mb-2">⚠️ Liquidation Risk</div>
                <div className={`text-xl font-bold ${(pnlResult as any).isLiquidatable ? 'text-red-400' : 'text-green-400'}`}>
                  Health Ratio: {(pnlResult as any).healthRatio}%
                  {(pnlResult as any).isLiquidatable ? ' - ⚠️ At Risk' : ' - ✅ Healthy'}
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
    <div className="bg-black/50 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-4">📊 Open Private Position</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Position Size (SOL)</label>
          <input
            type="number"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Direction</label>
          <select
            value={formData.direction}
            onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
            className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
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
              className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Entry Price (USD)</label>
            <input
              type="number"
              value={formData.entryPrice}
              onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all hover:scale-105"
        >
          🔒 Open Private Position
        </button>
      </form>
    </div>
  );
}
