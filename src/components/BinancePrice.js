import { useState, useEffect } from "react";

export default function BinancePrice() {
  const [usdPrice, setUsdPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBinancePrice = async () => {
      try {
        const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
        const data = await response.json();
        setUsdPrice(parseFloat(data.price));
      } catch (err) {
        setError("Binance API Error");
      }
    };

    fetchBinancePrice();
    const interval = setInterval(fetchBinancePrice, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <span>Binance BTC/USDT: </span>
    {error ? (
      <span>{error}</span>
    ) : (
      <span>${usdPrice?.toLocaleString()}</span>
    )}
    </div>
  );
}
