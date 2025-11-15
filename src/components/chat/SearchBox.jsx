// frontend/components/chat/SearchBox.jsx
const SearchBox = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="relative">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute left-3 top-3 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;