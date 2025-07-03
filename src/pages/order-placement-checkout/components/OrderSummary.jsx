import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({ orderData, onAddOnToggle }) => {
  const calculateSubtotal = () => {
    let subtotal = orderData.selectedPackage.price;
    orderData.selectedAddOns.forEach(addOn => {
      subtotal += addOn.price;
    });
    return subtotal;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + orderData.serviceFee;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Order Summary</h2>
      
      {/* Service Info */}
      <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-border">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src={orderData.service.image} 
            alt={orderData.service.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary line-clamp-2 mb-2">
            {orderData.service.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Image 
                src={orderData.seller.avatar} 
                alt={orderData.seller.name}
                className="w-5 h-5 rounded-full"
              />
              <span>{orderData.seller.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span>{orderData.seller.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Package */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-text-primary">
            {orderData.selectedPackage.name} Package
          </span>
          <span className="font-semibold text-text-primary">
            ${orderData.selectedPackage.price}
          </span>
        </div>
        <div className="space-y-2">
          {orderData.selectedPackage.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Check" size={14} className="text-success flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 mt-3 text-sm">
          <Icon name="Clock" size={14} className="text-text-secondary" />
          <span className="text-text-secondary">
            Delivery in {orderData.selectedPackage.deliveryTime} days
          </span>
        </div>
      </div>

      {/* Add-ons */}
      {orderData.availableAddOns.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-text-primary mb-3">Add-ons</h4>
          <div className="space-y-3">
            {orderData.availableAddOns.map((addOn) => {
              const isSelected = orderData.selectedAddOns.some(selected => selected.id === addOn.id);
              return (
                <div key={addOn.id} className="flex items-center justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onAddOnToggle(addOn)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{addOn.name}</p>
                      <p className="text-xs text-text-secondary mt-1">{addOn.description}</p>
                      {addOn.deliveryTime && (
                        <p className="text-xs text-text-muted mt-1">
                          +{addOn.deliveryTime} days delivery
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-medium text-text-primary ml-3">
                    +${addOn.price}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Delivery Timeline */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Calendar" size={16} className="text-primary" />
          <span className="font-medium text-primary">Estimated Delivery</span>
        </div>
        <p className="text-text-primary font-semibold">
          {orderData.estimatedDelivery}
        </p>
        <p className="text-text-secondary text-sm mt-1">
          Based on selected package and add-ons
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-text-secondary">
          <span>Service Fee</span>
          <span>${orderData.serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-text-secondary">
          <span>Tax</span>
          <span>${calculateTax().toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold text-text-primary pt-3 border-t border-border">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Order Protection */}
      <div className="mt-6 p-4 bg-success-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-success font-medium text-sm">Order Protection</p>
            <p className="text-text-secondary text-xs mt-1">
              Your payment is protected until you approve the work
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;