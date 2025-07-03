import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = [
    {
      id: 'freelancer',
      title: 'I\'m a Freelancer',
      description: 'I want to offer my services and find work',
      icon: 'User',
      features: ['Create service listings', 'Receive orders', 'Build your portfolio', 'Earn money']
    },
    {
      id: 'client',
      title: 'I\'m a Client',
      description: 'I want to hire freelancers for my projects',
      icon: 'Briefcase',
      features: ['Browse services', 'Hire freelancers', 'Manage projects', 'Get work done']
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Join as a freelancer or client</h3>
        <p className="text-text-secondary text-sm">Choose your role to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedRole === role.id
                ? 'border-primary bg-primary-50 shadow-soft'
                : 'border-border bg-surface hover:border-primary-200 hover:bg-primary-50/30'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedRole === role.id ? 'bg-primary text-white' : 'bg-surface-hover text-text-secondary'
              }`}>
                <Icon name={role.icon} size={24} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-text-primary">{role.title}</h4>
                  {selectedRole === role.id && (
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                  )}
                </div>
                <p className="text-text-secondary text-sm mb-3">{role.description}</p>
                
                <ul className="space-y-1">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-xs text-text-secondary">
                      <Icon name="Check" size={14} className="text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <input
              type="radio"
              name="role"
              value={role.id}
              checked={selectedRole === role.id}
              onChange={() => onRoleChange(role.id)}
              className="absolute top-4 right-4 w-4 h-4 text-primary border-border focus:ring-primary"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;