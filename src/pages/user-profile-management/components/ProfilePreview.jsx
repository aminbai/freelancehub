import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePreview = ({ userData, onPublicView }) => {
  const completionPercentage = () => {
    let completed = 0;
    const totalFields = 10;

    if (userData?.personalInfo?.firstName && userData?.personalInfo?.lastName) completed += 1;
    if (userData?.personalInfo?.email) completed += 1;
    if (userData?.personalInfo?.bio) completed += 1;
    if (userData?.professionalDetails?.title) completed += 1;
    if (userData?.professionalDetails?.skills?.length > 0) completed += 1;
    if (userData?.professionalDetails?.hourlyRate) completed += 1;
    if (userData?.portfolio?.portfolioItems?.length > 0) completed += 1;
    if (userData?.profilePhoto) completed += 1;
    if (userData?.personalInfo?.location) completed += 1;
    if (userData?.professionalDetails?.experience) completed += 1;

    return Math.round((completed / totalFields) * 100);
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getMissingFields = () => {
    const missing = [];
    if (!userData?.personalInfo?.firstName || !userData?.personalInfo?.lastName) missing.push('Full name');
    if (!userData?.personalInfo?.bio) missing.push('Bio');
    if (!userData?.professionalDetails?.title) missing.push('Professional title');
    if (!userData?.professionalDetails?.skills?.length) missing.push('Skills');
    if (!userData?.professionalDetails?.hourlyRate) missing.push('Hourly rate');
    if (!userData?.portfolio?.portfolioItems?.length) missing.push('Portfolio items');
    if (!userData?.profilePhoto) missing.push('Profile photo');
    if (!userData?.personalInfo?.location) missing.push('Location');
    return missing;
  };

  const percentage = completionPercentage();
  const missingFields = getMissingFields();

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Profile Preview</h3>
        <p className="text-text-secondary text-sm">
          See how your profile appears to potential clients
        </p>
      </div>

      {/* Profile Completion */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Profile Completion</span>
          <span className={`text-sm font-semibold ${getCompletionColor(percentage)}`}>
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              percentage >= 80 ? 'bg-success' : percentage >= 60 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {percentage < 100 && (
          <p className="text-xs text-text-secondary mt-2">
            Complete your profile to increase visibility and attract more clients
          </p>
        )}
      </div>

      {/* Profile Card Preview */}
      <div className="bg-background border border-border rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-4">
          {/* Profile Photo */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm flex-shrink-0">
            {userData?.profilePhoto ? (
              <img
                src={userData.profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                <Icon name="User" size={24} className="text-primary-400" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-text-primary truncate">
              {userData?.personalInfo?.firstName && userData?.personalInfo?.lastName
                ? `${userData.personalInfo.firstName} ${userData.personalInfo.lastName}`
                : 'Your Name'}
            </h4>
            <p className="text-sm text-text-secondary truncate">
              {userData?.professionalDetails?.title || 'Professional Title'}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              {userData?.personalInfo?.location && (
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} className="text-text-muted" />
                  <span className="text-xs text-text-secondary">{userData.personalInfo.location}</span>
                </div>
              )}
              {userData?.professionalDetails?.hourlyRate && (
                <div className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={12} className="text-text-muted" />
                  <span className="text-xs text-text-secondary">${userData.professionalDetails.hourlyRate}/hr</span>
                </div>
              )}
            </div>
          </div>

          {/* Online Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-success">Online</span>
          </div>
        </div>

        {/* Bio Preview */}
        {userData?.personalInfo?.bio && (
          <div className="mt-4">
            <p className="text-sm text-text-secondary line-clamp-2">
              {userData.personalInfo.bio}
            </p>
          </div>
        )}

        {/* Skills Preview */}
        {userData?.professionalDetails?.skills?.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {userData.professionalDetails.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs"
                >
                  {skill.name}
                </span>
              ))}
              {userData.professionalDetails.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-text-secondary rounded text-xs">
                  +{userData.professionalDetails.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Missing Fields */}
      {missingFields.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-text-primary mb-3 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-2 text-warning" />
            Missing Information
          </h4>
          <div className="space-y-2">
            {missingFields.map((field, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Icon name="Circle" size={12} className="text-text-muted" />
                <span className="text-text-secondary">{field}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optimization Tips */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-primary" />
          Optimization Tips
        </h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Add at least 3 portfolio items to showcase your work</li>
          <li>• Include relevant keywords in your bio for better search visibility</li>
          <li>• Upload a professional profile photo to build trust</li>
          <li>• Set competitive rates based on your experience level</li>
          <li>• Add client testimonials to your portfolio items</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="primary"
          fullWidth
          onClick={onPublicView}
        >
          <Icon name="Eye" size={16} className="mr-2" />
          View Public Profile
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm">
            <Icon name="Share2" size={14} className="mr-1" />
            Share Profile
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-1" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">
            {userData?.portfolio?.portfolioItems?.length || 0}
          </div>
          <div className="text-xs text-text-secondary">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">
            {userData?.professionalDetails?.skills?.length || 0}
          </div>
          <div className="text-xs text-text-secondary">Skills</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">4.9</div>
          <div className="text-xs text-text-secondary">Rating</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;