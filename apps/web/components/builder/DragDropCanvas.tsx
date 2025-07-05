import React, { useState, useRef, useCallback } from 'react';
import { BuilderElement } from '../../app/builder/page';
import { cn } from '../../lib/utils';
import { Move, Grip, Maximize2 } from 'lucide-react';
import { toast } from 'sonner';
import { ElementRenderer } from './ElementRenderer';

interface PageSettings {
  title: string;
  description: string;
  favicon: string;
  backgroundColor: string;
  fontFamily: string;
}

interface DragDropCanvasProps {
  elements: BuilderElement[];
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  previewMode: boolean;
  pageSettings: PageSettings;
}

export const DragDropCanvas: React.FC<DragDropCanvasProps> = ({
  elements,
  selectedElement,
  setSelectedElement,
  updateElement,
  deleteElement,
  duplicateElement,
  viewMode,
  previewMode,
  pageSettings,
}) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOverElement, setDragOverElement] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [resizingElement, setResizingElement] = useState<string | null>(null);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const getCanvasWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-[375px] mx-auto';
      case 'tablet': return 'max-w-[768px] mx-auto';
      default: return 'w-full max-w-none';
    }
  };

  const getResponsiveStyles = (element: BuilderElement) => {
    const baseStyles = element.styles || {};
    
    if (viewMode === 'mobile') {
      return {
        ...baseStyles,
        fontSize: baseStyles.fontSize ? `calc(${baseStyles.fontSize} * 0.8)` : baseStyles.fontSize,
        padding: baseStyles.padding ? `calc(${baseStyles.padding} * 0.7)` : baseStyles.padding,
        width: baseStyles.width && baseStyles.width !== 'auto' ? 
          (parseInt(baseStyles.width) > 300 ? '100%' : baseStyles.width) : baseStyles.width,
      };
    } else if (viewMode === 'tablet') {
      return {
        ...baseStyles,
        fontSize: baseStyles.fontSize ? `calc(${baseStyles.fontSize} * 0.9)` : baseStyles.fontSize,
        padding: baseStyles.padding ? `calc(${baseStyles.padding} * 0.85)` : baseStyles.padding,
        width: baseStyles.width && baseStyles.width !== 'auto' ? 
          (parseInt(baseStyles.width) > 600 ? '100%' : baseStyles.width) : baseStyles.width,
      };
    }
    
    return baseStyles;
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string, action: 'drag' | 'resize', direction?: string) => {
    if (previewMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setDragStart({ x: e.clientX, y: e.clientY });
    
    const element = elements.find(el => el.id === elementId);
    if (element) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      
      if (canvasRect) {
        setElementStart({
          x: rect.left - canvasRect.left,
          y: rect.top - canvasRect.top,
          width: rect.width,
          height: rect.height
        });
      }
    }
    
    if (action === 'resize') {
      setResizingElement(elementId);
      setResizeDirection(direction || 'se');
    } else {
      setDraggedElement(elementId);
    }
    
    setSelectedElement(elementId);
    
    // Add smooth transition classes
    document.body.style.cursor = action === 'resize' ? `${direction || 'se'}-resize` : 'grabbing';
  }, [previewMode, elements, setSelectedElement]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedElement && !resizingElement || previewMode) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const activeElementId = draggedElement || resizingElement;
    const element = elements.find(el => el.id === activeElementId);
    
    if (element && activeElementId) {
      if (resizingElement) {
        const minWidth = viewMode === 'mobile' ? 50 : viewMode === 'tablet' ? 80 : 100;
        const minHeight = 30;
        const maxWidth = viewMode === 'mobile' ? 350 : viewMode === 'tablet' ? 700 : 1200;
        const maxHeight = 800;
        
        let newWidth = elementStart.width;
        let newHeight = elementStart.height;
        
        // Handle different resize directions
        switch (resizeDirection) {
          case 'se': // Southeast
            newWidth = Math.max(minWidth, Math.min(maxWidth, elementStart.width + deltaX));
            newHeight = Math.max(minHeight, Math.min(maxHeight, elementStart.height + deltaY));
            break;
          case 'sw': // Southwest
            newWidth = Math.max(minWidth, Math.min(maxWidth, elementStart.width - deltaX));
            newHeight = Math.max(minHeight, Math.min(maxHeight, elementStart.height + deltaY));
            break;
          case 'ne': // Northeast
            newWidth = Math.max(minWidth, Math.min(maxWidth, elementStart.width + deltaX));
            newHeight = Math.max(minHeight, Math.min(maxHeight, elementStart.height - deltaY));
            break;
          case 'nw': // Northwest
            newWidth = Math.max(minWidth, Math.min(maxWidth, elementStart.width - deltaX));
            newHeight = Math.max(minHeight, Math.min(maxHeight, elementStart.height - deltaY));
            break;
          case 'n': // North
            newHeight = Math.max(minHeight, Math.min(maxHeight, elementStart.height - deltaY));
            break;
          case 's': // South
            newHeight = Math.max(minHeight, Math.min(maxHeight, elementStart.height + deltaY));
            break;
          case 'e': // East
            newWidth = Math.max(minWidth, Math.min(maxWidth, elementStart.width + deltaX));
            break;
          case 'w': // West
            newWidth = Math.max(minWidth, Math.min(maxWidth, elementStart.width - deltaX));
            break;
        }
        
        updateElement(activeElementId, {
          styles: {
            ...getResponsiveStyles(element),
            width: `${newWidth}px`,
            height: `${newHeight}px`,
            position: element.styles?.position || 'relative',
            transition: 'none'
          }
        });
      } else {
        // Smooth dragging with bounds checking
        const canvasRect = canvasRef.current?.getBoundingClientRect();
        if (canvasRect) {
          const newLeft = Math.max(0, Math.min(canvasRect.width - 100, elementStart.x + deltaX));
          const newTop = Math.max(0, elementStart.y + deltaY);
          
          updateElement(activeElementId, {
            styles: {
              ...getResponsiveStyles(element),
              position: 'absolute',
              left: `${newLeft}px`,
              top: `${newTop}px`,
              zIndex: '10',
              transition: 'none'
            }
          });
        }
      }
    }
  }, [draggedElement, resizingElement, dragStart, elementStart, elements, updateElement, previewMode, viewMode, resizeDirection]);

  const handleMouseUp = useCallback(() => {
    if (draggedElement) {
      toast.success('Element moved!');
    }
    if (resizingElement) {
      toast.success('Element resized!');
    }
    
    setDraggedElement(null);
    setResizingElement(null);
    setResizeDirection('');
    document.body.style.cursor = 'default';
  }, [draggedElement, resizingElement]);

  React.useEffect(() => {
    if (draggedElement || resizingElement) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedElement, resizingElement, handleMouseMove, handleMouseUp]);

  const handleContentEdit = (elementId: string, newContent: string) => {
    updateElement(elementId, { content: newContent });
  };

  const handleToggleVisibility = (element: BuilderElement) => {
    updateElement(element.id, {
      styles: { 
        ...element.styles, 
        display: element.styles?.display === 'none' ? 'block' : 'none' 
      }
    });
  };

  const renderElement = (element: BuilderElement): React.ReactNode => {
    return (
      <ElementRenderer
        key={element.id}
        element={element}
        selectedElement={selectedElement}
        hoveredElement={hoveredElement}
        draggedElement={draggedElement}
        dragOverElement={dragOverElement}
        resizingElement={resizingElement}
        previewMode={previewMode}
        onSelect={setSelectedElement}
        onHover={setHoveredElement}
        onContentEdit={handleContentEdit}
        onDragStart={handleMouseDown}
        onDuplicate={duplicateElement}
        onToggleVisibility={handleToggleVisibility}
        onDelete={deleteElement}
        renderElement={renderElement}
        viewMode={viewMode}
        responsiveStyles={getResponsiveStyles(element)}
      />
    );
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10 overflow-auto relative">
      <div 
        ref={canvasRef}
        className={cn("min-h-full transition-all duration-300 p-4 sm:p-6", getCanvasWidth())}
        style={{
          backgroundColor: pageSettings.backgroundColor,
          fontFamily: pageSettings.fontFamily
        }}
      >
        <div 
          className="min-h-full relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-visible"
          onClick={() => !previewMode && setSelectedElement(null)}
          style={{ minHeight: viewMode === 'mobile' ? '60vh' : '80vh' }}
        >
          {elements.map(element => renderElement(element))}
          
          {!previewMode && elements.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[50vh] sm:min-h-[60vh] text-center p-4 sm:p-8">
              <div className="space-y-4 sm:space-y-6 max-w-md">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Move className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-700 mb-2">Start Building Amazing Websites</h3>
                  <p className="text-gray-500 text-sm sm:text-lg">Drag components from the sidebar to create your masterpiece</p>
                </div>
                <div className="text-xs sm:text-sm text-gray-400 space-y-1">
                  <p>• Drag & drop components anywhere</p>
                  <p>• Click to edit text directly</p>
                  <p>• Resize from all 8 handles</p>
                  <p>• Customize styles in the panel</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
