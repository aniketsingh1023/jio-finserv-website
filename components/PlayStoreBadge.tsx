export function PlayStoreBadge({ height = 48 }: { height?: number }) {
  const width = (height * 564) / 168;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 564 168"
      width={width}
      height={height}
      role="img"
      aria-label="Get it on Google Play"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <rect x="0" y="0" width="564" height="168" rx="22" ry="22" fill="#000" />
      <rect
        x="2"
        y="2"
        width="560"
        height="164"
        rx="20"
        ry="20"
        fill="none"
        stroke="#A6A6A6"
        strokeWidth="1"
      />
      <g transform="translate(40 38)">
        <defs>
          <linearGradient id="psbGreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00A0FF" />
            <stop offset="100%" stopColor="#00E2FF" />
          </linearGradient>
          <linearGradient id="psbYellow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFE000" />
            <stop offset="100%" stopColor="#FFBD00" />
          </linearGradient>
          <linearGradient id="psbRed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF3A44" />
            <stop offset="100%" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id="psbBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#32A071" />
            <stop offset="100%" stopColor="#2DA771" />
          </linearGradient>
        </defs>
        <polygon points="0,0 0,92 46,46" fill="url(#psbGreen)" />
        <polygon points="0,0 64,28 46,46" fill="url(#psbRed)" />
        <polygon points="0,92 64,64 46,46" fill="url(#psbBlue)" />
        <polygon points="64,28 92,46 64,64" fill="url(#psbYellow)" />
      </g>
      <g fill="#fff" fontFamily="Roboto, Arial, sans-serif">
        <text x="170" y="68" fontSize="22" fontWeight="400">
          GET IT ON
        </text>
        <text x="170" y="120" fontSize="40" fontWeight="600">
          Google Play
        </text>
      </g>
    </svg>
  );
}
