/**
 * "maha" wordmark drawn as geometric monoline strokes so it renders the same
 * everywhere (no font dependency). A small maroon dot closes the word.
 */
const STROKE = 3.6;

export function LogoMark({ className = '', title = 'Maha' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 34 34"
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 29V8" />
      <path d="M5 17C5 8.5 17 8.5 17 17V29" />
      <path d="M17 17C17 8.5 29 8.5 29 17V29" />
    </svg>
  );
}

export default function Logo({ className = '', title = 'Maha' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 112 36"
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* m */}
      <path d="M4 31V12" />
      <path d="M4 20C4 12 16 12 16 20V31" />
      <path d="M16 20C16 12 28 12 28 20V31" />
      {/* a */}
      <circle cx="44" cy="22.5" r="8.5" />
      <path d="M52.5 13.5V31" />
      {/* h */}
      <path d="M60 4V31" />
      <path d="M60 20C60 12 72 12 72 20V31" />
      {/* a */}
      <circle cx="88" cy="22.5" r="8.5" />
      <path d="M96.5 13.5V31" />
      {/* maroon full stop */}
      <circle cx="105" cy="30" r="2.4" fill="var(--maroon)" stroke="none" />
    </svg>
  );
}
