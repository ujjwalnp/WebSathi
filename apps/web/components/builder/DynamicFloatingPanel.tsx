"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { 
  Wand2, Sparkles, Rocket, Zap, Heart, Star, 
  Palette, Layers, Settings, Eye, Download, Share 
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface DynamicFloatingPanelProps {
  isVisible: boolean;
  onClose: () => void;
  onActionClick: (action: string) => void;
}

export const DynamicFloatingPanel: React.FC<DynamicFloatingPanelProps> = ({
  isVisible,
  onClose,
  onActionClick
}) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const quickActions = [
    {
      id: 'ai-enhance',
      label: 'AI Enhance',
      icon: Wand2,
      color: 'from-purple-500 to-pink-500',
      description: 'Let AI improve your design'
    },
    {
      id: 'auto-layout',
      label: 'Auto Layout',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      description: 'Automatically arrange elements'
    },
    {
      id: 'color-magic',
      label: 'Color Magic',
      icon: Palette,
      color: 'from-green-500 to-emerald-500',
      description: 'Generate perfect color schemes'
    },
    {
      id: 'animations',
      label: 'Add Animations',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      description: 'Bring your design to life'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <Card className="max-w-md w-full mx-4 glass-effect border-white/30 shadow-2xl animate-scale-in">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">Enhance your design instantly</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isActive = activeAction === action.id;
              
              return (
                <Tooltip key={action.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-auto p-4 flex flex-col gap-2 transition-all duration-300 hover:scale-105",
                        isActive && "ring-2 ring-blue-500 bg-blue-50"
                      )}
                      onClick={() => {
                        setActiveAction(action.id);
                        setTimeout(() => {
                          onActionClick(action.id);
                          setActiveAction(null);
                        }, 500);
                      }}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center",
                        action.color
                      )}>
                        <Icon className={cn(
                          "w-4 h-4 text-white",
                          isActive && "animate-spin"
                        )} />
                      </div>
                      <span className="text-xs font-medium">{action.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{action.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Pro Tip</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Try combining multiple actions for the best results. AI enhancement works great with color magic!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
