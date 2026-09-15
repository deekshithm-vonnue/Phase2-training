import "../styles/badge.css";
interface BadgeProps {
  text: string;
  variant?: string;
}

export function Badge({ text, variant = "info" }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{text}</span>;
}
