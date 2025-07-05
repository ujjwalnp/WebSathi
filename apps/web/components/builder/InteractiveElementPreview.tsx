"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { 
  Eye, EyeOff, Move, Copy, Trash2, Settings, 
  Maximize2, Minimize2, RotateCw, Palette 
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface InteractiveElementPreviewProps {
  element: any;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onEdit: () => void;
}

export const InteractiveElementPreview: React.FC<InteractiveElementPreviewProps> = ({
  element,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onEdit
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      className={cn(
        "relative group transition-all duration-300 cursor-pointer",
        "hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1",
        isSelected && "ring-2 ring-blue-500 shadow-blue-200",
        "bg-gradient-to-br from-white to-gray-50/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full transition-colors duration-300",
              isSelected ? "bg-blue-500 animate-pulse" : "bg-gray-300"
            )} />
            <span className="text-sm font-medium capitalize">
              {element.type.replace('-', ' ')}
            </span>
          </div>
          
          {isHovered && (
            <div className="flex items-center gap-1 animate-fade-in">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Edit element</p></TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-green-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicate();
                    }}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Duplicate</p></TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Delete</p></TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            Content: {element.content?.substring(0, 30) || 'No content'}
            {element.content?.length > 30 && '...'}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {Object.keys(element.styles || {}).length} styles
            </Badge>
            
            {element.children && (
              <Badge variant="outline" className="text-xs">
                {element.children.length} children
              </Badge>
            )}
          </div>
        </div>

        {isSelected && (
          <div className="mt-3 pt-3 border-t animate-fade-in">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>ID: {element.id.substring(0, 8)}...</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </Button>
            </div>
            
            {isExpanded && (
              <div className="mt-2 text-xs space-y-1 animate-fade-in">
                <div>Type: {element.type}</div>
                <div>Styles: {JSON.stringify(element.styles, null, 2).substring(0, 100)}...</div>
              </div>
            )}
          </div>
        )}

        {/* Animated border for selected state */}
        {isSelected && (
          <div className="absolute inset-0 rounded-lg border-2 border-blue-500 animate-pulse pointer-events-none" />
        )}
      </CardContent>
    </Card>
  );
};
