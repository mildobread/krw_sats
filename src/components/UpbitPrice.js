import { useEffect } from "react";

export default function UpbitPrice({ setKrwBtcPrice, setUsdtBtcPrice, setKrwUsdtPrice, setError }) {
  useEffect(() => {
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      console.log("Upbit WebSocket Connected");
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
        }
      };
      reader.readAsText(event.data);
    };

    return () => socket.close();
  }, []);

  return null; // UI 없이 데이터만 전달
}
