import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const QuickActions = ({ userRole }) => {
  const freelancerActions = [
    {
      title: 'Post New Service',
      description: 'Create a new service offering',
      icon: 'Plus',
      color: 'primary',
      href: '/service-create'
    },
    {
      title: 'Browse Projects',
      description: 'Find new opportunities',
      icon: 'Search',
      color: 'secondary',
      href: '/service-browse-search'
    },
    {
      title: 'Contact Support',
      description: 'Get help when you need it',
      icon: 'HelpCircle',
      color: 'accent',
      href: '/support'
    }
  ];

  const clientActions = [
    {
      title: 'Post a Project',
      description: 'Find the perfect freelancer',
      icon: 'Plus',
      color: 'primary',
      href: '/project-create'
    },
    {
      title: 'Browse Freelancers',
      description: 'Discover talented professionals',
      icon: 'Users',
      color: 'secondary',
      href: '/freelancer-browse'
    },
    {
      title: 'Contact Support',
      description: 'Get help when you need it',
      icon: 'HelpCircle',
      color: 'accent',
      href: '/support'
    }
  ];

  const actions = userRole === 'freelancer' ? freelancerActions : clientActions;

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Quick Actions
      </h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-surface-hover transition-colors duration-200 group"
          >
            <div className={`p-2 rounded-lg ${
              action.color === 'primary' ? 'bg-primary-50 text-primary-600' :
              action.color === 'secondary'? 'bg-secondary-50 text-secondary-600' : 'bg-accent-50 text-accent-600'
            }`}>
              <Icon name={action.icon} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-text-primary font-medium group-hover:text-primary-600 transition-colors">
                {action.title}
              </h4>
              <p className="text-text-secondary text-sm">
                {action.description}
              </p>
            </div>
            
            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-text-secondary group-hover:text-primary-600 transition-colors" 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;