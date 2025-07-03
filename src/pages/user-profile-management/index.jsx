import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';
import PersonalInfoSection from './components/PersonalInfoSection';
import ProfessionalDetailsSection from './components/ProfessionalDetailsSection';
import PortfolioSection from './components/PortfolioSection';
import AccountSettingsSection from './components/AccountSettingsSection';
import ProfilePreview from './components/ProfilePreview';

const UserProfileManagement = () => {
  const [userData, setUserData] = useState({
    profilePhoto: null,
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, USA',
      timezone: 'UTC-05:00 (Eastern Time)',
      website: 'https://johndoe.dev',
      bio: 'Experienced full-stack developer with 5+ years of expertise in React, Node.js, and cloud technologies.',
      languages: ['English', 'Spanish']
    },
    professionalDetails: {
      title: 'Full-Stack Developer',
      experience: 'Expert (5-10 years)',
      hourlyRate: '75',
      skills: [
        { name: 'React', level: 'Expert', verified: true },
        { name: 'Node.js', level: 'Expert', verified: true },
        { name: 'TypeScript', level: 'Advanced', verified: false },
        { name: 'AWS', level: 'Intermediate', verified: false }
      ],
      certifications: [
        {
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          year: '2023',
          url: 'https://aws.amazon.com/certification/'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Computer Science',
          institution: 'MIT',
          year: '2018',
          description: 'Specialized in Software Engineering and AI'
        }
      ],
      workExperience: [
        {
          title: 'Senior Full-Stack Developer',
          company: 'Tech Innovations Inc.',
          duration: '2021-Present',
          description: 'Led development of scalable web applications serving 100k+ users'
        }
      ]
    },
    portfolio: {
      portfolioItems: [
        {
          id: 1,
          title: 'E-commerce Platform',
          description: 'Built a complete e-commerce solution with React and Node.js',
          category: 'Web Development',
          images: [],
          projectUrl: 'https://example-ecommerce.com',
          clientTestimonial: 'Outstanding work! Delivered on time and exceeded expectations.',
          clientName: 'Sarah Wilson',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          completionDate: '2023-12-01',
          featured: true
        }
      ]
    },
    accountSettings: {
      notifications: {
        email: {
          orderUpdates: true,
          messages: true,
          marketing: false,
          weeklyDigest: true
        },
        push: {
          orderUpdates: true,
          messages: true,
          marketing: false
        }
      },
      privacy: {
        profileVisibility: 'public',
        showOnlineStatus: true,
        allowMessages: 'verified'
      },
      security: {
        twoFactorEnabled: false,
        loginAlerts: true
      },
      payment: {
        methods: [
          {
            id: 1,
            type: 'Visa',
            last4: '4242',
            expiry: '12/25'
          }
        ],
        defaultMethod: 1,
        payoutSchedule: 'weekly'
      },
      availability: {
        workingHours: {
          monday: { enabled: true, start: '09:00', end: '17:00' },
          tuesday: { enabled: true, start: '09:00', end: '17:00' },
          wednesday: { enabled: true, start: '09:00', end: '17:00' },
          thursday: { enabled: true, start: '09:00', end: '17:00' },
          friday: { enabled: true, start: '09:00', end: '17:00' },
          saturday: { enabled: false, start: '09:00', end: '17:00' },
          sunday: { enabled: false, start: '09:00', end: '17:00' }
        },
        timezone: 'UTC-05:00 (Eastern Time)',
        vacationMode: false,
        vacationDates: { start: '', end: '' }
      }
    }
  });

  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    professionalDetails: false,
    portfolio: false,
    accountSettings: false
  });

  const [isMobileView, setIsMobileView] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleProfilePhotoUpdate = (file, previewUrl) => {
    setUserData(prev => ({
      ...prev,
      profilePhoto: previewUrl
    }));
    setUnsavedChanges(true);
  };

  const handlePersonalInfoUpdate = (data) => {
    setUserData(prev => ({
      ...prev,
      personalInfo: data
    }));
    setUnsavedChanges(true);
  };

  const handleProfessionalDetailsUpdate = (data) => {
    setUserData(prev => ({
      ...prev,
      professionalDetails: data
    }));
    setUnsavedChanges(true);
  };

  const handlePortfolioUpdate = (data) => {
    setUserData(prev => ({
      ...prev,
      portfolio: data
    }));
    setUnsavedChanges(true);
  };

  const handleAccountSettingsUpdate = (data) => {
    setUserData(prev => ({
      ...prev,
      accountSettings: data
    }));
    setUnsavedChanges(true);
  };

  const handleSaveAll = async () => {
    setSaveStatus('saving');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('saved');
      setUnsavedChanges(false);
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handlePublicProfileView = () => {
    // Simulate opening public profile in new tab
    console.log('Opening public profile view...');
  };

  const expandAllSections = () => {
    setExpandedSections({
      personalInfo: true,
      professionalDetails: true,
      portfolio: true,
      accountSettings: true
    });
  };

  const collapseAllSections = () => {
    setExpandedSections({
      personalInfo: false,
      professionalDetails: false,
      portfolio: false,
      accountSettings: false
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Profile Management - FreelanceHub</title>
        <meta name="description" content="Manage your professional profile, portfolio, and account settings on FreelanceHub." />
        <meta name="keywords" content="profile management, freelancer profile, portfolio, account settings" />
      </Helmet>

      {/* Global Header */}
      <GlobalHeader />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {/* Desktop Navigation */}
        <div className="hidden lg:block bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <PrimaryNavigation />
            </div>
          </div>
        </div>

        {/* Profile Management Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-text-secondary">
              <li>
                <a href="/user-dashboard" className="hover:text-text-primary transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <Icon name="ChevronRight" size={16} className="text-text-muted" />
              </li>
              <li>
                <span className="font-medium text-text-primary">Profile Management</span>
              </li>
            </ol>
          </nav>

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                  Profile Management
                </h1>
                <p className="text-text-secondary">
                  Customize your professional profile to attract more clients and showcase your expertise.
                </p>
              </div>

              {/* Save Status & Actions */}
              <div className="flex items-center space-x-3">
                {saveStatus && (
                  <div className="flex items-center space-x-2">
                    {saveStatus === 'saving' && (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                        <span className="text-sm text-text-secondary">Saving...</span>
                      </>
                    )}
                    {saveStatus === 'saved' && (
                      <>
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm text-success">Saved successfully</span>
                      </>
                    )}
                    {saveStatus === 'error' && (
                      <>
                        <Icon name="AlertCircle" size={16} className="text-error" />
                        <span className="text-sm text-error">Save failed</span>
                      </>
                    )}
                  </div>
                )}

                {unsavedChanges && (
                  <Button
                    variant="primary"
                    onClick={handleSaveAll}
                    disabled={saveStatus === 'saving'}
                  >
                    <Icon name="Save" size={16} className="mr-2" />
                    Save All Changes
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" onClick={expandAllSections}>
                <Icon name="Maximize2" size={14} className="mr-2" />
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAllSections}>
                <Icon name="Minimize2" size={14} className="mr-2" />
                Collapse All
              </Button>
              <Button variant="outline" size="sm" onClick={handlePublicProfileView}>
                <Icon name="Eye" size={14} className="mr-2" />
                Preview Public Profile
              </Button>
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Sections */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Photo Section */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-text-primary flex items-center">
                    <Icon name="Camera" size={20} className="mr-3 text-primary" />
                    Profile Photo
                  </h3>
                  <p className="text-text-secondary text-sm mt-1">
                    Upload a professional photo to make a great first impression
                  </p>
                </div>
                <ProfilePhotoUpload
                  currentPhoto={userData.profilePhoto}
                  onPhotoUpdate={handleProfilePhotoUpdate}
                />
              </div>

              {/* Personal Information */}
              <PersonalInfoSection
                data={userData.personalInfo}
                onUpdate={handlePersonalInfoUpdate}
                isExpanded={expandedSections.personalInfo}
                onToggle={() => toggleSection('personalInfo')}
              />

              {/* Professional Details */}
              <ProfessionalDetailsSection
                data={userData.professionalDetails}
                onUpdate={handleProfessionalDetailsUpdate}
                isExpanded={expandedSections.professionalDetails}
                onToggle={() => toggleSection('professionalDetails')}
              />

              {/* Portfolio */}
              <PortfolioSection
                data={userData.portfolio}
                onUpdate={handlePortfolioUpdate}
                isExpanded={expandedSections.portfolio}
                onToggle={() => toggleSection('portfolio')}
              />

              {/* Account Settings */}
              <AccountSettingsSection
                data={userData.accountSettings}
                onUpdate={handleAccountSettingsUpdate}
                isExpanded={expandedSections.accountSettings}
                onToggle={() => toggleSection('accountSettings')}
              />
            </div>

            {/* Right Column - Profile Preview (Desktop Only) */}
            {!isMobileView && (
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <ProfilePreview
                    userData={userData}
                    onPublicView={handlePublicProfileView}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Profile Preview */}
          {isMobileView && (
            <div className="mt-6">
              <ProfilePreview
                userData={userData}
                onPublicView={handlePublicProfileView}
              />
            </div>
          )}

          {/* Unsaved Changes Warning */}
          {unsavedChanges && (
            <div className="fixed bottom-6 right-6 bg-warning text-white p-4 rounded-lg shadow-elevation-3 flex items-center space-x-3 z-50">
              <Icon name="AlertTriangle" size={20} />
              <div>
                <p className="font-medium">You have unsaved changes</p>
                <p className="text-sm opacity-90">Don't forget to save your progress</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveAll}
                className="bg-white text-warning border-white hover:bg-gray-50"
              >
                Save Now
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <PrimaryNavigation />
      </div>
    </div>
  );
};

export default UserProfileManagement;