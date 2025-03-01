import { useState, useEffect } from "react";

export default function BitcoinPrice() {
  const [price, setPrice] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      console.log("WebSocket Connected");

      const payload = JSON.stringify([
        { ticket: `btc-price-${Date.now()}` },
        { type: "ticker", codes: ["KRW-BTC"] },
      ]);

      const blob = new Blob([payload], { type: "application/json" });
      socket.send(blob);
    };

    socket.onmessage = async (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          console.log("WebSocket Data Received:", data);
          setPrice(data.trade_price);
        } catch (err) {
          console.error("WebSocket Data Parsing Error:", err);
          setError("WebSocket Parsing Error");
        }
      };
      reader.readAsText(event.data);
    };

    return () => {
      console.log("Closing WebSocket");
      socket.close();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">BTC Price (KRW)</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : price ? (
        <div>
          <p className="text-xl mt-2">₩{price.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Time: {currentTime}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
