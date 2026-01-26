export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error">
      <h2>⚠️ Error</h2>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try Again</button>} 
    </div>
  );
}

// conditional rendering of retry button if onRetry prop is provided
// Example usage:
// <ErrorMessage message="Network error" onRetry={() => console.log('Retrying...')} />
