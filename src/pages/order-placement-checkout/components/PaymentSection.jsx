import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const PaymentSection = ({ paymentData, onPaymentChange, totalAmount }) => {
  const [showCardForm, setShowCardForm] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express',
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account',
      popular: false
    },
    {
      id: 'wallet',
      name: 'Wallet Balance',
      icon: 'PiggyBank',
      description: `Available: $${paymentData.walletBalance.toFixed(2)}`,
      popular: false,
      disabled: paymentData.walletBalance < totalAmount
    }
  ];

  const handlePaymentMethodChange = (methodId) => {
    onPaymentChange({
      ...paymentData,
      selectedMethod: methodId
    });
    setShowCardForm(methodId === 'card');
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'American Express';
    return 'Card';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Method</h3>
        <p className="text-text-secondary text-sm mb-6">
          Choose your preferred payment method. Your payment is secured and protected.
        </p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              paymentData.selectedMethod === method.id
                ? 'border-primary bg-primary-50'
                : method.disabled
                ? 'border-border bg-surface-hover opacity-50 cursor-not-allowed' :'border-border hover:border-primary hover:bg-surface-hover'
            }`}
            onClick={() => !method.disabled && handlePaymentMethodChange(method.id)}
          >
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentData.selectedMethod === method.id}
                onChange={() => !method.disabled && handlePaymentMethodChange(method.id)}
                disabled={method.disabled}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  paymentData.selectedMethod === method.id ? 'bg-primary text-white' : 'bg-surface-hover text-text-secondary'
                }`}>
                  <Icon name={method.icon} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">{method.name}</span>
                    {method.popular && (
                      <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm">{method.description}</p>
                </div>
              </div>
              {method.disabled && (
                <span className="text-error text-sm font-medium">Insufficient Balance</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Credit Card Form */}
      {showCardForm && paymentData.selectedMethod === 'card' && (
        <div className="bg-surface-hover rounded-lg p-6 space-y-4">
          <h4 className="font-medium text-text-primary mb-4">Card Information</h4>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Card Number *
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  onPaymentChange({
                    ...paymentData,
                    cardNumber: formatted
                  });
                }}
                maxLength={19}
                className="w-full pr-12"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-xs text-text-muted font-medium">
                  {getCardType(paymentData.cardNumber)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Expiry Date *
              </label>
              <Input
                type="text"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={(e) => {
                  const formatted = formatExpiryDate(e.target.value);
                  onPaymentChange({
                    ...paymentData,
                    expiryDate: formatted
                  });
                }}
                maxLength={5}
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                CVV *
              </label>
              <Input
                type="text"
                placeholder="123"
                value={paymentData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  onPaymentChange({
                    ...paymentData,
                    cvv: value
                  });
                }}
                maxLength={4}
                className="w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Cardholder Name *
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={paymentData.cardholderName}
              onChange={(e) => onPaymentChange({
                ...paymentData,
                cardholderName: e.target.value
              })}
              className="w-full"
              required
            />
          </div>

          {/* Save Card Option */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="saveCard"
              checked={paymentData.saveCard}
              onChange={(e) => onPaymentChange({
                ...paymentData,
                saveCard: e.target.checked
              })}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="saveCard" className="text-sm text-text-secondary cursor-pointer">
              Save this card for future purchases
            </label>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Billing Address</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Country *
            </label>
            <select
              value={paymentData.billingAddress.country}
              onChange={(e) => onPaymentChange({
                ...paymentData,
                billingAddress: {
                  ...paymentData.billingAddress,
                  country: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IN">India</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ZIP/Postal Code *
            </label>
            <Input
              type="text"
              placeholder="12345"
              value={paymentData.billingAddress.zipCode}
              onChange={(e) => onPaymentChange({
                ...paymentData,
                billingAddress: {
                  ...paymentData.billingAddress,
                  zipCode: e.target.value
                }
              })}
              className="w-full"
              required
            />
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="bg-success-50 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} className="text-success flex-shrink-0" />
          <div>
            <p className="text-success font-medium text-sm">Secure Payment</p>
            <p className="text-text-secondary text-xs mt-1">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-3">
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={14} className="text-success" />
            <span className="text-xs text-text-secondary">SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span className="text-xs text-text-secondary">PCI Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;