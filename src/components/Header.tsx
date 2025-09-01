
import { Button } from '@/components/ui/button';
import { Code, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSave: () => void;
}

export const Header = () => {
  return (
    <header className="h-16 border-b border-border/50 bg-gradient-to-r from-editor-panel/90 via-editor-panel/95 to-editor-panel/90 backdrop-blur-xl shadow-lg">
      <div className="flex items-center justify-between h-full px-6 relative">

        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 animate-pulse" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Code className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
            <Link to="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-300% group-hover:scale-105 transition-transform duration-300">
              ReactRun AI
            </h1>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3 relative z-10">
          <Link to="/">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
