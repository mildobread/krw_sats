import { useState, useEffect } from "react";

export default function UpbitPrice() {
  const [krwPrice, setKrwPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      console.log("Upbit WebSocket Connected");
      const payload = JSON.stringify([
        { ticket: `btc-price-${Date.now()}` },
        { type: "ticker", codes: ["KRW-BTC"] },
      ]);
      socket.send(new Blob([payload], { type: "application/json" }));
    };

    socket.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          setKrwPrice(data.trade_price);
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
      <span>Upbit BTC/KRW: </span>
      {error ? (
        <span>{error}</span>
      ) : (
        <span>₩{krwPrice?.toLocaleString()}</span>
      )}
    </div>
  );
}
