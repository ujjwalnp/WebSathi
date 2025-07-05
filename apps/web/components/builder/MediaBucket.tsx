"use client";
import React, { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Upload, Search, Image, Video, File, MoreHorizontal, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: string;
  uploadedAt: Date;
}

interface MediaBucketProps {
  onSelectMedia?: (media: MediaItem) => void;
}

export const MediaBucket: React.FC<MediaBucketProps> = ({ onSelectMedia }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaFiles, setMediaFiles] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'Banner Image',
      type: 'image',
      url: '/lovable-uploads/a73b0700-f977-4b9b-885e-8b1405796833.png',
      size: '2.3 MB',
      uploadedAt: new Date('2024-01-26')
    },
    {
      id: '2',
      name: 'Banner V2',
      type: 'image', 
      url: '/lovable-uploads/a9df6519-c2bd-43cd-8e2d-deb36cbc989b.png',
      size: '1.8 MB',
      uploadedAt: new Date('2024-01-26')
    },
    {
      id: '3',
      name: 'Product Gallery',
      type: 'image',
      url: '/lovable-uploads/2bba29c2-1ab3-4622-b39f-f442edc13204.png',
      size: '3.1 MB',
      uploadedAt: new Date('2024-01-25')
    }
  ]);

  const filteredMedia = mediaFiles.filter(media =>
    media.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newMedia: MediaItem = {
        id: Date.now().toString() + Math.random().toString(36),
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date()
      };
      
      setMediaFiles(prev => [...prev, newMedia]);
    });
  };

  const deleteMedia = (id: string) => {
    setMediaFiles(prev => prev.filter(media => media.id !== id));
  };

  const getMediaIcon = (type: MediaItem['type']) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      default: return File;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Media Bucket</h3>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search for file name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
        
        <input
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
      </div>

      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Media Files</h4>
      </div>
      
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-3">
          {filteredMedia.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Upload className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No media files</p>
              <p className="text-xs mt-1">Upload images, videos, or documents</p>
            </div>
          ) : (
            filteredMedia.map((media) => {
              const IconComponent = getMediaIcon(media.type);
              
              return (
                <div
                  key={media.id}
                  className="group flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors"
                  onClick={() => onSelectMedia?.(media)}
                >
                  {media.type === 'image' ? (
                    <img
                      src={media.url}
                      alt={media.name}
                      className="w-12 h-12 object-cover rounded-md bg-gray-100"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {media.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(media.uploadedAt)}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMedia(media.id);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
