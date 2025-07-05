
import React from 'react';
import { BuilderElement } from '../../app/builder/page';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Palette, Type, Layout, Move, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface EnhancedStylesPanelProps {
  selectedElement: string | null;
  elements: BuilderElement[];
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
}

export const EnhancedStylesPanel: React.FC<EnhancedStylesPanelProps> = ({
  selectedElement,
  elements,
  updateElement,
}) => {
  const findElement = (elements: BuilderElement[], id: string): BuilderElement | null => {
    for (const element of elements) {
      if (element.id === id) return element;
      if (element.children) {
        const found = findElement(element.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const element = selectedElement ? findElement(elements, selectedElement) : null;

  if (!element) {
    return (
      <div className="p-6 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Palette className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Show your creativity!</h3>
            <p className="text-sm text-gray-600 mt-1">Select an element to customize its styles</p>
          </div>
        </div>
      </div>
    );
  };

  const updateStyles = (styleUpdates: Record<string, any>) => {
    updateElement(element.id, {
      styles: { ...element.styles, ...styleUpdates }
    });
  };

  const alignmentButtons = [
    { value: 'left', icon: AlignLeft, label: 'Left' },
    { value: 'center', icon: AlignCenter, label: 'Center' },
    { value: 'right', icon: AlignRight, label: 'Right' },
    { value: 'justify', icon: AlignJustify, label: 'Justify' },
  ];

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-6">
        <div className="text-center pb-2">
          <h3 className="font-medium text-gray-900">Show your creativity!</h3>
          <p className="text-sm text-gray-600 mt-1">Customize {element.type.replace('-', ' ')} element</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Type className="w-4 h-4" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Text Align</Label>
              <div className="flex gap-1">
                {alignmentButtons.map(({ value, icon: Icon, label }) => (
                  <Button
                    key={value}
                    variant={element.styles?.textAlign === value ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => updateStyles({ textAlign: value })}
                  >
                    <Icon className="w-3 h-3" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Font Family</Label>
              <Select value={element.styles?.fontFamily || ''} onValueChange={(value) => updateStyles({ fontFamily: value })}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                  <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                  <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Font Size</Label>
                <Input
                  value={element.styles?.fontSize || ''}
                  onChange={(e) => updateStyles({ fontSize: e.target.value })}
                  placeholder="16px"
                  className="h-8"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Font Weight</Label>
                <Select value={element.styles?.fontWeight || 'normal'} onValueChange={(value) => updateStyles({ fontWeight: value })}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="600">Semi Bold</SelectItem>
                    <SelectItem value="300">Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs">Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={element.styles?.color || '#000000'}
                  onChange={(e) => updateStyles({ color: e.target.value })}
                  className="h-8 w-16 p-1"
                />
                <Input
                  value={element.styles?.color || '#000000'}
                  onChange={(e) => updateStyles({ color: e.target.value })}
                  placeholder="#000000"
                  className="h-8 flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Dimensions & Position
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Width</Label>
                <Input
                  value={element.styles?.width || ''}
                  onChange={(e) => updateStyles({ width: e.target.value })}
                  placeholder="auto"
                  className="h-8"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Height</Label>
                <Input
                  value={element.styles?.height || ''}
                  onChange={(e) => updateStyles({ height: e.target.value })}
                  placeholder="auto"
                  className="h-8"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Left Position</Label>
                <Input
                  value={element.styles?.left || ''}
                  onChange={(e) => updateStyles({ left: e.target.value, position: 'absolute' })}
                  placeholder="0px"
                  className="h-8"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Top Position</Label>
                <Input
                  value={element.styles?.top || ''}
                  onChange={(e) => updateStyles({ top: e.target.value, position: 'absolute' })}
                  placeholder="0px"
                  className="h-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Margin</Label>
              <div className="grid grid-cols-4 gap-1">
                <Input
                  value={element.styles?.marginTop || ''}
                  onChange={(e) => updateStyles({ marginTop: e.target.value })}
                  placeholder="Top"
                  className="h-8 text-xs"
                />
                <Input
                  value={element.styles?.marginRight || ''}
                  onChange={(e) => updateStyles({ marginRight: e.target.value })}
                  placeholder="Right"
                  className="h-8 text-xs"
                />
                <Input
                  value={element.styles?.marginBottom || ''}
                  onChange={(e) => updateStyles({ marginBottom: e.target.value })}
                  placeholder="Bottom"
                  className="h-8 text-xs"
                />
                <Input
                  value={element.styles?.marginLeft || ''}
                  onChange={(e) => updateStyles({ marginLeft: e.target.value })}
                  placeholder="Left"
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Padding</Label>
              <div className="grid grid-cols-4 gap-1">
                <Input
                  value={element.styles?.paddingTop || ''}
                  onChange={(e) => updateStyles({ paddingTop: e.target.value })}
                  placeholder="Top"
                  className="h-8 text-xs"
                />
                <Input
                  value={element.styles?.paddingRight || ''}
                  onChange={(e) => updateStyles({ paddingRight: e.target.value })}
                  placeholder="Right"
                  className="h-8 text-xs"
                />
                <Input
                  value={element.styles?.paddingBottom || ''}
                  onChange={(e) => updateStyles({ paddingBottom: e.target.value })}
                  placeholder="Bottom"
                  className="h-8 text-xs"
                />
                <Input
                  value={element.styles?.paddingLeft || ''}
                  onChange={(e) => updateStyles({ paddingLeft: e.target.value })}
                  placeholder="Left"
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Background & Border
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={element.styles?.backgroundColor || '#ffffff'}
                  onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                  className="h-8 w-16 p-1"
                />
                <Input
                  value={element.styles?.backgroundColor || '#ffffff'}
                  onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                  placeholder="#ffffff"
                  className="h-8 flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Background Gradient</Label>
              <Input
                value={element.styles?.background || ''}
                onChange={(e) => updateStyles({ background: e.target.value })}
                placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                className="h-8"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Border Radius</Label>
                <Input
                  value={element.styles?.borderRadius || ''}
                  onChange={(e) => updateStyles({ borderRadius: e.target.value })}
                  placeholder="0px"
                  className="h-8"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Border Width</Label>
                <Input
                  value={element.styles?.borderWidth || ''}
                  onChange={(e) => updateStyles({ borderWidth: e.target.value })}
                  placeholder="0px"
                  className="h-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Border Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={element.styles?.borderColor || '#000000'}
                  onChange={(e) => updateStyles({ borderColor: e.target.value })}
                  className="h-8 w-16 p-1"
                />
                <Input
                  value={element.styles?.borderColor || '#000000'}
                  onChange={(e) => updateStyles({ borderColor: e.target.value })}
                  placeholder="#000000"
                  className="h-8 flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Box Shadow</Label>
              <Input
                value={element.styles?.boxShadow || ''}
                onChange={(e) => updateStyles({ boxShadow: e.target.value })}
                placeholder="0 2px 4px rgba(0,0,0,0.1)"
                className="h-8"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Opacity</Label>
              <div className="px-2">
                <Slider
                  value={[parseFloat(element.styles?.opacity || '1') * 100]}
                  onValueChange={(value) => updateStyles({ opacity: (value[0] / 100).toString() })}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>{Math.round(parseFloat(element.styles?.opacity || '1') * 100)}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {element.type === 'container' && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Flexbox Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Justify Content</Label>
                <div className="grid grid-cols-2 gap-1">
                  {['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map((value) => (
                    <Button
                      key={value}
                      variant={element.styles?.justifyContent === value ? "default" : "outline"}
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => updateStyles({ 
                        display: 'flex',
                        justifyContent: value 
                      })}
                    >
                      {value.replace('flex-', '').replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Align Items</Label>
                <div className="grid grid-cols-2 gap-1">
                  {['flex-start', 'center', 'flex-end', 'stretch'].map((value) => (
                    <Button
                      key={value}
                      variant={element.styles?.alignItems === value ? "default" : "outline"}
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => updateStyles({ 
                        display: 'flex',
                        alignItems: value 
                      })}
                    >
                      {value.replace('flex-', '')}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Flex Direction</Label>
                <div className="grid grid-cols-2 gap-1">
                  {['row', 'column', 'row-reverse', 'column-reverse'].map((value) => (
                    <Button
                      key={value}
                      variant={element.styles?.flexDirection === value ? "default" : "outline"}
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => updateStyles({ 
                        display: 'flex',
                        flexDirection: value 
                      })}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Move className="w-4 h-4" />
              Transform & Effects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Rotation (degrees)</Label>
              <div className="px-2">
                <Slider
                  value={[parseInt(element.styles?.transform?.match(/rotate\((\d+)deg\)/)?.[1] || '0')]}
                  onValueChange={(value) => updateStyles({ 
                    transform: `rotate(${value[0]}deg) ${element.styles?.transform?.replace(/rotate\(\d+deg\)/, '') || ''}`.trim()
                  })}
                  min={-180}
                  max={180}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-180°</span>
                  <span>{parseInt(element.styles?.transform?.match(/rotate\((\d+)deg\)/)?.[1] || '0')}°</span>
                  <span>180°</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Scale</Label>
              <div className="px-2">
                <Slider
                  value={[parseFloat(element.styles?.transform?.match(/scale\(([\d.]+)\)/)?.[1] || '1') * 100]}
                  onValueChange={(value) => updateStyles({ 
                    transform: `scale(${value[0] / 100}) ${element.styles?.transform?.replace(/scale\([\d.]+\)/, '') || ''}`.trim()
                  })}
                  min={10}
                  max={200}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>{Math.round(parseFloat(element.styles?.transform?.match(/scale\(([\d.]+)\)/)?.[1] || '1') * 100)}%</span>
                  <span>200%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};