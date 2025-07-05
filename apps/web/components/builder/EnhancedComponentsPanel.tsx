
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Type, Image, Video, Square, Circle, Triangle, 
  Layers, Layout, Mail, CreditCard, Link2, 
  Sparkles, Upload, Link, Star, Heart, 
  Hexagon, Octagon, Diamond, Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { BuilderElement } from '../../app/builder/page';
import { ImageUploader } from './ImageUploader';

interface EnhancedComponentsPanelProps {
  onAddElement: (element: Omit<BuilderElement, 'id'>) => void;
}

export const EnhancedComponentsPanel: React.FC<EnhancedComponentsPanelProps> = ({
  onAddElement
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showVideoUploader, setShowVideoUploader] = useState(false);

  const basicComponents = [
    {
      type: 'text',
      name: 'Text',
      icon: Type,
      description: 'Editable text element',
      gradient: 'from-blue-500 to-cyan-500',
      element: { type: 'text' as const, content: 'Edit this text', styles: { fontSize: '16px', color: '#1f2937' } }
    },
    {
      type: 'container',
      name: 'Container',
      icon: Layers,
      description: 'Drop zone for other elements',
      gradient: 'from-purple-500 to-pink-500',
      element: { type: 'container' as const, content: '', styles: { padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px' } }
    },
    {
      type: 'two-columns',
      name: 'Two Columns',
      icon: Layout,
      description: 'Side-by-side layout',
      gradient: 'from-green-500 to-emerald-500',
      element: { type: 'two-columns' as const, content: '', styles: { gap: '2rem', padding: '1.5rem' } }
    }
  ];

  const mediaComponents = [
    {
      type: 'image',
      name: 'Image',
      icon: Image,
      description: 'Upload or link images',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      type: 'video',
      name: 'Video',
      icon: Video,
      description: 'Embed video content',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const shapeComponents = [
    {
      type: 'shape-rectangle',
      name: 'Rectangle',
      icon: Square,
      description: 'Basic rectangle shape',
      gradient: 'from-blue-500 to-indigo-500',
      element: { type: 'shape-rectangle' as const, content: 'Rectangle', styles: { width: '200px', height: '100px', backgroundColor: '#3b82f6', borderRadius: '8px' } }
    },
    {
      type: 'shape-circle',
      name: 'Circle',
      icon: Circle,
      description: 'Perfect circle shape',
      gradient: 'from-green-500 to-teal-500',
      element: { type: 'shape-circle' as const, content: 'Circle', styles: { width: '150px', height: '150px', backgroundColor: '#10b981' } }
    },
    {
      type: 'gradient-box',
      name: 'Gradient Box',
      icon: Sparkles,
      description: 'Box with gradient background',
      gradient: 'from-purple-500 to-pink-500',
      element: { type: 'gradient-box' as const, content: 'Gradient', styles: { width: '250px', height: '150px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px' } }
    },
    {
      type: 'shape-star',
      name: 'Star',
      icon: Star,
      description: 'Star shape element',
      gradient: 'from-yellow-500 to-orange-500',
      element: { type: 'gradient-box' as const, content: '⭐', styles: { width: '100px', height: '100px', backgroundColor: '#fbbf24', borderRadius: '50%', fontSize: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' } }
    },
    {
      type: 'shape-heart',
      name: 'Heart',
      icon: Heart,
      description: 'Heart shape element',
      gradient: 'from-pink-500 to-red-500',
      element: { type: 'gradient-box' as const, content: '❤️', styles: { width: '100px', height: '100px', backgroundColor: '#ef4444', borderRadius: '50%', fontSize: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' } }
    },
    {
      type: 'shape-diamond',
      name: 'Diamond',
      icon: Diamond,
      description: 'Diamond shape element',
      gradient: 'from-cyan-500 to-blue-500',
      element: { type: 'gradient-box' as const, content: '💎', styles: { width: '100px', height: '100px', backgroundColor: '#06b6d4', borderRadius: '12px', fontSize: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)' } }
    }
  ];

  const formComponents = [
    {
      type: 'contact',
      name: 'Contact Form',
      icon: Mail,
      description: 'Ready-to-use contact form',
      gradient: 'from-emerald-500 to-green-500',
      element: { type: 'contact' as const, content: '', styles: { maxWidth: '400px', padding: '24px' } }
    },
    {
      type: 'checkout',
      name: 'Checkout Form',
      icon: CreditCard,
      description: 'Payment form with Stripe styling',
      gradient: 'from-violet-500 to-purple-500',
      element: { type: 'checkout' as const, content: '', styles: { maxWidth: '400px', padding: '24px' } }
    }
  ];

  const advancedComponents = [
    {
      type: 'hero-section',
      name: 'Hero Section',
      icon: Sparkles,
      description: 'Eye-catching hero banner',
      gradient: 'from-indigo-500 to-purple-500',
      element: { type: 'hero-section' as const, content: 'Welcome to the Future', styles: { padding: '4rem 2rem', borderRadius: '16px' } }
    },
    {
      type: 'link',
      name: 'Link',
      icon: Link2,
      description: 'Clickable link element',
      gradient: 'from-blue-500 to-cyan-500',
      element: { type: 'link' as const, content: 'Click here', styles: { color: '#3b82f6', textDecoration: 'underline' } }
    }
  ];

  const handleImageSelect = (url: string) => {
    onAddElement({
      type: 'image',
      content: url,
      styles: {
        width: '300px',
        height: '200px',
        borderRadius: '12px',
        objectFit: 'cover'
      }
    });
    setShowImageUploader(false);
  };

  const handleVideoAdd = () => {
    if (videoUrl.trim()) {
      onAddElement({
        type: 'video',
        content: videoUrl,
        styles: {
          width: '400px',
          height: '225px',
          borderRadius: '12px'
        }
      });
      setVideoUrl('');
      setShowVideoUploader(false);
    }
  };

  const ComponentCard = ({ component, onClick }: { component: any, onClick: () => void }) => (
    <Button
      variant="outline"
      className={cn(
        "h-auto p-4 flex flex-col items-center gap-3 hover:scale-105 transition-all duration-200 border-2 border-gray-200 hover:border-transparent group relative overflow-hidden"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-200",
        component.gradient
      )} />
      <div className={cn(
        "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
        component.gradient
      )}>
        <component.icon className="w-5 h-5" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-sm">{component.name}</p>
        <p className="text-xs text-gray-500 mt-1">{component.description}</p>
      </div>
    </Button>
  );

  return (
    <div className="h-full flex flex-col bg-white/50 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200/50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-600" />
          Components
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">Enhanced</Badge>
        </h2>
        <p className="text-sm text-gray-600 mt-1">Drag and drop to build your website</p>
      </div>

      <Tabs defaultValue="basic" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 mx-4 mt-2 bg-gray-100/80">
          <TabsTrigger value="basic" className="text-xs">Basic</TabsTrigger>
          <TabsTrigger value="media" className="text-xs">Media</TabsTrigger>
          <TabsTrigger value="shapes" className="text-xs">Shapes</TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs">Pro</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <TabsContent value="basic" className="mt-0 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {basicComponents.map((component) => (
                <ComponentCard
                  key={component.type}
                  component={component}
                  onClick={() => onAddElement(component.element)}
                />
              ))}
            </div>
            
            <div>
              <h3 className="font-semibold text-sm mb-3 text-gray-700">Forms</h3>
              <div className="grid grid-cols-1 gap-3">
                {formComponents.map((component) => (
                  <ComponentCard
                    key={component.type}
                    component={component}
                    onClick={() => onAddElement(component.element)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-0 space-y-4">
            <div className="space-y-4">
              <div>
                <Button
                  onClick={() => setShowImageUploader(!showImageUploader)}
                  className="w-full h-20 bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Image className="w-6 h-6" />
                    <span className="font-semibold">Add Image</span>
                    <span className="text-xs opacity-90">Upload or use URL</span>
                  </div>
                </Button>
                
                {showImageUploader && (
                  <div className="mt-3">
                    <ImageUploader onImageSelect={handleImageSelect} />
                  </div>
                )}
              </div>

              <div>
                <Button
                  onClick={() => setShowVideoUploader(!showVideoUploader)}
                  className="w-full h-20 bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Video className="w-6 h-6" />
                    <span className="font-semibold">Add Video</span>
                    <span className="text-xs opacity-90">YouTube, Vimeo, MP4</span>
                  </div>
                </Button>
                
                {showVideoUploader && (
                  <div className="mt-3 space-y-3 p-4 border rounded-lg bg-white">
                    <Label htmlFor="videoUrl" className="text-sm font-medium">Video URL</Label>
                    <Input
                      id="videoUrl"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleVideoAdd} className="flex-1" size="sm">
                        Add Video
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowVideoUploader(false)} 
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shapes" className="mt-0 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {shapeComponents.map((component) => (
                <ComponentCard
                  key={component.type}
                  component={component}
                  onClick={() => onAddElement(component.element)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-0 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {advancedComponents.map((component) => (
                <ComponentCard
                  key={component.type}
                  component={component}
                  onClick={() => onAddElement(component.element)}
                />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
