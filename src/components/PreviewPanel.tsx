
import { useEffect } from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import { AlertCircle } from 'lucide-react';
import { ElementData } from '@/pages/Index';

interface PreviewPanelProps {
  code: string;
  onElementSelect: (element: ElementData) => void;
  selectedElement: ElementData | null;
}

export const PreviewPanel = ({ code, onElementSelect, selectedElement }: PreviewPanelProps) => {
  
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

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-medium text-gray-900">Live Preview</h2>
        <div className="text-sm text-gray-500">
          Click any element to edit its properties
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <LiveProvider code={code} noInline={false}>
          <div className="h-full relative">
            <div 
              className="min-h-full cursor-pointer"
              onClick={handleElementClick}
            >
              <LivePreview className="h-full" />
            </div>
            
            <LiveError className="absolute top-4 left-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4">
              {({ error }) => (
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-900 mb-1">Component Error</h3>
                    <pre className="text-sm text-red-700 whitespace-pre-wrap">
                      {error?.message}
                    </pre>
                  </div>
                </div>
              )}
            </LiveError>
          </div>
        </LiveProvider>
      </div>
    </div>
  );
};
