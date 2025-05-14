import React, { useEffect, useRef, useMemo } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { Microchip } from "lucide-react";

const NUM_WAVES = 3;

const randomPhase = () => Math.random() * Math.PI * 2;
const randomAmp = () => 10 + Math.random() * 10;

function getWavePath(
  cx: number,
  cy: number,
  r: number,
  amp: number,
  phase: number
) {
  // Generate a wavy circle path (polar coordinates)
  let d = "";
  for (let i = 0; i <= 64; i++) {
    const theta = (i / 64) * 2 * Math.PI;
    const wavyR = r + Math.sin(theta * 6 + phase) * amp;
    const x = cx + Math.cos(theta) * wavyR;
    const y = cy + Math.sin(theta) * wavyR;
    d += i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }
  d += "Z";
  return d;
}

interface ChipVisualizationProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChipVisualization: React.FC<ChipVisualizationProps> = (props) => {
  const waveRef1 = useRef<SVGPathElement>(null);
  const waveRef2 = useRef<SVGPathElement>(null);

  //   useEffect(() => {
  //     // Animation loop for dynamic wave manipulations if needed
  //     const animate = () => {
  //       requestAnimationFrame(animate);
  //     };

  //     animate();

  //     return () => {
  //       // Cleanup if needed
  //     };
  //   }, []);

  // Precompute random phases/amplitudes for each wave
  // Animated progress value for concentric radio wave animation
  const { progress } = useSpring({
    from: { progress: 0 },
    to: { progress: 1 },
    loop: true,
    config: { duration: 12600 }, // Slow down by 20%
  });

  // Animated color for inner square (deep blue to bright blue in a random loop)
  const colorSpring = useSpring({
    from: { stroke: '#0a192f', fill: '#0a192f' },
    to: async (next) => {
      while (1) {
        // Pick a random color between deep blue and bright blue
        const t = Math.random();
        // Interpolate between #0a192f and #33C3F0
        const lerp = (a, b, t) => Math.round(a + (b - a) * t);
        const c1 = { r: 0x0a, g: 0x19, b: 0x2f };
        const c2 = { r: 0x33, g: 0xc3, b: 0xf0 };
        const r = lerp(c1.r, c2.r, t);
        const g = lerp(c1.g, c2.g, t);
        const b = lerp(c1.b, c2.b, t);
        const color = `rgb(${r},${g},${b})`;
        await next({ stroke: color, fill: color });
        // Wait a random duration before next color
        await new Promise(res => setTimeout(res, 700 + Math.random() * 1200));
      }
    },
    config: { duration: 1200 },
    loop: true,
  });

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      {...props}
    >
      <svg
        className="w-full h-full max-w-[800px] max-h-[800px]"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Grid */}
        <defs>
          <pattern
            id="smallGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(51, 195, 240, 0.1)"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(51, 195, 240, 0.2)"
              strokeWidth="1"
            />
          </pattern>

          {/* Glowing Effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Wave Pattern */}
          <pattern
            id="wave-pattern"
            x="0"
            y="0"
            width="200"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0,10 C10,5 20,15 30,10 C40,5 50,15 60,10 C70,5 80,15 90,10 C100,5 110,15 120,10 C130,5 140,15 150,10 C160,5 170,15 180,10 C190,5 200,15 200,10"
              fill="none"
              stroke="#33C3F0"
              strokeWidth="2"
            />
          </pattern>
        </defs>

        {/* Metallic PCB routings under the chip */}
        <defs>
          <linearGradient id="pcb-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#b8d0e9" />
            <stop offset="50%" stop-color="#e0e6eb" />
            <stop offset="100%" stop-color="#7ea7c7" />
          </linearGradient>
        </defs>
        {/* Example routings: left, right, top, bottom, wavy/curved */}
        <path d="M 100 150 Q 180 200 250 250" stroke="url(#pcb-metal)" strokeWidth="6" fill="none" opacity="0.8" />
        <path d="M 700 150 Q 620 200 550 250" stroke="url(#pcb-metal)" strokeWidth="6" fill="none" opacity="0.8" />
        <path d="M 400 50 Q 400 180 400 250" stroke="url(#pcb-metal)" strokeWidth="6" fill="none" opacity="0.8" />
        <path d="M 400 750 Q 400 620 400 550" stroke="url(#pcb-metal)" strokeWidth="6" fill="none" opacity="0.8" />
        <path d="M 200 700 Q 300 600 400 400" stroke="url(#pcb-metal)" strokeWidth="4" fill="none" opacity="0.6" />
        <path d="M 600 700 Q 500 600 400 400" stroke="url(#pcb-metal)" strokeWidth="4" fill="none" opacity="0.6" />

        {/* Grid Background */}
        <rect width="800" height="800" fill="#0a192f" />
        <rect width="800" height="800" fill="url(#grid)" />

        {/* Main Chip Section */}
        <g transform="translate(250, 250)">
          {/* Main Chip Body */}
          <rect
            x="0"
            y="0"
            width="300"
            height="300"
            fill="#0a192f"
            stroke="#33C3F0"
            strokeWidth="3"
            rx="5"
            ry="5"
            filter="url(#glow)"
          />

          {/* Inner Chip Components */}
          <rect
            x="50"
            y="50"
            width="200"
            height="200"
            fill="none"
            stroke="#33C3F0"
            strokeWidth="1"
          />
          <rect
            x="75"
            y="75"
            width="150"
            height="150"
            fill="none"
            stroke="#33C3F0"
            strokeWidth="1"
          />
          <animated.rect
            x={100}
            y={100}
            width={100}
            height={100}
            fill={colorSpring.fill}
            stroke={colorSpring.stroke}
            strokeWidth={2}
            className="animate-blink"
          />

          {/* CPU Logo in the center */}
          <g transform="translate(125, 125) scale(2)">
            <Microchip x="0" y="0" className="text-chip-glow" />
          </g>

          {/* Animated Concentric Radio Waves as Circles - centered on chip */}
          {Array.from({ length: 5 }).map((_, i) => (
            <animated.circle
              key={i}
              cx={150}
              cy={150}
              r={progress.to((p) => {
                const phase = i / 5;
                const waveProgress = (p + phase) % 1;
                return 80 + 351 * waveProgress;
              })}
              stroke={progress.to((p) => {
                // Color interpolation: center = #00CFFF, outer = #193049
                const phase = i / 5;
                const waveProgress = (p + phase) % 1;
                // Linear interpolate between #00CFFF and #193049
                const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
                const c1 = { r: 0x00, g: 0xcf, b: 0xff };
                const c2 = { r: 0x19, g: 0x30, b: 0x49 };
                const r = lerp(c1.r, c2.r, waveProgress);
                const g = lerp(c1.g, c2.g, waveProgress);
                const b = lerp(c1.b, c2.b, waveProgress);
                return `rgb(${r},${g},${b})`;
              })}
              strokeWidth={progress.to((p) => {
                const phase = i / 5;
                const waveProgress = (p + phase) % 1;
                return 2 + 16 * waveProgress;
              })}
              fill="none"
              opacity={progress.to((p) => {
                const phase = i / 5;
                const waveProgress = (p + phase) % 1;
                return 0.5 * (1 - waveProgress);
              })}
              style={{
                filter: "drop-shadow(0 0 16px #33C3F0)",
                mixBlendMode: "screen",
                transition: "opacity 0.2s"
              }}
            />
          ))}

          {/* Connecting Pins */}
          {/* Top pins */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={`top-pin-${i}`}
              x={50 + i * 40}
              y={-10}
              width="15"
              height="30"
              fill="#0a192f"
              stroke="#33C3F0"
              strokeWidth="1"
            />
          ))}

          {/* Bottom pins */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={`bottom-pin-${i}`}
              x={50 + i * 40}
              y={280}
              width="15"
              height="30"
              fill="#0a192f"
              stroke="#33C3F0"
              strokeWidth="1"
            />
          ))}

          {/* Left pins */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={`left-pin-${i}`}
              x={-10}
              y={50 + i * 40}
              width="30"
              height="15"
              fill="#0a192f"
              stroke="#33C3F0"
              strokeWidth="1"
            />
          ))}

          {/* Right pins */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={`right-pin-${i}`}
              x={280}
              y={50 + i * 40}
              width="30"
              height="15"
              fill="#0a192f"
              stroke="#33C3F0"
              strokeWidth="1"
            />
          ))}

          {/* Component labels (legacy, can remove if not needed) */}
          <text x="15" y="30" fill="#33C3F0" fontSize="12">
            R1
          </text>
          <text x="255" y="30" fill="#33C3F0" fontSize="12">
            C2
          </text>
          <text x="30" y="270" fill="#33C3F0" fontSize="12">
            C5
          </text>
          <text x="255" y="270" fill="#33C3F0" fontSize="12">
            C6
          </text>

          {/* Small Components */}
          <rect
            x="-30"
            y="70"
            width="20"
            height="10"
            fill="#0a192f"
            stroke="#33C3F0"
            strokeWidth="1"
          />
          <rect
            x="310"
            y="70"
            width="20"
            height="10"
            fill="#0a192f"
            stroke="#33C3F0"
            strokeWidth="1"
          />
          <rect
            x="70"
            y="310"
            width="10"
            height="20"
            fill="#0a192f"
            stroke="#33C3F0"
            strokeWidth="1"
          />
          <rect
            x="220"
            y="-30"
            width="10"
            height="20"
            fill="#0a192f"
            stroke="#33C3F0"
            strokeWidth="1"
          />

          {/* Small resistors */}
          <g transform="translate(45, 235)">
            <rect
              width="20"
              height="10"
              fill="#986C1B"
              stroke="#33C3F0"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="5"
              x2="-15"
              y2="5"
              stroke="#33C3F0"
              strokeWidth="1"
            />
            <line
              x1="20"
              y1="5"
              x2="35"
              y2="5"
              stroke="#33C3F0"
              strokeWidth="1"
            />
            <text x="5" y="25" fill="#33C3F0" fontSize="10">
              R2
            </text>
          </g>

          <g transform="translate(235, 235)">
            <rect
              width="20"
              height="10"
              fill="#986C1B"
              stroke="#33C3F0"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="5"
              x2="-15"
              y2="5"
              stroke="#33C3F0"
              strokeWidth="1"
            />
            <line
              x1="20"
              y1="5"
              x2="35"
              y2="5"
              stroke="#33C3F0"
              strokeWidth="1"
            />
            <text x="5" y="25" fill="#33C3F0" fontSize="10">
              R3
            </text>
          </g>
        </g>

        {/* Circuit Traces and Routing */}
        {/* Left Input Trace */}
        <path
          d="M 100,400 L 180,400 C 200,400 220,380 220,360 L 220,300 L 240,300"
          fill="none"
          stroke="#33C3F0"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-flow-pulse"
        />

        {/* Right Output Trace */}
        <path
          d="M 560,300 L 580,300 L 580,360 C 580,380 600,400 620,400 L 700,400"
          fill="none"
          stroke="#33C3F0"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-flow-pulse"
        />

        {/* Top Trace */}
        <path
          d="M 400,100 L 400,180 C 400,200 380,220 360,220 L 300,220 L 300,240"
          fill="none"
          stroke="#33C3F0"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-flow-pulse-slow"
        />

        {/* Bottom Trace */}
        <path
          d="M 300,560 L 300,580 L 360,580 C 380,580 400,600 400,620 L 400,700"
          fill="none"
          stroke="#33C3F0"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-flow-pulse-slow"
        />

        {/* Bottom Complex Trace */}
        <path
          d="M 350,560 L 350,600 L 450,600 L 450,560"
          fill="none"
          stroke="#33C3F0"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-flow-pulse-fast"
        />

        {/* Waveform Inputs and Outputs */}
        {/* Left Input Wave */}
        <g transform="translate(0, 400)">
          <rect
            x="0"
            y="-20"
            width="200"
            height="40"
            fill="url(#wave-pattern)"
            className="animate-wave"
          />
        </g>

        {/* Right Output Wave */}
        <g transform="translate(600, 400) scale(-1, 1)">
          <rect
            x="0"
            y="-20"
            width="200"
            height="40"
            fill="url(#wave-pattern)"
            className="animate-wave"
          />
        </g>

        {/* Digital Input/Output signals */}
        <g transform="translate(400, 100)">
          <g transform="rotate(90)">
            {[0, 1, 0, 1, 1, 0, 1, 0].map((val, i) => (
              <rect
                key={`digital-top-${i}`}
                x={i * 25}
                y={val ? -20 : -10}
                width="25"
                height={val ? 20 : 10}
                fill="#33C3F0"
                fillOpacity="0.6"
              />
            ))}
          </g>
        </g>

        <g transform="translate(400, 700) rotate(180)">
          <g transform="rotate(90)">
            {[1, 0, 1, 0, 0, 1, 0, 1].map((val, i) => (
              <rect
                key={`digital-bottom-${i}`}
                x={i * 25}
                y={val ? -20 : -10}
                width="25"
                height={val ? 20 : 10}
                fill="#33C3F0"
                fillOpacity="0.6"
              />
            ))}
          </g>
        </g>

        {/* Glowing accents */}
        <circle
          cx="150"
          cy="300"
          r="5"
          fill="#1EAEDB"
          filter="url(#glow)"
          className="animate-flow-pulse"
        />
        <circle
          cx="650"
          cy="300"
          r="5"
          fill="#1EAEDB"
          filter="url(#glow)"
          className="animate-flow-pulse"
        />
        <circle
          cx="300"
          cy="150"
          r="5"
          fill="#1EAEDB"
          filter="url(#glow)"
          className="animate-flow-pulse-slow"
        />
        <circle
          cx="300"
          cy="650"
          r="5"
          fill="#1EAEDB"
          filter="url(#glow)"
          className="animate-flow-pulse-slow"
        />

        {/* Circuit ID */}
        <text x="400" y="570" fill="#33C3F0" fontSize="14" textAnchor="middle">
          ALU7803-42
        </text>
        <text x="400" y="590" fill="#33C3F0" fontSize="12" textAnchor="middle">
          REV.2
        </text>
      </svg>
    </div>
  );
};

export default ChipVisualization;
