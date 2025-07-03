import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import ImageGallery from './components/ImageGallery';
import ServiceHeader from './components/ServiceHeader';
import PricingPackages from './components/PricingPackages';
import AddOnsSection from './components/AddOnsSection';
import ReviewsSection from './components/ReviewsSection';
import SellerSidebar from './components/SellerSidebar';
import RequirementsModal from './components/RequirementsModal';
import RelatedServices from './components/RelatedServices';
import StickyBottomBar from './components/StickyBottomBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Mock service data
  const serviceData = {
    id: 1,
    title: "I will design a modern and professional website for your business",
    category: "Web Design",
    tags: ["Website Design", "UI/UX", "Responsive", "Modern"],
    description: `Transform your business with a stunning, modern website that converts visitors into customers. I specialize in creating professional, responsive websites that not only look amazing but also drive results.\n\nWhat you'll get:\n• Custom website design tailored to your brand\n• Mobile-responsive layout that works on all devices\n• SEO-optimized structure for better search rankings\n• Fast loading times and smooth user experience\n• Professional typography and color schemes\n• Integration with your existing tools and platforms\n\nI have over 5 years of experience in web design and have helped 500+ businesses establish their online presence. My designs are not just beautiful - they're strategic, user-focused, and built to help your business grow.\n\nReady to take your business to the next level? Let's create something amazing together!`,
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
    ],
    views: 2847,
    orders: 156,
    lastUpdated: "2 days ago",
    faq: [
      {
        question: "What do you need to get started?",
        answer: "I'll need your business information, preferred colors, any existing branding materials, and examples of websites you like. Don't worry - I'll guide you through everything during our initial consultation."
      },
      {
        question: "Do you provide revisions?",answer: "Yes! Each package includes a specific number of revisions. I want to make sure you're 100% happy with the final result."
      },
      {
        question: "Will my website be mobile-friendly?",answer: "Absolutely! All websites I create are fully responsive and optimized for mobile devices, tablets, and desktops."
      },
      {
        question: "Do you provide ongoing support?",answer: "Yes, I offer 30 days of free support after delivery. For ongoing maintenance, I have separate packages available."
      }
    ]
  };

  const sellerData = {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Web Designer & Developer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 247,
    level: "Level 2 Seller",
    responseTime: "1 hour",
    recentDelivery: "About 12 hours",
    ordersCompleted: 156,
    memberSince: "March 2021",
    stats: {
      completionRate: 98,
      onTimeDelivery: 95,
      repeatClients: 67
    },
    skills: ["Web Design", "UI/UX", "HTML/CSS", "JavaScript", "WordPress", "Figma"],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Conversational" }
    ],
    portfolio: [
      { title: "E-commerce Website", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop" },
      { title: "Corporate Website", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop" },
      { title: "Portfolio Website", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=300&fit=crop" },
      { title: "Landing Page", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=300&fit=crop" }
    ]
  };

  const packagesData = {
    basic: {
      name: "Basic",
      price: 150,
      description: "Perfect for small businesses and startups",
      deliveryTime: "5 days",
      revisions: "2",
      features: [
        "5-page responsive website",
        "Basic SEO optimization",
        "Mobile-friendly design",
        "Contact form integration",
        "Social media links"
      ]
    },
    standard: {
      name: "Standard",
      price: 350,
      description: "Ideal for growing businesses",
      deliveryTime: "7 days",
      revisions: "3",
      features: [
        "10-page responsive website",
        "Advanced SEO optimization",
        "Custom design elements",
        "Blog setup",
        "Google Analytics integration",
        "Speed optimization",
        "Basic e-commerce (up to 20 products)"
      ]
    },
    premium: {
      name: "Premium",
      price: 650,
      description: "Complete solution for established businesses",
      deliveryTime: "10 days",
      revisions: "Unlimited",
      features: [
        "Unlimited pages",
        "Premium SEO package",
        "Custom animations",
        "Advanced e-commerce features",
        "CRM integration",
        "Multi-language support",
        "Priority support",
        "3 months free maintenance"
      ]
    }
  };

  const addOnsData = [
    {
      id: 1,
      title: "Logo Design",
      description: "Professional logo design to match your website",
      price: 75,
      deliveryTime: "2 days",
      features: ["3 logo concepts", "Unlimited revisions", "Vector files included"]
    },
    {
      id: 2,
      title: "Content Writing",
      description: "Professional copywriting for all pages",
      price: 120,
      deliveryTime: "3 days",
      features: ["SEO-optimized content", "Up to 2000 words", "Keyword research"]
    },
    {
      id: 3,
      title: "Advanced SEO",
      description: "Comprehensive SEO optimization package",
      price: 95,
      deliveryTime: "1 day",
      features: ["Technical SEO audit", "Meta tags optimization", "Schema markup"]
    }
  ];

  const reviewsData = [
    {
      id: 1,
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Sarah exceeded my expectations! The website looks absolutely stunning and professional. She was very responsive throughout the process and delivered exactly what I wanted. The site is fast, mobile-friendly, and has already helped increase my business inquiries. Highly recommended!",
      date: "2024-01-15",
      orderDate: "2024-01-05",
      verified: true,
      helpfulCount: 12,
      images: []
    },
    {
      id: 2,
      user: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Amazing work! Sarah created a beautiful website for my consulting business. The design is modern, clean, and perfectly represents my brand. She was patient with all my revision requests and delivered on time. The website has been getting great feedback from my clients.",
      date: "2024-01-10",
      orderDate: "2023-12-28",
      verified: true,
      helpfulCount: 8,
      images: []
    },
    {
      id: 3,
      user: {
        name: "David Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      rating: 4,
      comment: "Great experience working with Sarah. She delivered a high-quality website that looks professional and functions well. Communication was excellent throughout the project. The only minor issue was a small delay in delivery, but the quality made up for it.",
      date: "2024-01-05",
      orderDate: "2023-12-20",
      verified: true,
      helpfulCount: 5,
      images: []
    }
  ];

  const relatedServicesData = [
    {
      id: 2,
      title: "I will create a stunning logo design for your brand",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
      seller: {
        name: "Alex Martinez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      rating: 4.8,
      reviewCount: 189,
      startingPrice: 45
    },
    {
      id: 3,
      title: "I will develop a custom WordPress website",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      seller: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      rating: 4.9,
      reviewCount: 156,
      startingPrice: 200
    },
    {
      id: 4,
      title: "I will design mobile app UI/UX",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      seller: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
      },
      rating: 4.7,
      reviewCount: 98,
      startingPrice: 180
    }
  ];

  // Handle scroll for sticky bottom bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePackageSelect = (packageData) => {
    setSelectedPackage(packageData);
  };

  const handleAddOnsChange = (addOnIds) => {
    setSelectedAddOns(addOnIds);
  };

  const getTotalPrice = () => {
    const packagePrice = selectedPackage?.price || 0;
    const addOnsPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOnsData.find(addon => addon.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
    return packagePrice + addOnsPrice;
  };

  const handleContactSeller = () => {
    // Mock contact functionality
    alert('Contact feature would open messaging interface');
  };

  const handleOrderNow = () => {
    if (!selectedPackage) {
      alert('Please select a package first');
      return;
    }
    setShowRequirementsModal(true);
  };

  const handleRequirementsSubmit = (requirements) => {
    // Navigate to checkout with order data
    navigate('/order-placement-checkout', {
      state: {
        service: serviceData,
        package: selectedPackage,
        addOns: selectedAddOns.map(id => addOnsData.find(addon => addon.id === id)),
        requirements,
        totalPrice: getTotalPrice()
      }
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Header */}
              <ServiceHeader service={serviceData} seller={sellerData} />

              {/* Image Gallery */}
              <ImageGallery images={serviceData.images} serviceName={serviceData.title} />

              {/* Tabbed Content */}
              <div className="space-y-6">
                {/* Tab Navigation */}
                <div className="border-b border-border">
                  <nav className="flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">About This Service</h3>
                        <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                          {serviceData.description}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'pricing' && (
                    <div className="space-y-8">
                      <PricingPackages 
                        packages={packagesData} 
                        onSelectPackage={handlePackageSelect}
                      />
                      <AddOnsSection 
                        addOns={addOnsData} 
                        onAddOnsChange={handleAddOnsChange}
                      />
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <ReviewsSection 
                      reviews={reviewsData}
                      averageRating={4.9}
                      totalReviews={247}
                    />
                  )}

                  {activeTab === 'faq' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Frequently Asked Questions</h3>
                      {serviceData.faq.map((item, index) => (
                        <div key={index} className="border border-border rounded-lg p-4 bg-surface">
                          <h4 className="font-medium text-text-primary mb-2">{item.question}</h4>
                          <p className="text-text-secondary leading-relaxed">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Related Services */}
              <RelatedServices 
                services={relatedServicesData} 
                currentServiceId={serviceData.id}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <SellerSidebar seller={sellerData} />
                
                {/* Desktop Order Actions */}
                <div className="hidden lg:block space-y-4">
                  {selectedPackage && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-primary">{selectedPackage.name} Package</span>
                        <span className="font-bold text-primary text-lg">${getTotalPrice()}</span>
                      </div>
                      <p className="text-primary text-sm">
                        Delivery: {selectedPackage.deliveryTime} • Revisions: {selectedPackage.revisions}
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      onClick={handleOrderNow}
                      className="w-full py-3"
                      disabled={!selectedPackage}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      {selectedPackage ? `Order Now - $${getTotalPrice()}` : 'Select Package First'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleContactSeller}
                      className="w-full py-3"
                    >
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      Contact Seller
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <StickyBottomBar
        selectedPackage={selectedPackage}
        totalPrice={getTotalPrice()}
        onContactSeller={handleContactSeller}
        onOrderNow={handleOrderNow}
        isVisible={isSticky}
      />

      {/* Requirements Modal */}
      <RequirementsModal
        isOpen={showRequirementsModal}
        onClose={() => setShowRequirementsModal(false)}
        onSubmit={handleRequirementsSubmit}
        selectedPackage={selectedPackage}
      />

      {/* Mobile Navigation Spacer */}
      <div className="lg:hidden h-16" />
      
      <PrimaryNavigation />
    </div>
  );
};

export default ServiceDetailPage;