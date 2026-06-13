import { useMemo, useState } from "react";
import type { ValueCurve, ValueObservation } from "@/data/crops";
import { chart } from "@/lib/tokens";

interface ValueCurveChartProps {
  curve: ValueCurve;
  observations: ValueObservation[];
  /** Outer width in SVG units. Renders responsive via viewBox. */
  width?: number;
  height?: number;
}

const PAD_L = 60;
const PAD_R = 20;
const PAD_T = 20;
const PAD_B = 40;

export function ValueCurveChart({
  curve,
  observations,
  width = 560,
  height = 320,
}: ValueCurveChartProps) {
  // X domain: 0 .. 1.4× the largest observed weight, so extrapolation is visible.
  const xMaxData = useMemo(
    () => Math.max(...observations.map((o) => o.weightG), 1) * 1.4,
    [observations]
  );

  // Sample the curve at 120 points.
  const samples = useMemo(() => {
    const pts: { g: number; v: number }[] = [];
    for (let i = 0; i <= 120; i++) {
      const g = (i / 120) * xMaxData;
      pts.push({ g, v: curve.a * Math.pow(g, curve.alpha) });
    }
    return pts;
  }, [curve, xMaxData]);

  // Y domain: a little above the max of the curve and observations.
  const yMaxData = useMemo(
    () =>
      Math.max(...samples.map((p) => p.v), ...observations.map((o) => o.value)) *
      1.1,
    [samples, observations]
  );

  const plotW = width - PAD_L - PAD_R;
  const plotH = height - PAD_T - PAD_B;

  const xScale = (g: number) => PAD_L + (g / xMaxData) * plotW;
  const yScale = (v: number) => PAD_T + plotH - (v / yMaxData) * plotH;

  const pathD = samples
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${xScale(p.g).toFixed(2)} ${yScale(p.v).toFixed(2)}`
    )
    .join(" ");

  const [hover, setHover] = useState<{ g: number; v: number } | null>(null);

  function handleMove(e: React.MouseEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const svgX = (screenX / rect.width) * width;
    const g = ((svgX - PAD_L) / plotW) * xMaxData;
    if (g < 0 || g > xMaxData) {
      setHover(null);
      return;
    }
    setHover({ g, v: curve.a * Math.pow(g, curve.alpha) });
  }

  const yTicks = [0, 0.25, 0.5, 0.75, 1.0];
  const xTicks = [0, 0.25, 0.5, 0.75, 1.0];

  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">Value curve (power-law fit)</h3>
          <p className="text-xs text-muted-foreground">
            raw value = {curve.a} × weight<sup>{curve.alpha.toFixed(3)}</sup>{" "}
            (Sheckles, no friend boost)
          </p>
        </div>
        {hover && (
          <div className="text-right text-xs whitespace-nowrap">
            <div className="text-muted-foreground uppercase tracking-wider text-[10px]">
              Predicted
            </div>
            <div className="font-mono text-emerald-400">
              {(hover.g / 1000).toFixed(2)} kg ·{" "}
              {Math.round(hover.v).toLocaleString()} ¢
            </div>
          </div>
        )}
      </div>

      <div className="aspect-[2/1] min-h-[220px] sm:aspect-[16/9] sm:min-h-[260px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          role="img"
          aria-label="Value curve plot"
          className="text-foreground select-none"
        >
        {/* Horizontal grid */}
        {yTicks.map((p, i) => {
          const y = p * yMaxData;
          return (
            <line
              key={`yg-${i}`}
              x1={PAD_L}
              y1={yScale(y)}
              x2={width - PAD_R}
              y2={yScale(y)}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeDasharray="2 4"
            />
          );
        })}

        {/* Axes */}
        <line
          x1={PAD_L}
          y1={PAD_T}
          x2={PAD_L}
          y2={PAD_T + plotH}
          stroke="currentColor"
          strokeOpacity="0.4"
        />
        <line
          x1={PAD_L}
          y1={PAD_T + plotH}
          x2={width - PAD_R}
          y2={PAD_T + plotH}
          stroke="currentColor"
          strokeOpacity="0.4"
        />

        {/* Y tick labels */}
        {yTicks.map((p, i) => {
          const y = p * yMaxData;
          return (
            <text
              key={`yt-${i}`}
              x={PAD_L - 8}
              y={yScale(y) + 4}
              textAnchor="end"
              fontSize="10"
              fill="currentColor"
              fillOpacity="0.6"
            >
              {Math.round(y).toLocaleString()}¢
            </text>
          );
        })}

        {/* X tick labels */}
        {xTicks.map((p, i) => {
          const x = p * xMaxData;
          return (
            <text
              key={`xt-${i}`}
              x={xScale(x)}
              y={PAD_T + plotH + 16}
              textAnchor="middle"
              fontSize="10"
              fill="currentColor"
              fillOpacity="0.6"
            >
              {(x / 1000).toFixed(x >= 10000 ? 0 : 1)} kg
            </text>
          );
        })}

        {/* Curve */}
        <path
          d={pathD}
          fill="none"
          stroke={chart.curve}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Observation drop-lines + points + labels */}
        {observations.map((obs, i) => (
          <g key={`obs-${i}`}>
            <line
              x1={xScale(obs.weightG)}
              y1={yScale(obs.value)}
              x2={xScale(obs.weightG)}
              y2={PAD_T + plotH}
              stroke={chart.point}
              strokeOpacity="0.25"
              strokeDasharray="3 3"
            />
            <circle
              cx={xScale(obs.weightG)}
              cy={yScale(obs.value)}
              r="5"
              fill={chart.point}
              stroke={chart.pointRing}
              strokeWidth="2"
            />
            <text
              x={xScale(obs.weightG)}
              y={yScale(obs.value) - 12}
              textAnchor="middle"
              fontSize="10"
              fill="currentColor"
              fillOpacity="0.85"
              style={{ paintOrder: "stroke", stroke: chart.pointRing, strokeWidth: 3 }}
            >
              {(obs.weightG / 1000).toFixed(2)} kg ·{" "}
              {Math.round(obs.value).toLocaleString()}¢
            </text>
          </g>
        ))}

        {/* Hover marker */}
        {hover && (
          <g pointerEvents="none">
            <line
              x1={xScale(hover.g)}
              y1={PAD_T}
              x2={xScale(hover.g)}
              y2={PAD_T + plotH}
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeDasharray="2 3"
            />
            <circle
              cx={xScale(hover.g)}
              cy={yScale(hover.v)}
              r="4"
              fill={chart.curve}
              stroke={chart.pointRing}
              strokeWidth="2"
            />
          </g>
        )}

        {/* Mouse capture layer (above curve, below axis labels via DOM order) */}
        <rect
          x={PAD_L}
          y={PAD_T}
          width={plotW}
          height={plotH}
          fill="transparent"
          onMouseMove={handleMove}
          onMouseLeave={() => setHover(null)}
          style={{ cursor: "crosshair" }}
        />

        {/* Axis titles */}
        <text
          x={PAD_L + plotW / 2}
          y={height - 5}
          textAnchor="middle"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.5"
        >
          Weight
        </text>
        <text
          x={12}
          y={PAD_T + plotH / 2}
          textAnchor="middle"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.5"
          transform={`rotate(-90 12 ${PAD_T + plotH / 2})`}
        >
          Raw value (¢)
        </text>
      </svg>
      </div>
    </div>
  );
}
