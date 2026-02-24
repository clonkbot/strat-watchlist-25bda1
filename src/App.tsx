import { useState, useEffect } from 'react';
import { WatchlistTable } from './components/WatchlistTable';
import { TimeframeContinuity } from './components/TimeframeContinuity';
import { SetupScanner } from './components/SetupScanner';
import { AddTickerModal } from './components/AddTickerModal';
import { StratLegend } from './components/StratLegend';

export interface TickerData {
  symbol: string;
  price: number;
  change: number;
  monthly: '1' | '2U' | '2D' | '3';
  weekly: '1' | '2U' | '2D' | '3';
  daily: '1' | '2U' | '2D' | '3';
  hourly: '1' | '2U' | '2D' | '3';
  trigger?: string;
  ftfc: boolean;
  magnitude: number;
}

const generateMockData = (): TickerData[] => [
  { symbol: 'SPY', price: 542.87, change: 1.23, monthly: '2U', weekly: '2U', daily: '2U', hourly: '1', ftfc: true, magnitude: 85, trigger: 'Bullish Continuation' },
  { symbol: 'QQQ', price: 462.15, change: -0.45, monthly: '2U', weekly: '2D', daily: '3', hourly: '2D', ftfc: false, magnitude: 62, trigger: '3-2-2 Reversal' },
  { symbol: 'AAPL', price: 189.43, change: 2.15, monthly: '1', weekly: '2U', daily: '2U', hourly: '2U', ftfc: true, magnitude: 78, trigger: '1-2-2 Breakout' },
  { symbol: 'NVDA', price: 875.32, change: -3.21, monthly: '2U', weekly: '3', daily: '2D', hourly: '1', ftfc: false, magnitude: 45, trigger: 'Inside Bar' },
  { symbol: 'TSLA', price: 248.67, change: 4.56, monthly: '2D', weekly: '2U', daily: '3', hourly: '2U', ftfc: false, magnitude: 55, trigger: '3-2 Reversal' },
  { symbol: 'AMZN', price: 178.92, change: 0.89, monthly: '2U', weekly: '2U', daily: '1', hourly: '1', ftfc: true, magnitude: 72, trigger: 'Coiling' },
  { symbol: 'META', price: 485.23, change: -1.67, monthly: '2U', weekly: '2U', daily: '2D', hourly: '2D', ftfc: false, magnitude: 58 },
  { symbol: 'MSFT', price: 415.78, change: 1.02, monthly: '2U', weekly: '1', daily: '2U', hourly: '2U', ftfc: true, magnitude: 81, trigger: 'Broadening Breakout' },
  { symbol: 'AMD', price: 156.45, change: -2.34, monthly: '2U', weekly: '2D', daily: '2D', hourly: '3', ftfc: false, magnitude: 38 },
  { symbol: 'GOOGL', price: 174.21, change: 0.56, monthly: '1', weekly: '1', daily: '1', hourly: '1', ftfc: true, magnitude: 92, trigger: 'Triple Inside' },
];

function App() {
  const [watchlist, setWatchlist] = useState<TickerData[]>(generateMockData());
  const [selectedTicker, setSelectedTicker] = useState<TickerData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const scanTimer = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(scanTimer);
  }, []);

  const addTicker = (symbol: string) => {
    const patterns: Array<'1' | '2U' | '2D' | '3'> = ['1', '2U', '2D', '3'];
    const newTicker: TickerData = {
      symbol: symbol.toUpperCase(),
      price: Math.random() * 500 + 50,
      change: (Math.random() - 0.5) * 10,
      monthly: patterns[Math.floor(Math.random() * 4)],
      weekly: patterns[Math.floor(Math.random() * 4)],
      daily: patterns[Math.floor(Math.random() * 4)],
      hourly: patterns[Math.floor(Math.random() * 4)],
      ftfc: Math.random() > 0.5,
      magnitude: Math.floor(Math.random() * 100),
    };
    setWatchlist([...watchlist, newTicker]);
    setShowModal(false);
  };

  const removeTicker = (symbol: string) => {
    setWatchlist(watchlist.filter(t => t.symbol !== symbol));
    if (selectedTicker?.symbol === symbol) setSelectedTicker(null);
  };

  const ftfcCount = watchlist.filter(t => t.ftfc).length;
  const bullishCount = watchlist.filter(t => t.change > 0).length;

  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#e6e6e6] font-mono relative overflow-hidden">
      {/* Scan line effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: `linear-gradient(transparent ${scanLine}%, rgba(0, 255, 136, 0.03) ${scanLine + 0.5}%, transparent ${scanLine + 1}%)`
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <header className="border-b border-[#1a2332] bg-[#0d1117]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative">
                <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-[#00ff88] rotate-45 flex items-center justify-center">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-[#00ff88] -rotate-45" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-[#ff6b35] rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold tracking-wider text-[#00ff88]">
                  THE STRAT
                </h1>
                <p className="text-[10px] md:text-xs text-[#5a6a7a] tracking-widest">WATCHLIST COMMAND CENTER</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6 text-xs">
              <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-[#1a2332] border border-[#2a3a4a] rounded">
                <span className="text-[#5a6a7a]">MARKET:</span>
                <span className="text-[#00ff88] animate-pulse">LIVE</span>
              </div>
              <div className="hidden sm:block text-[#5a6a7a] font-mono tabular-nums">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="px-3 md:px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/50 text-[#00ff88] hover:bg-[#00ff88]/20 transition-all duration-200 rounded text-xs md:text-sm min-h-[44px] flex items-center"
              >
                + ADD TICKER
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="border-b border-[#1a2332] bg-[#0d1117]/50">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-2 md:py-3">
          <div className="flex items-center gap-3 md:gap-8 text-xs overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[#5a6a7a]">TRACKING:</span>
              <span className="text-[#e6e6e6] font-bold">{watchlist.length}</span>
            </div>
            <div className="w-px h-4 bg-[#2a3a4a] shrink-0" />
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[#5a6a7a]">FTFC:</span>
              <span className="text-[#00ff88] font-bold">{ftfcCount}</span>
            </div>
            <div className="w-px h-4 bg-[#2a3a4a] shrink-0" />
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[#5a6a7a]">BULLISH:</span>
              <span className="text-[#00ff88] font-bold">{bullishCount}</span>
            </div>
            <div className="w-px h-4 bg-[#2a3a4a] shrink-0" />
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[#5a6a7a]">BEARISH:</span>
              <span className="text-[#ff4757] font-bold">{watchlist.length - bullishCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
          {/* Left Column - Main Table */}
          <div className="xl:col-span-8 space-y-4 md:space-y-6">
            <WatchlistTable
              data={watchlist}
              onSelect={setSelectedTicker}
              selected={selectedTicker}
              onRemove={removeTicker}
            />
            <SetupScanner data={watchlist} />
          </div>

          {/* Right Column - Analysis */}
          <div className="xl:col-span-4 space-y-4 md:space-y-6">
            <TimeframeContinuity selected={selectedTicker} />
            <StratLegend />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1a2332] bg-[#0d1117]/50 mt-8">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-4">
          <p className="text-center text-[10px] md:text-xs text-[#3a4a5a] tracking-wide">
            Requested by @davionbr · Built by @clonkbot
          </p>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <AddTickerModal
          onAdd={addTicker}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
