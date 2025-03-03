import './App.css';
import { Analytics } from "@vercel/analytics/react"
import BitcoinPrice from "./components/BitcoinPrice";

function App() {
  return (
    <div className="App">
      <Analytics/>
      <BitcoinPrice/>
    </div>
  );
}

export default App;
