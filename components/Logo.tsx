/**
 * Inline SVG recreation of the Life in Abundance Ministries mark, drawn from
 * the church signage: a tree growing above two white cupped hands that hold a
 * heart, all set inside a green roundel.
 *
 * Self-contained (carries its own background disc), so it reads correctly on
 * both the dark hero and the light page chrome.
 */
export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Life in Abundance Ministries logo"
    >
      {/* roundel */}
      <circle cx="50" cy="50" r="49" fill="#7AB648" />
      <circle cx="50" cy="50" r="42" fill="#A5D96B" />

      {/* tree canopy */}
      <g fill="#3E7C3A">
        <circle cx="50" cy="34" r="11" />
        <circle cx="38" cy="40" r="8" />
        <circle cx="62" cy="40" r="8" />
        <circle cx="43" cy="28" r="7" />
        <circle cx="57" cy="28" r="7" />
      </g>

      {/* trunk */}
      <path d="M50 58V42" stroke="#3E7C3A" strokeWidth="3.5" strokeLinecap="round" />

      {/* heart cradled in the hands */}
      <path
        d="M50 74c-8-6-12-10-12-15a6 6 0 0 1 12-2.6A6 6 0 0 1 62 59c0 5-4 9-12 15z"
        fill="#1B5A7D"
      />

      {/* two cupped hands forming a bowl */}
      <g stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M19 62c1.5 16 14 25 31 25" />
        <path d="M81 62c-1.5 16-14 25-31 25" />
      </g>
    </svg>
  );
}
