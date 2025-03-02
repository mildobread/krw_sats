import UpbitPrice from "./UpbitPrice";
import ExchangeRate from "./ExchangeRate";

export default function BitcoinPrice() {
  return (
    <div>
      <h1>BTC Price</h1>
      <UpbitPrice/>
      <ExchangeRate/>
    </div>
  );
}
