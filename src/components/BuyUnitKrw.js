import P2pPremiumInput from "./P2pPremiumInput";

export default function BuyUnitKrw({ btcKrwPrice, krwAmount, p2pPremium, setKrwAmount, setP2pPremium }) {
  const krwAmountNumber = Number(String(krwAmount).replace(/,/g, "")); // 쉼표 제거 후 숫자로 변환

  const satAmount = p2pPremium
    ? Number((krwAmountNumber * 100000000 / btcKrwPrice * (1 - 0.01 * p2pPremium)).toFixed(0)).toLocaleString()
    : Number((krwAmountNumber * 100000000 / btcKrwPrice).toFixed(0)).toLocaleString();

  const handleChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, ""); // 숫자만 남김
    setKrwAmount(rawValue !== "" ? Number(rawValue).toLocaleString("en-US") : "");
  };

  const handleFocus = () => {
    if (Number(String(krwAmount).replace(/,/g, "")) === 0) {
      setKrwAmount(""); // 클릭 시 기본값이 0이면 지우기
    }
  };

  const handleBlur = () => {
    if (krwAmount === "") {
      setKrwAmount("0"); // 입력 후 비어 있으면 다시 0으로 설정
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
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ textAlign: "right" }}
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
        <div>구매 시 받게 될 비트코인</div>
        <div><b>{satAmount}</b> sats</div>
      </p>
    </div>
  );
}
