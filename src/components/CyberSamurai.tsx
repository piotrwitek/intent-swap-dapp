interface CyberSamuraiProps {
  className?: string;
}

export default function CyberSamurai({
  className = "w-full h-full",
}: CyberSamuraiProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Cyber Samurai SVG with slicing animation */}
      <svg
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient
            id="cyberGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <linearGradient id="swordGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background energy waves */}
        <g className="animate-pulse">
          <path
            d="M0 200 Q200 180 400 200 T800 200"
            stroke="url(#energyGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M0 210 Q200 190 400 210 T800 210"
            stroke="url(#energyGradient)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M0 190 Q200 170 400 190 T800 190"
            stroke="url(#energyGradient)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </g>

        {/* Cyber Samurai Body */}
        <g transform="translate(150, 100)">
          {/* Head with cyber helmet */}
          <circle
            cx="100"
            cy="80"
            r="25"
            fill="url(#cyberGradient)"
            filter="url(#glow)"
          />

          {/* Helmet details */}
          <rect x="85" y="65" width="30" height="8" rx="2" fill="#1f2937" />
          <circle cx="92" cy="75" r="2" fill="#06b6d4" />
          <circle cx="108" cy="75" r="2" fill="#06b6d4" />

          {/* Visor glow */}
          <rect
            x="88"
            y="72"
            width="24"
            height="3"
            rx="1"
            fill="#06b6d4"
            opacity="0.8"
          />

          {/* Body armor */}
          <rect
            x="80"
            y="100"
            width="40"
            height="60"
            rx="5"
            fill="url(#cyberGradient)"
            filter="url(#glow)"
          />

          {/* Chest panel */}
          <rect x="85" y="110" width="30" height="15" rx="2" fill="#1f2937" />
          <rect x="88" y="113" width="24" height="2" fill="#ec4899" />
          <rect x="88" y="117" width="24" height="2" fill="#06b6d4" />
          <rect x="88" y="121" width="24" height="2" fill="#8b5cf6" />

          {/* Arms */}
          <ellipse cx="65" cy="120" rx="8" ry="20" fill="url(#cyberGradient)" />
          <ellipse
            cx="135"
            cy="120"
            rx="8"
            ry="20"
            fill="url(#cyberGradient)"
          />

          {/* Legs */}
          <ellipse cx="90" cy="180" rx="6" ry="25" fill="url(#cyberGradient)" />
          <ellipse
            cx="110"
            cy="180"
            rx="6"
            ry="25"
            fill="url(#cyberGradient)"
          />
        </g>

        {/* Cyber Katana - Horizontal slice */}
        <g className="animate-pulse">
          {/* Sword blade extending across screen */}
          <rect
            x="300"
            y="198"
            width="500"
            height="4"
            fill="url(#swordGradient)"
            filter="url(#glow)"
          />

          {/* Energy trail */}
          <rect
            x="320"
            y="196"
            width="480"
            height="8"
            fill="url(#energyGradient)"
            opacity="0.3"
          />

          {/* Sword handle */}
          <rect x="280" y="195" width="25" height="10" rx="2" fill="#1f2937" />
          <rect x="275" y="194" width="8" height="12" rx="1" fill="#8b5cf6" />
        </g>

        {/* Energy particles */}
        <g className="animate-bounce">
          <circle cx="350" cy="190" r="2" fill="#ec4899" opacity="0.8" />
          <circle cx="450" cy="210" r="1.5" fill="#06b6d4" opacity="0.6" />
          <circle cx="550" cy="185" r="2" fill="#8b5cf6" opacity="0.7" />
          <circle cx="650" cy="205" r="1" fill="#fbbf24" opacity="0.9" />
          <circle cx="750" cy="195" r="1.5" fill="#ec4899" opacity="0.5" />
        </g>

        {/* Slice effect line */}
        <line
          x1="300"
          y1="200"
          x2="800"
          y2="200"
          stroke="#06b6d4"
          strokeWidth="1"
          opacity="0.8"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}
