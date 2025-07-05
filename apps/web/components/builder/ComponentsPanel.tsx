
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BuilderElement } from '../../app/builder/page';
import { Type, Video, Mail, CreditCard, Link, Layout, Columns, Image } from 'lucide-react';

interface ComponentsPanelProps {
  onAddElement: (element: Omit<BuilderElement, 'id'>) => void;
}

export const ComponentsPanel: React.FC<ComponentsPanelProps> = ({ onAddElement }) => {
  const layoutComponents = [
    {
      name: 'Container',
      icon: Layout,
      type: 'container' as const,
      content: '',
      styles: {
        padding: '2rem',
        border: '2px dashed #e5e7eb',
        borderRadius: '8px',
        minHeight: '100px'
      }
    },
    {
      name: 'Two Columns',
      icon: Columns,
      type: 'two-columns' as const,
      content: '',
      styles: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        padding: '1rem'
      }
    }
  ];

  const elements = [
    {
      name: 'Text',
      icon: Type,
      type: 'text' as const,
      content: 'Edit this text',
      styles: {
        fontSize: '16px',
        fontWeight: 'normal',
        color: '#000000',
        padding: '8px'
      }
    },
    {
      name: 'Image',
      icon: Image,
      type: 'image' as const,
      content: '/lovable-uploads/a73b0700-f977-4b9b-885e-8b1405796833.png',
      styles: {
        width: '200px',
        height: '150px',
        borderRadius: '8px',
        objectFit: 'cover'
      }
    },
    {
      name: 'Video',
      icon: Video,
      type: 'video' as const,
      content: 'https://example.com/video.mp4',
      styles: {
        width: '100%',
        height: '200px',
        borderRadius: '8px'
      }
    },
    {
      name: 'Contact',
      icon: Mail,
      type: 'contact' as const,
      content: 'Contact Form',
      styles: {
        padding: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }
    },
    {
      name: 'Checkout',
      icon: CreditCard,
      type: 'checkout' as const,
      content: 'Stripe Checkout',
      styles: {
        padding: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }
    },
    {
      name: 'Link',
      icon: Link,
      type: 'link' as const,
      content: 'Click here',
      styles: {
        color: '#3b82f6',
        textDecoration: 'underline',
        padding: '4px'
      }
    }
  ];

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Layout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {layoutComponents.map((component) => {
            const Icon = component.icon;
            return (
              <div
                key={component.name}
                className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-accent transition-colors"
                onClick={() => onAddElement(component)}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{component.name}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {elements.map((element) => {
            const Icon = element.icon;
            return (
              <div
                key={element.name}
                className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-accent transition-colors"
                onClick={() => onAddElement(element)}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{element.name}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};