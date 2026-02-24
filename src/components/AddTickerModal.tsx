import { useState } from 'react';

interface AddTickerModalProps {
  onAdd: (symbol: string) => void;
  onClose: () => void;
}

export function AddTickerModal({ onAdd, onClose }: AddTickerModalProps) {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onAdd(symbol.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#0d1117] border border-[#1a2332] rounded-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[#1a2332] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00ff88] rounded-full animate-pulse" />
            <h2 className="text-sm md:text-base font-bold tracking-wider text-[#e6e6e6]">ADD TICKER</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 md:w-8 md:h-8 flex items-center justify-center text-[#5a6a7a] hover:text-[#e6e6e6] hover:bg-[#1a2332] rounded transition-all min-w-[44px] min-h-[44px]"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <label className="block text-[10px] md:text-xs text-[#5a6a7a] mb-2 tracking-wider">
              TICKER SYMBOL
            </label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="e.g., AAPL, NVDA, TSLA"
              className="w-full px-3 md:px-4 py-3 md:py-3 bg-[#0a0e14] border border-[#2a3a4a] rounded-lg text-[#e6e6e6] placeholder-[#3a4a5a] focus:border-[#00ff88] focus:outline-none focus:ring-1 focus:ring-[#00ff88]/50 font-mono text-sm md:text-base"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-[#1a2332] border border-[#2a3a4a] text-[#5a6a7a] hover:text-[#e6e6e6] hover:border-[#3a4a5a] rounded-lg transition-all text-xs md:text-sm font-medium min-h-[44px]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={!symbol.trim()}
              className="flex-1 px-4 py-3 bg-[#00ff88]/10 border border-[#00ff88]/50 text-[#00ff88] hover:bg-[#00ff88]/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all text-xs md:text-sm font-medium min-h-[44px]"
            >
              ADD TO WATCHLIST
            </button>
          </div>
        </form>

        {/* Quick Add */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-[#1a2332] bg-[#0a0e14]/50">
          <p className="text-[10px] md:text-xs text-[#5a6a7a] mb-2 md:mb-3">QUICK ADD:</p>
          <div className="flex flex-wrap gap-2">
            {['SPY', 'QQQ', 'IWM', 'DIA', 'VIX'].map(ticker => (
              <button
                key={ticker}
                type="button"
                onClick={() => {
                  setSymbol(ticker);
                  onAdd(ticker);
                }}
                className="px-3 py-2 text-[10px] md:text-xs bg-[#1a2332] border border-[#2a3a4a] text-[#5a6a7a] hover:text-[#e6e6e6] hover:border-[#00ff88]/50 rounded transition-all min-h-[44px] md:min-h-0"
              >
                {ticker}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
