import { useState, useEffect } from "react";

export default function BitcoinPrice() {
  const [price, setPrice] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [error, setError] = useState(null);

  useEffect(() => {
    // WebSocket으로 가격 데이터 가져오기
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

  useEffect(() => {
    // 1초마다 현재 시간 업데이트
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Bitcoin Price (KRW)</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : price ? (
        <div>
          <p className="text-xl mt-2">₩{price.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Current Time: {currentTime}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
