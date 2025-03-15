interface FootwearIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export default function FootwearIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: FootwearIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
    >
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      >
        <path d="M14.1 7.9L12.5 10m4.9.1L16 12M2 16a2 2 0 0 0 2 2h13c2.8 0 5-2.2 5-5a2 2 0 0 0-2-2c-.8 0-1.6-.2-2.2-.7l-6.2-4.2c-.4-.3-.9-.2-1.3.1c0 0-.6.8-1.2 1.1a3.5 3.5 0 0 1-4.2.1C4.4 7 3.7 6.3 3.7 6.3A.92.92 0 0 0 2 7Z" />
        <path d="M2 11c0 1.7 1.3 3 3 3h7" />
      </g>
    </svg>
  );
}
