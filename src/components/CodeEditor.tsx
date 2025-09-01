
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Clipboard } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-editor-panel/95 to-editor-panel/90 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-purple-500/5 to-blue-500/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
          <h2 className="font-semibold  bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Component Code
          </h2>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePaste}
            className="hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 border border-transparent hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
          >
            <Clipboard className="w-4 h-4 mr-1 text-purple-400" />
            Paste
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            className={`transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-transparent ${
              isCopied 
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300' 
                : 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:border-purple-500/30'
            }`}
          >
            <Copy className={`w-4 h-4 mr-1 transition-colors ${isCopied ? 'text-green-400' : 'text-purple-400'}`} />
            {isCopied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 relative">

        <div className="absolute inset-4 opacity-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg"></div>
        <Textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="h-full font-mono text-sm bg-gradient-to-br from-editor-bg/90 to-editor-bg/95 border-2 border-editor-accent/20 focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/25 resize-none rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-editor-accent/30 relative z-10"
          placeholder="✨ Paste your React component code here and watch the magic happen..."
        />
      </div>
    </div>
  );
};
