
import { useEffect, useRef } from 'react';
import { ElementData } from '@/pages/Index';
import AIAnalysis from '@/components/Aianalysis';

interface PreviewPanelProps {
  code: string;
  onElementSelect: (element: ElementData) => void;
  selectedElement: ElementData | null;
}

export const PreviewPanel = ({ code, onElementSelect, selectedElement }: PreviewPanelProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (selectedElement) {
      
      const elements = document.querySelectorAll('[data-element-id]');
      elements.forEach((element) => {
        if (element.getAttribute('data-element-id') === selectedElement.id) {
          const htmlElement = element as HTMLElement;
          
      
          if (selectedElement.styles.color) {
            htmlElement.style.color = selectedElement.styles.color;
          }
          if (selectedElement.styles.fontSize) {
            htmlElement.style.fontSize = selectedElement.styles.fontSize;
          }
          if (selectedElement.styles.fontWeight) {
            htmlElement.style.fontWeight = selectedElement.styles.fontWeight;
          }
          
     
          if (selectedElement.textContent && htmlElement.textContent !== selectedElement.textContent) {
            htmlElement.textContent = selectedElement.textContent;
          }
        }
      });
    }
  }, [selectedElement]);

  const handleElementClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const target = event.target as HTMLElement;
    
 
    const elementId = `element-${Math.random().toString(36).substr(2, 9)}`;
    target.setAttribute('data-element-id', elementId);
    
    
    const elementData: ElementData = {
      id: elementId,
      tagName: target.tagName.toLowerCase(),
      textContent: target.textContent || '',
      styles: {
        fontSize: getComputedStyle(target).fontSize,
        fontWeight: getComputedStyle(target).fontWeight,
        color: getComputedStyle(target).color,
      }
    };
    
   
    document.querySelectorAll('.editor-highlight').forEach(el => {
      el.classList.remove('editor-highlight');
    });
    target.classList.add('editor-highlight');
    
    onElementSelect(elementData);
  };

  // Convert JSX-like code to HTML and render it
  const renderPreview = () => {
    try {
      // Simple JSX to HTML conversion for basic elements
      let htmlCode = code
        .replace(/className=/g, 'class=')
        .replace(/<br\s*\/?>/g, '<br>')
        .replace(/<hr\s*\/?>/g, '<hr>');
      
      // Add a wrapper div with proper text color to ensure visibility
      htmlCode = `<div class=\"text-foreground\">${htmlCode}</div>`;
      
      return { __html: htmlCode };
    } catch (error) {
      console.error('Error rendering preview:', error);
      return { __html: '<div class=\"text-red-500\">Error rendering component</div>' };
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-lg shadow-blue-400/50"></div>
          <h2 className="font-semibold text-foreground bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Live Preview
          </h2>
          <div className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 font-medium">
            LIVE
          </div>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          <div className="w-1 h-1 rounded-full bg-purple-400 animate-ping"></div>
          Click any element to edit its properties
        </div>
 
      </div>
    
      
      {/* Main preview area */}
      <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-background/90 to-background/95 relative">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div 
          ref={previewRef}
          className="min-h-full cursor-pointer text-foreground relative z-10 bg-white/5 rounded-xl border border-white/10 p-6 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:border-purple-500/30"
          onClick={handleElementClick}
          dangerouslySetInnerHTML={renderPreview()}
        />
        
        {/* Floating preview indicator */}
       
      </div>
    </div>
  );
};
