export function StatCard({ icon: Icon, label, value, delta, variant = 'primary' }) {
  return (
    <div className={`card stat-card stat-card--${variant} fade-in`}>
      <div className={`stat-icon stat-icon--${variant}`}>
        <Icon size={20} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {delta !== undefined && (
        <div className={`stat-delta stat-delta--${delta >= 0 ? 'up' : 'down'}`}>
          {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}%
        </div>
      )}
    </div>
  );
}

export function ScoreRing({ score, size = 56, strokeWidth = 4 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = '#22c55e';
  if (score < 50) color = '#ef4444';
  else if (score < 75) color = '#f59e0b';

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148,163,184,0.1)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <span className="score-ring-value" style={{ color }}>{score}</span>
    </div>
  );
}

export function Badge({ variant = 'neutral', children }) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}

export function SeverityBadge({ severity }) {
  const map = { HIGH: 'danger', MEDIUM: 'warning', LOW: 'info' };
  return <Badge variant={map[severity] || 'neutral'}>{severity}</Badge>;
}


export function EmptyState({ message = 'No data available' }) {
  return (
    <div className="empty-state">
      <h3>{message}</h3>
    </div>
  );
}
