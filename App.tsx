
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DefinitionCard from './components/DefinitionCard';
import Loader from './components/Loader';
import ErrorAlert from './components/ErrorAlert';
import { getFinancialTermDefinition } from './services/geminiService';

const WelcomeMessage: React.FC = () => (
  <div className="text-center p-8 mt-8 bg-gray-800/50 border border-gray-700 rounded-2xl">
    <h2 className="text-2xl font-semibold text-white">궁금한 금융 용어를 검색해보세요</h2>
    <p className="text-gray-400 mt-2">AI가 최신 금융 트렌드를 반영하여 쉽게 설명해드립니다.</p>
  </div>
);

const App: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const [searchedTerm, setSearchedTerm] = useState<string | null>(null);
  const [definition, setDefinition] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!term.trim()) {
      setError('검색할 단어를 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setDefinition(null);
    setSummary(null);
    setSearchedTerm(term);

    try {
      const result = await getFinancialTermDefinition(term);
      setDefinition(result.definition);
      setSummary(result.summary);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      setError(`단어의 뜻을 찾지 못했습니다. ${errorMessage}`);
      setDefinition(null);
      setSummary(null);
    } finally {
      setIsLoading(false);
    }
  }, [term]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div>
      <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <Header />
        <SearchBar
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        <div className="mt-8 min-h-[300px]">
          {isLoading && <Loader />}
          {error && <ErrorAlert message={error} />}
          {definition && searchedTerm && summary && (
            <DefinitionCard 
              term={searchedTerm} 
              definition={definition} 
              summary={summary}
            />
          )}
          {!isLoading && !error && !definition && <WelcomeMessage />}
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm relative z-10">
        Powered by Google Gemini API
      </footer>
    </div>
  );
};

export default App;
