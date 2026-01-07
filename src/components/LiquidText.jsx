export default function LiquidText({ children, className = "" }) {
  return (
    <span 
      className={`bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite] ${className}`}
    >
      {children}
    </span>
  );
}