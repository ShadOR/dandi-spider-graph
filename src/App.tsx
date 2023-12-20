import { useState } from 'react';

import SpiderGraph from './components/SpiderGraph';

import './App.scss';

function App() {
  const [hovered, setHovered] = useState(0);
  const datasets = [
    {
      name: 'Still in role',
      attributes: [70, 40, 80, 35, 50, 60],
      color: 'rgba(255, 145, 51, 1)',
    },
    {
      name: 'Exits',
      attributes: [45, 70, 60, 65, 15, 45],
      color: 'rgba(255, 233, 154, 1)',
    }
  ]
  const categories = ['Promotion rate', 'Performance score', 'Comp', 'Age', 'Engagement score', 'Manager rating'];

  return (
    <div className="app">
      <div className="container">
        <div className="label">Engineering attrition attributes</div>
        <div className="legend">{
          datasets.map((set, i) => (
            <div
              key={i}
              className="name"
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(0)}
            >
              <span className="dot" style={{ backgroundColor: set.color }}></span>{set.name}
            </div>
          ))
        }</div>
        <SpiderGraph datasets={datasets} categories={categories} hovered={hovered} />
      </div>
    </div>
  );
}

export default App;
