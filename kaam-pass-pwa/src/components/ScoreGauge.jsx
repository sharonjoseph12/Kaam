export default function ScoreGauge({ score, size = 120 }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Score is 0-100, calculate offset
  const offset = circumference - (score / 100) * circumference;

  let color = 'text-red-500'; // Very Low
  if (score > 85) color = 'text-green-500'; // Strong
  else if (score > 70) color = 'text-green-400'; // Good
  else if (score > 50) color = 'text-yellow-500'; // Medium
  else if (score > 30) color = 'text-orange-500'; // Low

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background Circle */}
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Foreground Circle */}
        <circle
          className={`${color} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-gray-800">{score}</span>
        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Score</span>
      </div>
    </div>
  );
}
