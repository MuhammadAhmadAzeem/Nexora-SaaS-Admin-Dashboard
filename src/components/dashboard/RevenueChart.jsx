import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  ChevronDown,
} from "lucide-react";

const revenueData = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 58 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 72 },
  { month: "May", value: 64 },
  { month: "Jun", value: 86 },
  { month: "Jul", value: 78 },
  { month: "Aug", value: 94 },
  { month: "Sep", value: 88 },
  { month: "Oct", value: 106 },
  { month: "Nov", value: 98 },
  { month: "Dec", value: 118 },
];

const periods = [
  "Last 12 months",
  "Last 6 months",
  "Last 30 days",
];

export default function RevenueChart() {
  const [selectedPeriod, setSelectedPeriod] =
    useState("Last 12 months");

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(
    ...revenueData.map((item) => item.value)
  );

  const totalRevenue = revenueData.reduce(
    (total, item) => total + item.value,
    0
  );

  const averageRevenue = Math.round(
    totalRevenue / revenueData.length
  );

  /*
   * Chart dimensions
   */
  const chartWidth = 1000;
  const chartHeight = 320;

  const paddingLeft = 55;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 45;

  const graphWidth =
    chartWidth - paddingLeft - paddingRight;

  const graphHeight =
    chartHeight - paddingTop - paddingBottom;

  /*
   * Convert data into SVG points
   */
  const points = revenueData.map((item, index) => {
    const x =
      paddingLeft +
      (index / (revenueData.length - 1)) * graphWidth;

    const y =
      paddingTop +
      graphHeight -
      (item.value / maxValue) * graphHeight;

    return {
      ...item,
      x,
      y,
    };
  });

  const linePath = points
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    })
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x} ${chartHeight - paddingBottom}
    L ${points[0].x} ${chartHeight - paddingBottom}
    Z
  `;

  const gridValues = [0, 25, 50, 75, 100];

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-200
          p-5
          sm:p-6
          md:flex-row
          md:items-center
          md:justify-between
          dark:border-slate-800
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            <BarChart3 size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Revenue Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track your revenue performance over time.
            </p>
          </div>
        </div>

        {/* Period */}
        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={(event) =>
              setSelectedPeriod(event.target.value)
            }
            className="
              h-10
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-2
              pl-3
              pr-9
              text-sm
              font-medium
              text-slate-700
              outline-none
              transition
              focus:border-blue-400
              focus:ring-4
              focus:ring-blue-500/10
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
            "
          >
            {periods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>

          <ChevronDown
            size={15}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />
        </div>
      </div>

      {/* Summary */}
      <div
        className="
          grid
          grid-cols-2
          border-b
          border-slate-200
          dark:border-slate-800
        "
      >
        <div className="border-r border-slate-200 p-5 dark:border-slate-800">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Total Revenue
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              ${totalRevenue}K
            </h3>

            <span
              className="
                inline-flex
                items-center
                gap-0.5
                rounded-full
                bg-green-50
                px-2
                py-1
                text-xs
                font-semibold
                text-green-600
                dark:bg-green-500/10
                dark:text-green-400
              "
            >
              <ArrowUpRight size={13} />
              12.8%
            </span>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Monthly Average
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            ${averageRevenue}K
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 sm:p-6">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[650px]">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="Revenue performance chart"
            >
              <defs>
                {/* Area Gradient */}
                <linearGradient
                  id="revenueAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                    stopOpacity="0.22"
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563eb"
                    stopOpacity="0"
                  />
                </linearGradient>

                {/* Line Gradient */}
                <linearGradient
                  id="revenueLineGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                  />

                  <stop
                    offset="100%"
                    stopColor="#06b6d4"
                  />
                </linearGradient>
              </defs>

              {/* Horizontal Grid */}
              {gridValues.map((value) => {
                const y =
                  paddingTop +
                  graphHeight -
                  (value / 100) * graphHeight;

                return (
                  <g key={value}>
                    <line
                      x1={paddingLeft}
                      x2={chartWidth - paddingRight}
                      y1={y}
                      y2={y}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      strokeDasharray="4 6"
                    />

                    <text
                      x={paddingLeft - 12}
                      y={y + 4}
                      textAnchor="end"
                      className="
                        fill-slate-400
                        text-[11px]
                      "
                    >
                      {Math.round(
                        (maxValue * value) / 100
                      )}
                    </text>
                  </g>
                );
              })}

              {/* Area */}
              <path
                d={areaPath}
                fill="url(#revenueAreaGradient)"
                className={`
                  transition-opacity
                  duration-1000
                  ${
                    animated
                      ? "opacity-100"
                      : "opacity-0"
                  }
                `}
              />

              {/* Animated Line */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#revenueLineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="
                  transition-all
                  duration-[1400ms]
                  ease-out
                "
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: animated ? 0 : 1,
                }}
              />

              {/* Points */}
              {points.map((point) => (
                <g key={point.month}>
                  {/* Outer Glow */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    className="
                      fill-blue-500/10
                      transition-opacity
                      duration-300
                    "
                  />

                  {/* Point */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4.5"
                    fill="white"
                    stroke="#2563eb"
                    strokeWidth="3"
                    className="
                      opacity-0
                      transition-opacity
                      delay-1000
                      duration-500
                      dark:fill-slate-900
                    "
                    style={{
                      opacity: animated ? 1 : 0,
                    }}
                  />

                  {/* Month */}
                  <text
                    x={point.x}
                    y={chartHeight - 12}
                    textAnchor="middle"
                    className="
                      fill-slate-400
                      text-[11px]
                      font-medium
                    "
                  >
                    {point.month}
                  </text>

                  {/* Hover Area */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="18"
                    fill="transparent"
                    className="cursor-pointer"
                  >
                    <title>
                      {point.month}: ${point.value}K
                    </title>
                  </circle>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          flex
          flex-col
          gap-2
          border-t
          border-slate-200
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
          dark:border-slate-800
        "
      >
        <p className="text-xs text-slate-400">
          Revenue shown in thousands (USD)
        </p>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />

          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Revenue
          </span>
        </div>
      </div>
    </div>
  );
}
