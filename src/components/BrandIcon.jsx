export default function BrandIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="none"
      className={className}
    >
      {/* White Leaf Shape */}
      <path 
        d="M12 2C12 2 3 11 3 16C3 19.866 6.13401 23 10 23C13.866 23 17 19.866 17 16C17 11 12 2 12 2Z" 
        fill="white" 
      />
      {/* "Cutout" Power Bolt (Matches Background #020617) */}
      <path 
        d="M10 18L13 11H9L12 5L8 13H11L10 18Z" 
        fill="#020617" 
      />
    </svg>
  );
}