export function PlayStoreIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <g>
        <polygon fill="#2196F3" points="48,32 464,256 48,480"/>
        <polygon fill="#4CAF50" points="48,32 256,256 48,480"/>
        <polygon fill="#FFC107" points="464,256 256,256 48,480"/>
        <polygon fill="#F44336" points="464,256 256,256 48,32"/>
      </g>
    </svg>
  );
}
