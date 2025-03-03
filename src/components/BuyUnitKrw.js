export default function BuyUnitKrw({btcKrwPrice, krwAmount, p2pPremium, setKrwAmount, setP2pPremium}) {
  const krwAmountNumber = Number(String(krwAmount).replace(/,/g, ""));

  const satAmount = p2pPremium
    ? Number((krwAmountNumber * 100000000 / btcKrwPrice * (1 - 0.01 * p2pPremium)).toFixed(0)).toLocaleString()
    : Number((krwAmountNumber * 100000000 / btcKrwPrice).toFixed(0)).toLocaleString()

  const handleChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");

    if (rawValue !== "") {
      const formattedValue = Number(rawValue).toLocaleString("en-US");
      setKrwAmount(formattedValue);
    } else {
      setKrwAmount("");
    }
  };

  return (
    <div className="small-container">
      <h3 className="title">KRW(원) 금액만큼 구매</h3>
      <table className="price-table">
        <tbody>
          <tr>
            <td className="bold">KRW(₩)</td>
            <td>
            <div className="input-section">
              <label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={krwAmount}
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
        <div>구매 시 받게 될 비트코인</div>
        <div><b>{satAmount}</b> sats</div>
      </p>
    </div>
  );
}
