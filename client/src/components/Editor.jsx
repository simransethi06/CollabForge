import { useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import socket from '../services/socket';

export default function Editor({ roomId, code, setCode, language, theme, users }) {
  const editorRef = useRef(null);
  const isRemoteChange = useRef(false);

  useEffect(() => {
    socket.on('code-update', ({ content }) => {
      if (editorRef.current && content !== code) {
        isRemoteChange.current = true;
        const model = editorRef.current.getModel();
        const position = editorRef.current.getPosition();
        model.setValue(content);
        if (position) editorRef.current.setPosition(position);
        isRemoteChange.current = false;
      }
    });
    return () => socket.off('code-update');
  }, []);

  const handleChange = (value) => {
    if (isRemoteChange.current) return;
    setCode(value);
    socket.emit('code-change', { roomId, content: value });
  };

  const handleMount = (editor) => {
    editorRef.current = editor;

    // cursor tracking
    editor.onDidChangeCursorPosition((e) => {
      socket.emit('cursor-move', {
        roomId,
        cursor: e.position,
      });
    });

    // typing indicator
    let typingTimer;
    editor.onDidChangeModelContent(() => {
      socket.emit('typing', { roomId, isTyping: true });
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        socket.emit('typing', { roomId, isTyping: false });
      }, 1000);
    });
  };

  return (
    <div className="flex-1 overflow-hidden">
      <MonacoEditor
        height="100%"
        language={language}
        theme={theme}
        value={code}
        onChange={handleChange}
        onMount={handleMount}
        options={{
          fontSize: 14,
          fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
          fontLigatures: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 16 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
}