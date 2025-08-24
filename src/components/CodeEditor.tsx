
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
    <div className="h-full flex flex-col bg-editor-panel">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-medium text-editor-text">Component Code</h2>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePaste}
            className="hover:bg-editor-accent/10"
          >
            <Clipboard className="w-4 h-4 mr-1" />
            Paste
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            className="hover:bg-editor-accent/10"
          >
            <Copy className="w-4 h-4 mr-1" />
            {isCopied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <Textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="h-full font-mono text-sm bg-editor-bg border-editor-accent/30 focus:border-editor-accent resize-none"
          placeholder="Paste your React component code here..."
        />
      </div>
    </div>
  );
};
