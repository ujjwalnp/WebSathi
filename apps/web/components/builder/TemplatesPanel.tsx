"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BuilderElement } from '../../app/builder/page';
import { FileText, Briefcase, ShoppingBag, Users, Heart, Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface TemplatesPanelProps {
  onLoadTemplate: (elements: BuilderElement[]) => void;
}

export const TemplatesPanel: React.FC<TemplatesPanelProps> = ({ onLoadTemplate }) => {
  const templates = [
    {
      name: 'Landing Page',
      icon: FileText,
      description: 'Perfect for product launches',
      elements: [
        {
          id: 'template-hero',
          type: 'container' as const,
          content: '',
          styles: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'white'
          },
          children: [
            {
              id: 'template-title',
              type: 'text' as const,
              content: 'Launch Your Dream Product',
              styles: {
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }
            },
            {
              id: 'template-subtitle',
              type: 'text' as const,
              content: 'Transform your idea into reality with our amazing platform',
              styles: {
                fontSize: '1.25rem',
                marginBottom: '2rem',
                opacity: '0.9'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'Business',
      icon: Briefcase,
      description: 'Professional business site',
      elements: [
        {
          id: 'business-header',
          type: 'container' as const,
          content: '',
          styles: {
            backgroundColor: '#1f2937',
            padding: '2rem',
            textAlign: 'center',
            color: 'white'
          },
          children: [
            {
              id: 'business-title',
              type: 'text' as const,
              content: 'Your Business Name',
              styles: {
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }
            },
            {
              id: 'business-tagline',
              type: 'text' as const,
              content: 'Professional services you can trust',
              styles: {
                fontSize: '1.125rem',
                opacity: '0.8'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'E-commerce',
      icon: ShoppingBag,
      description: 'Online store template',
      elements: [
        {
          id: 'shop-hero',
          type: 'container' as const,
          content: '',
          styles: {
            backgroundColor: '#f8fafc',
            padding: '3rem 2rem',
            textAlign: 'center'
          },
          children: [
            {
              id: 'shop-title',
              type: 'text' as const,
              content: 'Premium Collection',
              styles: {
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1f2937'
              }
            },
            {
              id: 'shop-checkout',
              type: 'checkout' as const,
              content: 'Stripe Checkout',
              styles: {
                margin: '2rem auto',
                maxWidth: '400px'
              }
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <div className="mb-4">
        <h3 className="font-semibold text-sm mb-2">Quick Start Templates</h3>
        <p className="text-xs text-muted-foreground">
          Choose a template to get started quickly
        </p>
      </div>

      <div className="space-y-3">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.name} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                    <Button 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={() => onLoadTemplate(template.elements)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
