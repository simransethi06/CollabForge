export default function OutputPanel({ output, onClose }) {
  return (
    <div className="h-48 bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col">
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#252526] border-b border-[#3e3e42]">
        <div className="flex items-center gap-3">
          <span className="text-[#d4d4d4] text-xs font-semibold uppercase tracking-wider">Output</span>
          <div className="w-2 h-2 rounded-full bg-[#4ec9b0]" />
        </div>
        <button
          onClick={onClose}
          className="text-[#858585] hover:text-white text-xs transition-colors"
        >
          ✕ Close
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-[#d4d4d4] font-mono text-sm whitespace-pre-wrap">
          {output || '// Run your code to see output here'}
        </pre>
      </div>
    </div>
  );
}