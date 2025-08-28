
import { useEffect, useRef } from 'react';
import { ElementData } from '@/pages/Index';

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
      htmlCode = `<div class="text-foreground">${htmlCode}</div>`;
      
      return { __html: htmlCode };
    } catch (error) {
      console.error('Error rendering preview:', error);
      return { __html: '<div class="text-red-500">Error rendering component</div>' };
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <h2 className="font-medium text-foreground">Live Preview</h2>
        <div className="text-sm text-muted-foreground">
          Click any element to edit its properties
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 bg-background">
        <div 
          ref={previewRef}
          className="min-h-full cursor-pointer text-foreground"
          onClick={handleElementClick}
          dangerouslySetInnerHTML={renderPreview()}
        />
      </div>
    </div>
  );
};
