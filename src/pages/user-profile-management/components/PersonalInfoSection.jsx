import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ data, onUpdate, isExpanded, onToggle }) => {
  const [formData, setFormData] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    phone: data?.phone || '',
    location: data?.location || '',
    timezone: data?.timezone || '',
    website: data?.website || '',
    bio: data?.bio || '',
    languages: data?.languages || ['English']
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Website must be a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate?.(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      email: data?.email || '',
      phone: data?.phone || '',
      location: data?.location || '',
      timezone: data?.timezone || '',
      website: data?.website || '',
      bio: data?.bio || '',
      languages: data?.languages || ['English']
    });
    setErrors({});
    setIsEditing(false);
  };

  const addLanguage = () => {
    setFormData(prev => ({ 
      ...prev, 
      languages: [...prev.languages, ''] 
    }));
  };

  const updateLanguage = (index, value) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => i === index ? value : lang)
    }));
  };

  const removeLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const timezones = [
    'UTC-12:00 (Baker Island)',
    'UTC-11:00 (American Samoa)',
    'UTC-10:00 (Hawaii)',
    'UTC-09:00 (Alaska)',
    'UTC-08:00 (Pacific Time)',
    'UTC-07:00 (Mountain Time)',
    'UTC-06:00 (Central Time)',
    'UTC-05:00 (Eastern Time)',
    'UTC-04:00 (Atlantic Time)',
    'UTC-03:00 (Argentina)',
    'UTC-02:00 (South Georgia)',
    'UTC-01:00 (Azores)',
    'UTC+00:00 (GMT/UTC)',
    'UTC+01:00 (Central European)',
    'UTC+02:00 (Eastern European)',
    'UTC+03:00 (Moscow)',
    'UTC+04:00 (Gulf)',
    'UTC+05:00 (Pakistan)',
    'UTC+05:30 (India)',
    'UTC+06:00 (Bangladesh)',
    'UTC+07:00 (Vietnam)',
    'UTC+08:00 (China)',
    'UTC+09:00 (Japan)',
    'UTC+10:00 (Australia East)',
    'UTC+11:00 (Solomon Islands)',
    'UTC+12:00 (New Zealand)'
  ];

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Section Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-hover transition-colors duration-200"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Personal Information</h3>
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
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      First Name *
                    </label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                      className={errors.firstName ? 'border-error' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-error text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Last Name *
                    </label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                      className={errors.lastName ? 'border-error' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-error text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className={errors.email ? 'border-error' : ''}
                    />
                    {errors.email && (
                      <p className="text-error text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Location and Timezone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Location
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Timezone
                    </label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select timezone</option>
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Website
                  </label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className={errors.website ? 'border-error' : ''}
                  />
                  {errors.website && (
                    <p className="text-error text-sm mt-1">{errors.website}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    maxLength={500}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="text-right text-xs text-text-secondary mt-1">
                    {formData.bio.length}/500 characters
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Languages
                  </label>
                  <div className="space-y-3">
                    {formData.languages.map((language, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={language}
                          onChange={(e) => updateLanguage(index, e.target.value)}
                          placeholder="Enter language"
                          className="flex-1"
                        />
                        {formData.languages.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLanguage(index)}
                            className="text-error hover:text-error-600"
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addLanguage}
                      className="mt-2"
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Add Language
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Display Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Full Name</h4>
                    <p className="text-text-secondary">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Email</h4>
                    <p className="text-text-secondary">{formData.email}</p>
                  </div>
                  {formData.phone && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Phone</h4>
                      <p className="text-text-secondary">{formData.phone}</p>
                    </div>
                  )}
                  {formData.location && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Location</h4>
                      <p className="text-text-secondary">{formData.location}</p>
                    </div>
                  )}
                  {formData.timezone && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Timezone</h4>
                      <p className="text-text-secondary">{formData.timezone}</p>
                    </div>
                  )}
                  {formData.website && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Website</h4>
                      <a 
                        href={formData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-600 underline"
                      >
                        {formData.website}
                      </a>
                    </div>
                  )}
                </div>
                
                {formData.bio && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Bio</h4>
                    <p className="text-text-secondary">{formData.bio}</p>
                  </div>
                )}

                {formData.languages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.languages.filter(lang => lang.trim()).map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
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

export default PersonalInfoSection;