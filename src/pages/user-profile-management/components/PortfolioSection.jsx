import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PortfolioSection = ({ data, onUpdate, isExpanded, onToggle }) => {
  const [portfolioItems, setPortfolioItems] = useState(data?.portfolioItems || []);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    'Web Development',
    'Mobile Apps',
    'Graphic Design',
    'UI/UX Design',
    'Branding',
    'Photography',
    'Video/Animation',
    'Writing',
    'Marketing',
    'Other'
  ];

  const handleAddPortfolioItem = () => {
    const newItem = {
      id: Date.now(),
      title: '',
      description: '',
      category: '',
      images: [],
      projectUrl: '',
      clientTestimonial: '',
      clientName: '',
      technologies: [],
      completionDate: '',
      featured: false
    };
    setPortfolioItems(prev => [...prev, newItem]);
  };

  const updatePortfolioItem = (id, field, value) => {
    setPortfolioItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removePortfolioItem = (id) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  const handleImageUpload = (itemId, files) => {
    const imagePromises = Array.from(files).map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name,
            size: file.size
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      updatePortfolioItem(itemId, 'images', [...(portfolioItems.find(item => item.id === itemId)?.images || []), ...images]);
    });
  };

  const removeImage = (itemId, imageId) => {
    const item = portfolioItems.find(item => item.id === itemId);
    if (item) {
      const updatedImages = item.images.filter(img => img.id !== imageId);
      updatePortfolioItem(itemId, 'images', updatedImages);
    }
  };

  const addTechnology = (itemId, tech) => {
    const item = portfolioItems.find(item => item.id === itemId);
    if (item && tech && !item.technologies.includes(tech)) {
      updatePortfolioItem(itemId, 'technologies', [...item.technologies, tech]);
    }
  };

  const removeTechnology = (itemId, tech) => {
    const item = portfolioItems.find(item => item.id === itemId);
    if (item) {
      updatePortfolioItem(itemId, 'technologies', item.technologies.filter(t => t !== tech));
    }
  };

  const handleDragStart = (e, itemId) => {
    setDraggedItem(itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetId) {
      const draggedIndex = portfolioItems.findIndex(item => item.id === draggedItem);
      const targetIndex = portfolioItems.findIndex(item => item.id === targetId);
      
      const newItems = [...portfolioItems];
      const [draggedItemData] = newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItemData);
      
      setPortfolioItems(newItems);
    }
    setDraggedItem(null);
  };

  const toggleFeatured = (itemId) => {
    const item = portfolioItems.find(item => item.id === itemId);
    updatePortfolioItem(itemId, 'featured', !item?.featured);
  };

  const handleSave = () => {
    onUpdate?.({ portfolioItems });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPortfolioItems(data?.portfolioItems || []);
    setIsEditing(false);
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Section Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-hover transition-colors duration-200"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Image" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Portfolio</h3>
          {portfolioItems.length > 0 && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
              {portfolioItems.length} {portfolioItems.length === 1 ? 'project' : 'projects'}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Icon name="Edit2" size={16} />
            </Button>
          )}
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-text-secondary" 
          />
        </div>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="pt-4">
            {isEditing ? (
              <div className="space-y-6">
                {/* Add Portfolio Item Button */}
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={handleAddPortfolioItem}
                    className="w-full md:w-auto"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Portfolio Item
                  </Button>
                </div>

                {/* Portfolio Items */}
                <div className="space-y-6">
                  {portfolioItems.map((item, index) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, item.id)}
                      className="p-4 border border-border rounded-lg bg-background cursor-move hover:shadow-soft transition-shadow duration-200"
                    >
                      {/* Item Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Icon name="GripVertical" size={16} className="text-text-secondary" />
                          <span className="font-medium text-text-primary">
                            Project #{index + 1}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeatured(item.id)}
                            className={item.featured ? 'text-accent' : 'text-text-secondary'}
                          >
                            <Icon name="Star" size={16} fill={item.featured ? 'currentColor' : 'none'} />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePortfolioItem(item.id)}
                          className="text-error hover:text-error-600"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>

                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Project Title *
                          </label>
                          <Input
                            value={item.title}
                            onChange={(e) => updatePortfolioItem(item.id, 'title', e.target.value)}
                            placeholder="Enter project title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Category
                          </label>
                          <select
                            value={item.category}
                            onChange={(e) => updatePortfolioItem(item.id, 'category', e.target.value)}
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="">Select category</option>
                            {categories.map((category) => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Project Description
                        </label>
                        <textarea
                          value={item.description}
                          onChange={(e) => updatePortfolioItem(item.id, 'description', e.target.value)}
                          placeholder="Describe the project, your role, and key achievements..."
                          rows={3}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                        />
                      </div>

                      {/* Images */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Project Images
                        </label>
                        
                        {/* Image Upload */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors duration-200">
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleImageUpload(item.id, e.target.files)}
                            className="hidden"
                          />
                          <Icon name="Upload" size={24} className="mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-text-secondary">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-primary hover:text-primary-600 underline"
                            >
                              Click to upload
                            </button>{' '}
                            or drag and drop images
                          </p>
                        </div>

                        {/* Image Gallery */}
                        {item.images?.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                            {item.images.map((image) => (
                              <div key={image.id} className="relative group">
                                <img
                                  src={image.url}
                                  alt={image.name}
                                  className="w-full h-24 object-cover rounded-lg border border-border"
                                />
                                <button
                                  onClick={() => removeImage(item.id, image.id)}
                                  className="absolute top-1 right-1 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                  <Icon name="X" size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Project URL and Completion Date */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Project URL
                          </label>
                          <Input
                            type="url"
                            value={item.projectUrl}
                            onChange={(e) => updatePortfolioItem(item.id, 'projectUrl', e.target.value)}
                            placeholder="https://project-url.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Completion Date
                          </label>
                          <Input
                            type="date"
                            value={item.completionDate}
                            onChange={(e) => updatePortfolioItem(item.id, 'completionDate', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Technologies Used
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.technologies?.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                            >
                              {tech}
                              <button
                                onClick={() => removeTechnology(item.id, tech)}
                                className="ml-2 text-primary-600 hover:text-primary-800"
                              >
                                <Icon name="X" size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                        <Input
                          placeholder="Add technology (press Enter)"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addTechnology(item.id, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>

                      {/* Client Testimonial */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Client Testimonial
                          </label>
                          <textarea
                            value={item.clientTestimonial}
                            onChange={(e) => updatePortfolioItem(item.id, 'clientTestimonial', e.target.value)}
                            placeholder="Client feedback about the project..."
                            rows={2}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Client Name
                          </label>
                          <Input
                            value={item.clientName}
                            onChange={(e) => updatePortfolioItem(item.id, 'clientName', e.target.value)}
                            placeholder="Client name"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save Portfolio
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {portfolioItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="Image" size={48} className="mx-auto mb-4 text-gray-400" />
                    <h4 className="font-medium text-text-primary mb-2">No portfolio items yet</h4>
                    <p className="text-text-secondary mb-4">
                      Showcase your best work to attract more clients
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Add Your First Project
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Featured Projects First */}
                    {portfolioItems
                      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
                      .map((item) => (
                      <div key={item.id} className="border border-border rounded-lg p-4 bg-background">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-text-primary">{item.title}</h4>
                              {item.featured && (
                                <Icon name="Star" size={16} className="text-accent" fill="currentColor" />
                              )}
                            </div>
                            {item.category && (
                              <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                                {item.category}
                              </span>
                            )}
                          </div>
                          {item.projectUrl && (
                            <a
                              href={item.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary-600"
                            >
                              <Icon name="ExternalLink" size={16} />
                            </a>
                          )}
                        </div>

                        {item.description && (
                          <p className="text-text-secondary mb-3">{item.description}</p>
                        )}

                        {/* Images */}
                        {item.images?.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            {item.images.slice(0, 4).map((image) => (
                              <img
                                key={image.id}
                                src={image.url}
                                alt={image.name}
                                className="w-full h-24 object-cover rounded-lg border border-border"
                              />
                            ))}
                            {item.images.length > 4 && (
                              <div className="w-full h-24 bg-gray-100 rounded-lg border border-border flex items-center justify-center">
                                <span className="text-sm text-text-secondary">
                                  +{item.images.length - 4} more
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Technologies */}
                        {item.technologies?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-surface-hover text-text-secondary rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Client Testimonial */}
                        {item.clientTestimonial && (
                          <div className="bg-primary-50 p-3 rounded-lg">
                            <p className="text-text-secondary italic">"{item.clientTestimonial}"</p>
                            {item.clientName && (
                              <p className="text-text-primary font-medium mt-2">— {item.clientName}</p>
                            )}
                          </div>
                        )}

                        {item.completionDate && (
                          <div className="text-xs text-text-muted mt-3">
                            Completed: {new Date(item.completionDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;