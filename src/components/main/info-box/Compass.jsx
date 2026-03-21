import "./Compass.css";

export default function Compass({ windDegree = 0, size = 100 }) {
  const cx = 100,
    cy = 100;

  const cardinals = [
    { label: "N", deg: 0 },
    { label: "NE", deg: 45 },
    { label: "E", deg: 90 },
    { label: "SE", deg: 135 },
    { label: "S", deg: 180 },
    { label: "SW", deg: 225 },
    { label: "W", deg: 270 },
    { label: "NW", deg: 315 },
  ];

  const ticks = Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5;
    const a = (deg / 360) * Math.PI * 2;
    const isMajor = deg % 45 === 0;
    const isMedium = deg % 15 === 0 && !isMajor;
    const r1 = isMajor ? 72 : isMedium ? 76 : 80;
    return {
      x1: cx + Math.sin(a) * r1,
      y1: cy - Math.cos(a) * r1,
      x2: cx + Math.sin(a) * 85,
      y2: cy - Math.cos(a) * 85,
      strokeWidth: isMajor ? 2 : isMedium ? 1.2 : 0.7,
      opacity: isMajor ? 1 : isMedium ? 0.6 : 0.3,
    };
  });

  const cardinalLabels = cardinals.map(({ label, deg }) => {
    const a = (deg / 360) * Math.PI * 2;
    const isMain = ["N", "E", "S", "W"].includes(label);
    return {
      label,
      x: cx + Math.sin(a) * 61,
      y: cy - Math.cos(a) * 61,
      isMain,
      isNorth: label === "N",
    };
  });

  const needleStyle = {
    transform: `rotate(${windDegree}deg)`,
    transformOrigin: `${cx}px ${cy}px`,
  };

  return (
    <div className="compass" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="compass-svg">
        {/* Outer ring */}
        <circle
          cx={cx}
          cy={cy}
          r="96"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="6"
        />
        {/* Inner ring accent */}
        <circle
          cx={cx}
          cy={cy}
          r="89"
          fill="none"
          stroke="var(--text-highlight)"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        {/* Face */}
        <circle cx={cx} cy={cy} r="87" fill="var(--background-card)" />

        {/* Ticks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="var(--foreground)"
            strokeWidth={t.strokeWidth}
            strokeLinecap="round"
            opacity={t.opacity}
          />
        ))}

        {/* Cardinal labels */}
        {cardinalLabels.map(({ label, x, y, isMain, isNorth }) => (
          <text
            key={label}
            x={x}
            y={y}
            className={`compass-label${isNorth ? " compass-label-north" : ""}`}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={isNorth ? 12 : isMain ? 11 : 8}
            fontWeight={isMain ? "700" : "500"}
          >
            {label}
          </text>
        ))}

        {/* Needle */}
        <g style={needleStyle}>
          {/* North half*/}
          <polygon
            points={`${cx},${cy - 52} ${cx - 5},${cy + 8} ${cx},${cy + 4} ${cx + 5},${cy + 8}`}
            className="needle-north"
          />
          {/* South half */}
          <polygon
            points={`${cx},${cy + 52} ${cx - 5},${cy - 8} ${cx},${cy - 4} ${cx + 5},${cy - 8}`}
            className="needle-south"
          />
        </g>

        {/* Center pivot (matches LiveClock) */}
        <circle cx={cx} cy={cy} r="5" fill="var(--text-highlight)" />
        <circle cx={cx} cy={cy} r="2" fill="var(--background-card)" />
      </svg>
    </div>
  );
}
