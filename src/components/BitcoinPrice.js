import { useState } from "react";
import UpbitPrice from "./UpbitPrice";
import BinancePrice from "./BinancePrice";
import BuyUnitKrw from "./BuyUnitKrw";
import BuyUnitSat from "./BuyUnitSat";
import CurrentTime from "./CurrentTime";
import InfoTable from "./InfoTable";
import "./BitcoinPrice.css";

export default function BitcoinPrice() {
  const [btcKrwPrice, setBtcKrwPrice] = useState(null);
  const [btcUsdtPrice, setBtcUsdtPrice] = useState(null);
  const [krwUsdtPrice, setKrwUsdtPrice] = useState(null);
  const [krwAmount, setKrwAmount] = useState(0);
  const [satAmount, setSatAmount] = useState(0);
  const [p2pPremium, setP2pPremium] = useState(0);

  return (
    <div className="container">
      <UpbitPrice 
        setKrwBtcPrice={setBtcKrwPrice} 
        setKrwUsdtPrice={setKrwUsdtPrice} 
      />

      {btcKrwPrice === null ? (
        <div className="loading-container">
          <img src="https://img.mk.co.kr/mkde/ic_loading_img.gif" alt="Loading..." className="loading-gif" />
        </div>
      ) : (
        <>
          <h3 className="title"><CurrentTime /></h3>

          <BinancePrice setBtcUsdtPrice={setBtcUsdtPrice} />

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
        </>
      )}
    </div>
  );
}
