
import { useState } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { PreviewPanel } from '@/components/PreviewPanel';
import { PropertiesPanel } from '@/components/PropertiesPanel';
import { Header } from '@/components/Header';

const defaultCode = `<div className="p-8 text-center">
  <h1 className="text-4xl font-bold text-blue-600 mb-4">
    Welcome to runable on steroids
  </h1>
  <p className="text-lg text-gray-600 mb-6">
    Click on any element to edit its font size,color and content
  </p>
  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:scale-105">
    Get Started
  </button>
</div>
`;

export interface ElementData {
  id: string;
  tagName: string;
  textContent?: string;
  styles: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
}

const Index = () => {
  const [code, setCode] = useState(defaultCode);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false);

  const handleElementSelect = (element: ElementData) => {
    setSelectedElement(element);
    setIsPropertiesPanelOpen(true);
  };

  const handlePropertyChange = (property: string, value: string) => {
    if (!selectedElement) return;


    const updatedElement = {
      ...selectedElement,
      ...(property === 'textContent' ? { textContent: value } : {}),
      styles: {
        ...selectedElement.styles,
        ...(property !== 'textContent' ? { [property]: value } : {})
      }
    };
    setSelectedElement(updatedElement);
    
    console.log('Property changed:', property, value);
  };

  const handleSaveCode = () => {
    window.location.reload();
    alert('Component saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSave={handleSaveCode} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        
        <div className="w-1/3 border-r border-border">
          <CodeEditor code={code} onChange={setCode} />
        </div>
    
        <div className="flex-1 relative">
          <PreviewPanel 
            code={code} 
            onElementSelect={handleElementSelect}
            selectedElement={selectedElement}
          />
        </div>
        
   
        <div className={`w-80 border-l border-border transition-transform duration-300 ${
          isPropertiesPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <PropertiesPanel
            element={selectedElement}
            onPropertyChange={handlePropertyChange}
            onClose={() => setIsPropertiesPanelOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
