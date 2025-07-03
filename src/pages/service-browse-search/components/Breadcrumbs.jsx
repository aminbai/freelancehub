import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumbs = ({ items = [] }) => {
  const defaultBreadcrumbs = [
    { label: 'Home', path: '/marketplace-homepage' },
    { label: 'Browse', path: '/service-browse-search' }
  ];

  const allBreadcrumbs = [...defaultBreadcrumbs, ...items];

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
      {allBreadcrumbs.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-muted" />
          )}
          {index === allBreadcrumbs.length - 1 ? (
            <span className="text-text-primary font-medium">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;