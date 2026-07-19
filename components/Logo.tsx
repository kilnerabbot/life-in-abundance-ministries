// Inline SVG logo: two hands cupping a heart from which a small tree grows,
// inside a circle. Green on white/off-white, per brand guidelines.
export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Life in Abundance Ministries logo"
    >
      <circle cx="50" cy="50" r="48" fill="#F7F7F2" stroke="#3E7C3A" strokeWidth="2" />
      {/* trunk */}
      <path d="M50 58 L50 46" stroke="#3E7C3A" strokeWidth="3" strokeLinecap="round" />
      {/* small tree canopy */}
      <circle cx="50" cy="38" r="9" fill="#7AB648" />
      <circle cx="41" cy="43" r="6" fill="#7AB648" />
      <circle cx="59" cy="43" r="6" fill="#7AB648" />
      {/* heart */}
      <path
        d="M50 66c-9-6-16-11-16-19a9 9 0 0 1 16-6 9 9 0 0 1 16 6c0 8-7 13-16 19z"
        fill="#1B5A7D"
      />
      {/* cupping hands */}
      <path
        d="M18 68c4-10 14-14 22-11l4 2 4-2c8-3 18 1 22 11-6 9-16 15-26 15h-0c-10 0-20-6-26-15z"
        fill="none"
        stroke="#3E7C3A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
