import React from 'react';
import { BuilderElement } from '../../app/builder/page';
import { cn } from '../../lib/utils';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface PageSettings {
  title: string;
  description: string;
  favicon: string;
  backgroundColor: string;
  fontFamily: string;
}

interface BuilderCanvasProps {
  elements: BuilderElement[];
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
  deleteElement: (id: string) => void;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  previewMode: boolean;
  pageSettings: PageSettings;
}

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  elements,
  selectedElement,
  setSelectedElement,
  updateElement,
  deleteElement,
  viewMode,
  previewMode,
  pageSettings,
}) => {
  const getCanvasWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'max-w-none';
    }
  };

  const handleElementClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    if (!previewMode) {
      setSelectedElement(elementId);
    }
  };

  const handleContentEdit = (elementId: string, newContent: string) => {
    updateElement(elementId, { content: newContent });
  };

  const renderElement = (element: BuilderElement): React.ReactNode => {
    const isSelected = selectedElement === element.id;
    
    const baseClasses = cn(
      "relative transition-all duration-200",
      !previewMode && "hover:ring-1 hover:ring-blue-300",
      isSelected && !previewMode && "ring-2 ring-blue-500 ring-dashed"
    );

    const commonProps = {
      onClick: (e: React.MouseEvent) => handleElementClick(e, element.id),
      className: baseClasses,
      style: element.styles,
    };

    let content: React.ReactNode;
    
    switch (element.type) {
      case 'container':
        content = (
          <div {...commonProps}>
            {!previewMode && isSelected && (
              <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center gap-2 z-10">
                Container
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 text-white hover:bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            {element.children?.map(child => (
              <React.Fragment key={child.id}>
                {renderElement(child)}
              </React.Fragment>
            ))}
            {!element.children?.length && !previewMode && (
              <div className="text-center text-muted-foreground p-4">
                Drop elements here
              </div>
            )}
          </div>
        );
        break;

      case 'two-columns':
        content = (
          <div {...commonProps}>
            {!previewMode && isSelected && (
              <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center gap-2 z-10">
                Two Columns
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 text-white hover:bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 min-h-[100px]">
              <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                <p className="text-center text-muted-foreground text-sm">Column 1</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                <p className="text-center text-muted-foreground text-sm">Column 2</p>
              </div>
            </div>
          </div>
        );
        break;
        
      case 'text':
        content = (
          <div {...commonProps}>
            {!previewMode && isSelected && (
              <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center gap-2 z-10">
                Text Element
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 text-white hover:bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            <div
              contentEditable={!previewMode}
              suppressContentEditableWarning
              onBlur={(e) => handleContentEdit(element.id, e.currentTarget.textContent || '')}
              className="outline-none"
            >
              {element.content || 'Text Element'}
            </div>
          </div>
        );
        break;
        
      case 'image':
        content = (
          <div {...commonProps}>
            {!previewMode && isSelected && (
              <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center gap-2 z-10">
                Image Element
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 text-white hover:bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            <img
              src={element.content || '/placeholder.svg'}
              alt="Website element"
              className="block max-w-full h-auto"
              style={element.styles}
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
        );
        break;
        
      case 'video':
        content = (
          <div {...commonProps}>
            {!previewMode && isSelected && (
              <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center gap-2 z-10">
                Video Element
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 text-white hover:bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            <div className="bg-gray-200 border-2 border-dashed border-gray-400 p-8 text-center rounded-lg">
              <div className="text-4xl mb-2">🎥</div>
              <p className="text-gray-600 font-medium">Video Component</p>
              <p className="text-sm text-gray-500 mt-2">{element.content || 'Click to add video URL'}</p>
            </div>
          </div>
        );
        break;
        
      case 'contact':
        content = (
          <div {...commonProps}>
            {!previewMode && isSelected && (
              <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center gap-2 z-10">
                Contact Form
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 text-white hover:bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            <div className="bg-card border rounded-lg p-6 max-w-md">
              <h3 className="text-lg font-semibold mb-4">Want a free quote? We can help you</h3>
              <p className="text-sm text-muted-foreground mb-4">Contact Us</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    className="w-full p-3 border rounded-md bg-muted" 
                    placeholder="Name" 
                    disabled={previewMode}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    className="w-full p-3 border rounded-md bg-muted" 
                    placeholder="Email" 
                    disabled={previewMode}
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Get a free quote!
                </Button>
              </div>
            </div>
          </div>
        );
        break;
        
      case 'checkout':
        content = (
          <div {...commonProps}>
            {!previewMode && isSelected && (
              <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center gap-2 z-10">
                Stripe Checkout
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 text-white hover:bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            <div className="bg-card border rounded-lg p-6 max-w-md">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-blue-600 rounded-sm"></div>
                    <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                    <div className="w-8 h-5 bg-yellow-500 rounded-sm"></div>
                    <div className="w-8 h-5 bg-green-500 rounded-sm"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input 
                    className="p-3 border rounded bg-muted" 
                    placeholder="1234 1234 1234 1234"
                    disabled={previewMode}
                  />
                  <input 
                    className="p-3 border rounded bg-muted col-span-2" 
                    placeholder="MM / YY     CVC"
                    disabled={previewMode}
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Cardholder name</label>
                    <input 
                      className="w-full p-3 border rounded bg-muted" 
                      placeholder="Full name on card"
                      disabled={previewMode}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Country or region</label>
                    <select className="w-full p-3 border rounded bg-muted" disabled={previewMode}>
                      <option>United States</option>
                    </select>
                  </div>
                  
                  <input 
                    className="w-full p-3 border rounded bg-muted" 
                    placeholder="ZIP"
                    disabled={previewMode}
                  />
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3">
                Pay
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Powered by <span className="font-semibold">stripe</span>
              </p>
            </div>
          </div>
        );
        break;
        
      case 'link':
        content = (
          <div {...commonProps}>
            {!previewMode && isSelected && (
              <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center gap-2 z-10">
                Link Element
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 text-white hover:bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            <a
              href="#"
              className="inline-block"
              onClick={previewMode ? undefined : (e) => e.preventDefault()}
              contentEditable={!previewMode}
              suppressContentEditableWarning
              onBlur={(e) => handleContentEdit(element.id, e.currentTarget.textContent || '')}
            >
              {element.content || 'Click here'}
            </a>
          </div>
        );
        break;
        
      default:
        content = <div {...commonProps}>Unknown element type</div>;
    }

    return content;
  };

  return (
    <div className="flex-1 bg-muted/30 p-4 overflow-auto">
      <div 
        className={cn("mx-auto min-h-full", getCanvasWidth())}
        style={{
          backgroundColor: pageSettings.backgroundColor,
          fontFamily: pageSettings.fontFamily
        }}
      >
        <div 
          className="min-h-full"
          onClick={() => !previewMode && setSelectedElement(null)}
        >
          {elements.map(element => (
            <React.Fragment key={element.id}>
              {renderElement(element)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
