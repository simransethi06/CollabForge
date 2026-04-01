import { useState } from 'react';
import api from '../services/api';

const ACTIONS = [
  { id: 'explain', label: '📖 Explain', prompt: 'Explain what this code does in simple terms' },
  { id: 'fix', label: '🔧 Fix bugs', prompt: 'Find and fix any bugs or errors in this code' },
  { id: 'improve', label: '⚡ Improve', prompt: 'Suggest improvements for this code' },
  { id: 'comment', label: '💬 Comment', prompt: 'Add helpful comments to this code' },
  { id: 'complexity', label: '📊 Complexity', prompt: 'Analyze the time and space complexity of this code' },
  { id: 'test', label: '🧪 Tests', prompt: 'Write unit tests for this code' },
];

export default function AIPanel({ code, language, onClose }) {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [activeAction, setActiveAction] = useState(null);
  const [copied, setCopied] = useState(false);

  const callAI = async (promptText, actionId) => {
    setLoading(true);
    setActiveAction(actionId);
    setResult('');
    try {
      const { data } = await api.post('/ai/ask', {
        code,
        language,
        prompt: promptText,
      });
      setResult(data.result);
    } catch (err) {
      if (err.response?.status === 429) {
        setResult('⚠️ Too many requests. Please wait a minute.');
      } else {
        setResult(`❌ Error: ${err.response?.data?.message || 'Something went wrong'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const runAction = (action) => callAI(action.prompt, action.id);

  const askCustom = () => {
    if (!prompt.trim()) return;
    callAI(prompt, 'custom');
    setPrompt('');
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-80 bg-[#252526] border-l border-[#3e3e42] flex flex-col h-full">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3e3e42]">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="text-white text-sm font-semibold">AI Assistant</span>
          <span className="text-[#569cd6] text-xs bg-[#1e3a5f] px-1.5 py-0.5 rounded">
            Gemini
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[#858585] hover:text-white text-xs transition-colors"
        >
          ✕
        </button>
      </div>

      {/* quick actions */}
      <div className="p-3 border-b border-[#3e3e42]">
        <p className="text-[#858585] text-xs mb-2 uppercase tracking-wider">
          Quick actions
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {ACTIONS.map(action => (
            <button
              key={action.id}
              onClick={() => runAction(action)}
              disabled={loading}
              className={`text-left px-2.5 py-2 rounded text-xs transition-colors disabled:opacity-50 ${
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

      {/* result area */}
      <div className="flex-1 overflow-auto p-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="animate-spin w-6 h-6 border-2 border-[#569cd6] border-t-transparent rounded-full" />
            <span className="text-[#569cd6] text-xs">Gemini is thinking...</span>
          </div>
        ) : result ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#858585] text-xs uppercase tracking-wider">Response</span>
              <button
                onClick={copyResult}
                className="text-[#569cd6] text-xs hover:underline"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="text-[#d4d4d4] text-xs leading-relaxed whitespace-pre-wrap font-mono bg-[#1e1e1e] p-3 rounded border border-[#3e3e42] max-h-96 overflow-auto">
              {result}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center gap-2">
            <span className="text-3xl">🤖</span>
            <p className="text-[#858585] text-xs">
              Select an action or ask a custom question
            </p>
          </div>
        )}
      </div>

      {/* custom prompt */}
      <div className="p-3 border-t border-[#3e3e42]">
        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && askCustom()}
            placeholder="Ask anything about your code..."
            className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#569cd6] placeholder-[#858585]"
          />
          <button
            onClick={askCustom}
            disabled={loading || !prompt.trim()}
            className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-3 py-2 rounded text-xs disabled:opacity-50 transition-colors"
          >
            Ask
          </button>
        </div>
        <p className="text-[#858585] text-xs mt-2 text-center">
          Powered by Google Gemini 1.5 Flash
        </p>
      </div>
    </div>
  );
}