import React, { useState, useMemo } from 'react';
import { BuyYearlyBreakdown, RentYearlyBreakdown } from '../types';
import { useRegionalConfig } from '../contexts/RegionalContext';

interface NetWorthChartProps {
  buyBreakdown: BuyYearlyBreakdown[];
  rentBreakdown: RentYearlyBreakdown[];
  className?: string;
}

/**
 * Ultra-minimal net worth comparison chart
 * Features:
 * - Electric blue and light blue lines
 * - Minimal grid (very subtle)
 * - Smooth animations
 * - Interactive hover tooltips
 * - Pure SVG implementation
 */
export const NetWorthChart: React.FC<NetWorthChartProps> = ({
  buyBreakdown,
  rentBreakdown,
  className = '',
}) => {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const config = useRegionalConfig();
  const { currency } = config;

  // Chart dimensions - responsive based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const width = isMobile ? 600 : 800;
  const height = isMobile ? 300 : 400;
  const padding = {
    top: 20,
    right: isMobile ? 10 : 20,
    bottom: isMobile ? 40 : 50,
    left: isMobile ? 50 : 80
  };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate min/max values for scaling
  const { minValue, maxValue, years } = useMemo(() => {
    const allBuyValues = buyBreakdown.map((b) => b.netWorth);
    const allRentValues = rentBreakdown.map((r) => r.netWorth);
    const allValues = [...allBuyValues, ...allRentValues];

    const min = Math.min(...allValues);
    const max = Math.max(...allValues);

    // Add 10% padding to min/max for visual breathing room
    const range = max - min;
    const paddedMin = min - range * 0.1;
    const paddedMax = max + range * 0.1;

    const yearsList = buyBreakdown.map((b) => b.year);

    return {
      minValue: paddedMin,
      maxValue: paddedMax,
      years: yearsList,
    };
  }, [buyBreakdown, rentBreakdown]);

  // Scale functions
  const scaleX = (year: number) => {
    const maxYear = Math.max(...years);
    return (year / maxYear) * chartWidth;
  };

  const scaleY = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return chartHeight - normalized * chartHeight;
  };

  // Generate path for line chart
  const generatePath = (data: { year: number; netWorth: number }[]): string => {
    return data
      .map((point, index) => {
        const x = scaleX(point.year);
        const y = scaleY(point.netWorth);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const buyPath = generatePath(
    buyBreakdown.map((b) => ({ year: b.year, netWorth: b.netWorth }))
  );

  const rentPath = generatePath(
    rentBreakdown.map((r) => ({ year: r.year, netWorth: r.netWorth }))
  );

  // Y-axis ticks (5 ticks)
  const yTicks = useMemo(() => {
    const ticks = [];
    const tickCount = 5;
    for (let i = 0; i <= tickCount; i++) {
      const value = minValue + ((maxValue - minValue) / tickCount) * i;
      ticks.push(value);
    }
    return ticks;
  }, [minValue, maxValue]);

  // X-axis ticks (show every 5 years)
  const xTicks = useMemo(() => {
    const maxYear = Math.max(...years);
    const ticks = [];
    for (let year = 0; year <= maxYear; year += 5) {
      ticks.push(year);
    }
    // Always include the last year
    if (!ticks.includes(maxYear)) {
      ticks.push(maxYear);
    }
    return ticks;
  }, [years]);

  // Get data for hovered year
  const getHoverData = (year: number) => {
    const buyData = buyBreakdown.find((b) => b.year === year);
    const rentData = rentBreakdown.find((r) => r.year === year);
    return { buyData, rentData };
  };

  return (
    <div className={`relative ${className}`}>
      {/* Chart container */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto animate-fade-in-up"
          style={{ minWidth: isMobile ? '500px' : '600px' }}
        >
          {/* Definitions for gradients */}
          <defs>
            {/* Electric blue gradient */}
            <linearGradient id="buyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>

            {/* Green gradient */}
            <linearGradient id="rentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Chart group */}
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Grid lines (horizontal) - very subtle */}
            {yTicks.map((tick, index) => (
              <line
                key={`grid-y-${index}`}
                x1={0}
                y1={scaleY(tick)}
                x2={chartWidth}
                y2={scaleY(tick)}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1"
              />
            ))}

            {/* Grid lines (vertical) - very subtle */}
            {xTicks.map((tick, index) => (
              <line
                key={`grid-x-${index}`}
                x1={scaleX(tick)}
                y1={0}
                x2={scaleX(tick)}
                y2={chartHeight}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1"
              />
            ))}

            {/* Buy line */}
            <path
              d={buyPath}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 hover:stroke-width-4"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.5))',
              }}
            />

            {/* Rent line */}
            <path
              d={rentPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 hover:stroke-width-4"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))',
              }}
            />

            {/* Data points for interaction */}
            {buyBreakdown.map((point) => (
              <circle
                key={`buy-point-${point.year}`}
                cx={scaleX(point.year)}
                cy={scaleY(point.netWorth)}
                r={hoveredYear === point.year ? 6 : 4}
                fill="#0ea5e9"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredYear(point.year)}
                onMouseLeave={() => setHoveredYear(null)}
                style={{
                  filter: hoveredYear === point.year ? 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.8))' : 'none',
                }}
              />
            ))}

            {rentBreakdown.map((point) => (
              <circle
                key={`rent-point-${point.year}`}
                cx={scaleX(point.year)}
                cy={scaleY(point.netWorth)}
                r={hoveredYear === point.year ? 6 : 4}
                fill="#10b981"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredYear(point.year)}
                onMouseLeave={() => setHoveredYear(null)}
                style={{
                  filter: hoveredYear === point.year ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))' : 'none',
                }}
              />
            ))}

            {/* Y-axis */}
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={chartHeight}
              stroke="#262626"
              strokeWidth="2"
            />

            {/* X-axis */}
            <line
              x1={0}
              y1={chartHeight}
              x2={chartWidth}
              y2={chartHeight}
              stroke="#262626"
              strokeWidth="2"
            />

            {/* Y-axis labels */}
            {yTicks.map((tick, index) => (
              <text
                key={`y-label-${index}`}
                x={-10}
                y={scaleY(tick)}
                textAnchor="end"
                dominantBaseline="middle"
                className="font-mono text-xs"
                fill="#737373"
              >
                {currency.format(tick, true)}
              </text>
            ))}

            {/* X-axis labels */}
            {xTicks.map((tick, index) => (
              <text
                key={`x-label-${index}`}
                x={scaleX(tick)}
                y={chartHeight + 20}
                textAnchor="middle"
                className="font-mono text-xs"
                fill="#737373"
              >
                {tick}
              </text>
            ))}

            {/* X-axis title */}
            <text
              x={chartWidth / 2}
              y={chartHeight + 40}
              textAnchor="middle"
              className="font-body text-xs uppercase tracking-wider"
              fill="#a3a3a3"
            >
              Years
            </text>

            {/* Y-axis title */}
            <text
              x={-chartHeight / 2}
              y={-60}
              textAnchor="middle"
              className="font-body text-xs uppercase tracking-wider"
              fill="#a3a3a3"
              transform={`rotate(-90, -${chartHeight / 2}, -60)`}
            >
              Net Worth
            </text>
          </g>
        </svg>
      </div>

      {/* Hover tooltip */}
      {hoveredYear !== null && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-bg-elevated border border-border-default rounded-md p-3 sm:p-4 shadow-glow-blue animate-fade-in-up z-10 max-w-[200px] sm:max-w-none">
          <div className="space-y-3">
            <div className="text-xs text-text-secondary uppercase tracking-wider">
              Year {hoveredYear}
            </div>

            {/* Buy data */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent-primary" style={{ boxShadow: '0 0 8px rgba(14, 165, 233, 0.5)' }} />
                <span className="text-xs text-text-secondary">Buy Net Worth</span>
              </div>
              <div className="font-mono text-sm sm:text-lg text-accent-primary font-semibold">
                {currency.format(getHoverData(hoveredYear).buyData?.netWorth || 0, false)}
              </div>
            </div>

            {/* Rent data */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)' }} />
                <span className="text-xs text-text-secondary">Rent Net Worth</span>
              </div>
              <div className="font-mono text-sm sm:text-lg font-semibold" style={{ color: '#10b981' }}>
                {currency.format(getHoverData(hoveredYear).rentData?.netWorth || 0, false)}
              </div>
            </div>

            {/* Difference */}
            <div className="pt-2 border-t border-border-subtle">
              <div className="text-xs text-text-tertiary">Difference</div>
              <div className={`font-mono text-sm font-semibold ${
                (getHoverData(hoveredYear).rentData?.netWorth || 0) >
                (getHoverData(hoveredYear).buyData?.netWorth || 0)
                  ? 'text-success'
                  : 'text-error'
              }`}>
                {currency.format(
                  Math.abs(
                    (getHoverData(hoveredYear).rentData?.netWorth || 0) -
                    (getHoverData(hoveredYear).buyData?.netWorth || 0)
                  ), false
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 mt-4 sm:mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-accent-primary rounded" style={{ boxShadow: '0 0 8px rgba(14, 165, 233, 0.5)' }} />
          <span className="text-xs sm:text-sm text-text-secondary">Buy Scenario</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded" style={{ backgroundColor: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)' }} />
          <span className="text-xs sm:text-sm text-text-secondary">Rent Scenario</span>
        </div>
      </div>
    </div>
  );
};
