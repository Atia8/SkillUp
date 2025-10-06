// components/SimpleCheckbox.jsx
export default function SimpleCheckbox({ checked, onChange, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="checkbox"
        checked={checked}
  readOnly
        // onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div 
        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all cursor-pointer ${
          checked 
            ? 'bg-black border-black' 
            : 'bg-white border-gray-300 hover:border-gray-400'
        }`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
        
      </div>
    </div>
  );
}