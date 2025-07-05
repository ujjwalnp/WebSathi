
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Settings, Globe, Palette, Type, Eye, 
  Download, Upload, RotateCcw, Save,
  Smartphone, Monitor, Tablet
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface PageSettings {
  title: string;
  description: string;
  favicon: string;
  backgroundColor: string;
  fontFamily: string;
}

interface PageSettingsPanelProps {
  settings: PageSettings;
  onSettingsChange: (settings: PageSettings) => void;
}

const fontOptions = [
  { value: 'Inter, sans-serif', label: 'Inter (Recommended)' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Poppins, sans-serif', label: 'Poppins' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Lato, sans-serif', label: 'Lato' },
  { value: 'Source Sans Pro, sans-serif', label: 'Source Sans Pro' },
  { value: 'Nunito, sans-serif', label: 'Nunito' },
  { value: 'PT Sans, sans-serif', label: 'PT Sans' },
  { value: 'system-ui, sans-serif', label: 'System Default' }
];

const colorPresets = [
  { name: 'Pure White', value: '#ffffff' },
  { name: 'Soft Gray', value: '#f8fafc' },
  { name: 'Light Blue', value: '#f0f9ff' },
  { name: 'Warm Cream', value: '#fefce8' },
  { name: 'Mint Fresh', value: '#f0fdf4' },
  { name: 'Lavender', value: '#faf5ff' },
  { name: 'Rose Tint', value: '#fdf2f8' },
  { name: 'Peach', value: '#fff7ed' }
];

export const PageSettingsPanel: React.FC<PageSettingsPanelProps> = ({
  settings,
  onSettingsChange
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const updateSetting = (key: keyof PageSettings, value: string) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website-settings.json';
      a.click();
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const handleSave = () => {
    setLastSaved(new Date());
    localStorage.setItem('websathi-page-settings', JSON.stringify(settings));
  };

  const resetToDefaults = () => {
    onSettingsChange({
      title: 'My Amazing Website',
      description: 'Built with WebSathi - Professional Website Builder',
      favicon: '/favicon.ico',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, sans-serif'
    });
  };

  return (
    <div className="h-full flex flex-col bg-white/50 backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200/50 bg-white/80">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-600" />
          Page Settings
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">Global</Badge>
        </h2>
        <p className="text-sm text-gray-600 mt-1">Configure your website's global settings and preferences</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-6">
          {/* SEO & Meta Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-sm text-gray-700">SEO & Meta</h3>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="pageTitle" className="text-sm font-medium">Page Title</Label>
                <Input
                  id="pageTitle"
                  value={settings.title}
                  onChange={(e) => updateSetting('title', e.target.value)}
                  className="text-sm"
                  placeholder="My Amazing Website"
                />
                <p className="text-xs text-gray-500">Appears in browser tab and search results</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription" className="text-sm font-medium">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.description}
                  onChange={(e) => updateSetting('description', e.target.value)}
                  className="text-sm resize-none"
                  rows={3}
                  placeholder="Brief description for search engines"
                  maxLength={160}
                />
                <p className="text-xs text-gray-500">
                  Brief description for search engines ({settings.description.length}/160 characters)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon" className="text-sm font-medium">Favicon URL</Label>
                <Input
                  id="favicon"
                  value={settings.favicon}
                  onChange={(e) => updateSetting('favicon', e.target.value)}
                  className="text-sm"
                  placeholder="/favicon.ico"
                />
                <p className="text-xs text-gray-500">Small icon displayed in browser tab</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Visual Appearance Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold text-sm text-gray-700">Visual Appearance</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Background Color</Label>
                <div className="flex gap-2 items-center mb-3">
                  <Input
                    type="color"
                    value={settings.backgroundColor}
                    onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                    className="w-12 h-10 p-1 border rounded cursor-pointer"
                  />
                  <Input
                    value={settings.backgroundColor}
                    onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                    className="flex-1 text-sm font-mono"
                    placeholder="#ffffff"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-3">Overall page background color</p>
                
                <div className="grid grid-cols-4 gap-2">
                  {colorPresets.map((preset) => (
                    <Button
                      key={preset.value}
                      variant="outline"
                      size="sm"
                      onClick={() => updateSetting('backgroundColor', preset.value)}
                      className={cn(
                        "h-12 p-1 border-2 transition-all",
                        settings.backgroundColor === preset.value 
                          ? "border-blue-500 ring-2 ring-blue-200" 
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      style={{ backgroundColor: preset.value }}
                    >
                      <div className="w-full h-full rounded-sm" style={{ backgroundColor: preset.value }} />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Font Family</Label>
                <Select value={settings.fontFamily} onValueChange={(value) => updateSetting('fontFamily', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose font family" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Default font for all text elements</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Responsive Preview Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-sm text-gray-700">Responsive Preview</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="text-center space-y-2">
                <Monitor className="w-6 h-6 mx-auto text-blue-600" />
                <p className="text-xs font-medium">Desktop</p>
                <p className="text-xs text-gray-500">1200px+</p>
              </div>
              <div className="text-center space-y-2">
                <Tablet className="w-6 h-6 mx-auto text-purple-600" />
                <p className="text-xs font-medium">Tablet</p>
                <p className="text-xs text-gray-500">768px</p>
              </div>
              <div className="text-center space-y-2">
                <Smartphone className="w-6 h-6 mx-auto text-green-600" />
                <p className="text-xs font-medium">Mobile</p>
                <p className="text-xs text-gray-500">375px</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Export & Backup Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Download className="w-4 h-4 text-orange-600" />
              <h3 className="font-semibold text-sm text-gray-700">Export & Backup</h3>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={handleExport}
                disabled={isExporting}
                className="w-full justify-start"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export Settings'}
              </Button>
              
              <Button 
                onClick={handleSave}
                className="w-full justify-start"
                variant="outline"
              >
                <Save className="w-4 h-4 mr-2" />
                Save to Local Storage
              </Button>

              {lastSaved && (
                <p className="text-xs text-green-600 text-center">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Reset Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <RotateCcw className="w-4 h-4 text-red-600" />
              <h3 className="font-semibold text-sm text-gray-700">Reset</h3>
            </div>
            
            <Button 
              onClick={resetToDefaults}
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>

          {/* Additional spacing at bottom for scroll */}
          <div className="h-20" />
        </div>
      </div>
    </div>
  );
};
