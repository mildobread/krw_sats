import { useState } from "react";
import UpbitPrice from "./UpbitPrice";
import BuyUnitKrw from "./BuyUnitKrw";
import BuyUnitSat from "./BuyUnitSat";
import CurrentTime from "./CurrentTime"
import InfoTable from "./InfoTable";
import "./BitcoinPrice.css";

export default function BitcoinPrice() {
  const [btcUsdtPrice, setBtcUsdtPrice] = useState(null);
  const [krwUsdtPrice, setKrwUsdtPrice] = useState(null);
  const [btcKrwPrice, setBtcKrwPrice] = useState(null);
  const [krwAmount, setKrwAmount] = useState(0);
  const [satAmount, setSatAmount] = useState(0);
  const [p2pPremium, setP2pPremium] = useState(0); // P2P 프리미엄 입력값 (기본값: 0%)

  return (
    <div className="container">
      <h3 className="title"><CurrentTime/></h3>

      <UpbitPrice 
        setKrwBtcPrice={setBtcKrwPrice} 
        setUsdtBtcPrice={setBtcUsdtPrice} 
        setKrwUsdtPrice={setKrwUsdtPrice} 
      />

      <InfoTable
        btcKrwPrice={btcKrwPrice}
        btcUsdtPrice={btcUsdtPrice}
        krwUsdtPrice={krwUsdtPrice}
      />

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
