import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrderSummary from './components/OrderSummary';
import RequirementsForm from './components/RequirementsForm';
import PaymentSection from './components/PaymentSection';
import CheckoutProgress from './components/CheckoutProgress';
import OrderConfirmation from './components/OrderConfirmation';

const OrderPlacementCheckout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  // Mock order data
  const [orderData, setOrderData] = useState({
    orderId: 'ORD-2024-001',
    service: {
      id: 1,
      title: "Professional Logo Design with Brand Guidelines",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
      category: "Design"
    },
    seller: {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      level: "Top Rated"
    },
    selectedPackage: {
      id: 'premium',
      name: 'Premium',
      price: 299,
      deliveryTime: 5,
      features: [
        '5 Logo concepts',
        'Unlimited revisions',
        'Brand guidelines',
        'Source files included',
        'Commercial license',
        '24/7 support'
      ]
    },
    availableAddOns: [
      {
        id: 1,
        name: 'Rush Delivery',
        description: 'Get your order delivered in 2 days',
        price: 50,
        deliveryTime: -3
      },
      {
        id: 2,
        name: 'Additional Concepts',
        description: '3 extra logo concepts to choose from',
        price: 75,
        deliveryTime: 1
      },
      {
        id: 3,
        name: 'Social Media Kit',
        description: 'Logo variations for social media platforms',
        price: 100,
        deliveryTime: 2
      }
    ],
    selectedAddOns: [],
    serviceFee: 15.99,
    estimatedDelivery: 'December 28, 2024',
    totalAmount: 329.99
  });

  const [requirements, setRequirements] = useState({
    title: '',
    description: '',
    targetAudience: '',
    budgetMin: '',
    budgetMax: '',
    stylePreferences: '',
    attachments: [],
    specialInstructions: '',
    communicationPreference: 'immediate'
  });

  const [paymentData, setPaymentData] = useState({
    selectedMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false,
    walletBalance: 150.00,
    billingAddress: {
      country: '',
      zipCode: ''
    }
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const steps = [
    { id: 'requirements', name: 'Requirements' },
    { id: 'payment', name: 'Payment' },
    { id: 'review', name: 'Review' }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      setAutoSaveStatus('Saving...');
      setTimeout(() => {
        localStorage.setItem('checkout-requirements', JSON.stringify(requirements));
        localStorage.setItem('checkout-payment', JSON.stringify(paymentData));
        setAutoSaveStatus('Saved');
        setTimeout(() => setAutoSaveStatus(''), 2000);
      }, 500);
    };

    const timeoutId = setTimeout(autoSave, 2000);
    return () => clearTimeout(timeoutId);
  }, [requirements, paymentData]);

  // Load saved data on mount
  useEffect(() => {
    const savedRequirements = localStorage.getItem('checkout-requirements');
    const savedPayment = localStorage.getItem('checkout-payment');
    
    if (savedRequirements) {
      setRequirements(JSON.parse(savedRequirements));
    }
    if (savedPayment) {
      setPaymentData(JSON.parse(savedPayment));
    }
  }, []);

  const handleAddOnToggle = (addOn) => {
    const isSelected = orderData.selectedAddOns.some(selected => selected.id === addOn.id);
    let newSelectedAddOns;
    
    if (isSelected) {
      newSelectedAddOns = orderData.selectedAddOns.filter(selected => selected.id !== addOn.id);
    } else {
      newSelectedAddOns = [...orderData.selectedAddOns, addOn];
    }

    // Recalculate delivery date and total
    const baseDeliveryDays = orderData.selectedPackage.deliveryTime;
    const addOnDays = newSelectedAddOns.reduce((total, addOn) => total + (addOn.deliveryTime || 0), 0);
    const totalDeliveryDays = Math.max(1, baseDeliveryDays + addOnDays);
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + totalDeliveryDays);
    
    const addOnTotal = newSelectedAddOns.reduce((total, addOn) => total + addOn.price, 0);
    const subtotal = orderData.selectedPackage.price + addOnTotal;
    const tax = subtotal * 0.08;
    const totalAmount = subtotal + tax + orderData.serviceFee;

    setOrderData({
      ...orderData,
      selectedAddOns: newSelectedAddOns,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      totalAmount: totalAmount
    });
  };

  const validateStep = (step) => {
    switch (step) {
      case 0: // Requirements
        return requirements.title.trim() && requirements.description.trim();
      case 1: // Payment
        if (paymentData.selectedMethod === 'card') {
          return paymentData.cardNumber && paymentData.expiryDate && 
                 paymentData.cvv && paymentData.cardholderName &&
                 paymentData.billingAddress.country && paymentData.billingAddress.zipCode;
        }
        return paymentData.selectedMethod && paymentData.billingAddress.country && 
               paymentData.billingAddress.zipCode;
      case 2: // Review
        return termsAccepted;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(currentStep) || !termsAccepted) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved data
      localStorage.removeItem('checkout-requirements');
      localStorage.removeItem('checkout-payment');
      
      setShowConfirmation(true);
    } catch (error) {
      console.error('Order placement failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate('/order-management');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Header */}
      <CheckoutProgress currentStep={currentStep} steps={steps} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/service-detail-page" className="text-primary hover:text-primary-600">
            Service
          </Link>
          <Icon name="ChevronRight" size={14} className="text-text-muted" />
          <span className="text-text-secondary">Checkout</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-lg border border-border p-6">
              {/* Auto-save Status */}
              {autoSaveStatus && (
                <div className="mb-4 flex items-center space-x-2 text-sm">
                  <Icon 
                    name={autoSaveStatus === 'Saving...' ? 'Loader2' : 'Check'} 
                    size={14} 
                    className={`${autoSaveStatus === 'Saving...' ? 'animate-spin text-text-secondary' : 'text-success'}`} 
                  />
                  <span className={autoSaveStatus === 'Saving...' ? 'text-text-secondary' : 'text-success'}>
                    {autoSaveStatus}
                  </span>
                </div>
              )}

              {/* Step Content */}
              {currentStep === 0 && (
                <RequirementsForm 
                  requirements={requirements}
                  onRequirementsChange={setRequirements}
                />
              )}

              {currentStep === 1 && (
                <PaymentSection 
                  paymentData={paymentData}
                  onPaymentChange={setPaymentData}
                  totalAmount={orderData.totalAmount}
                />
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Review Your Order</h3>
                    <p className="text-text-secondary text-sm mb-6">
                      Please review all details before placing your order.
                    </p>
                  </div>

                  {/* Requirements Summary */}
                  <div className="bg-surface-hover rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-3">Project Requirements</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-text-secondary">Title: </span>
                        <span className="text-text-primary">{requirements.title}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Description: </span>
                        <span className="text-text-primary line-clamp-3">{requirements.description}</span>
                      </div>
                      {requirements.attachments.length > 0 && (
                        <div>
                          <span className="text-text-secondary">Attachments: </span>
                          <span className="text-text-primary">{requirements.attachments.length} files</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-surface-hover rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-3">Payment Method</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="CreditCard" size={16} className="text-text-secondary" />
                      <span className="text-text-primary">
                        {paymentData.selectedMethod === 'card' ? 
                          `Card ending in ${paymentData.cardNumber.slice(-4)}` :
                          paymentData.selectedMethod === 'paypal' ? 'PayPal' : 'Wallet Balance'
                        }
                      </span>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 mt-0.5"
                      />
                      <label htmlFor="terms" className="text-sm text-text-secondary cursor-pointer">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        . I understand that my payment will be held in escrow until I approve the delivered work.
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2"
                >
                  <Icon name="ArrowLeft" size={16} />
                  <span>Previous</span>
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={!validateStep(currentStep)}
                    className="flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handlePlaceOrder}
                    disabled={!validateStep(currentStep) || !termsAccepted || isLoading}
                    loading={isLoading}
                    className="flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="CreditCard" size={16} />
                        <span>Place Order - ${orderData.totalAmount.toFixed(2)}</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <OrderSummary 
              orderData={orderData}
              onAddOnToggle={handleAddOnToggle}
            />
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showConfirmation && (
        <OrderConfirmation 
          orderData={orderData}
          onClose={handleConfirmationClose}
        />
      )}
    </div>
  );
};

export default OrderPlacementCheckout;