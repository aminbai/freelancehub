import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePhotoUpload = ({ currentPhoto, onPhotoUpdate }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentPhoto || null);
  const [isDragging, setIsDragging] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setCropMode(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleSavePhoto = () => {
    if (selectedImage) {
      onPhotoUpdate?.(selectedImage, previewUrl);
      setCropMode(false);
    }
  };

  const handleCancelCrop = () => {
    setCropMode(false);
    setSelectedImage(null);
    if (previewUrl && previewUrl !== currentPhoto) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(currentPhoto);
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    setSelectedImage(null);
    setCropMode(false);
    onPhotoUpdate?.(null, null);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        {/* Profile Photo Display */}
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                <Icon name="User" size={48} className="text-primary-400" />
              </div>
            )}
          </div>
          
          {/* Photo Actions */}
          <div className="absolute -bottom-2 -right-2">
            <Button
              variant="primary"
              size="sm"
              shape="circle"
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 shadow-lg"
            >
              <Icon name="Camera" size={16} />
            </Button>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`mt-6 border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
            isDragging
              ? 'border-primary bg-primary-50' :'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="text-center">
            <Icon name="Upload" size={32} className="mx-auto mb-4 text-gray-400" />
            <p className="text-text-primary font-medium mb-2">
              Drop your photo here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:text-primary-600 underline"
              >
                browse
              </button>
            </p>
            <p className="text-text-secondary text-sm">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Crop Mode Actions */}
        {cropMode && (
          <div className="mt-4 flex justify-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelCrop}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSavePhoto}
            >
              Save Photo
            </Button>
          </div>
        )}

        {/* Remove Photo Option */}
        {previewUrl && !cropMode && (
          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemovePhoto}
              className="text-error hover:text-error-600"
            >
              <Icon name="Trash2" size={16} className="mr-2" />
              Remove Photo
            </Button>
          </div>
        )}
      </div>

      {/* Professional Tips */}
      <div className="bg-primary-50 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-primary" />
          Photo Tips
        </h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Use a high-quality, well-lit photo</li>
          <li>• Face the camera with a professional expression</li>
          <li>• Avoid group photos or heavily filtered images</li>
          <li>• Square format works best (will be cropped to circle)</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;