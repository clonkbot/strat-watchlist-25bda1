export function StratLegend() {
  return (
    <div className="bg-[#0d1117] border border-[#1a2332] rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="w-2 h-2 md:w-3 md:h-3 border-2 border-[#5a6a7a]" />
        <h2 className="text-xs md:text-sm font-bold tracking-wider text-[#5a6a7a]">THE STRAT LEGEND</h2>
      </div>

      <div className="space-y-3 md:space-y-4">
        {/* Pattern 1 */}
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#ffa502]/10 border border-[#ffa502]/30 rounded shrink-0">
            <span className="text-sm md:text-base font-bold text-[#ffa502]">1</span>
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-[#e6e6e6]">Inside Bar</p>
            <p className="text-[10px] md:text-xs text-[#5a6a7a] mt-0.5 md:mt-1">
              Price contained within previous bar. Coiling for expansion.
            </p>
          </div>
        </div>

        {/* Pattern 2U */}
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#00ff88]/10 border border-[#00ff88]/30 rounded shrink-0">
            <span className="text-sm md:text-base font-bold text-[#00ff88]">2U</span>
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-[#e6e6e6]">Directional Up</p>
            <p className="text-[10px] md:text-xs text-[#5a6a7a] mt-0.5 md:mt-1">
              Took out previous high. Bullish momentum.
            </p>
          </div>
        </div>

        {/* Pattern 2D */}
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#ff4757]/10 border border-[#ff4757]/30 rounded shrink-0">
            <span className="text-sm md:text-base font-bold text-[#ff4757]">2D</span>
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-[#e6e6e6]">Directional Down</p>
            <p className="text-[10px] md:text-xs text-[#5a6a7a] mt-0.5 md:mt-1">
              Took out previous low. Bearish momentum.
            </p>
          </div>
        </div>

        {/* Pattern 3 */}
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#5f27cd]/10 border border-[#5f27cd]/30 rounded shrink-0">
            <span className="text-sm md:text-base font-bold text-[#a29bfe]">3</span>
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-[#e6e6e6]">Outside Bar</p>
            <p className="text-[10px] md:text-xs text-[#5a6a7a] mt-0.5 md:mt-1">
              Took out both high and low. Broadening range.
            </p>
          </div>
        </div>
      </div>

      {/* FTFC Explanation */}
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#1a2332]">
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00ff88] rounded-full" />
          <span className="text-[10px] md:text-xs font-bold text-[#e6e6e6]">FTFC</span>
        </div>
        <p className="text-[10px] md:text-xs text-[#5a6a7a] leading-relaxed">
          <span className="text-[#00ff88]">Full Timeframe Continuity</span> — When all timeframes
          (Monthly, Weekly, Daily) align in the same direction. Indicates strongest setups with
          institutional backing.
        </p>
      </div>

      {/* Magnitude Explanation */}
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#1a2332]">
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <div className="w-8 md:w-12 h-1.5 md:h-2 bg-gradient-to-r from-[#ff4757] via-[#ffa502] to-[#00ff88] rounded-full" />
          <span className="text-[10px] md:text-xs font-bold text-[#e6e6e6]">MAGNITUDE</span>
        </div>
        <p className="text-[10px] md:text-xs text-[#5a6a7a] leading-relaxed">
          Calculated score based on pattern quality, timeframe alignment, and historical performance.
          Higher magnitude = higher probability setup.
        </p>
      </div>
    </div>
  );
}
