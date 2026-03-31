import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'cpp',
  'c', 'csharp', 'go', 'rust', 'html', 'css', 'json',
];

const THEMES = [
  { id: 'vs-dark', label: 'Dark (VS Code)' },
  { id: 'vs', label: 'Light' },
  { id: 'hc-black', label: 'High Contrast' },
];

export default function Navbar({
  roomId, users, language, theme, connected,
  onLanguageChange, onThemeChange, onToggleAI, onRunCode, showAI
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="bg-[#323233] border-b border-[#3e3e42] flex items-center px-3 py-1.5 gap-3 z-10">
      {/* logo */}
      <div className="flex items-center gap-1.5 mr-2">
        <div className="w-6 h-6 bg-[#569cd6] rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">CF</span>
        </div>
        <span className="text-white text-sm font-semibold hidden md:block">CollabForge</span>
      </div>

      {/* room id */}
      <button
        onClick={copyRoomId}
        className="flex items-center gap-2 bg-[#3c3c3c] hover:bg-[#4a4a4a] border border-[#3e3e42] px-3 py-1 rounded text-xs text-[#d4d4d4] transition-colors"
      >
        <span className="text-[#858585]">Room:</span>
        <span className="font-mono font-semibold">{roomId}</span>
        <span className="text-[#569cd6]">{copied ? '✓ Copied' : '⎘ Copy'}</span>
      </button>

      {/* connection status */}
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-[#4ec9b0]' : 'bg-[#f44747]'}`} />
        <span className="text-[#858585] text-xs hidden md:block">
          {connected ? 'Connected' : 'Connecting...'}
        </span>
      </div>

      {/* language selector */}
      <select
        value={language}
        onChange={e => onLanguageChange(e.target.value)}
        className="bg-[#3c3c3c] border border-[#3e3e42] text-[#d4d4d4] text-xs px-2 py-1 rounded focus:outline-none focus:border-[#569cd6] cursor-pointer"
      >
        {LANGUAGES.map(l => (
          <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
        ))}
      </select>

      {/* theme selector */}
      <select
        value={theme}
        onChange={e => onThemeChange(e.target.value)}
        className="bg-[#3c3c3c] border border-[#3e3e42] text-[#d4d4d4] text-xs px-2 py-1 rounded focus:outline-none focus:border-[#569cd6] cursor-pointer"
      >
        {THEMES.map(t => (
          <option key={t.id} value={t.id}>{t.label}</option>
        ))}
      </select>

      <div className="flex-1" />

      {/* active users */}
      <div className="flex items-center gap-1">
        {users.slice(0, 5).map((u, i) => (
          <div
            key={u.socketId || i}
            title={u.name}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-[#1e1e1e]"
            style={{ backgroundColor: u.cursorColor || '#569cd6', marginLeft: i > 0 ? '-6px' : '0' }}
          >
            {u.name?.[0]?.toUpperCase()}
          </div>
        ))}
        {users.length > 0 && (
          <span className="text-[#858585] text-xs ml-2">{users.length} online</span>
        )}
      </div>

      {/* run button */}
      <button
        onClick={onRunCode}
        className="flex items-center gap-1.5 bg-[#4ec9b0] hover:bg-[#3db8a0] text-[#1e1e1e] px-3 py-1 rounded text-xs font-semibold transition-colors"
      >
        ▶ Run
      </button>

      {/* AI button */}
      <button
        onClick={onToggleAI}
        className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${
          showAI
            ? 'bg-[#569cd6] text-white'
            : 'bg-[#3c3c3c] text-[#d4d4d4] hover:bg-[#4a4a4a]'
        }`}
      >
        🤖 AI
      </button>

      {/* user avatar + logout */}
      <div className="flex items-center gap-2 ml-1">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: user?.cursorColor || '#569cd6' }}
        >
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          className="text-[#858585] hover:text-white text-xs transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}