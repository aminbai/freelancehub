import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyBottomBar = ({ 
  selectedPackage, 
  totalPrice, 
  onContactSeller, 
  onOrderNow,
  isVisible = true 
}) => {
  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-1200 safe-area-pb">
      <div className="px-4 py-3">
        {/* Package Info */}
        {selectedPackage && (
          <div className="flex items-center justify-between mb-3 text-sm">
            <div>
              <span className="text-text-secondary">Selected: </span>
              <span className="font-medium text-text-primary">{selectedPackage.name}</span>
            </div>
            <div className="font-bold text-text-primary">
              ${totalPrice}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onContactSeller}
            className="flex-1 py-3"
          >
            <Icon name="MessageCircle" size={18} className="mr-2" />
            Contact
          </Button>
          <Button
            variant="primary"
            onClick={onOrderNow}
            className="flex-1 py-3"
          >
            <Icon name="ShoppingCart" size={18} className="mr-2" />
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;