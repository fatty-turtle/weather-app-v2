import { useState, useEffect, useRef } from "react";

export default function LiveClock({ tzId }) {
  const [angles, setAngles] = useState({ hour: 0, minute: 0, second: 0 });

  const timerRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: tzId,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }).formatToParts(new Date());

      const h = parseInt(parts.find((p) => p.type === "hour").value);
      const m = parseInt(parts.find((p) => p.type === "minute").value);
      const s = parseInt(parts.find((p) => p.type === "second").value);

      setAngles({
        hour: (h % 12) * 30 + m * 0.5,
        minute: m * 6 + s * 0.1,
        second: s * 6,
      });
    };

    const schedule = () => {
      tick();
      const delay = 1000 - (Date.now() % 1000);
      timerRef.current = setTimeout(schedule, delay);
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        clearTimeout(timerRef.current);
        schedule();
      }
    };

    schedule();
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearTimeout(timerRef.current);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [tzId]);

  const cx = 100,
    cy = 100;

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2;
    const isMajor = i % 5 === 0;
    const r1 = isMajor ? 76 : 80;
    return {
      x1: cx + Math.sin(a) * r1,
      y1: cy - Math.cos(a) * r1,
      x2: cx + Math.sin(a) * 85,
      y2: cy - Math.cos(a) * 85,
      strokeWidth: isMajor ? 2 : 0.8,
      opacity: isMajor ? 1 : 0.4,
    };
  });

  const numerals = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => {
    const a = (i / 12) * Math.PI * 2;
    return { n, x: cx + Math.sin(a) * 64, y: cy - Math.cos(a) * 64 };
  });

  const hand = (deg, x, yTop, w, h, rx) => ({
    x,
    y: yTop,
    width: w,
    height: h,
    rx,
    style: {
      transform: `rotate(${deg}deg)`,
      transformOrigin: `${cx}px ${cy}px`,
    },
  });

  return (
    <div className="live-clock">
      <svg viewBox="0 0 200 200" className="live-clock-svg">
        {/* Outer ring */}
        <circle
          cx={cx}
          cy={cy}
          r="96"
          fill="none"
          stroke="var(--foreground)"
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

        {/* Numerals */}
        {numerals.map(({ n, x, y }) => (
          <text
            key={n}
            x={x}
            y={y}
            className="clock-number"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={[12, 3, 6, 9].includes(n) ? 11 : 9}
            fontWeight={[12, 3, 6, 9].includes(n) ? "700" : "500"}
          >
            {n}
          </text>
        ))}

        {/* Hour hand */}
        <rect
          {...hand(angles.hour, cx - 2.5, cy - 42, 5, 42, 2.5)}
          className="hand hand-hour"
        />

        {/* Minute hand */}
        <rect
          {...hand(angles.minute, cx - 1.5, cy - 58, 3, 58, 1.5)}
          className="hand hand-minute"
        />

        {/* Second hand + counterweight */}
        <rect
          {...hand(angles.second, cx - 0.75, cy - 68, 1.5, 68, 0.75)}
          className="hand hand-second"
        />
        <rect
          {...hand(angles.second, cx - 0.75, cy + 12, 1.5, 18, 0.75)}
          className="hand hand-second"
        />

        {/* Center pivot */}
        <circle cx={cx} cy={cy} r="5" fill="var(--text-highlight)" />
        <circle cx={cx} cy={cy} r="2" fill="var(--background-card)" />
      </svg>
    </div>
  );
}
