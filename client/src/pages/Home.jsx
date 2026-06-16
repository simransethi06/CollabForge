import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const createRoom = () => {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    navigate(`/editor/${id}`);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId.trim()) return setError('Please enter a room ID');
    navigate(`/editor/${roomId.trim().toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col">
      {/* navbar */}
      <nav className="bg-[#323233] border-b border-[#3e3e42] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#569cd6] rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">CF</span>
          </div>
          <span className="text-white font-semibold">CollabForge</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: user?.cursorColor || '#569cd6' }}
            >
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-[#d4d4d4] text-sm">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="text-[#858585] hover:text-white text-sm transition-colors"
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-white text-3xl font-semibold mb-3">
              Start coding together
            </h1>
            <p className="text-[#858585]">
              Create a room and share the ID with your team
            </p>
          </div>

          <div className="space-y-4">
            {/* create room */}
            <button
              onClick={createRoom}
              className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white py-4 rounded-lg font-medium text-lg transition-colors flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
              </svg>
              Create new room
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#3e3e42]"/>
              <span className="text-[#858585] text-sm">or join existing</span>
              <div className="flex-1 h-px bg-[#3e3e42]"/>
            </div>

            {/* join room */}
            <form onSubmit={joinRoom} className="flex gap-2">
              <input
                value={roomId}
                onChange={e => { setRoomId(e.target.value); setError(''); }}
                placeholder="Enter room ID (e.g. AB3F9K2M)"
                className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#569cd6] text-sm"
              />
              <button
                type="submit"
                className="bg-[#252526] border border-[#3e3e42] hover:border-[#569cd6] text-white px-6 py-3 rounded-lg text-sm transition-colors"
              >
                Join
              </button>
            </form>

            {error && <p className="text-[#f44747] text-sm">{error}</p>}
          </div>

          {/* features */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { icon: '⚡', title: 'Real-time sync', desc: 'Changes appear instantly' },
              { icon: '🤖', title: 'AI assistant', desc: 'Powered by Gemini' },
              { icon: '▶', title: 'Run code', desc: 'Execute in browser' },
            ].map(f => (
              <div key={f.title} className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{f.icon}</div>
                <div className="text-white text-sm font-medium">{f.title}</div>
                <div className="text-[#858585] text-xs mt-1">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}