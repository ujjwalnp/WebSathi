"use client";
import React from 'react';
import { BuilderElement } from '../../app/builder/page';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Eye, EyeOff, ChevronDown, ChevronRight, Trash2, Copy } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LayersPanelProps {
  elements: BuilderElement[];
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
  deleteElement: (id: string) => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({
  elements,
  selectedElement,
  setSelectedElement,
  updateElement,
  deleteElement,
}) => {
  const [expandedElements, setExpandedElements] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (elementId: string) => {
    const newExpanded = new Set(expandedElements);
    if (newExpanded.has(elementId)) {
      newExpanded.delete(elementId);
    } else {
      newExpanded.add(elementId);
    }
    setExpandedElements(newExpanded);
  };

  const renderLayerItem = (element: BuilderElement, depth = 0) => {
    const isSelected = selectedElement === element.id;
    const isExpanded = expandedElements.has(element.id);
    const hasChildren = element.children && element.children.length > 0;

    return (
      <div key={element.id} className="w-full">
        <div
          className={cn(
            "flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm rounded-md transition-colors",
            isSelected && "bg-blue-100 text-blue-700",
            `ml-${depth * 4}`
          )}
          onClick={() => setSelectedElement(element.id)}
        >
          {hasChildren ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(element.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          ) : (
            <div className="w-4" />
          )}
          
          <div className="flex-1 truncate">
            <span className="capitalize font-medium">
              {element.type.replace('-', ' ')}
            </span>
            {element.content && (
              <span className="text-gray-500 ml-2 text-xs truncate">
                - {element.content.substring(0, 20)}
                {element.content.length > 20 ? '...' : ''}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(JSON.stringify(element));
              }}
            >
              <Copy className="w-3 h-3" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                // Toggle visibility
                updateElement(element.id, {
                  styles: { 
                    ...element.styles, 
                    display: element.styles?.display === 'none' ? 'block' : 'none' 
                  }
                });
              }}
            >
              {element.styles?.display === 'none' ? (
                <EyeOff className="w-3 h-3" />
              ) : (
                <Eye className="w-3 h-3" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                deleteElement(element.id);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4">
            {element.children!.map(child => renderLayerItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Layers</h3>
        <p className="text-sm text-gray-600 mt-1">View the editor in a tree like structure.</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {elements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No elements yet</p>
              <p className="text-xs mt-1">Add components to see them here</p>
            </div>
          ) : (
            elements.map(element => renderLayerItem(element))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
