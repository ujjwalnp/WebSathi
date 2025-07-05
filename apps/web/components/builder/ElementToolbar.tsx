"use client";
import React from 'react';
import { cn } from '../../lib/utils';
import { Trash2, Move, Copy, Eye, EyeOff, Maximize2 } from 'lucide-react';
import { Button } from '../ui/button';
import { BuilderElement } from '../../app/builder/page';

interface ElementToolbarProps {
  element: BuilderElement;
  selectedElement: string | null;
  hoveredElement: string | null;
  previewMode: boolean;
  onDragStart: (e: React.MouseEvent, elementId: string, action: 'drag' | 'resize') => void;
  onDuplicate: (id: string) => void;
  onToggleVisibility: (element: BuilderElement) => void;
  onDelete: (id: string) => void;
}

export const ElementToolbar: React.FC<ElementToolbarProps> = ({
  element,
  selectedElement,
  hoveredElement,
  previewMode,
  onDragStart,
  onDuplicate,
  onToggleVisibility,
  onDelete,
}) => {
  if (previewMode || (selectedElement !== element.id && hoveredElement !== element.id)) return null;

  return (
    <div className={cn(
      "absolute -top-12 left-0 flex items-center gap-1 px-3 py-1.5 rounded-lg shadow-lg z-30 transition-all duration-200",
      selectedElement === element.id 
        ? "bg-blue-600 text-white" 
        : "bg-gray-900 text-white opacity-90"
    )}>
      <span className="text-xs font-medium capitalize mr-2">
        {element.type.replace('-', ' ')}
      </span>
      
      {/* Drag Handle */}
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 text-white hover:bg-white/20 cursor-move"
        onMouseDown={(e) => onDragStart(e, element.id, 'drag')}
      >
        <Move className="w-3 h-3" />
      </Button>

      {/* Resize Handle */}
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 text-white hover:bg-white/20"
        onMouseDown={(e) => onDragStart(e, element.id, 'resize')}
      >
        <Maximize2 className="w-3 h-3" />
      </Button>
      
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 text-white hover:bg-white/20"
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
        className="h-6 w-6 text-white hover:bg-white/20"
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

      {/* Resize Corner Indicator */}
      {selectedElement === element.id && (
        <div 
          className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-500 border-2 border-white rounded-sm cursor-se-resize"
          onMouseDown={(e) => onDragStart(e, element.id, 'resize')}
        />
      )}
    </div>
  );
};
