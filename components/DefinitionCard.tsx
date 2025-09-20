
import React from 'react';

interface DefinitionCardProps {
  term: string;
  definition: string;
  summary: string;
}

// Simple markdown to HTML parser for the summary
const renderMarkdown = (text: string) => {
  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\n/g, '<br />'); // Newlines
  return { __html: html };
};


const DefinitionCard: React.FC<DefinitionCardProps> = ({ term, definition, summary }) => {
  const formattedContent = definition.split('\n').map((line, index) => {
    line = line.trim();
    if (!line) return null;

    if (line.includes(':')) {
      const parts = line.split(':');
      const title = parts[0];
      const content = parts.slice(1).join(':');
      return (
        <div key={index} className="mt-4">
            <h3 className="text-xl font-semibold text-teal-300 mb-2">{title}</h3>
            <p className="leading-relaxed">{content}</p>
        </div>
      );
    }
    
    return <p key={index} className="my-2 leading-relaxed">{line}</p>;
  }).filter(Boolean);

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-white mb-6 capitalize">{term}</h2>
      
      {/* Summary Section */}
      <div className="mb-8 p-4 bg-gray-900/50 border border-blue-400/30 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">핵심 요약</h3>
        <p 
          className="text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={renderMarkdown(summary)}
        />
      </div>

      <div className="border-t border-gray-700 pt-6">
        <div className="text-gray-300 space-y-2">
          {formattedContent}
        </div>
      </div>
    </div>
  );
};

export default DefinitionCard;
