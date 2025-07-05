
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Palette, Type, Layout, Sparkles, Move, 
  AlignLeft, AlignCenter, AlignRight, 
  Bold, Italic, Underline, RotateCcw,
  Eye, EyeOff, Layers
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { BuilderElement } from '../../app/builder/page';

interface AdvancedStylesPanelProps {
  selectedElement: string | null;
  elements: BuilderElement[];
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
}

export const AdvancedStylesPanel: React.FC<AdvancedStylesPanelProps> = ({
  selectedElement,
  elements,
  updateElement
}) => {
  const [activeTab, setActiveTab] = useState('layout');

  const element = selectedElement ? elements.find(el => el.id === selectedElement) : null;

  if (!element) {
    return (
      <div className="h-full flex flex-col bg-white/50 backdrop-blur-sm">
        <div className="p-4 border-b border-gray-200/50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            Styles
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">Pro</Badge>
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <Palette className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Select an element to style</p>
            <p className="text-sm text-gray-400">Click on any element in the canvas to customize its appearance</p>
          </div>
        </div>
      </div>
    );
  }

  const updateStyle = (property: string, value: any) => {
    updateElement(element.id, {
      styles: { ...element.styles, [property]: value }
    });
  };

  const ColorPicker = ({ label, property, defaultValue = '#000000' }: { label: string, property: string, defaultValue?: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2 items-center">
        <Input
          type="color"
          value={element.styles?.[property] || defaultValue}
          onChange={(e) => updateStyle(property, e.target.value)}
          className="w-12 h-10 p-1 border rounded cursor-pointer"
        />
        <Input
          value={element.styles?.[property] || defaultValue}
          onChange={(e) => updateStyle(property, e.target.value)}
          className="flex-1 text-sm font-mono"
          placeholder={defaultValue}
        />
      </div>
    </div>
  );

  const SliderControl = ({ label, property, min = 0, max = 100, step = 1, unit = 'px' }: { 
    label: string, property: string, min?: number, max?: number, step?: number, unit?: string 
  }) => {
    const currentValue = element.styles?.[property] ? parseInt(element.styles[property]) : min;
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">{label}</Label>
          <Badge variant="outline" className="text-xs">
            {currentValue}{unit}
          </Badge>
        </div>
        <Slider
          value={[currentValue]}
          onValueChange={([value]) => updateStyle(property, `${value}${unit}`)}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white/50 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200/50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-600" />
          Styles
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">Pro</Badge>
        </h2>
        <p className="text-sm text-gray-600 mt-1 capitalize">
          Editing: {element.type.replace('-', ' ')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 mx-4 mt-2 bg-gray-100/80">
          <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
          <TabsTrigger value="text" className="text-xs">Text</TabsTrigger>
          <TabsTrigger value="style" className="text-xs">Style</TabsTrigger>
          <TabsTrigger value="effects" className="text-xs">Effects</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <TabsContent value="layout" className="mt-0 p-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Dimensions
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Width</Label>
                  <Input
                    value={element.styles?.width || '300px'}
                    onChange={(e) => updateStyle('width', e.target.value)}
                    className="text-sm"
                    placeholder="300px"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Height</Label>
                  <Input
                    value={element.styles?.height || '200px'}
                    onChange={(e) => updateStyle('height', e.target.value)}
                    className="text-sm"
                    placeholder="200px"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Min Width</Label>
                  <Input
                    value={element.styles?.minWidth || '50px'}
                    onChange={(e) => updateStyle('minWidth', e.target.value)}
                    className="text-sm"
                    placeholder="50px"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Min Height</Label>
                  <Input
                    value={element.styles?.minHeight || '30px'}
                    onChange={(e) => updateStyle('minHeight', e.target.value)}
                    className="text-sm"
                    placeholder="30px"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                <Move className="w-4 h-4" />
                Spacing
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Padding</Label>
                  <Input
                    value={element.styles?.padding || '0'}
                    onChange={(e) => updateStyle('padding', e.target.value)}
                    className="text-sm"
                    placeholder="20px or 10px 20px"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Margin</Label>
                  <Input
                    value={element.styles?.margin || '0'}
                    onChange={(e) => updateStyle('margin', e.target.value)}
                    className="text-sm"
                    placeholder="10px or 10px 20px"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Gap (for containers)</Label>
                  <Input
                    value={element.styles?.gap || ''}
                    onChange={(e) => updateStyle('gap', e.target.value)}
                    className="text-sm"
                    placeholder="1rem"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700">Position</h3>
              <Select 
                value={element.styles?.position || 'relative'} 
                onValueChange={(value) => updateStyle('position', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relative">Relative</SelectItem>
                  <SelectItem value="absolute">Absolute</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="sticky">Sticky</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="text" className="mt-0 p-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Typography
              </h3>
              
              <SliderControl
                label="Font Size"
                property="fontSize"
                min={8}
                max={72}
                unit="px"
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Font Weight</Label>
                <Select 
                  value={element.styles?.fontWeight || 'normal'} 
                  onValueChange={(value) => updateStyle('fontWeight', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Font Weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">Thin (100)</SelectItem>
                    <SelectItem value="300">Light (300)</SelectItem>
                    <SelectItem value="normal">Normal (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semibold (600)</SelectItem>
                    <SelectItem value="bold">Bold (700)</SelectItem>
                    <SelectItem value="800">Extra Bold (800)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Text Align</Label>
                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                  {[
                    { value: 'left', icon: AlignLeft },
                    { value: 'center', icon: AlignCenter },
                    { value: 'right', icon: AlignRight }
                  ].map(({ value, icon: Icon }) => (
                    <Button
                      key={value}
                      variant={element.styles?.textAlign === value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => updateStyle('textAlign', value)}
                      className="flex-1"
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              </div>

              <SliderControl
                label="Line Height"
                property="lineHeight"
                min={1}
                max={3}
                step={0.1}
                unit=""
              />

              <ColorPicker label="Text Color" property="color" defaultValue="#1f2937" />
            </div>
          </TabsContent>

          <TabsContent value="style" className="mt-0 p-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Appearance
              </h3>
              
              <ColorPicker label="Background Color" property="backgroundColor" defaultValue="#ffffff" />
              
              <SliderControl
                label="Border Radius"
                property="borderRadius"
                min={0}
                max={50}
                unit="px"
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Border</Label>
                <Input
                  value={element.styles?.border || ''}
                  onChange={(e) => updateStyle('border', e.target.value)}
                  className="text-sm"
                  placeholder="1px solid #e5e7eb"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Box Shadow</Label>
                <Input
                  value={element.styles?.boxShadow || ''}
                  onChange={(e) => updateStyle('boxShadow', e.target.value)}
                  className="text-sm"
                  placeholder="0 4px 6px rgba(0,0,0,0.1)"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="effects" className="mt-0 p-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Effects & Transforms
              </h3>
              
              <SliderControl
                label="Opacity"
                property="opacity"
                min={0}
                max={1}
                step={0.1}
                unit=""
              />

              <SliderControl
                label="Z-Index"
                property="zIndex"
                min={0}
                max={100}
                unit=""
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Transform</Label>
                <Input
                  value={element.styles?.transform || ''}
                  onChange={(e) => updateStyle('transform', e.target.value)}
                  className="text-sm"
                  placeholder="rotate(45deg) scale(1.1)"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Filter</Label>
                <Input
                  value={element.styles?.filter || ''}
                  onChange={(e) => updateStyle('filter', e.target.value)}
                  className="text-sm"
                  placeholder="blur(2px) brightness(1.2)"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Transition</Label>
                <Input
                  value={element.styles?.transition || ''}
                  onChange={(e) => updateStyle('transition', e.target.value)}
                  className="text-sm"
                  placeholder="all 0.3s ease"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Background Gradient</Label>
                <Input
                  value={element.styles?.background || ''}
                  onChange={(e) => updateStyle('background', e.target.value)}
                  className="text-sm"
                  placeholder="linear-gradient(45deg, #ff0000, #0000ff)"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Visibility
              </h3>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Display</Label>
                <Select 
                  value={element.styles?.display || 'block'} 
                  onValueChange={(value) => updateStyle('display', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block">Block</SelectItem>
                    <SelectItem value="inline">Inline</SelectItem>
                    <SelectItem value="inline-block">Inline Block</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="none">None (Hidden)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Overflow</Label>
                <Select 
                  value={element.styles?.overflow || 'visible'} 
                  onValueChange={(value) => updateStyle('overflow', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Overflow" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visible">Visible</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                    <SelectItem value="scroll">Scroll</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};