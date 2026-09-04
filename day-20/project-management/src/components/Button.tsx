import "../styles/button.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  handleFunction?: () => void;
  children: React.ReactNode;
}

export default function Button({
  type = "button",
  handleFunction,
  children,
}: ButtonProps) {
  const stringIdentifier =
    typeof children === "string"
      ? children.toLowerCase().trim().replace(/\s+/g, "-")
      : "default";

  return (
    <button
      type={type}
      className={`button color-${stringIdentifier}`}
      onClick={handleFunction}
    >
      {children}
    </button>
  );
}
