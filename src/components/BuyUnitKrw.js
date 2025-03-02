export default function BuyUnitKrw({btcKrwPrice, krwAmount, p2pPremium, setKrwAmount, setP2pPremium}) {

  const satAmount = p2pPremium
    ? Number((krwAmount * 100000000 / btcKrwPrice * (1 - 0.01 * p2pPremium)).toFixed(0)).toLocaleString()
    : Number((krwAmount * 100000000 / btcKrwPrice).toFixed(0)).toLocaleString()

  return (
    <div className="small-container">
      <h2 className="title">KRW(원) 금액만큼 구매</h2>
      <table className="price-table">
        <tbody>
          <tr>
            <td className="bold">KRW(₩)</td>
            <td>
            <div className="input-section">
              <label>
                <input
                  type="number"
                  value={krwAmount}
                  onChange={(e) => setKrwAmount(e.target.value)}
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
                  type="number"
                  value={p2pPremium}
                  onChange={(e) => setP2pPremium(e.target.value)}
                />
              </label>
            </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>구매 시 받게 될 비트코인: <b>{satAmount}</b> sats</p>
    </div>
  );
}
