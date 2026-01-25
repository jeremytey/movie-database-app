export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error">
      <h2>⚠️ Error</h2>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try Again</button>}
    </div>
  );
}