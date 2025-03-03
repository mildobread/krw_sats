export default function P2pPremiumInput({ p2pPremium, setP2pPremium }) {
  const handleChange = (e) => {
    let rawValue = e.target.value;
    if (!/^(\d*\.?\d*)$/.test(rawValue)) return; // 숫자와 "."만 허용
    setP2pPremium(rawValue !== "" ? rawValue : "");
  };

  const handleFocus = () => {
    if (Number(p2pPremium) === 0) {
      setP2pPremium(""); // 클릭 시 기본값 0이면 지우기
    }
  };

  const handleBlur = () => {
    if (p2pPremium === "") {
      setP2pPremium("0"); // 입력 후 비어 있으면 다시 0으로 설정
    }
  };

  return (
    <div className="input-section">
      <label>
        <input className="input_box"
          type="text"
          inputMode="decimal"
          value={p2pPremium}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>
    </div>
  );
};

