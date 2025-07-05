
"use client";
import React, { useState, useEffect } from 'react';
import { DragDropCanvas } from '../../components/builder/DragDropCanvas';
import { EnhancedComponentsPanel } from '../../components/builder/EnhancedComponentsPanel';
import { AdvancedStylesPanel } from '../../components/builder/AdvancedStylesPanel';
import { PageSettingsPanel } from '../../components/builder/PageSettingsPanel';
// In app/builder/page.tsx
import {BuilderHeader} from '../../components/builder/BuilderHeader';
import { LayersPanel } from '../../components/builder/LayersPanel';
import { EnhancedMediaBucket } from '../../components/builder/EnhancedMediaBucket';
import { TemplateGallery } from '../../components/builder/TemplateGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';
import { toast } from 'sonner';
import { Save, Undo, Redo, Eye, Layers, Settings, Palette, Sparkles, Monitor, Tablet, Smartphone, Zap, Wand2, Rocket, FolderOpen, Move, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BuilderElement {
  id: string;
  type: 'text' | 'video' | 'contact' | 'checkout' | 'link' | 'container' | 'two-columns' | 'image' | 
        'hero-section' | 'animated-text' | 'quote-card' | 'feature-card' | 'link-button' |
        'shape-rectangle' | 'shape-circle' | 'shape-triangle' | 'gradient-box' |
        'gallery-image' | 'video-player' | 'modern-contact' | 'premium-checkout';
  content: string;
  styles: Record<string, any>;
  children?: BuilderElement[];
}

interface PageSettings {
  title: string;
  description: string;
  favicon: string;
  backgroundColor: string;
  fontFamily: string;
}

const EnhancedBuilder = () => {
  const [elements, setElements] = useState<BuilderElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState(false);
  const [history, setHistory] = useState<BuilderElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [pageSettings, setPageSettings] = useState<PageSettings>({
    title: 'My Amazing Website',
    description: 'Built with WebSathi - Professional Website Builder',
    favicon: '/favicon.ico',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter, sans-serif'
  });

  const viewModes = [
    { key: 'desktop' as const, icon: Monitor, label: 'Desktop', gradient: 'from-blue-500 to-cyan-500' },
    { key: 'tablet' as const, icon: Tablet, label: 'Tablet', gradient: 'from-purple-500 to-pink-500' },
    { key: 'mobile' as const, icon: Smartphone, label: 'Mobile', gradient: 'from-green-500 to-emerald-500' },
  ];

  // Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled) return;
    
    const autoSave = setTimeout(() => {
      if (elements.length > 0) {
        localStorage.setItem('websathi-builder-autosave', JSON.stringify({
          elements,
          pageSettings,
          timestamp: Date.now()
        }));
        toast.success('Auto-saved successfully!', { duration: 2000 });
      }
    }, 5000);

    return () => clearTimeout(autoSave);
  }, [elements, pageSettings, autoSaveEnabled]);

  // Load auto-save on mount
  useEffect(() => {
    const saved = localStorage.getItem('websathi-builder-autosave');
    if (saved) {
      try {
        const { elements: savedElements, pageSettings: savedSettings } = JSON.parse(saved);
        setElements(savedElements || []);
        setPageSettings(savedSettings || pageSettings);
        toast.info('Restored from auto-save');
      } catch (error) {
        console.error('Failed to load auto-save:', error);
      }
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 'p':
            e.preventDefault();
            setPreviewMode(!previewMode);
            break;
          case 'd':
            e.preventDefault();
            if (selectedElement) {
              duplicateElement(selectedElement);
            }
            break;
        }
      }
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const target = e.target as HTMLElement;
        if (selectedElement && !target.contentEditable) {
          e.preventDefault();
          deleteElement(selectedElement);
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [selectedElement, previewMode]);

  const saveToHistory = (newElements: BuilderElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    if (newHistory.length > 50) { // Limit history size
      newHistory.shift();
    } else {
      setHistoryIndex(newHistory.length - 1);
    }
    setHistory(newHistory);
  };

  const handleSave = () => {
    const projectData = {
      elements,
      pageSettings,
      viewMode,
      timestamp: Date.now()
    };
    
    localStorage.setItem('websathi-builder-project', JSON.stringify(projectData));
    toast.success('Project saved successfully!', {
      description: 'Your website has been saved to local storage'
    });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements([...history[historyIndex - 1]]);
      toast.info('Undone last action');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements([...history[historyIndex + 1]]);
      toast.info('Redone action');
    }
  };

  const addElement = (element: Omit<BuilderElement, 'id'>) => {
    const newElement: BuilderElement = {
      ...element,
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
    
    toast.success(`${element.type.replace('-', ' ')} added!`, {
      description: 'Click on the element to customize it'
    });
  };

  const updateElement = (id: string, updates: Partial<BuilderElement>) => {
    const updateElementRecursive = (elements: BuilderElement[]): BuilderElement[] => {
      return elements.map(el => {
        if (el.id === id) {
          return { ...el, ...updates };
        }
        if (el.children) {
          return { ...el, children: updateElementRecursive(el.children) };
        }
        return el;
      });
    };
    
    const newElements = updateElementRecursive(elements);
    setElements(newElements);
    saveToHistory(newElements);
  };

  const deleteElement = (id: string) => {
    const deleteElementRecursive = (elements: BuilderElement[]): BuilderElement[] => {
      return elements.filter(el => el.id !== id).map(el => {
        if (el.children) {
          return { ...el, children: deleteElementRecursive(el.children) };
        }
        return el;
      });
    };
    
    const newElements = deleteElementRecursive(elements);
    setElements(newElements);
    saveToHistory(newElements);
    
    if (selectedElement === id) {
      setSelectedElement(null);
    }
    
    toast.success('Element deleted', {
      description: 'Use Ctrl+Z to undo this action'
    });
  };

  const duplicateElement = (id: string) => {
    const findElement = (elements: BuilderElement[], targetId: string): BuilderElement | null => {
      for (const element of elements) {
        if (element.id === targetId) return element;
        if (element.children) {
          const found = findElement(element.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };

    const element = findElement(elements, id);
    if (element) {
      const duplicated = {
        ...element,
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: element.content + ' (Copy)'
      };
      
      const newElements = [...elements, duplicated];
      setElements(newElements);
      saveToHistory(newElements);
      
      toast.success('Element duplicated!');
    }
  };

  const clearCanvas = () => {
    setElements([]);
    setSelectedElement(null);
    saveToHistory([]);
    toast.success('Canvas cleared');
  };

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin-slow" />
        </div>

        {/* Enhanced Header */}
        <BuilderHeader 
          viewMode={viewMode}
          setViewMode={setViewMode}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onSave={handleSave}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          elementCount={elements.length}
        />
        
        <div className="flex-1 flex overflow-hidden relative z-10">
          {/* Enhanced Canvas */}
          <div className="flex-1 flex flex-col relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-blue-50/20 to-purple-50/10" />
            
            {/* Floating AI Magic Button */}
            {!previewMode && (
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="lg"
                      className={cn(
                        "rounded-full shadow-2xl transition-all duration-500 hover:scale-110 w-12 h-12 sm:w-14 sm:h-14",
                        isBuilding 
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" 
                          : "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:shadow-blue-500/25"
                      )}
                      onClick={() => {
                        setIsBuilding(true);
                        setTimeout(() => setIsBuilding(false), 2000);
                        toast.success("AI Magic Applied! ✨", {
                          description: "Your website just got more amazing!"
                        });
                      }}
                    >
                      {isBuilding ? (
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                      ) : (
                        <Wand2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>AI Enhancement Magic</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            <DragDropCanvas
              elements={elements}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              updateElement={updateElement}
              deleteElement={deleteElement}
              duplicateElement={duplicateElement}
              viewMode={viewMode}
              previewMode={previewMode}
              pageSettings={pageSettings}
            />
          </div>

          {/* Enhanced Right Panel with Glass Effect */}
          <div className="w-80 border-l border-white/20 bg-white/80 backdrop-blur-xl flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-gray-50/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
            
            <Tabs defaultValue="components" className="flex-1 flex flex-col relative z-10 h-full">
              <TabsList className="grid w-full grid-cols-5 m-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg sticky top-0 z-20">
                <TabsTrigger 
                  value="components" 
                  className="gap-1 text-xs rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <Layers className="w-3 h-3" />
                  <span className="hidden sm:inline">Comp</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="styles" 
                  className="gap-1 text-xs rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <Palette className="w-3 h-3" />
                  <span className="hidden sm:inline">Styles</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="layers" 
                  className="gap-1 text-xs rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <Move className="w-3 h-3" />
                  <span className="hidden sm:inline">Layers</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="media" 
                  className="gap-1 text-xs rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <FolderOpen className="w-3 h-3" />
                  <span className="hidden sm:inline">Media</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="gap-1 text-xs rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <Settings className="w-3 h-3" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto">
                <TabsContent value="components" className="flex-1 p-0 mt-0 h-full">
                  <EnhancedComponentsPanel onAddElement={addElement} />
                </TabsContent>
                
                <TabsContent value="styles" className="flex-1 p-0 mt-0 h-full">
                  <AdvancedStylesPanel 
                    selectedElement={selectedElement}
                    elements={elements}
                    updateElement={updateElement}
                  />
                </TabsContent>

                <TabsContent value="layers" className="flex-1 p-0 mt-0 h-full">
                  <LayersPanel 
                    elements={elements}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                    updateElement={updateElement}
                    deleteElement={deleteElement}
                  />
                </TabsContent>

                <TabsContent value="media" className="flex-1 p-0 mt-0 h-full">
                  <EnhancedMediaBucket onSelectMedia={(media) => {
                    addElement({
                      type: 'image',
                      content: media.url,
                      styles: {
                        width: '300px',
                        height: '200px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }
                    });
                  }} />
                </TabsContent>

                <TabsContent value="settings" className="flex-1 p-0 mt-0 h-full">
                  <PageSettingsPanel 
                    settings={pageSettings}
                    onSettingsChange={setPageSettings}
                  />
                </TabsContent>
              </div>
            </Tabs>

            {/* Enhanced Quick Actions Footer */}
            <div className="p-4 border-t border-white/20 bg-gradient-to-r from-white/60 via-blue-50/40 to-purple-50/40 backdrop-blur-sm relative z-10 sticky bottom-0">
              <div className="flex gap-2 mb-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearCanvas}
                      className="flex-1 text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300 hover:scale-105 bg-white/80"
                    >
                      Clear All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Clear entire canvas</p></TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSave}
                      className="flex-1 text-xs hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all duration-300 hover:scale-105 bg-white/80"
                    >
                      <Save className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Save project</p></TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>WebSathi Builder</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200"
                >
                  {elements.length} elements
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Global Styles for Enhanced Animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            .animate-spin-slow {
              animation: spin-slow 20s linear infinite;
            }
            
            .glass-effect {
              backdrop-filter: blur(16px);
              background: rgba(255, 255, 255, 0.8);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .resizable-element {
              resize: both;
              overflow: auto;
              min-width: 50px;
              min-height: 30px;
            }

            .resizable-element:hover {
              outline: 2px dashed #3b82f6;
              outline-offset: 2px;
            }

            [contenteditable]:focus {
              outline: 2px solid #3b82f6;
              outline-offset: 2px;
              background-color: rgba(59, 130, 246, 0.05);
            }
            
            /* Smooth scrolling for all containers */
            * {
              scroll-behavior: smooth;
            }
            
            /* Custom scrollbar styles */
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.1);
              border-radius: 3px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(59, 130, 246, 0.3);
              border-radius: 3px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(59, 130, 246, 0.5);
            }
          `
        }} />
      </div>
    </TooltipProvider>
  );
};

export default EnhancedBuilder;
