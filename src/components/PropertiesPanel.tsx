
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Type, Palette, Weight } from 'lucide-react';
import { ElementData } from '@/pages/Index';

interface PropertiesPanelProps {
  element: ElementData | null;
  onPropertyChange: (property: string, value: string) => void;
  onClose: () => void;
}

export const PropertiesPanel = ({ element, onPropertyChange, onClose }: PropertiesPanelProps) => {
  if (!element) {
    return (
      <div className="h-full bg-gradient-to-br from-editor-panel/95 to-editor-panel/90 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
        
        <div className="text-center text-editor-text-muted relative z-10 p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          <div className="relative mb-4">
            <Type className="w-12 h-12 mx-auto opacity-60 text-purple-400" />
            <div className="absolute inset-0 w-12 h-12 mx-auto bg-purple-400/20 rounded-full animate-ping"></div>
          </div>
          <p className="text-lg font-medium bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Select an element to edit
          </p>
          <p className="text-sm opacity-70 mt-2">Click on any element in the preview to customize its properties</p>
        </div>
      </div>
    );
  }

  const colorPresets = [
    '#000000', '#374151', '#6366f1', '#8b5cf6', '#ec4899',
    '#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#ffffff'
  ];

  return (
    <div className="h-full bg-gradient-to-br from-editor-panel/95 to-editor-panel/90 backdrop-blur-sm flex flex-col relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 to-blue-500/3"></div>
      
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-purple-500/5 to-blue-500/5 backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-lg shadow-purple-400/50"></div>
          <h2 className="font-semibold text-editor-text bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Properties
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 hover:border-red-500/30 border border-transparent transition-all duration-300 hover:scale-105 backdrop-blur-sm"
        >
          <X className="w-4 h-4 text-red-400" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-6 relative z-10">

        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
          <div className="text-xs text-editor-text-muted mb-2 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-purple-400"></div>
            Selected Element
          </div>
          <div className="font-mono text-sm text-purple-300 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-3 py-2 rounded-lg border border-purple-500/30">
            &lt;{element.tagName}&gt;
          </div>
        </div>

    

        {element.hasOwnProperty('textContent') && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-editor-text">
              <Type className="w-4 h-4 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Text Content</span>
            </div>
            <div>
              <Label htmlFor="textContent" className="text-xs text-editor-text-muted flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                Content
              </Label>
              <Input
                id="textContent"
                value={element.textContent || ''}
                onChange={(e) => onPropertyChange('textContent', e.target.value)}
                className="mt-2 bg-gradient-to-r from-editor-bg/90 to-editor-bg/95 border-2 border-blue-500/20 focus:border-blue-500/50 focus:shadow-lg focus:shadow-blue-500/25 rounded-lg transition-all duration-300 hover:border-blue-500/30"
                placeholder="Enter text content..."
              />
            </div>
          </div>
        )}


        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-editor-text">
            <Weight className="w-4 h-4 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Typography</span>
          </div>
          
          <div>
            <Label htmlFor="fontSize" className="text-xs text-editor-text-muted flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-purple-400"></div>
              Font Size
            </Label>
            <Select 
              value={element.styles.fontSize} 
              onValueChange={(value) => onPropertyChange('fontSize', value)}
            >
              <SelectTrigger className="mt-2 bg-gradient-to-r from-editor-bg/90 to-editor-bg/95 border-2 border-purple-500/20 hover:border-purple-500/30 focus:border-purple-500/50 rounded-lg transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/90 backdrop-blur-xl border border-purple-500/30">
                <SelectItem value="12px" className="hover:bg-purple-500/20">12px</SelectItem>
                <SelectItem value="14px" className="hover:bg-purple-500/20">14px</SelectItem>
                <SelectItem value="16px" className="hover:bg-purple-500/20">16px</SelectItem>
                <SelectItem value="18px" className="hover:bg-purple-500/20">18px</SelectItem>
                <SelectItem value="20px" className="hover:bg-purple-500/20">20px</SelectItem>
                <SelectItem value="24px" className="hover:bg-purple-500/20">24px</SelectItem>
                <SelectItem value="32px" className="hover:bg-purple-500/20">32px</SelectItem>
                <SelectItem value="48px" className="hover:bg-purple-500/20">48px</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>


        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-editor-text">
            <Palette className="w-4 h-4 text-pink-400" />
            <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">Color</span>
          </div>
          
          <div>
            <Label htmlFor="color" className="text-xs text-editor-text-muted flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-pink-400"></div>
              Text Color
            </Label>
            <div className="mt-2">
              <Input
                id="color"
                type="color"
                value={element.styles.color}
                onChange={(e) => onPropertyChange('color', e.target.value)}
                className="w-full h-12 bg-gradient-to-r from-editor-bg/90 to-editor-bg/95 border-2 border-pink-500/20 focus:border-pink-500/50 focus:shadow-lg focus:shadow-pink-500/25 rounded-lg transition-all duration-300 hover:border-pink-500/30 cursor-pointer"
              />
            </div>
            
            <div className="grid grid-cols-5 gap-2 mt-4">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-lg border-2 border-white/20 hover:scale-110 hover:shadow-lg transition-all duration-300 hover:border-white/40"
                  style={{ backgroundColor: color }}
                  onClick={() => onPropertyChange('color', color)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
