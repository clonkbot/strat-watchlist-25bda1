import { TickerData } from '../App';

interface SetupScannerProps {
  data: TickerData[];
}

export function SetupScanner({ data }: SetupScannerProps) {
  const activeSetups = data.filter(t => t.trigger);
  const ftfcSetups = data.filter(t => t.ftfc);
  const highMagnitude = data.filter(t => t.magnitude > 70);

  return (
    <div className="bg-[#0d1117] border border-[#1a2332] rounded-lg overflow-hidden">
      <div className="px-3 md:px-4 py-2 md:py-3 border-b border-[#1a2332] flex items-center gap-2 md:gap-3">
        <div className="relative">
          <div className="w-2 h-2 md:w-3 md:h-3 border-2 border-[#ffa502] rounded-full" />
          <div className="absolute inset-0 w-2 h-2 md:w-3 md:h-3 border-2 border-[#ffa502] rounded-full animate-ping opacity-50" />
        </div>
        <h2 className="text-xs md:text-sm font-bold tracking-wider text-[#e6e6e6]">SETUP SCANNER</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3">
        {/* Active Triggers */}
        <div className="p-3 md:p-4 border-b sm:border-b-0 sm:border-r border-[#1a2332]">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#ffa502] rounded-full" />
            <span className="text-[10px] md:text-xs text-[#5a6a7a]">ACTIVE TRIGGERS</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-[#ffa502] mb-2 md:mb-3 tabular-nums">{activeSetups.length}</div>
          <div className="space-y-1 md:space-y-2 max-h-24 md:max-h-32 overflow-y-auto">
            {activeSetups.slice(0, 4).map(setup => (
              <div key={setup.symbol} className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="font-bold text-[#e6e6e6]">{setup.symbol}</span>
                <span className="text-[#ffa502] truncate ml-2">{setup.trigger}</span>
              </div>
            ))}
            {activeSetups.length === 0 && (
              <p className="text-[10px] md:text-xs text-[#3a4a5a]">No active triggers</p>
            )}
          </div>
        </div>

        {/* FTFC Aligned */}
        <div className="p-3 md:p-4 border-b sm:border-b-0 sm:border-r border-[#1a2332]">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#00ff88] rounded-full" />
            <span className="text-[10px] md:text-xs text-[#5a6a7a]">FTFC ALIGNED</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-[#00ff88] mb-2 md:mb-3 tabular-nums">{ftfcSetups.length}</div>
          <div className="space-y-1 md:space-y-2 max-h-24 md:max-h-32 overflow-y-auto">
            {ftfcSetups.slice(0, 4).map(setup => (
              <div key={setup.symbol} className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="font-bold text-[#e6e6e6]">{setup.symbol}</span>
                <span className={setup.change >= 0 ? 'text-[#00ff88]' : 'text-[#ff4757]'}>
                  {setup.change >= 0 ? '+' : ''}{setup.change.toFixed(2)}%
                </span>
              </div>
            ))}
            {ftfcSetups.length === 0 && (
              <p className="text-[10px] md:text-xs text-[#3a4a5a]">No FTFC setups</p>
            )}
          </div>
        </div>

        {/* High Magnitude */}
        <div className="p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#a29bfe] rounded-full" />
            <span className="text-[10px] md:text-xs text-[#5a6a7a]">HIGH MAGNITUDE</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-[#a29bfe] mb-2 md:mb-3 tabular-nums">{highMagnitude.length}</div>
          <div className="space-y-1 md:space-y-2 max-h-24 md:max-h-32 overflow-y-auto">
            {highMagnitude.slice(0, 4).map(setup => (
              <div key={setup.symbol} className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="font-bold text-[#e6e6e6]">{setup.symbol}</span>
                <span className="text-[#a29bfe]">{setup.magnitude}</span>
              </div>
            ))}
            {highMagnitude.length === 0 && (
              <p className="text-[10px] md:text-xs text-[#3a4a5a]">No high magnitude</p>
            )}
          </div>
        </div>
      </div>

      {/* Pattern Distribution */}
      <div className="border-t border-[#1a2332] px-3 md:px-4 py-2 md:py-3">
        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-[10px] md:text-xs">
          <span className="text-[#5a6a7a]">PATTERN DISTRIBUTION:</span>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-[#ffa502]">1</span>
            <span className="text-[#5a6a7a]">×</span>
            <span className="text-[#e6e6e6]">{data.filter(t => t.daily === '1').length}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-[#00ff88]">2U</span>
            <span className="text-[#5a6a7a]">×</span>
            <span className="text-[#e6e6e6]">{data.filter(t => t.daily === '2U').length}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-[#ff4757]">2D</span>
            <span className="text-[#5a6a7a]">×</span>
            <span className="text-[#e6e6e6]">{data.filter(t => t.daily === '2D').length}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-[#a29bfe]">3</span>
            <span className="text-[#5a6a7a]">×</span>
            <span className="text-[#e6e6e6]">{data.filter(t => t.daily === '3').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
