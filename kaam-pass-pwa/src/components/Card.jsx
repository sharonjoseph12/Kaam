
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-gray-50 rounded-3xl p-6 shadow-[8px_8px_16px_#d1d5db,_-8px_-8px_16px_#ffffff] ${className}`}>
      {children}
    </div>
  );
}
