
import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Upload, Image, Video, Link, Search, FolderOpen, Trash2, Eye, Download, Star } from 'lucide-react';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size?: string;
  uploadedAt: Date;
  favorite?: boolean;
}

interface EnhancedMediaBucketProps {
  onSelectMedia: (media: MediaItem) => void;
}

export const EnhancedMediaBucket: React.FC<EnhancedMediaBucketProps> = ({ onSelectMedia }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'Hero Background',
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      type: 'image',
      size: '2.3 MB',
      uploadedAt: new Date(),
      favorite: true
    },
    {
      id: '2',
      name: 'Team Photo',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      type: 'image',
      size: '1.8 MB',
      uploadedAt: new Date()
    },
    {
      id: '3',
      name: 'Product Showcase',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      type: 'image',
      size: '3.1 MB',
      uploadedAt: new Date()
    },
    {
      id: '4',
      name: 'Office Space',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      type: 'image',
      size: '2.7 MB',
      uploadedAt: new Date()
    },
    {
      id: '5',
      name: 'Technology',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      type: 'image',
      size: '2.1 MB',
      uploadedAt: new Date()
    },
    {
      id: '6',
      name: 'Creative Design',
      url: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=600&fit=crop',
      type: 'image',
      size: '1.9 MB',
      uploadedAt: new Date()
    }
  ]);

  const [urlInput, setUrlInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItem: MediaItem = {
          id: `uploaded-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          url: e.target?.result as string,
          type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          uploadedAt: new Date()
        };
        setMediaItems(prev => [newItem, ...prev]);
        toast.success(`${file.name} uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddFromUrl = () => {
    if (!urlInput.trim()) return;
    
    const newItem: MediaItem = {
      id: `url-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `Image from URL`,
      url: urlInput,
      type: 'image',
      uploadedAt: new Date()
    };
    
    setMediaItems(prev => [newItem, ...prev]);
    setUrlInput('');
    toast.success('Image added from URL!');
  };

  const toggleFavorite = (id: string) => {
    setMediaItems(prev => prev.map(item => 
      item.id === id ? { ...item, favorite: !item.favorite } : item
    ));
  };

  const deleteItem = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
    toast.success('Media item deleted');
  };

  const filteredItems = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteItems = filteredItems.filter(item => item.favorite);

  const renderMediaGrid = (items: MediaItem[]) => (
    <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto custom-scrollbar">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
          onClick={() => onSelectMedia(item)}
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-6 w-6 bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
            >
              <Star className={`w-3 h-3 ${item.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-6 w-6 bg-white/90 hover:bg-red-50 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(item.id);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-xs font-medium truncate">{item.name}</p>
            <p className="text-white/80 text-xs">{item.size}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-800">Media Library</h3>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
          <TabsTrigger value="all" className="text-xs">
            <Image className="w-3 h-3 mr-1" />
            All ({filteredItems.length})
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-xs">
            <Star className="w-3 h-3 mr-1" />
            Starred ({favoriteItems.length})
          </TabsTrigger>
          <TabsTrigger value="upload" className="text-xs">
            <Upload className="w-3 h-3 mr-1" />
            Upload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="flex-1 p-4 pt-2">
          {filteredItems.length > 0 ? (
            renderMediaGrid(filteredItems)
          ) : (
            <div className="flex items-center justify-center h-40 text-center">
              <div>
                <Image className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500 text-sm">No media found</p>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="flex-1 p-4 pt-2">
          {favoriteItems.length > 0 ? (
            renderMediaGrid(favoriteItems)
          ) : (
            <div className="flex items-center justify-center h-40 text-center">
              <div>
                <Star className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500 text-sm">No starred media</p>
                <p className="text-gray-400 text-xs mt-1">Star your favorites for quick access</p>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload" className="flex-1 p-4 pt-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Files
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                variant="outline"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Link className="w-4 h-4" />
                Add from URL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="text-sm"
              />
              <Button 
                onClick={handleAddFromUrl} 
                className="w-full"
                disabled={!urlInput.trim()}
              >
                Add Image
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `
      }} />
    </div>
  );
};