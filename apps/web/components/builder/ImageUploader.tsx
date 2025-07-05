
import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Upload, Link, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  currentImageUrl?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  currentImageUrl
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(currentImageUrl || '');
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelect(result);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      onImageSelect(imageUrl.trim());
      toast.success('Image URL added successfully!');
    } else {
      toast.error('Please enter a valid image URL');
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <div className="flex gap-2 mb-4">
        <Button
          variant={uploadMethod === 'upload' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setUploadMethod('upload')}
          className="flex-1"
        >
          <Upload className="w-4 h-4 mr-1" />
          Upload
        </Button>
        <Button
          variant={uploadMethod === 'url' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setUploadMethod('url')}
          className="flex-1"
        >
          <Link className="w-4 h-4 mr-1" />
          URL
        </Button>
      </div>

      {uploadMethod === 'upload' ? (
        <div className="space-y-3">
          <Label htmlFor="imageUpload" className="text-sm font-medium">
            Choose Image File
          </Label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload image</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-3">
          <Label htmlFor="imageUrl" className="text-sm font-medium">
            Image URL
          </Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="text-sm"
          />
          <Button
            onClick={handleUrlSubmit}
            className="w-full"
            size="sm"
          >
            Add Image
          </Button>
        </div>
      )}

      {currentImageUrl && (
        <div className="mt-4">
          <Label className="text-sm font-medium">Current Image</Label>
          <div className="mt-2 border rounded overflow-hidden">
            <img
              src={currentImageUrl}
              alt="Current"
              className="w-full h-32 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};
