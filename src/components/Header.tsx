
import { Button } from '@/components/ui/button';
import { Save, Play, Code } from 'lucide-react';

interface HeaderProps {
  onSave: () => void;
}

export const Header = ({ onSave }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border bg-editor-panel/50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-editor-accent" />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Runable on steroids
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={onSave}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Component
          </Button>
        </div>
      </div>
    </header>
  );
};
