import React from 'react';

const AISuggestions = ({ suggestions }) => {
  return (
    <div className="ai-suggestions">
      <h2>AI Suggestions</h2>
      {suggestions && suggestions.length > 0 ? (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      ) : (
        <p>No suggestions available.</p>
      )}
    </div>
  );
};

export default AISuggestions;