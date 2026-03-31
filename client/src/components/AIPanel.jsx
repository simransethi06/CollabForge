import { useState } from 'react';
import api from '../services/api';

const ACTIONS = [
  { id: 'explain', label: '📖 Explain code', prompt: 'Explain what this code does in simple terms' },
  { id: 'fix', label: '🔧 Fix errors', prompt: 'Find and fix any bugs or errors in this code' },
  { id: 'improve', label: '⚡ Improve code', prompt: 'Suggest improvements for this code' },
  { id: 'comment', label: '💬 Add comments', prompt: 'Add helpful comments to this code' },
];

export default function AIPanel({ code, language, onClose }) {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [activeAction, setActiveAction] = useState(null);

  const runAction = async (action) => {
    setLoading(true);
    setActiveAction(action.id);
    setResult('');
    try {
      const { data } = await api.post('/ai/ask', {
        code,
        language,
        prompt: action.prompt,
      });
      setResult(data.result);
    } catch (err) {
      setResult('AI service not available yet. Coming in Phase 4!');
    } finally {
      setLoading(false);
    }
  };

  const askCustom = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setActiveAction('custom');
    setResult('');
    try {
      const { data } = await api.post('/ai/ask', { code, language, prompt });
      setResult(data.result);
    } catch (err) {
      setResult('AI service not available yet. Coming in Phase 4!');
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="w-80 bg-[#252526] border-l border-[#3e3e42] flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3e3e42]">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="text-white text-sm font-semibold">AI Assistant</span>
          <span className="text-[#569cd6] text-xs bg-[#1e3a5f] px-1.5 py-0.5 rounded">Gemini</span>
        </div>
        <button onClick={onClose} className="text-[#858585] hover:text-white text-xs">✕</button>
      </div>

      {/* quick actions */}
      <div className="p-3 border-b border-[#3e3e42]">
        <p className="text-[#858585] text-xs mb-2 uppercase tracking-wider">Quick actions</p>
        <div className="grid grid-cols-2 gap-2">
          {ACTIONS.map(action => (
            <button
              key={action.id}
              onClick={() => runAction(action)}
              disabled={loading}
              className={`text-left px-3 py-2 rounded text-xs transition-colors disabled:opacity-50 ${
                activeAction === action.id && loading
                  ? 'bg-[#0e639c] text-white'
                  : 'bg-[#3c3c3c] text-[#d4d4d4] hover:bg-[#4a4a4a]'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* result */}
      <div className="flex-1 overflow-auto p-3">
        {loading ? (
          <div className="flex items-center gap-2 text-[#569cd6] text-sm">
            <div className="animate-spin w-4 h-4 border-2 border-[#569cd6] border-t-transparent rounded-full" />
            Thinking...
          </div>
        ) : result ? (
          <div className="text-[#d4d4d4] text-xs leading-relaxed whitespace-pre-wrap font-mono bg-[#1e1e1e] p-3 rounded border border-[#3e3e42]">
            {result}
          </div>
        ) : (
          <div className="text-[#858585] text-xs text-center mt-8">
            Select an action above or ask a custom question below
          </div>
        )}
      </div>

      {/* custom prompt */}
      <div className="p-3 border-t border-[#3e3e42]">
        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && askCustom()}
            placeholder="Ask anything about your code..."
            className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#569cd6]"
          />
          <button
            onClick={askCustom}
            disabled={loading || !prompt.trim()}
            className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-3 py-2 rounded text-xs disabled:opacity-50 transition-colors"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}