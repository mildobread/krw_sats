import { useState, useEffect } from "react";

export default function UpbitPrice() {
  const [krwPrice, setKrwPrice] = useState(null);
  const [usdtPrice, setUsdtPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      console.log("Upbit WebSocket Connected");
      const payload = JSON.stringify([
        { ticket: `btc-price-${Date.now()}` },
        { type: "ticker", codes: ["KRW-BTC", "USDT-BTC"] }, // ✅ USDT-BTC 추가
      ]);
      socket.send(new Blob([payload], { type: "application/json" }));
    };

    socket.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          console.log("Received Data:", data);

          if (data.code === "KRW-BTC") {
            setKrwPrice(data.trade_price);
          } else if (data.code === "USDT-BTC") {
            setUsdtPrice(data.trade_price);
          }
        } catch (err) {
          setError("Upbit WebSocket Error");
        }
      };
      reader.readAsText(event.data);
    };

    return () => socket.close();
  }, []);

  return (
    <div>
      <div>
        <span className="text-xl font-bold">BTC/KRW: </span>
        {error ? (
          <span className="text-red-500">{error}</span>
        ) : (
          <span>₩{krwPrice?.toLocaleString()}</span>
        )}
      </div>

      <div>
        <span className="text-xl font-bold">BTC/USDT: </span>
        {error ? (
          <span className="text-red-500">{error}</span>
        ) : (
          <span>${usdtPrice?.toLocaleString()}</span>
        )}
      </div>
    </div>
  );
}
