import { useState, useEffect } from "react";

export default function BitcoinPrice() {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      socket.send(
        JSON.stringify([
          { ticket: "test" },
          { type: "ticker", codes: ["KRW-BTC"] },
        ])
      );
    };

    socket.onmessage = async (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result);
        setPrice(data.trade_price);
      };
      reader.readAsText(event.data);
    };

    socket.onerror = (err) => {
      setError("WebSocket Error: " + err.message);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Bitcoin Price (KRW)</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : price ? (
        <p className="text-xl mt-2">₩{price.toLocaleString()}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
