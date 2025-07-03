import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep, steps }) => {
  return (
    <div className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex items-center space-x-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-success border-success text-white' 
                      : isActive 
                      ? 'bg-primary border-primary text-white' :'bg-surface border-border text-text-secondary'
                  }`}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${
                    isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'
                  }`}>
                    {step.name}
                  </span>
                  
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-8 h-0.5 mx-2 ${
                      isCompleted ? 'bg-success' : 'bg-border'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Step Indicator */}
          <div className="sm:hidden">
            <span className="text-sm text-text-secondary">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          {/* Security Badge */}
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-success font-medium hidden sm:block">
              Secure Checkout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;