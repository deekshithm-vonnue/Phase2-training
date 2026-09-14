import "../styles/retry.css";

export default function Retry({
  error,
  refetch,
}: {
  error: string;
  refetch?: () => void;
}) {
  return (
    <div className="error-state">
      <p > Error: {error}</p>
      <button  onClick={refetch}>Try Again</button>
    </div>
  );
}
