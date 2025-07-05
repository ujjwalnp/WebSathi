"use client";
import React from 'react';
import { BuilderElement } from '../../app/builder/page';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';

interface StylesPanelProps {
  selectedElement: string | null;
  elements: BuilderElement[];
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
}

export const StylesPanel: React.FC<StylesPanelProps> = ({
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

  const currentElement = selectedElement ? findElement(elements, selectedElement) : null;

  const updateStyle = (property: string, value: string) => {
    if (currentElement) {
      updateElement(currentElement.id, {
        styles: { ...currentElement.styles, [property]: value }
      });
    }
  };

  if (!currentElement) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>Select an element to edit its styles</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <div className="text-center">
        <h3 className="font-medium">View the editor in a tree like structure.</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Selected: {currentElement.type}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="fontSize">Font Size</Label>
            <Input
              id="fontSize"
              value={currentElement.styles.fontSize || '16px'}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
              placeholder="16px"
            />
          </div>
          
          <div>
            <Label htmlFor="fontWeight">Font Weight</Label>
            <Select
              value={currentElement.styles.fontWeight || 'normal'}
              onValueChange={(value) => updateStyle('fontWeight', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
                <SelectItem value="bolder">Bolder</SelectItem>
                <SelectItem value="lighter">Lighter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              type="color"
              value={currentElement.styles.color || '#000000'}
              onChange={(e) => updateStyle('color', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Dimensions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                value={currentElement.styles.width || 'auto'}
                onChange={(e) => updateStyle('width', e.target.value)}
                placeholder="auto"
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={currentElement.styles.height || 'auto'}
                onChange={(e) => updateStyle('height', e.target.value)}
                placeholder="auto"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="padding">Padding</Label>
            <Input
              id="padding"
              value={currentElement.styles.padding || '0'}
              onChange={(e) => updateStyle('padding', e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="margin">Margin</Label>
            <Input
              id="margin"
              value={currentElement.styles.margin || '0'}
              onChange={(e) => updateStyle('margin', e.target.value)}
              placeholder="0"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Decorations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={currentElement.styles.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="w-16"
              />
              <Input
                value={currentElement.styles.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="borderRadius">Border Radius</Label>
            <Input
              id="borderRadius"
              value={currentElement.styles.borderRadius || '0'}
              onChange={(e) => updateStyle('borderRadius', e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="border">Border</Label>
            <Input
              id="border"
              value={currentElement.styles.border || 'none'}
              onChange={(e) => updateStyle('border', e.target.value)}
              placeholder="1px solid #000"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
