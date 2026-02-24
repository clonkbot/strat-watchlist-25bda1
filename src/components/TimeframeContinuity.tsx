import { TickerData } from '../App';

interface TimeframeContinuityProps {
  selected: TickerData | null;
}

const TimeframeBar = ({
  label,
  pattern,
  active
}: {
  label: string;
  pattern: '1' | '2U' | '2D' | '3';
  active: boolean;
}) => {
  const getColor = () => {
    switch (pattern) {
      case '2U': return '#00ff88';
      case '2D': return '#ff4757';
      case '1': return '#ffa502';
      case '3': return '#a29bfe';
    }
  };

  const getLabel = () => {
    switch (pattern) {
      case '2U': return 'BULLISH';
      case '2D': return 'BEARISH';
      case '1': return 'INSIDE';
      case '3': return 'OUTSIDE';
    }
  };

  return (
    <div className={`transition-all duration-300 ${active ? 'opacity-100' : 'opacity-40'}`}>
      <div className="flex items-center justify-between mb-1 md:mb-2">
        <span className="text-[10px] md:text-xs text-[#5a6a7a] font-medium">{label}</span>
        <span
          className="text-[10px] md:text-xs font-bold"
          style={{ color: getColor() }}
        >
          {pattern} · {getLabel()}
        </span>
      </div>
      <div className="h-2 md:h-3 bg-[#1a2332] rounded-full overflow-hidden relative">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: pattern === '1' ? '50%' : pattern === '2U' || pattern === '2D' ? '75%' : '100%',
            backgroundColor: getColor(),
            boxShadow: active ? `0 0 10px ${getColor()}` : 'none',
          }}
        />
        {active && (
          <div
            className="absolute inset-y-0 right-0 w-1 animate-pulse"
            style={{ backgroundColor: getColor() }}
          />
        )}
      </div>
    </div>
  );
};

export function TimeframeContinuity({ selected }: TimeframeContinuityProps) {
  if (!selected) {
    return (
      <div className="bg-[#0d1117] border border-[#1a2332] rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="w-2 h-2 md:w-3 md:h-3 border-2 border-[#5a6a7a] rounded-full" />
          <h2 className="text-xs md:text-sm font-bold tracking-wider text-[#5a6a7a]">TIMEFRAME CONTINUITY</h2>
        </div>
        <div className="text-center py-8 md:py-12">
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 border-2 border-dashed border-[#2a3a4a] rounded-lg flex items-center justify-center">
            <span className="text-xl md:text-2xl text-[#3a4a5a]">◇</span>
          </div>
          <p className="text-xs md:text-sm text-[#5a6a7a]">Select a ticker to view</p>
          <p className="text-[10px] md:text-xs text-[#3a4a5a] mt-1">timeframe analysis</p>
        </div>
      </div>
    );
  }

  const isAligned = selected.monthly.includes('2U') && selected.weekly.includes('2U') && selected.daily.includes('2U');
  const isBearishAligned = selected.monthly.includes('2D') && selected.weekly.includes('2D') && selected.daily.includes('2D');

  return (
    <div className="bg-[#0d1117] border border-[#1a2332] rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${selected.ftfc ? 'bg-[#00ff88] animate-pulse' : 'bg-[#ff4757]'}`} />
          <h2 className="text-xs md:text-sm font-bold tracking-wider text-[#e6e6e6]">TIMEFRAME CONTINUITY</h2>
        </div>
        <span className="text-base md:text-lg font-bold text-[#00ff88]">{selected.symbol}</span>
      </div>

      {/* FTFC Status */}
      <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-lg border ${
        selected.ftfc
          ? 'bg-[#00ff88]/5 border-[#00ff88]/30'
          : 'bg-[#ff4757]/5 border-[#ff4757]/30'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] md:text-xs text-[#5a6a7a]">FULL TIMEFRAME CONTINUITY</span>
          <span className={`text-xs md:text-sm font-bold ${selected.ftfc ? 'text-[#00ff88]' : 'text-[#ff4757]'}`}>
            {selected.ftfc ? 'CONFIRMED' : 'NOT ALIGNED'}
          </span>
        </div>
        {selected.ftfc && (
          <p className="text-[10px] md:text-xs text-[#5a6a7a] mt-2">
            All timeframes aligned for {isAligned ? 'bullish' : isBearishAligned ? 'bearish' : 'directional'} continuation
          </p>
        )}
      </div>

      {/* Timeframe Bars */}
      <div className="space-y-3 md:space-y-4">
        <TimeframeBar label="MONTHLY" pattern={selected.monthly} active={true} />
        <TimeframeBar label="WEEKLY" pattern={selected.weekly} active={true} />
        <TimeframeBar label="DAILY" pattern={selected.daily} active={true} />
        <TimeframeBar label="HOURLY" pattern={selected.hourly} active={true} />
      </div>

      {/* Trigger */}
      {selected.trigger && (
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#1a2332]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] md:text-xs text-[#5a6a7a]">ACTIVE TRIGGER</span>
          </div>
          <div className="px-3 md:px-4 py-2 md:py-3 bg-[#ffa502]/10 border border-[#ffa502]/30 rounded-lg">
            <span className="text-xs md:text-sm font-bold text-[#ffa502]">{selected.trigger}</span>
          </div>
        </div>
      )}

      {/* Magnitude */}
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#1a2332]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] md:text-xs text-[#5a6a7a]">SETUP MAGNITUDE</span>
          <span className={`text-lg md:text-xl font-bold ${
            selected.magnitude > 70 ? 'text-[#00ff88]' :
            selected.magnitude > 40 ? 'text-[#ffa502]' : 'text-[#ff4757]'
          }`}>
            {selected.magnitude}
          </span>
        </div>
        <div className="h-2 md:h-3 bg-[#1a2332] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              selected.magnitude > 70 ? 'bg-[#00ff88]' :
              selected.magnitude > 40 ? 'bg-[#ffa502]' : 'bg-[#ff4757]'
            }`}
            style={{ width: `${selected.magnitude}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 md:mt-2 text-[8px] md:text-[10px] text-[#3a4a5a]">
          <span>WEAK</span>
          <span>MODERATE</span>
          <span>STRONG</span>
        </div>
      </div>
    </div>
  );
}
