"use client";
import React, { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Zap, Heart, Star, Download, Eye } from 'lucide-react';
import { BuilderElement } from '../../app/builder/page';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'business' | 'portfolio' | 'landing' | 'blog' | 'ecommerce';
  preview: string;
  elements: BuilderElement[];
  pageSettings: any;
  isPremium?: boolean;
  likes: number;
}

interface TemplateGalleryProps {
  onApplyTemplate: (template: Template) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onApplyTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const templates: Template[] = [
    {
      id: '1',
      name: 'Business Landing',
      description: 'Professional business landing page with hero section and contact form',
      category: 'business',
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      likes: 245,
      elements: [
        {
          id: 'hero-1',
          type: 'hero-section',
          content: 'Transform Your Business Today',
          styles: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'white',
            borderRadius: '16px'
          }
        },
        {
          id: 'contact-1',
          type: 'contact',
          content: 'Contact Form',
          styles: {
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            border: '1px solid #e5e7eb',
            margin: '2rem auto',
            maxWidth: '500px'
          }
        }
      ],
      pageSettings: {
        title: 'Business Landing Page',
        description: 'Professional business website',
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, sans-serif'
      }
    },
    {
      id: '2',
      name: 'Creative Portfolio',
      description: 'Stunning portfolio template for creative professionals',
      category: 'portfolio',
      preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      likes: 189,
      isPremium: true,
      elements: [
        {
          id: 'text-1',
          type: 'text',
          content: 'Creative Designer',
          styles: {
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#1f2937',
            textAlign: 'center',
            padding: '2rem'
          }
        },
        {
          id: 'gallery-1',
          type: 'gallery-image',
          content: '/lovable-uploads/a9df6519-c2bd-43cd-8e2d-deb36cbc989b.png',
          styles: {
            width: '300px',
            height: '300px',
            borderRadius: '16px',
            objectFit: 'cover',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            margin: '1rem auto'
          }
        }
      ],
      pageSettings: {
        title: 'Creative Portfolio',
        description: 'Showcase your creative work',
        backgroundColor: '#f8fafc',
        fontFamily: 'Inter, sans-serif'
      }
    },
    {
      id: '3',
      name: 'E-commerce Store',
      description: 'Complete e-commerce template with checkout',
      category: 'ecommerce',
      preview: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      likes: 312,
      elements: [
        {
          id: 'hero-2',
          type: 'hero-section',
          content: 'Shop the Latest Collection',
          styles: {
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            padding: '3rem 2rem',
            textAlign: 'center',
            color: 'white',
            borderRadius: '12px'
          }
        },
        {
          id: 'checkout-1',
          type: 'premium-checkout',
          content: 'Premium Checkout',
          styles: {
            padding: '2.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
            border: '1px solid #f3f4f6',
            margin: '2rem auto',
            maxWidth: '400px'
          }
        }
      ],
      pageSettings: {
        title: 'E-commerce Store',
        description: 'Modern online store',
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, sans-serif'
      }
    }
  ];

  const categories = [
    { key: 'all', label: 'All Templates', count: templates.length },
    { key: 'business', label: 'Business', count: templates.filter(t => t.category === 'business').length },
    { key: 'portfolio', label: 'Portfolio', count: templates.filter(t => t.category === 'portfolio').length },
    { key: 'landing', label: 'Landing', count: templates.filter(t => t.category === 'landing').length },
    { key: 'ecommerce', label: 'E-commerce', count: templates.filter(t => t.category === 'ecommerce').length },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="font-semibold text-gray-800 mb-3">Template Gallery</h3>
        
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.key)}
              className="text-xs"
            >
              {category.label}
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No templates found</p>
              <p className="text-xs mt-1">Try adjusting your search or category filter</p>
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-32 object-cover"
                  />
                  {template.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500">
                      <Star className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-white/90 text-gray-900 hover:bg-white"
                      onClick={() => {/* Preview functionality */}}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {template.name}
                    </h4>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Heart className="w-3 h-3" />
                      <span className="text-xs">{template.likes}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs capitalize">
                      {template.category}
                    </Badge>
                    
                    <Button
                      size="sm"
                      onClick={() => onApplyTemplate(template)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Use Template
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
