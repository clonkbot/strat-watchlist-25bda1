import { TickerData } from '../App';

interface WatchlistTableProps {
  data: TickerData[];
  onSelect: (ticker: TickerData) => void;
  selected: TickerData | null;
  onRemove: (symbol: string) => void;
}

const PatternBadge = ({ pattern }: { pattern: '1' | '2U' | '2D' | '3' }) => {
  const colors = {
    '1': 'bg-[#ffa502]/20 text-[#ffa502] border-[#ffa502]/50',
    '2U': 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/50',
    '2D': 'bg-[#ff4757]/20 text-[#ff4757] border-[#ff4757]/50',
    '3': 'bg-[#5f27cd]/20 text-[#a29bfe] border-[#5f27cd]/50',
  };

  return (
    <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-bold border rounded ${colors[pattern]}`}>
      {pattern}
    </span>
  );
};

export function WatchlistTable({ data, onSelect, selected, onRemove }: WatchlistTableProps) {
  return (
    <div className="bg-[#0d1117] border border-[#1a2332] rounded-lg overflow-hidden">
      <div className="px-3 md:px-4 py-2 md:py-3 border-b border-[#1a2332] flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00ff88] rounded-full animate-pulse" />
          <h2 className="text-xs md:text-sm font-bold tracking-wider text-[#e6e6e6]">ACTIVE WATCHLIST</h2>
        </div>
        <span className="text-[10px] md:text-xs text-[#5a6a7a]">{data.length} SYMBOLS</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-[10px] md:text-xs text-[#5a6a7a] border-b border-[#1a2332]">
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-medium">SYMBOL</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-right font-medium">PRICE</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-right font-medium">CHG%</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-center font-medium">M</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-center font-medium">W</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-center font-medium">D</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-center font-medium">H</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-center font-medium">FTFC</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-center font-medium">MAG</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-center font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((ticker, index) => (
              <tr
                key={ticker.symbol}
                onClick={() => onSelect(ticker)}
                className={`
                  border-b border-[#1a2332]/50 cursor-pointer transition-all duration-200
                  ${selected?.symbol === ticker.symbol ? 'bg-[#00ff88]/10' : 'hover:bg-[#1a2332]/50'}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-6 md:h-8 rounded-full ${ticker.ftfc ? 'bg-[#00ff88]' : 'bg-[#2a3a4a]'}`} />
                    <span className="font-bold text-sm md:text-base">{ticker.symbol}</span>
                  </div>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-right font-mono text-sm md:text-base tabular-nums">
                  ${ticker.price.toFixed(2)}
                </td>
                <td className={`px-2 md:px-4 py-2 md:py-3 text-right font-mono text-sm md:text-base tabular-nums ${ticker.change >= 0 ? 'text-[#00ff88]' : 'text-[#ff4757]'}`}>
                  {ticker.change >= 0 ? '+' : ''}{ticker.change.toFixed(2)}%
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                  <PatternBadge pattern={ticker.monthly} />
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                  <PatternBadge pattern={ticker.weekly} />
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                  <PatternBadge pattern={ticker.daily} />
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                  <PatternBadge pattern={ticker.hourly} />
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                  {ticker.ftfc ? (
                    <span className="text-[#00ff88] text-sm md:text-base">●</span>
                  ) : (
                    <span className="text-[#3a4a5a] text-sm md:text-base">○</span>
                  )}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="w-12 md:w-16 h-1.5 md:h-2 bg-[#1a2332] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          ticker.magnitude > 70 ? 'bg-[#00ff88]' :
                          ticker.magnitude > 40 ? 'bg-[#ffa502]' : 'bg-[#ff4757]'
                        }`}
                        style={{ width: `${ticker.magnitude}%` }}
                      />
                    </div>
                    <span className="text-[10px] md:text-xs text-[#5a6a7a] w-6 md:w-8 text-right tabular-nums">{ticker.magnitude}</span>
                  </div>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(ticker.symbol);
                    }}
                    className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[#5a6a7a] hover:text-[#ff4757] hover:bg-[#ff4757]/10 rounded transition-all min-w-[44px] min-h-[44px] md:min-w-[32px] md:min-h-[32px]"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="px-4 py-12 text-center text-[#5a6a7a]">
          <p className="text-sm">No tickers in watchlist</p>
          <p className="text-xs mt-1">Click "ADD TICKER" to get started</p>
        </div>
      )}
    </div>
  );
}
