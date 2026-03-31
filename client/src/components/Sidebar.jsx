export default function Sidebar({ language, code }) {
  const lines = code?.split('\n').length || 0;
  const chars = code?.length || 0;

  return (
    <div className="w-48 bg-[#252526] border-r border-[#3e3e42] flex-col hidden md:flex">
      {/* explorer header */}
      <div className="px-4 py-2 text-[#bbbbbb] text-xs uppercase tracking-widest font-semibold border-b border-[#3e3e42]">
        Explorer
      </div>

      {/* file tree */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-2">
          <div className="flex items-center gap-2 px-2 py-1 bg-[#37373d] rounded text-[#d4d4d4] text-xs cursor-pointer">
            <span className="text-[#569cd6]">▼</span>
            <span>COLLABFORGE</span>
          </div>
          <div className="ml-4 mt-1">
            <div className="flex items-center gap-2 px-2 py-1 bg-[#094771] rounded text-white text-xs">
              <span>{getFileIcon(language)}</span>
              <span>main.{getExtension(language)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom stats */}
      <div className="border-t border-[#3e3e42] px-4 py-2 space-y-1">
        <div className="flex justify-between text-[#858585] text-xs">
          <span>Lines</span>
          <span className="text-[#d4d4d4]">{lines}</span>
        </div>
        <div className="flex justify-between text-[#858585] text-xs">
          <span>Chars</span>
          <span className="text-[#d4d4d4]">{chars}</span>
        </div>
        <div className="flex justify-between text-[#858585] text-xs">
          <span>Lang</span>
          <span className="text-[#d4d4d4]">{language}</span>
        </div>
      </div>
    </div>
  );
}

const getExtension = (lang) => ({
  javascript: 'js', typescript: 'ts', python: 'py',
  java: 'java', cpp: 'cpp', c: 'c', go: 'go',
  rust: 'rs', html: 'html', css: 'css',
}[lang] || 'txt');

const getFileIcon = (lang) => ({
  javascript: '🟨', typescript: '🟦', python: '🐍',
  java: '☕', cpp: '⚙️', html: '🌐', css: '🎨',
  rust: '🦀', go: '🐹',
}[lang] || '📄');