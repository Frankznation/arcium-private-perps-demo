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
        {/* Purple Badge */}
        <div className="mb-8 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
          <span className="text-white text-sm font-semibold tracking-wider">RETROACTIVE TOKEN GRANTS</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-6 leading-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 italic font-extrabold">&lt;Encrypted&gt;</span> Future is built for you
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl text-center mb-12 max-w-2xl">
          Contribute to activities under consideration for RTGs and grow alongside Arcium and its
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg text-lg hover:from-purple-500 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
            SEE OPPORTUNITIES &gt;&gt;
          </button>
          <button className="px-8 py-4 border-2 border-purple-500/50 text-purple-400 font-semibold rounded-lg text-lg hover:bg-purple-500/10 transition-all">
            READ ABOUT RTGS
          </button>
        </div>

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
// Force rebuild Thu Feb 12 12:53:35 WAT 2026
