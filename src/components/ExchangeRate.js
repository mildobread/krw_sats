export default function ExchangeRate({ exchangeRate, error }) {
  return (
    <div>
      {error ? (
        <span>{error}</span>
      ) : (
        <span>₩{exchangeRate?.toLocaleString()}</span>
      )}
    </div>
  );
}
