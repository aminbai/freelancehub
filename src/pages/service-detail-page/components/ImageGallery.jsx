import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageGallery = ({ images, serviceName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
        <Image
          src={images[currentImageIndex]}
          alt={`${serviceName} - Image ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 cursor-pointer ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
          <Icon name="ZoomIn" size={16} className="inline mr-1" />
          Click to {isZoomed ? 'zoom out' : 'zoom in'}
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${serviceName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;