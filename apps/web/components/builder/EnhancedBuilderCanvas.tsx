"use client";
import React, { useState, useRef } from 'react';
import { BuilderElement } from '../../app/builder/page';
import { cn } from '../../lib/utils';
import { Trash2, Eye, EyeOff, Copy, Move, Palette, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface PageSettings {
  title: string;
  description: string;
  favicon: string;
  backgroundColor: string;
  fontFamily: string;
}

interface EnhancedBuilderCanvasProps {
  elements: BuilderElement[];
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
  deleteElement: (id: string) => void;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  previewMode: boolean;
  pageSettings: PageSettings;
}

export const EnhancedBuilderCanvas: React.FC<EnhancedBuilderCanvasProps> = ({
  elements,
  selectedElement,
  setSelectedElement,
  updateElement,
  deleteElement,
  viewMode,
  previewMode,
  pageSettings,
}) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

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

  const renderElementActions = (element: BuilderElement) => {
    if (previewMode || (selectedElement !== element.id && hoveredElement !== element.id)) return null;

    const isSelected = selectedElement === element.id;
    const isHovered = hoveredElement === element.id;

    return (
      <div className={cn(
        "absolute -top-8 left-0 flex items-center gap-1 px-2 py-1 text-xs rounded-md shadow-lg z-20 transition-all",
        isSelected ? "bg-blue-600 text-white" : "bg-gray-800 text-white opacity-80"
      )}>
        <span className="font-medium capitalize text-xs">{element.type.replace('-', ' ')}</span>
        <div className="flex items-center gap-1 ml-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-4 w-4 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(JSON.stringify(element));
            }}
          >
            <Copy className="w-2 h-2" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-4 w-4 text-white hover:bg-red-400"
            onClick={(e) => {
              e.stopPropagation();
              deleteElement(element.id);
            }}
          >
            <Trash2 className="w-2 h-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderElement = (element: BuilderElement): React.ReactNode => {
    const isSelected = selectedElement === element.id;
    const isHovered = hoveredElement === element.id;
    
    const baseClasses = cn(
      "relative transition-all duration-200 group",
      !previewMode && "hover:ring-2 hover:ring-blue-300",
      isSelected && !previewMode && "ring-2 ring-blue-500",
      element.styles?.position === 'absolute' && "absolute"
    );

    const commonProps = {
      onClick: (e: React.MouseEvent) => handleElementClick(e, element.id),
      onMouseEnter: () => !previewMode && setHoveredElement(element.id),
      onMouseLeave: () => !previewMode && setHoveredElement(null),
      className: baseClasses,
      style: element.styles,
    };

    let content: React.ReactNode;
    
    switch (element.type) {
      case 'container':
        content = (
          <div {...commonProps} style={{
            ...element.styles,
            minHeight: element.styles?.minHeight || '100px',
            padding: element.styles?.padding || '20px',
            border: !previewMode ? (isSelected ? '2px solid #3b82f6' : '2px dashed #e5e7eb') : 'none',
            borderRadius: element.styles?.borderRadius || '8px',
            backgroundColor: element.styles?.backgroundColor || (previewMode ? 'transparent' : '#f9fafb')
          }}>
            {renderElementActions(element)}
            {element.children?.map(child => (
              <React.Fragment key={child.id}>
                {renderElement(child)}
              </React.Fragment>
            ))}
            {!element.children?.length && !previewMode && (
              <div className="flex items-center justify-center h-full min-h-[60px] text-center">
                <div className="space-y-2">
                  <Plus className="w-6 h-6 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-500 font-medium">Drop elements here</p>
                  <p className="text-xs text-gray-400">This container is ready for content</p>
                </div>
              </div>
            )}
          </div>
        );
        break;

      case 'two-columns':
        content = (
          <div {...commonProps} style={{
            ...element.styles,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: element.styles?.gap || '1rem',
            padding: element.styles?.padding || '1rem',
            minHeight: '120px'
          }}>
            {renderElementActions(element)}
            <div className={cn(
              "border-2 border-dashed rounded p-4",
              !previewMode ? "border-gray-300 bg-gray-50" : "border-transparent"
            )}>
              {!previewMode && (
                <div className="flex items-center justify-center h-full min-h-[60px]">
                  <p className="text-center text-gray-500 text-sm">Column 1</p>
                </div>
              )}
            </div>
            <div className={cn(
              "border-2 border-dashed rounded p-4",
              !previewMode ? "border-gray-300 bg-gray-50" : "border-transparent"
            )}>
              {!previewMode && (
                <div className="flex items-center justify-center h-full min-h-[60px]">
                  <p className="text-center text-gray-500 text-sm">Column 2</p>
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 'hero-section':
        content = (
          <div {...commonProps} style={{
            ...element.styles,
            background: element.styles?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: element.styles?.padding || '4rem 2rem',
            textAlign: 'center',
            color: 'white',
            borderRadius: element.styles?.borderRadius || '12px'
          }}>
            {renderElementActions(element)}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold" style={{
                fontSize: element.styles?.fontSize || '3rem'
              }}>
                {element.content || 'Welcome to the Future'}
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Build amazing websites with our enhanced builder
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Get Started
                </button>
                <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        );
        break;

      case 'text':
        content = (
          <div {...commonProps}>
            {renderElementActions(element)}
            <div
              contentEditable={!previewMode}
              suppressContentEditableWarning
              onBlur={(e) => handleContentEdit(element.id, e.currentTarget.textContent || '')}
              className="outline-none"
              style={{
                fontSize: element.styles?.fontSize || '16px',
                fontWeight: element.styles?.fontWeight || 'normal',
                color: element.styles?.color || '#000000',
                textAlign: element.styles?.textAlign || 'left',
                lineHeight: element.styles?.lineHeight || '1.5'
              }}
            >
              {element.content || 'Edit this text'}
            </div>
          </div>
        );
        break;
        
      case 'image':
        content = (
          <div {...commonProps}>
            {renderElementActions(element)}
            <img
              src={element.content || '/placeholder.svg'}
              alt="Website element"
              className="block max-w-full h-auto"
              style={{
                width: element.styles?.width || 'auto',
                height: element.styles?.height || 'auto',
                borderRadius: element.styles?.borderRadius || '0px',
                objectFit: element.styles?.objectFit || 'cover'
              }}
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
            {renderElementActions(element)}
            <div className="bg-gray-200 border-2 border-dashed border-gray-400 p-8 text-center rounded-lg" style={element.styles}>
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
            {renderElementActions(element)}
            <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md shadow-sm" style={element.styles}>
              <h3 className="text-lg font-semibold mb-4">Want a free quote? We can help you</h3>
              <p className="text-sm text-gray-600 mb-4">Contact Us</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50" 
                    placeholder="Name" 
                    disabled={previewMode}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50" 
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
            {renderElementActions(element)}
            <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md shadow-sm" style={element.styles}>
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
                    className="p-3 border border-gray-300 rounded bg-gray-50 col-span-2" 
                    placeholder="1234 1234 1234 1234"
                    disabled={previewMode}
                  />
                  <input 
                    className="p-3 border border-gray-300 rounded bg-gray-50" 
                    placeholder="MM / YY"
                    disabled={previewMode}
                  />
                  <input 
                    className="p-3 border border-gray-300 rounded bg-gray-50" 
                    placeholder="CVC"
                    disabled={previewMode}
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Cardholder name</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
                      placeholder="Full name on card"
                      disabled={previewMode}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Country or region</label>
                    <select className="w-full p-3 border border-gray-300 rounded bg-gray-50" disabled={previewMode}>
                      <option>United States</option>
                    </select>
                  </div>
                  
                  <input 
                    className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
                    placeholder="ZIP"
                    disabled={previewMode}
                  />
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3">
                Pay
              </Button>
              
              <p className="text-xs text-center text-gray-600">
                Powered by <span className="font-semibold">stripe</span>
              </p>
            </div>
          </div>
        );
        break;
        
      case 'link':
        content = (
          <div {...commonProps}>
            {renderElementActions(element)}
            <a
              href="#"
              className="inline-block"
              onClick={previewMode ? undefined : (e) => e.preventDefault()}
              contentEditable={!previewMode}
              suppressContentEditableWarning
              onBlur={(e) => handleContentEdit(element.id, e.currentTarget.textContent || '')}
              style={{
                color: element.styles?.color || '#3b82f6',
                textDecoration: element.styles?.textDecoration || 'underline',
                fontSize: element.styles?.fontSize || '16px'
              }}
            >
              {element.content || 'Click here'}
            </a>
          </div>
        );
        break;
        
      default:
        content = (
          <div {...commonProps}>
            {renderElementActions(element)}
            <div className="p-4 border border-gray-300 rounded bg-gray-100">
              Unknown element type: {element.type}
            </div>
          </div>
        );
    }

    return content;
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
      <div 
        ref={canvasRef}
        className={cn("mx-auto min-h-full transition-all duration-500 p-4", getCanvasWidth())}
        style={{
          backgroundColor: pageSettings.backgroundColor,
          fontFamily: pageSettings.fontFamily
        }}
      >
        <div 
          className="min-h-full relative bg-white rounded-lg shadow-sm"
          onClick={() => !previewMode && setSelectedElement(null)}
          style={{ minHeight: '600px' }}
        >
          {elements.map(element => (
            <React.Fragment key={element.id}>
              {renderElement(element)}
            </React.Fragment>
          ))}
          
          {!previewMode && elements.length === 0 && (
            <div className="flex items-center justify-center h-96 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Palette className="w-10 h-10 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Start Building</h3>
                  <p className="text-gray-500 mt-2">Drag components from the panel to create your masterpiece</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
