import { useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export default function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: query }]
      })
    });

    const data = await res.json();
    setResponse(data.choices?.[0]?.message?.content || 'No response');
  };

  return (
    <div className="overlay">
      <form onSubmit={handleSubmit}>
        <textarea value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask ChatGPT..." />
        <button type="submit">Send</button>
      </form>
      <div className="response">{response}</div>
    </div>
  );
}
