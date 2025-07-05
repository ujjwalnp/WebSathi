import React, { useState } from 'react';
import { BuilderElement } from '../../app/builder/page';
import { ImageUploader } from './ImageUploader';
import { Button } from '../ui/button';
import { Edit, Upload } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EnhancedImageComponentProps {
  element: BuilderElement;
  isSelected: boolean;
  isHovered: boolean;
  previewMode: boolean;
  onUpdate: (updates: Partial<BuilderElement>) => void;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  className?: string;
  style?: Record<string, any>;
}

export const EnhancedImageComponent: React.FC<EnhancedImageComponentProps> = ({
  element,
  isSelected,
  isHovered,
  previewMode,
  onUpdate,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  style,
}) => {
  const [showUploader, setShowUploader] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    onUpdate({ content: imageUrl });
    setShowUploader(false);
  };

  const hasImage = element.content && element.content !== '/placeholder.svg';

  return (
    <div
      className={cn(
        "relative transition-all duration-200 group",
        !previewMode && "hover:ring-2 hover:ring-blue-300",
        isSelected && !previewMode && "ring-2 ring-blue-500",
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      {!previewMode && (isSelected || isHovered) && (
        <div className="absolute -top-8 left-0 bg-blue-600 text-white px-2 py-1 text-xs rounded-md shadow-lg z-20 flex items-center gap-2">
          <span>Image</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-4 w-4 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setShowUploader(true);
            }}
          >
            <Edit className="w-2 h-2" />
          </Button>
        </div>
      )}

      {hasImage ? (
        <img
          src={element.content}
          alt="Website element"
          className="block max-w-full h-auto rounded-lg transition-transform duration-200 hover:scale-105"
          style={{
            width: element.styles?.width || 'auto',
            height: element.styles?.height || 'auto',
            borderRadius: element.styles?.borderRadius || '8px',
            objectFit: element.styles?.objectFit || 'cover'
          }}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      ) : (
        <div 
          className={cn(
            "flex items-center justify-center border-2 border-dashed rounded-lg transition-colors",
            isSelected || isHovered ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
          )}
          style={{
            width: element.styles?.width || '300px',
            height: element.styles?.height || '200px',
            minWidth: '150px',
            minHeight: '100px'
          }}
        >
          <div className="text-center p-4">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-600 mb-2">Click to add image</p>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowUploader(true);
              }}
              className="text-xs"
            >
              Upload Image
            </Button>
          </div>
        </div>
      )}

      {showUploader && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Add Image</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUploader(false)}
              >
                ✕
              </Button>
            </div>
            <ImageUploader
              onImageSelect={handleImageSelect}
              currentImageUrl={element.content}
            />
          </div>
        </div>
      )}
    </div>
  );
};
