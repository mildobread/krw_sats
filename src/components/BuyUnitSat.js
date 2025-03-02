export default function BuyUnitSat({btcKrwPrice, satAmount, p2pPremium, setSatAmount, setP2pPremium}) {

  const krwAmount = p2pPremium
    ? Number((btcKrwPrice * (1 + 0.01 * p2pPremium) * satAmount / 100000000).toFixed(0)).toLocaleString()
    : Number((btcKrwPrice * satAmount / 100000000).toFixed(0)).toLocaleString()

  return (
    <div className="container">
      <h2 className="title">BTC(사토시) 수량만큼 구매</h2>
      <table className="price-table">
        <tbody>
          <tr>
            <td className="bold">BTC(sats)</td>
            <td>
            <div className="input-section">
              <label>
                <input
                  type="number"
                  value={satAmount}
                  onChange={(e) => setSatAmount(e.target.value)}
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
      <p>입금해야 할 금액(KRW): ₩<b>{krwAmount}</b></p>
    </div>
  );
}
