import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RequirementsForm = ({ onRequirementsChange, requirements }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const newFiles = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    onRequirementsChange({
      ...requirements,
      attachments: [...requirements.attachments, ...newFiles]
    });
  };

  const removeFile = (fileId) => {
    onRequirementsChange({
      ...requirements,
      attachments: requirements.attachments.filter(file => file.id !== fileId)
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('word') || fileType.includes('document')) return 'FileText';
    if (fileType.includes('sheet') || fileType.includes('excel')) return 'FileSpreadsheet';
    if (fileType.includes('zip') || fileType.includes('rar')) return 'Archive';
    return 'File';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Project Requirements</h3>
        <p className="text-text-secondary text-sm mb-6">
          Please provide detailed information about your project to help the seller deliver exactly what you need.
        </p>
      </div>

      {/* Project Title */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Project Title *
        </label>
        <Input
          type="text"
          placeholder="Enter a descriptive title for your project"
          value={requirements.title}
          onChange={(e) => onRequirementsChange({
            ...requirements,
            title: e.target.value
          })}
          className="w-full"
          required
        />
      </div>

      {/* Project Description */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Project Description *
        </label>
        <textarea
          placeholder="Describe your project in detail. Include your goals, target audience, preferred style, specific requirements, and any other relevant information..."
          value={requirements.description}
          onChange={(e) => onRequirementsChange({
            ...requirements,
            description: e.target.value
          })}
          rows={6}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
          required
        />
        <p className="text-text-muted text-xs mt-1">
          {requirements.description.length}/2000 characters
        </p>
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Target Audience
        </label>
        <Input
          type="text"
          placeholder="Who is your target audience? (e.g., young professionals, small businesses, tech startups)"
          value={requirements.targetAudience}
          onChange={(e) => onRequirementsChange({
            ...requirements,
            targetAudience: e.target.value
          })}
          className="w-full"
        />
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Additional Budget (Optional)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              type="number"
              placeholder="Min budget"
              value={requirements.budgetMin}
              onChange={(e) => onRequirementsChange({
                ...requirements,
                budgetMin: e.target.value
              })}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max budget"
              value={requirements.budgetMax}
              onChange={(e) => onRequirementsChange({
                ...requirements,
                budgetMax: e.target.value
              })}
              className="w-full"
            />
          </div>
        </div>
        <p className="text-text-muted text-xs mt-1">
          For any additional work beyond the selected package
        </p>
      </div>

      {/* Preferred Style/References */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Style Preferences & References
        </label>
        <textarea
          placeholder="Describe your preferred style, provide links to examples, or mention any specific references you'd like the seller to consider..."
          value={requirements.stylePreferences}
          onChange={(e) => onRequirementsChange({
            ...requirements,
            stylePreferences: e.target.value
          })}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Attachments
        </label>
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-surface-hover'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt,.zip,.rar"
          />
          <div className="space-y-2">
            <Icon name="Upload" size={32} className="text-text-secondary mx-auto" />
            <div>
              <p className="text-text-primary font-medium">
                Drop files here or click to upload
              </p>
              <p className="text-text-secondary text-sm">
                Support for images, documents, and archives (Max 10MB each)
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        {requirements.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-text-primary">
              Uploaded Files ({requirements.attachments.length})
            </p>
            <div className="space-y-2">
              {requirements.attachments.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getFileIcon(file.type)} 
                      size={20} 
                      className="text-text-secondary flex-shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => removeFile(file.id)}
                    className="p-1 hover:bg-error-50 hover:text-error"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Special Instructions
        </label>
        <textarea
          placeholder="Any special instructions, deadlines, or specific requirements the seller should know about..."
          value={requirements.specialInstructions}
          onChange={(e) => onRequirementsChange({
            ...requirements,
            specialInstructions: e.target.value
          })}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
        />
      </div>

      {/* Communication Preferences */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Communication Preferences
        </label>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="communication"
              value="immediate"
              checked={requirements.communicationPreference === 'immediate'}
              onChange={(e) => onRequirementsChange({
                ...requirements,
                communicationPreference: e.target.value
              })}
              className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
            />
            <div>
              <p className="text-sm font-medium text-text-primary">Start immediately</p>
              <p className="text-xs text-text-secondary">Begin communication right after order placement</p>
            </div>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="communication"
              value="scheduled"
              checked={requirements.communicationPreference === 'scheduled'}
              onChange={(e) => onRequirementsChange({
                ...requirements,
                communicationPreference: e.target.value
              })}
              className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
            />
            <div>
              <p className="text-sm font-medium text-text-primary">Schedule a call</p>
              <p className="text-xs text-text-secondary">Arrange a specific time to discuss the project</p>
            </div>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="communication"
              value="brief"
              checked={requirements.communicationPreference === 'brief'}
              onChange={(e) => onRequirementsChange({
                ...requirements,
                communicationPreference: e.target.value
              })}
              className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
            />
            <div>
              <p className="text-sm font-medium text-text-primary">Submit brief only</p>
              <p className="text-xs text-text-secondary">Provide all details upfront, minimal communication needed</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RequirementsForm;