
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
      <div className="h-full bg-editor-panel flex items-center justify-center">
        <div className="text-center text-editor-text-muted">
          <Type className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const colorPresets = [
    '#000000', '#374151', '#6366f1', '#8b5cf6', '#ec4899',
    '#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#ffffff'
  ];

  return (
    <div className="h-full bg-editor-panel flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-medium text-editor-text">Properties</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="hover:bg-editor-accent/10"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-6">
     
        <div className="glass-panel p-3">
          <div className="text-xs text-editor-text-muted mb-1">Selected Element</div>
          <div className="font-mono text-sm text-editor-accent">
            &lt;{element.tagName}&gt;
          </div>
        </div>

    
        {element.textContent && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-editor-text">
              <Type className="w-4 h-4" />
              Text Content
            </div>
            <div>
              <Label htmlFor="textContent" className="text-xs text-editor-text-muted">
                Content
              </Label>
              <Input
                id="textContent"
                value={element.textContent}
                onChange={(e) => onPropertyChange('textContent', e.target.value)}
                className="mt-1 bg-editor-bg border-editor-accent/30 focus:border-editor-accent"
              />
            </div>
          </div>
        )}

        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-editor-text">
            <Weight className="w-4 h-4" />
            Typography
          </div>
          
          <div>
            <Label htmlFor="fontSize" className="text-xs text-editor-text-muted">
              Font Size
            </Label>
            <Select 
              value={element.styles.fontSize} 
              onValueChange={(value) => onPropertyChange('fontSize', value)}
            >
              <SelectTrigger className="mt-1 bg-editor-bg border-editor-accent/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12px">12px</SelectItem>
                <SelectItem value="14px">14px</SelectItem>
                <SelectItem value="16px">16px</SelectItem>
                <SelectItem value="18px">18px</SelectItem>
                <SelectItem value="20px">20px</SelectItem>
                <SelectItem value="24px">24px</SelectItem>
                <SelectItem value="32px">32px</SelectItem>
                <SelectItem value="48px">48px</SelectItem>
              </SelectContent>
            </Select>
          </div>

          
        </div>

       
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-editor-text">
            <Palette className="w-4 h-4" />
            Color
          </div>
          
          <div>
            <Label htmlFor="color" className="text-xs text-editor-text-muted">
              Text Color
            </Label>
            <div className="mt-2">
              <Input
                id="color"
                type="color"
                value={element.styles.color}
                onChange={(e) => onPropertyChange('color', e.target.value)}
                className="w-full h-10 bg-editor-bg border-editor-accent/30 focus:border-editor-accent"
              />
            </div>
            
            <div className="grid grid-cols-5 gap-2 mt-3">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-md border-2 border-white/20 hover:scale-110 transition-transform"
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
