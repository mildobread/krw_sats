import { useState, useEffect } from "react";
import ExchangeRate from "./ExchangeRate";

export default function InfoTable({ btcKrwPrice, btcUsdtPrice, krwUsdtPrice }) {
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
    const interval = setInterval(fetchExchangeRate, 1000);
    return () => clearInterval(interval);
  }, []);

  const kimchiPremium = btcKrwPrice && btcUsdtPrice && exchangeRate
  ? ((btcKrwPrice / (btcUsdtPrice * exchangeRate) - 1) * 100).toFixed(2)
  : null;

  return (
    <table className="price-table">
      <tbody>
        <tr>
          <td>BTC/KRW</td>
          <td>₩{btcKrwPrice?.toLocaleString()}</td>
        </tr>
        <tr>
          <td>BTC/USDT</td>
          <td>${btcUsdtPrice?.toLocaleString()}</td>
        </tr>
        <tr>
          <td>KRW/USDT</td>
          <td>₩{krwUsdtPrice?.toLocaleString()}</td>
        </tr>
        <tr>
          <td className="bold">환율</td>
          <td><ExchangeRate exchangeRate={exchangeRate} error={error}/></td>
        </tr>
        <tr>
          <td className="bold">김프</td>
          <td className={`${kimchiPremium > 0 ? "bold red" : "black"}`}>
            {kimchiPremium ? `${kimchiPremium}%` : "Loading..."}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
