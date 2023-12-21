type Dataset = {
  name: string;
  attributes: number[];
  color: string;
};

interface SpiderGraphProps {
  categories: string[];
  datasets: Dataset[];
  hovered: number;
}

interface CartesianCoordinates {
  x: number;
  y: number;
}

const polarToCartesian = (centerX: number, centerY: number, RADIUS: number, angle: number): CartesianCoordinates => ({
  x: centerX + RADIUS * Math.cos(angle),
  y: centerY + RADIUS * Math.sin(angle),
});

const MAX_SCORE = 100;
const RADIUS = 170;

const SpiderGraph: React.FC<SpiderGraphProps> = ({ categories, datasets, hovered }) => {
  const numOfPoints = categories.length;
  const angleSlice = (Math.PI * 2) / numOfPoints;

  // Generate paths for each dataset's attributes
  const paths = datasets.map((data) =>
    data.attributes.map((value, index) => {
      const angle = angleSlice * index - Math.PI / 2;
      const r = (value / MAX_SCORE) * RADIUS;
      return polarToCartesian(0, 0, r, angle);
    })
  );

  // Create the path for the spider graph
  const pathData = paths.map(
    (points) => points.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ') + ' Z'
  );

  return (
    <svg
      width={RADIUS * 2 + 120}
      height={RADIUS * 2 + 50}
      viewBox={`${-RADIUS - 60} ${-RADIUS - 25} ${RADIUS * 2 + 120} ${RADIUS * 2 + 50}`}
    >
      {/* Draw the outer circle */}
      <circle cx="0" cy="0" r={RADIUS} fill="rgba(11, 11, 12, 1)" stroke="rgba(23, 23, 25, 1)" />

      {/* Draw the axes and labels */}
      {categories.map((category, index) => {
        const { x, y } = polarToCartesian(0, 0, RADIUS, angleSlice * index - Math.PI / 2);
        return (
          <g key={category}>
            <line x1="0" y1="0" x2={x} y2={y} stroke="rgba(23, 23, 25, 1)" />
            <text
              x={x * 1.26}
              y={y * 1.1 + 5}
              textAnchor="middle"
              style={{ fontSize: '12px' }}
              fill="rgba(242, 242, 251, 0.5)"
            >
              {category.length < 15
                ? category
                : category.split(' ').map((string, i) => (
                    <tspan x={x * 1.2} dy={i > 0 ? '1.2em' : ''} key={i}>
                      {string}
                    </tspan>
                  ))}
            </text>
          </g>
        );
      })}

      {/* Draw the path */}
      {pathData.map((d, i) => (
        <path
          className="path"
          key={i}
          d={d}
          fill="none"
          stroke={datasets[i].color}
          opacity={!!hovered && i !== hovered - 1 ? 0.5 : 1}
        >
          <animate attributeName="opacity" values="0;1" dur="1s" repeatCount="1" />
        </path>
      ))}
    </svg>
  );
};

export default SpiderGraph;
