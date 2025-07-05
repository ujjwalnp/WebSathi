"use client";
import React from 'react';
import { BuilderElement } from '../../app/builder/page';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { 
  Type, Video, Mail, CreditCard, Link, Layout, Columns, Image, 
  Square, Circle, Triangle, Palette, Star, Heart, Zap, Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface DragDropComponentsPanelProps {
  onAddElement: (element: Omit<BuilderElement, 'id'>) => void;
}

export const DragDropComponentsPanel: React.FC<DragDropComponentsPanelProps> = ({ onAddElement }) => {
  const handleDragStart = (e: React.DragEvent, element: Omit<BuilderElement, 'id'>) => {
    e.dataTransfer.setData('application/json', JSON.stringify(element));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const layoutComponents = [
    {
      name: 'Container',
      icon: Layout,
      type: 'container' as const,
      content: '',
      description: 'Flexible container for other elements',
      gradient: 'from-blue-500 to-cyan-500',
      styles: {
        padding: '2rem',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        minHeight: '120px'
      }
    },
    {
      name: 'Two Columns',
      icon: Columns,
      type: 'two-columns' as const,
      content: '',
      description: 'Side-by-side layout',
      gradient: 'from-purple-500 to-pink-500',
      styles: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        padding: '1.5rem'
      }
    },
    {
      name: 'Hero Section',
      icon: Star,
      type: 'hero-section' as const,
      content: 'Welcome to the Future',
      description: 'Eye-catching header section',
      gradient: 'from-indigo-500 to-purple-600',
      styles: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white',
        borderRadius: '16px'
      }
    }
  ];

  const contentComponents = [
    {
      name: 'Text',
      icon: Type,
      type: 'text' as const,
      content: 'Click to edit this text',
      description: 'Editable text content',
      gradient: 'from-gray-500 to-gray-700',
      styles: {
        fontSize: '16px',
        fontWeight: 'normal',
        color: '#1f2937',
        padding: '8px',
        lineHeight: '1.6'
      }
    },
    {
      name: 'Image',
      icon: Image,
      type: 'image' as const,
      content: '/lovable-uploads/a73b0700-f977-4b9b-885e-8b1405796833.png',
      description: 'Responsive image',
      gradient: 'from-green-500 to-emerald-500',
      styles: {
        width: '300px',
        height: '200px',
        borderRadius: '12px',
        objectFit: 'cover'
      }
    },
    {
      name: 'Link',
      icon: Link,
      type: 'link' as const,
      content: 'Click here',
      description: 'Clickable link',
      gradient: 'from-blue-500 to-blue-600',
      styles: {
        color: '#3b82f6',
        textDecoration: 'underline',
        padding: '4px',
        fontSize: '16px'
      }
    }
  ];

  const interactiveComponents = [
    {
      name: 'Contact Form',
      icon: Mail,
      type: 'contact' as const,
      content: 'Contact Form',
      description: 'Lead generation form',
      gradient: 'from-orange-500 to-red-500',
      styles: {
        padding: '1.5rem',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }
    },
    {
      name: 'Checkout',
      icon: CreditCard,
      type: 'checkout' as const,
      content: 'Stripe Checkout',
      description: 'Payment form',
      gradient: 'from-green-500 to-teal-500',
      styles: {
        padding: '1.5rem',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }
    },
    {
      name: 'Video',
      icon: Video,
      type: 'video' as const,
      content: 'https://example.com/video.mp4',
      description: 'Video player',
      gradient: 'from-red-500 to-pink-500',
      styles: {
        width: '100%',
        height: '300px',
        borderRadius: '12px'
      }
    }
  ];

  const ComponentCard = ({ component, category }: { component: any, category: string }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, component)}
      onClick={() => onAddElement(component)}
      className={cn(
        "group relative overflow-hidden rounded-xl border-2 border-transparent",
        "cursor-grab active:cursor-grabbing transition-all duration-300",
        "hover:border-white hover:shadow-2xl hover:scale-105",
        "bg-gradient-to-br", component.gradient
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <div className="relative p-4 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <component.icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">{component.name}</h4>
            <p className="text-xs opacity-80">{component.description}</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
          {category}
        </Badge>
      </div>
      <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-white/10 rounded-full transform rotate-45" />
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white/80 to-gray-50/80 backdrop-blur-sm">
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Components</h3>
            <p className="text-sm text-gray-600">Drag & drop to add</p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Layout
            </h4>
            <div className="grid gap-3">
              {layoutComponents.map((component) => (
                <ComponentCard key={component.name} component={component} category="Layout" />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Type className="w-4 h-4" />
              Content
            </h4>
            <div className="grid gap-3">
              {contentComponents.map((component) => (
                <ComponentCard key={component.name} component={component} category="Content" />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Interactive
            </h4>
            <div className="grid gap-3">
              {interactiveComponents.map((component) => (
                <ComponentCard key={component.name} component={component} category="Interactive" />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};