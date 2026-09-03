import "../styles/button.css";

interface ButtonProps {
  handleFunction?: () => void;
  children: React.ReactNode;
}

export default function Button({ handleFunction, children }: ButtonProps) {
  const stringIdentifier =
    typeof children === "string"
      ? children.toLowerCase().trim().replace(/\s+/g, "-")
      : "default";

  return (
    <button
      className={`button color-${stringIdentifier}`}
      onClick={handleFunction}
    >
      {children}
    </button>
  );
}
