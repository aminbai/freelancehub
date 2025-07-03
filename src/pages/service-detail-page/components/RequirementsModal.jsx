import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RequirementsModal = ({ isOpen, onClose, onSubmit, selectedPackage }) => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    targetAudience: '',
    preferredStyle: '',
    brandColors: '',
    additionalNotes: '',
    deadline: '',
    budget: selectedPackage?.price || '',
    attachments: []
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.projectTitle.trim()) {
      newErrors.projectTitle = 'Project title is required';
    }
    
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    }
    
    if (formData.projectDescription.length < 50) {
      newErrors.projectDescription = 'Please provide at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1400 p-4">
      <div className="bg-surface rounded-lg shadow-elevation-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Project Requirements</h2>
            <p className="text-text-secondary text-sm mt-1">
              Please provide details about your project to get started
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-2 hover:bg-surface-hover rounded-lg"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Project Title *
            </label>
            <Input
              type="text"
              placeholder="Enter your project title"
              value={formData.projectTitle}
              onChange={(e) => handleInputChange('projectTitle', e.target.value)}
              className={errors.projectTitle ? 'border-error' : ''}
            />
            {errors.projectTitle && (
              <p className="text-error text-sm mt-1">{errors.projectTitle}</p>
            )}
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Project Description *
            </label>
            <textarea
              placeholder="Describe your project in detail. Include your goals, requirements, and any specific preferences..."
              value={formData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              rows={5}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                errors.projectDescription ? 'border-error' : 'border-border'
              }`}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.projectDescription && (
                <p className="text-error text-sm">{errors.projectDescription}</p>
              )}
              <p className="text-text-muted text-sm ml-auto">
                {formData.projectDescription.length}/500 characters
              </p>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Target Audience
            </label>
            <Input
              type="text"
              placeholder="Who is your target audience?"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            />
          </div>

          {/* Preferred Style */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preferred Style
            </label>
            <select
              value={formData.preferredStyle}
              onChange={(e) => handleInputChange('preferredStyle', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            >
              <option value="">Select a style</option>
              <option value="modern">Modern</option>
              <option value="minimalist">Minimalist</option>
              <option value="classic">Classic</option>
              <option value="creative">Creative</option>
              <option value="professional">Professional</option>
              <option value="playful">Playful</option>
            </select>
          </div>

          {/* Brand Colors */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Brand Colors
            </label>
            <Input
              type="text"
              placeholder="e.g., #FF5733, Blue, Red (optional)"
              value={formData.brandColors}
              onChange={(e) => handleInputChange('brandColors', e.target.value)}
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preferred Deadline
            </label>
            <Input
              type="date"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Icon name="Upload" size={24} className="text-text-secondary" />
                <p className="text-text-secondary">
                  Click to upload files or drag and drop
                </p>
                <p className="text-text-muted text-sm">
                  PNG, JPG, PDF up to 10MB each
                </p>
              </label>
            </div>

            {/* Uploaded Files */}
            {formData.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-background rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="File" size={16} className="text-text-secondary" />
                      <span className="text-text-primary text-sm">{file.name}</span>
                      <span className="text-text-muted text-xs">
                        ({(file.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeAttachment(index)}
                      className="p-1 hover:bg-error-50 hover:text-error rounded"
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Additional Notes
            </label>
            <textarea
              placeholder="Any additional information or special requests..."
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Package Summary */}
          {selectedPackage && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h3 className="font-medium text-primary mb-2">Selected Package</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary font-medium">{selectedPackage.name}</p>
                  <p className="text-text-secondary text-sm">
                    Delivery: {selectedPackage.deliveryTime} • Revisions: {selectedPackage.revisions}
                  </p>
                </div>
                <div className="text-primary font-bold text-lg">
                  ${selectedPackage.price}
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Continue to Checkout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequirementsModal;