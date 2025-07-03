import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingPackages = ({ packages, onSelectPackage }) => {
  const [selectedPackage, setSelectedPackage] = useState('basic');

  const handleSelectPackage = (packageType) => {
    setSelectedPackage(packageType);
    onSelectPackage(packages[packageType]);
  };

  const getPackageIcon = (type) => {
    switch (type) {
      case 'basic':
        return 'Package';
      case 'standard':
        return 'Star';
      case 'premium':
        return 'Crown';
      default:
        return 'Package';
    }
  };

  const getPackageColor = (type) => {
    switch (type) {
      case 'basic':
        return 'border-border bg-surface';
      case 'standard':
        return 'border-primary bg-primary-50';
      case 'premium':
        return 'border-accent bg-accent-50';
      default:
        return 'border-border bg-surface';
    }
  };

  return (
    <div className="space-y-6">
      {/* Package Selection Tabs - Mobile */}
      <div className="lg:hidden">
        <div className="flex space-x-1 bg-background rounded-lg p-1">
          {Object.entries(packages).map(([type, pkg]) => (
            <button
              key={type}
              onClick={() => handleSelectPackage(type)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedPackage === type
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {pkg.name}
            </button>
          ))}
        </div>

        {/* Selected Package Details - Mobile */}
        <div className="mt-4 border border-border rounded-lg p-4 bg-surface">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name={getPackageIcon(selectedPackage)} size={20} className="text-primary" />
              <h3 className="font-semibold text-text-primary">
                {packages[selectedPackage].name}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-text-primary">
                ${packages[selectedPackage].price}
              </div>
            </div>
          </div>

          <p className="text-text-secondary text-sm mb-4">
            {packages[selectedPackage].description}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Delivery Time</span>
              <span className="font-medium text-text-primary">
                {packages[selectedPackage].deliveryTime}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Revisions</span>
              <span className="font-medium text-text-primary">
                {packages[selectedPackage].revisions}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <h4 className="font-medium text-text-primary text-sm">What's included:</h4>
            <ul className="space-y-1">
              {packages[selectedPackage].features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="primary"
            onClick={() => onSelectPackage(packages[selectedPackage])}
            className="w-full"
          >
            Continue (${packages[selectedPackage].price})
          </Button>
        </div>
      </div>

      {/* Package Comparison Table - Desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(packages).map(([type, pkg]) => (
            <div
              key={type}
              className={`border-2 rounded-lg p-6 transition-all duration-200 ${getPackageColor(type)} ${
                selectedPackage === type ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name={getPackageIcon(type)} size={24} className="text-primary" />
                  <h3 className="text-lg font-semibold text-text-primary">{pkg.name}</h3>
                </div>
                <div className="text-3xl font-bold text-text-primary mb-2">
                  ${pkg.price}
                </div>
                <p className="text-text-secondary text-sm">{pkg.description}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Delivery</span>
                  <span className="font-medium text-text-primary">{pkg.deliveryTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Revisions</span>
                  <span className="font-medium text-text-primary">{pkg.revisions}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-text-primary text-sm">Features:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Icon name="Check" size={14} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={type === 'standard' ? 'primary' : 'outline'}
                onClick={() => handleSelectPackage(type)}
                className="w-full"
              >
                Select {pkg.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPackages;