// Flowing line field, after 21st.dev "Background Paths" by kokonutd.
// Animated with CSS stroke-dashoffset so it stays off the JS thread.

function paths(position: number) {
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    opacity: 0.08 + i * 0.022,
    duration: 18 + ((i * 7) % 14),
  }));
}

function Layer({ position }: { position: number }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`flow-${position}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      {paths(position).map((p) => (
        <path
          key={p.id}
          d={p.d}
          className="flow-path"
          stroke={`url(#flow-${position})`}
          strokeWidth={p.width}
          strokeOpacity={p.opacity}
          style={{ ["--dur" as string]: `${p.duration}s`, animationDelay: `-${p.id * 1.3}s` }}
        />
      ))}
    </svg>
  );
}

export function BackgroundPaths() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <Layer position={1} />
      <Layer position={-1} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#000_75%)]" />
    </div>
  );
}
