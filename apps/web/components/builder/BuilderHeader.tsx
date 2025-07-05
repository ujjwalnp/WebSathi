"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Eye, EyeOff, Monitor, Tablet, Smartphone, Undo, Redo, Save, Settings, Sparkles, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BuilderHeaderProps {
  viewMode: 'desktop' | 'tablet' | 'mobile';
  setViewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  previewMode: boolean;
  setPreviewMode: (preview: boolean) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  elementCount?: number;
}

export const BuilderHeader: React.FC<BuilderHeaderProps> = ({
  viewMode,
  setViewMode,
  previewMode,
  setPreviewMode,
  onUndo,
  onRedo,
  onSave,
  canUndo = false,
  canRedo = false,
  elementCount = 0,
}) => {
  const viewModes = [
    { 
      key: 'desktop' as const, 
      icon: Monitor, 
      label: 'Desktop View',
      shortcut: 'D',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      key: 'tablet' as const, 
      icon: Tablet, 
      label: 'Tablet View',
      shortcut: 'T',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      key: 'mobile' as const, 
      icon: Smartphone, 
      label: 'Mobile View',
      shortcut: 'M',
      gradient: 'from-green-500 to-emerald-500'
    },
  ];

  return (
    <TooltipProvider>
      <div className="h-14 border-b bg-white/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shadow-sm relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-cyan-50/50 animate-pulse" />
        
        <div className="flex items-center gap-3 sm:gap-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  WebSathi Builder
                </span>
                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-100 to-purple-100 hidden sm:block">
                  Professional
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span className="hidden sm:inline">Live editing mode</span>
                <span className="sm:hidden">Live</span>
              </span>
            </div>
          </div>
          
          {/* Enhanced View Mode Selector */}
          <div className="flex items-center gap-1 p-1 bg-gray-100/80 rounded-xl backdrop-blur-sm">
            {viewModes.map(({ key, icon: Icon, label, shortcut, gradient }) => (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode(key)}
                    className={cn(
                      "relative h-6 sm:h-8 px-2 sm:px-3 transition-all duration-300 hover:scale-105",
                      viewMode === key
                        ? `bg-gradient-to-r ${gradient} text-white shadow-lg hover:shadow-xl`
                        : "hover:bg-white/60"
                    )}
                  >
                    <Icon className={cn(
                      "w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200",
                      viewMode === key && "scale-110"
                    )} />
                    {viewMode === key && (
                      <div className="absolute inset-0 rounded-md bg-white/20 animate-pulse" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-gray-900 text-white">
                  <p className="font-medium">{label}</p>
                  <div className="text-xs opacity-75">Press {shortcut}</div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 relative z-10">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-8 px-2"
                >
                  <Undo className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo (Ctrl+Z)</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onRedo}
                  disabled={!canRedo}
                  className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-8 px-2"
                >
                  <Redo className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo (Ctrl+Y)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={previewMode ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className={cn(
                  "gap-1 sm:gap-2 transition-all duration-300 text-xs sm:text-sm h-8 px-2 sm:px-3",
                  previewMode 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg" 
                    : "hover:bg-green-50 hover:text-green-600"
                )}
              >
                {previewMode ? (
                  <>
                    <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Exit Preview</span>
                    <span className="sm:hidden">Exit</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Preview</span>
                    <span className="sm:hidden">View</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{previewMode ? 'Exit preview mode' : 'Enter preview mode'} (Ctrl+P)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Enhanced Status and Actions */}
        <div className="flex items-center gap-2 sm:gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className="text-xs bg-white/50 backdrop-blur-sm hidden sm:flex"
            >
              {elementCount} elements
            </Badge>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                onClick={onSave}
                className="gap-1 sm:gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm h-8 px-2 sm:px-3"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save your project (Ctrl+S)</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};