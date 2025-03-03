export default function BuyUnitSat({btcKrwPrice, satAmount, p2pPremium, setSatAmount, setP2pPremium}) {
  const satAmountNumber = Number(String(satAmount).replace(/,/g, ""));

  const krwAmount = p2pPremium
    ? Number((btcKrwPrice * (1 + 0.01 * p2pPremium) * satAmountNumber / 100000000).toFixed(0)).toLocaleString()
    : Number((btcKrwPrice * satAmountNumber / 100000000).toFixed(0)).toLocaleString()

  const handleChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");

    if (rawValue !== "") {
      const formattedValue = Number(rawValue).toLocaleString("en-US");
      setSatAmount(formattedValue);
    } else {
      setSatAmount("");
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
                <input
                  type="text"
                  inputMode="numeric"
                  value={satAmount}
                  onChange={handleChange}
                  style={{ textAlign: "right" }}
                />
              </label>
            </div>
            </td>
          </tr>
          <tr>
            <td className="bold">P(%)</td>
            <td>
            <div className="input-section">
              <label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={p2pPremium}
                  onChange={(e) => setP2pPremium(e.target.value)}
                  style={{ textAlign: "right" }}
                />
              </label>
            </div>
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
