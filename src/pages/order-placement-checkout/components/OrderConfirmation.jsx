import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OrderConfirmation = ({ orderData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1400 p-4">
      <div className="bg-surface rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary">Order Placed!</h2>
                <p className="text-text-secondary text-sm">Order #{orderData.orderId}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="p-2">
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Success Message */}
          <div className="text-center">
            <p className="text-text-primary mb-2">
              Your order has been successfully placed and payment processed.
            </p>
            <p className="text-text-secondary text-sm">
              The seller has been notified and will start working on your project soon.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-surface-hover rounded-lg p-4">
            <div className="flex items-start space-x-4">
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
                <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
                  <Image 
                    src={orderData.seller.avatar} 
                    alt={orderData.seller.name}
                    className="w-5 h-5 rounded-full"
                  />
                  <span>{orderData.seller.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {orderData.selectedPackage.name} Package
                  </span>
                  <span className="font-semibold text-text-primary">
                    ${orderData.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">What happens next?</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Seller Review</p>
                  <p className="text-xs text-text-secondary">
                    The seller will review your requirements and may ask clarifying questions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-border rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-text-secondary text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Work Begins</p>
                  <p className="text-xs text-text-secondary">
                    The seller starts working on your project according to the timeline
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-border rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-text-secondary text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Delivery</p>
                  <p className="text-xs text-text-secondary">
                    You'll receive the completed work by {orderData.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-primary font-medium text-sm">Important</p>
                <p className="text-text-secondary text-xs mt-1">
                  Your payment is held securely until you approve the delivered work. 
                  You can track progress and communicate with the seller in your order dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link to="/order-management">
              <Button variant="primary" className="w-full">
                <Icon name="Package" size={16} className="mr-2" />
                View Order Details
              </Button>
            </Link>
            <Link to="/marketplace-homepage">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-text-secondary text-sm mb-2">
              Need help with your order?
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="ghost" className="text-primary text-sm">
                <Icon name="MessageCircle" size={14} className="mr-1" />
                Contact Seller
              </Button>
              <Button variant="ghost" className="text-primary text-sm">
                <Icon name="HelpCircle" size={14} className="mr-1" />
                Get Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;