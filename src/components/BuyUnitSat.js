import P2pPremiumInput from "./P2pPremiumInput";

export default function BuyUnitSat({btcKrwPrice, satAmount, p2pPremium, setSatAmount, setP2pPremium}) {
  const satAmountNumber = Number(String(satAmount).replace(/,/g, ""));

  const krwAmount = p2pPremium
    ? Number((btcKrwPrice * (1 + 0.01 * p2pPremium) * satAmountNumber / 100000000).toFixed(0)).toLocaleString()
    : Number((btcKrwPrice * satAmountNumber / 100000000).toFixed(0)).toLocaleString()

  const handleChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, ""); // 숫자만 남김
    setSatAmount(rawValue !== "" ? Number(rawValue).toLocaleString("en-US") : "");
  };

  const handleFocus = () => {
    if (Number(String(krwAmount).replace(/,/g, "")) === 0) {
      setSatAmount("");
    }
  };

  const handleBlur = () => {
    if (krwAmount === "") {
      setSatAmount("0");
    }
  };

  return (
    <div className="small-container">
      <h3 className="title">BTC(사토시) 수량만큼 구매</h3>
      <table className="price-table">
        <tbody>
          <tr>
            <td className="bold">BTC(sats)</td>
            <td>
            <div className="input-section">
              <label>
                <input className="input_box"
                  type="text"
                  inputMode="numeric"
                  value={satAmount}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </label>
            </div>
            </td>
          </tr>
          <tr>
            <td className="bold">P(%)</td>
            <td>
              <P2pPremiumInput
                p2pPremium={p2pPremium}
                setP2pPremium={setP2pPremium}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <div>입금해야 할 금액(KRW)</div>
        <div><b>{krwAmount}</b> ₩</div>
      </p>
    </div>
  );
}
