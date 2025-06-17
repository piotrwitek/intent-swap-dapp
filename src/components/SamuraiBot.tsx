interface SamuraiBotProps {
  className?: string;
  animated?: boolean;
}

export default function SamuraiBot({
  className = "w-8 h-8",
  animated = false,
}: SamuraiBotProps) {
  return (
    <div className={`${className} ${animated ? "animate-bounce" : ""}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Samurai Hat */}
        <path
          d="M20 35 L50 25 L80 35 L75 20 L25 20 Z"
          fill="#1f2937"
          stroke="#ec4899"
          strokeWidth="2"
        />

        {/* Head */}
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="#fbbf24"
          stroke="#ec4899"
          strokeWidth="2"
        />

        {/* Eyes */}
        <circle cx="44" cy="46" r="2" fill="#1f2937" />
        <circle cx="56" cy="46" r="2" fill="#1f2937" />

        {/* Mouth */}
        <path
          d="M46 54 Q50 58 54 54"
          stroke="#1f2937"
          strokeWidth="2"
          fill="none"
        />

        {/* Body */}
        <rect
          x="40"
          y="65"
          width="20"
          height="25"
          rx="5"
          fill="#ec4899"
          stroke="#1f2937"
          strokeWidth="2"
        />

        {/* Arms */}
        <circle cx="32" cy="75" r="5" fill="#fbbf24" />
        <circle cx="68" cy="75" r="5" fill="#fbbf24" />

        {/* Sword */}
        <line
          x1="68"
          y1="75"
          x2="85"
          y2="60"
          stroke="#94a3b8"
          strokeWidth="3"
        />
        <rect x="82" y="57" width="6" height="3" fill="#1f2937" />

        {/* Coin */}
        <circle
          cx="32"
          cy="75"
          r="3"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <text
          x="32"
          y="77"
          fontSize="4"
          textAnchor="middle"
          fill="#1f2937"
          fontWeight="bold"
        >
          $
        </text>
      </svg>
    </div>
  );
}
