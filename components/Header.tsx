
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center my-8 md:my-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
        AI 금융 용어 사전
      </h1>
      <p className="text-gray-400 mt-2 text-lg">최신 금융 단어를 쉽고 빠르게 검색해보세요.</p>
    </header>
  );
};

export default Header;
