export default function BrandIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      {/* Outer Hexagon Ring (Thick Stroke) */}
      <path 
        d="M16 4.5L26.5 10.5V21.5L16 27.5L5.5 21.5V10.5L16 4.5Z" 
        stroke="currentColor" // Uses text color (white)
        strokeWidth="3"
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Inner Power Bolt (Solid Fill) */}
      <path 
        d="M15 23L18.5 13H13.5L17 5L10 15H14.5L13.5 23Z" 
        fill="currentColor" // Uses text color (white)
      />
    </svg>
  );
}