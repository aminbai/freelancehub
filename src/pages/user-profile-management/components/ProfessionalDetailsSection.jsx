import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfessionalDetailsSection = ({ data, onUpdate, isExpanded, onToggle }) => {
  const [formData, setFormData] = useState({
    title: data?.title || '',
    experience: data?.experience || '',
    hourlyRate: data?.hourlyRate || '',
    skills: data?.skills || [],
    certifications: data?.certifications || [],
    education: data?.education || [],
    workExperience: data?.workExperience || []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Intermediate (2-5 years)',
    'Expert (5-10 years)',
    'Senior Expert (10+ years)'
  ];

  const popularSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Graphic Design',
    'WordPress', 'SEO', 'Content Writing', 'UI/UX Design', 'PHP',
    'Marketing', 'Video Editing', 'Photography', 'Translation'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.some(s => s.name === skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, { name: skill, level: 'Intermediate', verified: false }]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateSkillLevel = (index, level) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, level } : skill
      )
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        issuer: '',
        year: '',
        url: ''
      }]
    }));
  };

  const updateCertification = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        institution: '',
        year: '',
        description: ''
      }]
    }));
  };

  const updateEducation = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        title: '',
        company: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const updateWorkExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onUpdate?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      title: data?.title || '',
      experience: data?.experience || '',
      hourlyRate: data?.hourlyRate || '',
      skills: data?.skills || [],
      certifications: data?.certifications || [],
      education: data?.education || [],
      workExperience: data?.workExperience || []
    });
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
          <Icon name="Briefcase" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Professional Details</h3>
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
                {/* Professional Title */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Professional Title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Full-Stack Developer, Graphic Designer"
                  />
                </div>

                {/* Experience and Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Experience Level
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Hourly Rate ($)
                    </label>
                    <Input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      placeholder="25"
                      min="1"
                    />
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Skills & Expertise
                  </label>
                  
                  {/* Add Skill */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {popularSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkill(skill)}
                          className="px-3 py-1 text-sm border border-border rounded-full hover:bg-primary-50 hover:border-primary transition-colors duration-200"
                          disabled={formData.skills.some(s => s.name === skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add custom skill"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill(newSkill)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => addSkill(newSkill)}
                        disabled={!newSkill.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-text-primary">{skill.name}</div>
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkillLevel(index, e.target.value)}
                            className="mt-1 text-sm border border-input rounded px-2 py-1"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                        {skill.verified && (
                          <Icon name="CheckCircle" size={16} className="text-success" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(index)}
                          className="text-error hover:text-error-600"
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-text-primary">
                      Certifications
                    </label>
                    <Button variant="outline" size="sm" onClick={addCertification}>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Add Certification
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {formData.certifications.map((cert, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <Input
                            value={cert.name}
                            onChange={(e) => updateCertification(index, 'name', e.target.value)}
                            placeholder="Certification name"
                          />
                          <Input
                            value={cert.issuer}
                            onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                            placeholder="Issuing organization"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            value={cert.year}
                            onChange={(e) => updateCertification(index, 'year', e.target.value)}
                            placeholder="Year obtained"
                          />
                          <div className="flex space-x-2">
                            <Input
                              value={cert.url}
                              onChange={(e) => updateCertification(index, 'url', e.target.value)}
                              placeholder="Certificate URL (optional)"
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCertification(index)}
                              className="text-error hover:text-error-600"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-text-primary">
                      Education
                    </label>
                    <Button variant="outline" size="sm" onClick={addEducation}>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Add Education
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {formData.education.map((edu, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            placeholder="Degree/Course name"
                          />
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            placeholder="Institution name"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Input
                            value={edu.year}
                            onChange={(e) => updateEducation(index, 'year', e.target.value)}
                            placeholder="Year completed"
                          />
                          <div className="md:col-span-2 flex space-x-2">
                            <Input
                              value={edu.description}
                              onChange={(e) => updateEducation(index, 'description', e.target.value)}
                              placeholder="Brief description (optional)"
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(index)}
                              className="text-error hover:text-error-600"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-text-primary">
                      Work Experience
                    </label>
                    <Button variant="outline" size="sm" onClick={addWorkExperience}>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Add Experience
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {formData.workExperience.map((exp, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <Input
                            value={exp.title}
                            onChange={(e) => updateWorkExperience(index, 'title', e.target.value)}
                            placeholder="Job title"
                          />
                          <Input
                            value={exp.company}
                            onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                            placeholder="Company name"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <Input
                            value={exp.duration}
                            onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
                            placeholder="2020-2022"
                          />
                          <div className="md:col-span-3 flex space-x-2">
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                              placeholder="Brief description of role and achievements"
                              rows={2}
                              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeWorkExperience(index)}
                              className="text-error hover:text-error-600 self-start"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
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
              <div className="space-y-6">
                {/* Display Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.title && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Professional Title</h4>
                      <p className="text-text-secondary">{formData.title}</p>
                    </div>
                  )}
                  {formData.experience && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Experience Level</h4>
                      <p className="text-text-secondary">{formData.experience}</p>
                    </div>
                  )}
                  {formData.hourlyRate && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Hourly Rate</h4>
                      <p className="text-text-secondary">${formData.hourlyRate}/hour</p>
                    </div>
                  )}
                </div>

                {/* Skills Display */}
                {formData.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Skills & Expertise</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                          <div>
                            <span className="font-medium text-text-primary">{skill.name}</span>
                            <span className="text-sm text-text-secondary ml-2">({skill.level})</span>
                          </div>
                          {skill.verified && (
                            <Icon name="CheckCircle" size={16} className="text-success" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications Display */}
                {formData.certifications.length > 0 && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Certifications</h4>
                    <div className="space-y-3">
                      {formData.certifications.map((cert, index) => (
                        <div key={index} className="p-3 bg-surface-hover rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium text-text-primary">{cert.name}</h5>
                              <p className="text-text-secondary text-sm">{cert.issuer} • {cert.year}</p>
                            </div>
                            {cert.url && (
                              <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary-600"
                              >
                                <Icon name="ExternalLink" size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education Display */}
                {formData.education.length > 0 && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Education</h4>
                    <div className="space-y-3">
                      {formData.education.map((edu, index) => (
                        <div key={index} className="p-3 bg-surface-hover rounded-lg">
                          <h5 className="font-medium text-text-primary">{edu.degree}</h5>
                          <p className="text-text-secondary text-sm">{edu.institution} • {edu.year}</p>
                          {edu.description && (
                            <p className="text-text-secondary text-sm mt-1">{edu.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Experience Display */}
                {formData.workExperience.length > 0 && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Work Experience</h4>
                    <div className="space-y-3">
                      {formData.workExperience.map((exp, index) => (
                        <div key={index} className="p-3 bg-surface-hover rounded-lg">
                          <h5 className="font-medium text-text-primary">{exp.title}</h5>
                          <p className="text-text-secondary text-sm">{exp.company} • {exp.duration}</p>
                          {exp.description && (
                            <p className="text-text-secondary text-sm mt-1">{exp.description}</p>
                          )}
                        </div>
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

export default ProfessionalDetailsSection;