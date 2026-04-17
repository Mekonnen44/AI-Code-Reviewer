import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('// Write your code here');
  const [review, setReview] = useState('');

  const handleReview = async () => {
    try {
      const response = await axios.post('http://localhost:3000/review-code', { code });
      setReview(response.data.choices[0].text);
    } catch (error) {
      console.error('Error reviewing code:', error);
      setReview('Failed to review the code.');
    }
  };

  return (
    <div className="App">
      <h1>AI Code Reviewer</h1>
      <Editor
        height="50vh"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(newValue) => setCode(newValue)}
      />
      <button onClick={handleReview}>Review Code</button>
      <div className="review-output">
        <h2>Review:</h2>
        <pre>{review}</pre>
      </div>
    </div>
  );
}

export default App;