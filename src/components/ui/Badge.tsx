interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.07)] bg-[#111111] px-3 py-1 text-xs font-medium text-[#888888] ${className}`}
    >
      {children}
    </span>
  );
}
