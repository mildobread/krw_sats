import { useState, useEffect } from "react";
import UpbitPrice from "./UpbitPrice";
import ExchangeRate from "./ExchangeRate";
import BuyUnitKrw from "./BuyUnitKrw";
import BuyUnitSat from "./BuyUnitSat";
import CurrentTime from "./CurrentTime"
import "./BitcoinPrice.css";

export default function BitcoinPrice() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [btcUsdtPrice, setBtcUsdtPrice] = useState(null);
  const [krwUsdtPrice, setKrwUsdtPrice] = useState(null);
  const [btcKrwPrice, setBtcKrwPrice] = useState(null);
  const [error, setError] = useState(null);
  const [krwAmount, setKrwAmount] = useState(0);
  const [satAmount, setSatAmount] = useState(0);
  const [p2pPremium, setP2pPremium] = useState(0); // P2P 프리미엄 입력값 (기본값: 0%)

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

  const kimchiPremium = btcKrwPrice && btcUsdtPrice && exchangeRate
    ? ((btcKrwPrice / (btcUsdtPrice * exchangeRate) - 1) * 100).toFixed(2)
    : null;

  return (
    <div className="container">
      <div className="title">
        <h1 className>BTC Price</h1>
        <CurrentTime/>
      </div>

      <UpbitPrice 
        setKrwBtcPrice={setBtcKrwPrice} 
        setUsdtBtcPrice={setBtcUsdtPrice} 
        setKrwUsdtPrice={setKrwUsdtPrice} 
        setError={setError} 
      />

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
            <td><ExchangeRate exchangeRate={exchangeRate} error={error} /></td>
          </tr>
          <tr>
            <td className="bold">김프</td>
            <td className={`bold ${kimchiPremium > 0 ? "red" : "blue"}`}>
              {kimchiPremium ? `${kimchiPremium}%` : "데이터 없음"}
            </td>
          </tr>
        </tbody>
      </table>

      <BuyUnitKrw
        btcKrwPrice={btcKrwPrice}
        krwAmount={krwAmount}
        p2pPremium={p2pPremium}
        setKrwAmount={setKrwAmount}
        setP2pPremium={setP2pPremium}
      />

      <BuyUnitSat
        btcKrwPrice={btcKrwPrice}
        satAmount={satAmount}
        p2pPremium={p2pPremium}
        setSatAmount={setSatAmount}
        setP2pPremium={setP2pPremium}
      />
    </div>
  );
}
