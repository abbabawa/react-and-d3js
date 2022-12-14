import logo from './logo.svg';
import './App.css';

import LineChart from './components/LineChart'
import ScatterPlot from './components/ScatterPlot';

let data = [
  { date: 20220101, impressions: 100 },
  { date: 20220102, impressions: 120 },
  // ... truncated but you get it
];

function App() {
  return (
    <div className="App">
      <ScatterPlot />
      {/* <LineChart Data={data} /> */}
    </div>
  );
}

export default App;
