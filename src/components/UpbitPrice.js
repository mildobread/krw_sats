import { useState, useEffect, useRef } from "react";

export default function UpbitPrice({ setKrwBtcPrice, setUsdtBtcPrice, setKrwUsdtPrice }) {
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    let reconnectTimeout = null;

    const connectWebSocket = () => {
      if (socketRef.current) {
        socketRef.current.close();
      }

      const socket = new WebSocket("wss://api.upbit.com/websocket/v1");
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("Upbit WebSocket Connected");
        setError(null);
        const payload = JSON.stringify([
          { ticket: `btc-price-${Date.now()}` },
          { type: "ticker", codes: ["KRW-BTC", "USDT-BTC", "KRW-USDT"] },
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
              setKrwBtcPrice(data.trade_price);
            } else if (data.code === "USDT-BTC") {
              setUsdtBtcPrice(data.trade_price);
            } else if (data.code === "KRW-USDT") {
              setKrwUsdtPrice(data.trade_price);
            }
          } catch (err) {
            setError("Upbit WebSocket Error");
            console.error("WebSocket JSON Parse Error:", err);
            socket.close(); // 오류 발생 시 웹소켓 종료
          }
        };
        reader.readAsText(event.data);
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
        setError("WebSocket Connection Error");
        socket.close();
      };

      socket.onclose = () => {
        console.warn("WebSocket Disconnected. Reconnecting in 1 seconds...");
        reconnectTimeout = setTimeout(connectWebSocket, 1000);
      };
    };

    connectWebSocket();

    return () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  return null; // UI 없이 데이터만 전달
}
