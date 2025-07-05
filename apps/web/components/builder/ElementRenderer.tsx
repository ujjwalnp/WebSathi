import React from 'react';
import { cn } from '../../lib/utils';
import { Settings, Move, Maximize2, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { BuilderElement } from '../../app/builder/page';
interface ElementRendererProps {
  element: BuilderElement;
  selectedElement: string | null;
  hoveredElement: string | null;
  draggedElement: string | null;
  dragOverElement: string | null;
  resizingElement: string | null;
  previewMode: boolean;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onContentEdit: (id: string, content: string) => void;
  onDragStart: (e: React.MouseEvent, elementId: string, action: 'drag' | 'resize', direction?: string) => void;
  onDuplicate: (id: string) => void;
  onToggleVisibility: (element: BuilderElement) => void;
  onDelete: (id: string) => void;
  renderElement: (element: BuilderElement) => React.ReactNode;
  responsiveStyles?: Record<string, any>;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  selectedElement,
  hoveredElement,
  draggedElement,
  dragOverElement,
  resizingElement,
  previewMode,
  onSelect,
  onHover,
  onContentEdit,
  onDragStart,
  onDuplicate,
  onToggleVisibility,
  onDelete,
  renderElement,
}) => {
  const isSelected = selectedElement === element.id;
  const isHovered = hoveredElement === element.id;
  const isDraggedOver = dragOverElement === element.id;
  const isBeingResized = resizingElement === element.id;
  
  const baseClasses = cn(
    "relative group transition-all duration-150 ease-out",
    !previewMode && "hover:ring-2 hover:ring-blue-300/50",
    isSelected && !previewMode && "ring-2 ring-blue-500",
    isDraggedOver && "ring-2 ring-green-400",
    draggedElement === element.id && "opacity-70 z-50 shadow-2xl scale-105",
    isBeingResized && "ring-2 ring-purple-400",
    element.styles?.position === 'absolute' && "absolute"
  );

  const commonProps = {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!previewMode) onSelect(element.id);
    },
    onMouseEnter: () => !previewMode && onHover(element.id),
    onMouseLeave: () => !previewMode && onHover(null),
    className: baseClasses,
    style: {
      ...element.styles,
      userSelect: (previewMode ? 'auto' : 'none') as 'auto' | 'none',
      minWidth: element.styles?.minWidth || '50px',
      minHeight: element.styles?.minHeight || '30px',
      cursor: !previewMode ? 'move' : 'default',
      transform: draggedElement === element.id ? 'scale(1.02)' : 'scale(1)',
      transition: 'all 0.15s ease-out'
    } as React.CSSProperties,
  };

  const renderToolbar = () => {
    if (previewMode || (!isSelected && !isHovered)) return null;

    return (
      <div className={cn(
        "absolute -top-12 left-0 flex items-center gap-1 px-3 py-1.5 rounded-lg shadow-lg z-30 transition-all duration-200 border backdrop-blur-sm",
        isSelected 
          ? "bg-blue-600/95 text-white border-blue-500" 
          : "bg-gray-900/95 text-white border-gray-700 opacity-90"
      )}>
        <span className="text-xs font-medium capitalize mr-2">
          {element.type.replace('-', ' ')}
        </span>
        
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-white hover:bg-white/20 cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => onDragStart(e, element.id, 'drag')}
        >
          <Move className="w-3 h-3" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-white hover:bg-purple-400"
          onMouseDown={(e) => onDragStart(e, element.id, 'resize')}
        >
          <Maximize2 className="w-3 h-3" />
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-white hover:bg-green-400"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate(element.id);
          }}
        >
          <Copy className="w-3 h-3" />
        </Button>
        
        <Button
          size="icon"
          variant="ghost" 
          className="h-6 w-6 text-white hover:bg-yellow-400"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility(element);
          }}
        >
          {element.styles?.display === 'none' ? (
            <EyeOff className="w-3 h-3" />
          ) : (
            <Eye className="w-3 h-3" />
          )}
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-white hover:bg-red-400"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(element.id);
          }}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    );
  };

  const renderEditableContent = (defaultContent: string, className?: string) => (
    <div
      contentEditable={!previewMode}
      suppressContentEditableWarning
      onBlur={(e) => onContentEdit(element.id, e.currentTarget.textContent || '')}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "outline-none transition-all duration-200 min-h-[1em] cursor-text",
        !previewMode && "hover:bg-blue-50/70 focus:bg-blue-50 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-300",
        className
      )}
      style={{
        fontSize: element.styles?.fontSize || '16px',
        fontWeight: element.styles?.fontWeight || 'normal',
        color: element.styles?.color || '#1f2937',
        textAlign: element.styles?.textAlign || 'left',
        lineHeight: element.styles?.lineHeight || '1.6'
      }}
    >
      {element.content || defaultContent}
    </div>
  );

  const renderResizeHandles = () => {
    if (previewMode || !isSelected) return null;
    
    const handleStyle = "absolute w-3 h-3 bg-blue-500 border-2 border-white rounded-sm hover:bg-blue-600 transition-colors shadow-lg";
    
    return (
      <>
        {/* Corner handles */}
        <div 
          className={cn(handleStyle, "-top-1.5 -left-1.5 cursor-nw-resize")}
          onMouseDown={(e) => onDragStart(e, element.id, 'resize', 'nw')}
        />
        <div 
          className={cn(handleStyle, "-top-1.5 -right-1.5 cursor-ne-resize")}
          onMouseDown={(e) => onDragStart(e, element.id, 'resize', 'ne')}
        />
        <div 
          className={cn(handleStyle, "-bottom-1.5 -left-1.5 cursor-sw-resize")}
          onMouseDown={(e) => onDragStart(e, element.id, 'resize', 'sw')}
        />
        <div 
          className={cn(handleStyle, "-bottom-1.5 -right-1.5 cursor-se-resize")}
          onMouseDown={(e) => onDragStart(e, element.id, 'resize', 'se')}
        />
        
        {/* Side handles */}
        <div 
          className={cn(handleStyle, "-top-1.5 left-1/2 transform -translate-x-1/2 cursor-n-resize")}
          onMouseDown={(e) => onDragStart(e, element.id, 'resize', 'n')}
        />
        <div 
          className={cn(handleStyle, "-bottom-1.5 left-1/2 transform -translate-x-1/2 cursor-s-resize")}
          onMouseDown={(e) => onDragStart(e, element.id, 'resize', 's')}
        />
        <div 
          className={cn(handleStyle, "-left-1.5 top-1/2 transform -translate-y-1/2 cursor-w-resize")}
          onMouseDown={(e) => onDragStart(e, element.id, 'resize', 'w')}
        />
        <div 
          className={cn(handleStyle, "-right-1.5 top-1/2 transform -translate-y-1/2 cursor-e-resize")}
          onMouseDown={(e) => onDragStart(e, element.id, 'resize', 'e')}
        />
      </>
    );
  };

  switch (element.type) {
    case 'container':
      return (
        <div {...commonProps} style={{
          ...commonProps.style,
          minHeight: element.styles?.minHeight || '120px',
          padding: element.styles?.padding || '20px',
          backgroundColor: element.styles?.backgroundColor || '#f8fafc',
          borderRadius: element.styles?.borderRadius || '12px',
          border: !previewMode ? '2px dashed #e2e8f0' : element.styles?.border || 'none',
          display: element.styles?.display || 'block'
        }}>
          {renderToolbar()}
          {element.children?.map(child => (
            <React.Fragment key={child.id}>
              {renderElement(child)}
            </React.Fragment>
          ))}
          {!element.children?.length && (
            <div className="flex items-center justify-center h-full min-h-[80px] text-center">
              {!previewMode ? (
                <div className="space-y-2 text-gray-500 pointer-events-none">
                  <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <Move className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium">Drop elements here</p>
                </div>
              ) : (
                renderEditableContent('Click to add content', 'text-center')
              )}
            </div>
          )}
          {renderResizeHandles()}
        </div>
      );

    case 'image':
      return (
        <div {...commonProps}>
          {renderToolbar()}
          <img
            src={element.content || '/placeholder.svg'}
            alt="Website element"
            className="block max-w-full h-auto transition-all duration-200 hover:shadow-lg"
            style={{
              width: element.styles?.width || 'auto',
              height: element.styles?.height || 'auto',
              borderRadius: element.styles?.borderRadius || '12px',
              objectFit: element.styles?.objectFit || 'cover'
            }}
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          {renderResizeHandles()}
        </div>
      );

    case 'shape-rectangle':
      return (
        <div {...commonProps} style={{
          ...commonProps.style,
          width: element.styles?.width || '200px',
          height: element.styles?.height || '100px',
          backgroundColor: element.styles?.backgroundColor || '#3b82f6',
          borderRadius: element.styles?.borderRadius || '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: element.styles?.color || 'white'
        }}>
          {renderToolbar()}
          {renderEditableContent('Rectangle', 'text-center font-semibold')}
          {renderResizeHandles()}
        </div>
      );

    case 'shape-circle':
      return (
        <div {...commonProps} style={{
          ...commonProps.style,
          width: element.styles?.width || '150px',
          height: element.styles?.height || '150px',
          backgroundColor: element.styles?.backgroundColor || '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: element.styles?.color || 'white'
        }}>
          {renderToolbar()}
          {renderEditableContent('Circle', 'text-center font-semibold')}
          {renderResizeHandles()}
        </div>
      );

    case 'gradient-box':
      return (
        <div {...commonProps} style={{
          ...commonProps.style,
          width: element.styles?.width || '250px',
          height: element.styles?.height || '150px',
          background: element.styles?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: element.styles?.borderRadius || '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: element.styles?.color || 'white'
        }}>
          {renderToolbar()}
          {renderEditableContent('Gradient Box', 'text-center font-semibold')}
          {renderResizeHandles()}
        </div>
      );

    case 'hero-section':
      return (
        <div {...commonProps} style={{
          ...commonProps.style,
          background: element.styles?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: element.styles?.padding || '4rem 2rem',
          textAlign: 'center',
          color: 'white',
          borderRadius: element.styles?.borderRadius || '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {renderToolbar()}
          <div className="relative z-10 space-y-6">
            {renderEditableContent('Welcome to the Future', 'text-4xl md:text-6xl font-bold leading-tight')}
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Build amazing websites with our powerful builder
            </p>
            <div className="flex gap-4 justify-center flex-wrap mt-8">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Learn More
              </button>
            </div>
          </div>
          {renderResizeHandles()}
        </div>
      );

    case 'text':
      return (
        <div {...commonProps}>
          {renderToolbar()}
          {renderEditableContent('Click to edit this text')}
          {renderResizeHandles()}
        </div>
      );

    case 'two-columns':
      return (
        <div {...commonProps} style={{
          ...commonProps.style,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: element.styles?.gap || '2rem',
          padding: element.styles?.padding || '1.5rem',
          minHeight: '140px'
        }}>
          {renderToolbar()}
          <div className={cn(
            "border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center",
            !previewMode ? "border-gray-300 bg-gray-50/50 hover:bg-gray-100/50" : "border-transparent"
          )}>
            {renderEditableContent('Column 1 Content', 'text-center')}
          </div>
          <div className={cn(
            "border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center",
            !previewMode ? "border-gray-300 bg-gray-50/50 hover:bg-gray-100/50" : "border-transparent"
          )}>
            {renderEditableContent('Column 2 Content', 'text-center')}
          </div>
          {renderResizeHandles()}
        </div>
      );

    case 'contact':
      return (
        <div {...commonProps}>
          {renderToolbar()}
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md shadow-sm" style={element.styles}>
            <h3 className="text-lg font-semibold mb-4">Want a free quote? We can help you</h3>
            <p className="text-sm text-gray-600 mb-4">Contact Us</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
                  placeholder="Name" 
                  disabled={!previewMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
                  placeholder="Email" 
                  disabled={!previewMode}
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Get a free quote!
              </Button>
            </div>
          </div>
          {renderResizeHandles()}
        </div>
      );
      
    case 'checkout':
      return (
        <div {...commonProps}>
          {renderToolbar()}
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
                  disabled={!previewMode}
                />
                <input 
                  className="p-3 border border-gray-300 rounded bg-gray-50" 
                  placeholder="MM / YY"
                  disabled={!previewMode}
                />
                <input 
                  className="p-3 border border-gray-300 rounded bg-gray-50" 
                  placeholder="CVC"
                  disabled={!previewMode}
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Cardholder name</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
                    placeholder="Full name on card"
                    disabled={!previewMode}
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Country or region</label>
                  <select className="w-full p-3 border border-gray-300 rounded bg-gray-50" disabled={!previewMode}>
                    <option>United States</option>
                  </select>
                </div>
                
                <input 
                  className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
                  placeholder="ZIP"
                  disabled={!previewMode}
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
          {renderResizeHandles()}
        </div>
      );
      
    case 'video':
      return (
        <div {...commonProps}>
          {renderToolbar()}
          <div className="bg-gray-200 border-2 border-dashed border-gray-400 p-8 text-center rounded-lg" style={element.styles}>
            <div className="text-4xl mb-2">🎥</div>
            <p className="text-gray-600 font-medium">Video Component</p>
            {renderEditableContent('Click to add video URL', 'text-sm text-gray-500 mt-2')}
          </div>
          {renderResizeHandles()}
        </div>
      );
      
    case 'link':
      return (
        <div {...commonProps}>
          {renderToolbar()}
          <a
            href="#"
            className="inline-block"
            onClick={previewMode ? undefined : (e) => e.preventDefault()}
            style={{
              color: element.styles?.color || '#3b82f6',
              textDecoration: element.styles?.textDecoration || 'underline',
              fontSize: element.styles?.fontSize || '16px'
            }}
          >
            {renderEditableContent('Click here')}
          </a>
          {renderResizeHandles()}
        </div>
      );

    default:
      return (
        <div {...commonProps}>
          {renderToolbar()}
          <div className="p-6 border border-gray-300 rounded-xl bg-gray-100 text-center">
            <Settings className="w-8 h-8 mx-auto mb-2 text-gray-500" />
            <p className="text-gray-600 font-medium">Unknown element: {element.type}</p>
          </div>
          {renderResizeHandles()}
        </div>
      );
  }
};
