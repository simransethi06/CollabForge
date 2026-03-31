import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AIPanel from '../components/AIPanel';
import OutputPanel from '../components/OutputPanel';
import { useAuth } from '../context/AuthContext';
import socket from '../services/socket';

export default function EditorPage() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [showAI, setShowAI] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState('');
  const [code, setCode] = useState('// Welcome to CollabForge!\n// Start typing to collaborate in real-time\n\nconsole.log("Hello, CollabForge!");\n');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!user) return navigate('/login');

    socket.connect();
    socket.emit('join-room', { roomId, user });

    socket.on('room-joined', ({ content, language: lang, users: roomUsers }) => {
      if (content) setCode(content);
      setLanguage(lang);
      setUsers(roomUsers);
      setConnected(true);
    });

    socket.on('user-joined', ({ users: roomUsers }) => setUsers(roomUsers));
    socket.on('user-left', ({ users: roomUsers }) => setUsers(roomUsers));
    socket.on('language-updated', ({ language: lang }) => setLanguage(lang));

    return () => {
      socket.emit('leave-room', { roomId });
      socket.disconnect();
    };
  }, [roomId, user]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    socket.emit('language-change', { roomId, language: lang });
  };

  const runCode = () => {
    setShowOutput(true);
    setOutput('');
    try {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(' '));

      // safely evaluate JS code
      const fn = new Function(code);
      fn();

      console.log = originalLog;
      setOutput(logs.join('\n') || '// No output');
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] overflow-hidden">
      <Navbar
        roomId={roomId}
        users={users}
        language={language}
        theme={theme}
        connected={connected}
        onLanguageChange={handleLanguageChange}
        onThemeChange={setTheme}
        onToggleAI={() => setShowAI(p => !p)}
        onRunCode={runCode}
        showAI={showAI}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar language={language} code={code} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Editor
            roomId={roomId}
            code={code}
            setCode={setCode}
            language={language}
            theme={theme}
            users={users}
          />
          {showOutput && (
            <OutputPanel
              output={output}
              onClose={() => setShowOutput(false)}
            />
          )}
        </div>

        {showAI && (
          <AIPanel code={code} language={language} onClose={() => setShowAI(false)} />
        )}
      </div>
    </div>
  );
}