
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };

  return (
    <div className="flex items-center w-full max-w-2xl mx-auto bg-gray-800 rounded-full shadow-lg p-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="예: ESG, 스톡옵션, 핀테크..."
        disabled={isLoading}
        className="w-full bg-transparent text-white placeholder-gray-500 border-none focus:ring-0 text-lg px-4 py-2"
        aria-label="금융 용어 검색"
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out flex items-center justify-center min-w-[120px]"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2">검색중</span>
          </>
        ) : (
          '검색'
        )}
      </button>
    </div>
  );
};

export default SearchBar;
