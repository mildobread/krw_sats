import UpbitPrice from "./UpbitPrice";
import BinancePrice from "./BinancePrice";

export default function BitcoinPrice() {
  return (
    <div>
      <h1>BTC Price</h1>
      <UpbitPrice/>
      <BinancePrice/>
    </div>
  );
}
