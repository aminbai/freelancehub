import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUpload = ({ onUpload, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      
      // Check file type
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain', 'text/csv'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported.`);
        return false;
      }
      
      return true;
    });
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpload(files);
      setFiles([]);
      onClose();
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image';
    if (type.includes('pdf')) return 'FileText';
    if (type.includes('word') || type.includes('document')) return 'FileText';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'FileSpreadsheet';
    return 'File';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300">
      <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Upload Files
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-50' :'border-border bg-surface-hover'
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
            onChange={handleChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={32} className="text-primary-600" />
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-2">
                Drop files here or click to select
              </h4>
              <p className="text-text-secondary text-sm">
                Supports: Images, PDFs, Documents (max 10MB each)
              </p>
            </div>
            
            <Button
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              className="mx-auto"
            >
              Select Files
            </Button>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-text-primary">Selected Files</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 bg-surface-hover rounded-lg"
                >
                  <div className="p-1 bg-primary-50 rounded">
                    <Icon 
                      name={getFileIcon(file.type)} 
                      size={16} 
                      className="text-primary-600" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-error hover:text-error-700 p-1"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex items-center space-x-3 mt-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            loading={uploading}
            className="flex-1"
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} file${files.length !== 1 ? 's' : ''}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;