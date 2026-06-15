
export function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  const baseStyle = "w-full py-4 rounded-2xl font-bold text-lg shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),_4px_4px_8px_rgba(0,0,0,0.1)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1)] transition-all flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-100 text-gray-800",
    danger: "bg-red-500 text-white",
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
