import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AddOnsSection = ({ addOns, onAddOnsChange }) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const handleAddOnToggle = (addOnId) => {
    const updatedAddOns = selectedAddOns.includes(addOnId)
      ? selectedAddOns.filter(id => id !== addOnId)
      : [...selectedAddOns, addOnId];
    
    setSelectedAddOns(updatedAddOns);
    onAddOnsChange(updatedAddOns);
  };

  const getTotalAddOnPrice = () => {
    return selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(addon => addon.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
  };

  if (!addOns || addOns.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Add-ons</h3>
        {selectedAddOns.length > 0 && (
          <div className="text-sm text-text-secondary">
            {selectedAddOns.length} selected (+${getTotalAddOnPrice()})
          </div>
        )}
      </div>

      <div className="space-y-3">
        {addOns.map((addOn) => {
          const isSelected = selectedAddOns.includes(addOn.id);
          
          return (
            <div
              key={addOn.id}
              className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary/50'
              }`}
              onClick={() => handleAddOnToggle(addOn.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? 'border-primary bg-primary' :'border-border bg-surface'
                    }`}
                  >
                    {isSelected && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-text-primary">{addOn.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-text-primary">
                        +${addOn.price}
                      </span>
                      {addOn.deliveryTime && (
                        <span className="text-xs text-text-secondary">
                          (+{addOn.deliveryTime})
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-2">
                    {addOn.description}
                  </p>

                  {addOn.features && addOn.features.length > 0 && (
                    <ul className="space-y-1">
                      {addOn.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-xs">
                          <Icon name="Check" size={10} className="text-success flex-shrink-0" />
                          <span className="text-text-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAddOns.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-primary">Selected Add-ons</h4>
              <p className="text-primary text-sm">
                {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''} selected
              </p>
            </div>
            <div className="text-right">
              <div className="font-bold text-primary text-lg">
                +${getTotalAddOnPrice()}
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedAddOns([]);
                  onAddOnsChange([]);
                }}
                className="text-primary text-sm p-0 h-auto hover:bg-transparent"
              >
                Clear all
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOnsSection;