import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettingsSection = ({ data, onUpdate, isExpanded, onToggle }) => {
  const [formData, setFormData] = useState({
    notifications: {
      email: data?.notifications?.email || {
        orderUpdates: true,
        messages: true,
        marketing: false,
        weeklyDigest: true
      },
      push: data?.notifications?.push || {
        orderUpdates: true,
        messages: true,
        marketing: false
      }
    },
    privacy: {
      profileVisibility: data?.privacy?.profileVisibility || 'public',
      showOnlineStatus: data?.privacy?.showOnlineStatus || true,
      allowMessages: data?.privacy?.allowMessages || 'verified'
    },
    security: {
      twoFactorEnabled: data?.security?.twoFactorEnabled || false,
      loginAlerts: data?.security?.loginAlerts || true
    },
    payment: {
      methods: data?.payment?.methods || [],
      defaultMethod: data?.payment?.defaultMethod || null,
      payoutSchedule: data?.payment?.payoutSchedule || 'weekly'
    },
    availability: {
      workingHours: data?.availability?.workingHours || {
        monday: { enabled: true, start: '09:00', end: '17:00' },
        tuesday: { enabled: true, start: '09:00', end: '17:00' },
        wednesday: { enabled: true, start: '09:00', end: '17:00' },
        thursday: { enabled: true, start: '09:00', end: '17:00' },
        friday: { enabled: true, start: '09:00', end: '17:00' },
        saturday: { enabled: false, start: '09:00', end: '17:00' },
        sunday: { enabled: false, start: '09:00', end: '17:00' }
      },
      timezone: data?.availability?.timezone || '',
      vacationMode: data?.availability?.vacationMode || false,
      vacationDates: data?.availability?.vacationDates || { start: '', end: '' }
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('notifications');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'security', label: 'Security', icon: 'Lock' },
    { id: 'payment', label: 'Payment', icon: 'CreditCard' },
    { id: 'availability', label: 'Availability', icon: 'Calendar' }
  ];

  const handleNotificationChange = (type, category, value) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: {
          ...prev.notifications[type],
          [category]: value
        }
      }
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  const handleSecurityChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value
      }
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        workingHours: {
          ...prev.availability.workingHours,
          [day]: {
            ...prev.availability.workingHours[day],
            [field]: value
          }
        }
      }
    }));
  };

  const handleAvailabilityChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [field]: value
      }
    }));
  };

  const handlePasswordChange = () => {
    // Implement password change logic
    console.log('Password change:', passwords);
    setPasswords({ current: '', new: '', confirm: '' });
    setShowPasswordChange(false);
  };

  const addPaymentMethod = () => {
    // This would typically open a payment method modal
    console.log('Add payment method');
  };

  const removePaymentMethod = (methodId) => {
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        methods: prev.payment.methods.filter(method => method.id !== methodId),
        defaultMethod: prev.payment.defaultMethod === methodId ? null : prev.payment.defaultMethod
      }
    }));
  };

  const setDefaultPaymentMethod = (methodId) => {
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        defaultMethod: methodId
      }
    }));
  };

  const handleSave = () => {
    onUpdate?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      notifications: {
        email: data?.notifications?.email || {
          orderUpdates: true,
          messages: true,
          marketing: false,
          weeklyDigest: true
        },
        push: data?.notifications?.push || {
          orderUpdates: true,
          messages: true,
          marketing: false
        }
      },
      privacy: {
        profileVisibility: data?.privacy?.profileVisibility || 'public',
        showOnlineStatus: data?.privacy?.showOnlineStatus || true,
        allowMessages: data?.privacy?.allowMessages || 'verified'
      },
      security: {
        twoFactorEnabled: data?.security?.twoFactorEnabled || false,
        loginAlerts: data?.security?.loginAlerts || true
      },
      payment: {
        methods: data?.payment?.methods || [],
        defaultMethod: data?.payment?.defaultMethod || null,
        payoutSchedule: data?.payment?.payoutSchedule || 'weekly'
      },
      availability: {
        workingHours: data?.availability?.workingHours || {
          monday: { enabled: true, start: '09:00', end: '17:00' },
          tuesday: { enabled: true, start: '09:00', end: '17:00' },
          wednesday: { enabled: true, start: '09:00', end: '17:00' },
          thursday: { enabled: true, start: '09:00', end: '17:00' },
          friday: { enabled: true, start: '09:00', end: '17:00' },
          saturday: { enabled: false, start: '09:00', end: '17:00' },
          sunday: { enabled: false, start: '09:00', end: '17:00' }
        },
        timezone: data?.availability?.timezone || '',
        vacationMode: data?.availability?.vacationMode || false,
        vacationDates: data?.availability?.vacationDates || { start: '', end: '' }
      }
    });
    setIsEditing(false);
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Section Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-hover transition-colors duration-200"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Account Settings</h3>
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
                {/* Settings Tabs */}
                <div className="border-b border-border">
                  <nav className="flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-2 px-1 border-b-2 whitespace-nowrap text-sm font-medium transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-text-primary mb-4">Email Notifications</h4>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between">
                            <span className="text-text-primary">Order updates and status changes</span>
                            <Input
                              type="checkbox"
                              checked={formData.notifications.email.orderUpdates}
                              onChange={(e) => handleNotificationChange('email', 'orderUpdates', e.target.checked)}
                            />
                          </label>
                          <label className="flex items-center justify-between">
                            <span className="text-text-primary">New messages from clients</span>
                            <Input
                              type="checkbox"
                              checked={formData.notifications.email.messages}
                              onChange={(e) => handleNotificationChange('email', 'messages', e.target.checked)}
                            />
                          </label>
                          <label className="flex items-center justify-between">
                            <span className="text-text-primary">Marketing and promotional emails</span>
                            <Input
                              type="checkbox"
                              checked={formData.notifications.email.marketing}
                              onChange={(e) => handleNotificationChange('email', 'marketing', e.target.checked)}
                            />
                          </label>
                          <label className="flex items-center justify-between">
                            <span className="text-text-primary">Weekly digest</span>
                            <Input
                              type="checkbox"
                              checked={formData.notifications.email.weeklyDigest}
                              onChange={(e) => handleNotificationChange('email', 'weeklyDigest', e.target.checked)}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-text-primary mb-4">Push Notifications</h4>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between">
                            <span className="text-text-primary">Order updates</span>
                            <Input
                              type="checkbox"
                              checked={formData.notifications.push.orderUpdates}
                              onChange={(e) => handleNotificationChange('push', 'orderUpdates', e.target.checked)}
                            />
                          </label>
                          <label className="flex items-center justify-between">
                            <span className="text-text-primary">New messages</span>
                            <Input
                              type="checkbox"
                              checked={formData.notifications.push.messages}
                              onChange={(e) => handleNotificationChange('push', 'messages', e.target.checked)}
                            />
                          </label>
                          <label className="flex items-center justify-between">
                            <span className="text-text-primary">Marketing notifications</span>
                            <Input
                              type="checkbox"
                              checked={formData.notifications.push.marketing}
                              onChange={(e) => handleNotificationChange('push', 'marketing', e.target.checked)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Tab */}
                  {activeTab === 'privacy' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Profile Visibility
                        </label>
                        <select
                          value={formData.privacy.profileVisibility}
                          onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="public">Public - Visible to everyone</option>
                          <option value="verified">Verified users only</option>
                          <option value="private">Private - Hidden from search</option>
                        </select>
                      </div>

                      <div>
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-text-primary font-medium">Show online status</span>
                            <p className="text-sm text-text-secondary">Let others see when you're online</p>
                          </div>
                          <Input
                            type="checkbox"
                            checked={formData.privacy.showOnlineStatus}
                            onChange={(e) => handlePrivacyChange('showOnlineStatus', e.target.checked)}
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Who can message you
                        </label>
                        <select
                          value={formData.privacy.allowMessages}
                          onChange={(e) => handlePrivacyChange('allowMessages', e.target.value)}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="everyone">Everyone</option>
                          <option value="verified">Verified users only</option>
                          <option value="clients">Clients only</option>
                          <option value="none">No one</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-text-primary mb-4">Password & Authentication</h4>
                        <div className="space-y-4">
                          <Button
                            variant="outline"
                            onClick={() => setShowPasswordChange(!showPasswordChange)}
                          >
                            Change Password
                          </Button>

                          {showPasswordChange && (
                            <div className="p-4 border border-border rounded-lg space-y-4">
                              <Input
                                type="password"
                                placeholder="Current password"
                                value={passwords.current}
                                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                              />
                              <Input
                                type="password"
                                placeholder="New password"
                                value={passwords.new}
                                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                              />
                              <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={passwords.confirm}
                                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                              />
                              <div className="flex space-x-2">
                                <Button variant="primary" size="sm" onClick={handlePasswordChange}>
                                  Update Password
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setShowPasswordChange(false)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}

                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-text-primary font-medium">Two-Factor Authentication</span>
                              <p className="text-sm text-text-secondary">Add an extra layer of security</p>
                            </div>
                            <Input
                              type="checkbox"
                              checked={formData.security.twoFactorEnabled}
                              onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                            />
                          </label>

                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-text-primary font-medium">Login alerts</span>
                              <p className="text-sm text-text-secondary">Get notified of new device logins</p>
                            </div>
                            <Input
                              type="checkbox"
                              checked={formData.security.loginAlerts}
                              onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Tab */}
                  {activeTab === 'payment' && (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-text-primary">Payment Methods</h4>
                          <Button variant="outline" size="sm" onClick={addPaymentMethod}>
                            <Icon name="Plus" size={16} className="mr-2" />
                            Add Method
                          </Button>
                        </div>
                        
                        {formData.payment.methods.length === 0 ? (
                          <div className="text-center py-8 border border-border rounded-lg">
                            <Icon name="CreditCard" size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-text-secondary">No payment methods added yet</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {formData.payment.methods.map((method) => (
                              <div key={method.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <Icon name="CreditCard" size={20} className="text-primary" />
                                  <div>
                                    <p className="font-medium text-text-primary">{method.type} ****{method.last4}</p>
                                    <p className="text-sm text-text-secondary">Expires {method.expiry}</p>
                                  </div>
                                  {formData.payment.defaultMethod === method.id && (
                                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {formData.payment.defaultMethod !== method.id && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setDefaultPaymentMethod(method.id)}
                                    >
                                      Set Default
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removePaymentMethod(method.id)}
                                    className="text-error hover:text-error-600"
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Payout Schedule
                        </label>
                        <select
                          value={formData.payment.payoutSchedule}
                          onChange={(e) => setFormData(prev => ({ ...prev, payment: { ...prev.payment, payoutSchedule: e.target.value } }))}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Availability Tab */}
                  {activeTab === 'availability' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-text-primary mb-4">Working Hours</h4>
                        <div className="space-y-3">
                          {days.map((day) => (
                            <div key={day} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                              <div className="w-20">
                                <label className="flex items-center space-x-2">
                                  <Input
                                    type="checkbox"
                                    checked={formData.availability.workingHours[day].enabled}
                                    onChange={(e) => handleWorkingHoursChange(day, 'enabled', e.target.checked)}
                                  />
                                  <span className="text-sm text-text-primary capitalize">{day}</span>
                                </label>
                              </div>
                              {formData.availability.workingHours[day].enabled && (
                                <div className="flex items-center space-x-2">
                                  <Input
                                    type="time"
                                    value={formData.availability.workingHours[day].start}
                                    onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                                    className="w-32"
                                  />
                                  <span className="text-text-secondary">to</span>
                                  <Input
                                    type="time"
                                    value={formData.availability.workingHours[day].end}
                                    onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                                    className="w-32"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-text-primary mb-4">Vacation Mode</h4>
                        <div className="space-y-4">
                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-text-primary font-medium">Enable vacation mode</span>
                              <p className="text-sm text-text-secondary">Hide your profile and pause new orders</p>
                            </div>
                            <Input
                              type="checkbox"
                              checked={formData.availability.vacationMode}
                              onChange={(e) => handleAvailabilityChange('vacationMode', e.target.checked)}
                            />
                          </label>

                          {formData.availability.vacationMode && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg">
                              <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                  Vacation Start Date
                                </label>
                                <Input
                                  type="date"
                                  value={formData.availability.vacationDates.start}
                                  onChange={(e) => handleAvailabilityChange('vacationDates', { 
                                    ...formData.availability.vacationDates, 
                                    start: e.target.value 
                                  })}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                  Vacation End Date
                                </label>
                                <Input
                                  type="date"
                                  value={formData.availability.vacationDates.end}
                                  onChange={(e) => handleAvailabilityChange('vacationDates', { 
                                    ...formData.availability.vacationDates, 
                                    end: e.target.value 
                                  })}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save Settings
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Settings Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Notifications</h4>
                    <p className="text-text-secondary text-sm">
                      Email: {Object.values(formData.notifications.email).filter(Boolean).length} enabled
                    </p>
                    <p className="text-text-secondary text-sm">
                      Push: {Object.values(formData.notifications.push).filter(Boolean).length} enabled
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Privacy</h4>
                    <p className="text-text-secondary text-sm">
                      Profile: {formData.privacy.profileVisibility}
                    </p>
                    <p className="text-text-secondary text-sm">
                      Messages: {formData.privacy.allowMessages}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Security</h4>
                    <p className="text-text-secondary text-sm">
                      2FA: {formData.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                    <p className="text-text-secondary text-sm">
                      Login alerts: {formData.security.loginAlerts ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Availability</h4>
                    <p className="text-text-secondary text-sm">
                      Working days: {Object.values(formData.availability.workingHours).filter(day => day.enabled).length}
                    </p>
                    <p className="text-text-secondary text-sm">
                      Vacation mode: {formData.availability.vacationMode ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettingsSection;