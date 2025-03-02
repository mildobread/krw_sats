import { useState, useEffect } from "react";

export default function ExchangeRate() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch("https://api.manana.kr/exchange/rate/KRW/USD.json");
        const data = await response.json();
        setExchangeRate(data[0].rate);
      } catch (err) {
        setError("Exchange Rate Fetch Error");
      }
    };

    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <span className="text-xl font-bold">USD/KRW 환율: </span>
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : (
        <span>₩{exchangeRate?.toLocaleString()}</span>
      )}
    </div>
  );
}
