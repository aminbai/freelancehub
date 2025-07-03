import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PopularServices = () => {
  const popularServices = [
    {
      id: 1,
      title: "I will design a modern and responsive website",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop",
      seller: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        level: "Level 2"
      },
      rating: 4.9,
      reviewCount: 127,
      price: 45,
      originalPrice: 65,
      category: "Web Development",
      deliveryTime: "3 days",
      features: ["Responsive Design", "SEO Optimized", "Mobile Friendly"],
      isPopular: true,
      discount: 30
    },
    {
      id: 2,
      title: "I will create a professional logo design",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop",
      seller: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        level: "Top Rated"
      },
      rating: 4.8,
      reviewCount: 203,
      price: 25,
      originalPrice: null,
      category: "Graphic Design",
      deliveryTime: "2 days",
      features: ["Vector Files", "Unlimited Revisions", "Brand Guidelines"],
      isPopular: false,
      discount: null
    },
    {
      id: 3,
      title: "I will write SEO optimized blog content",
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=400&h=250&fit=crop",
      seller: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        level: "Level 1"
      },
      rating: 4.9,
      reviewCount: 94,
      price: 15,
      originalPrice: 20,
      category: "Content Writing",
      deliveryTime: "1 day",
      features: ["SEO Optimized", "Plagiarism Free", "Fast Delivery"],
      isPopular: true,
      discount: 25
    },
    {
      id: 4,
      title: "I will setup Google Ads campaign for your business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      seller: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        level: "Top Rated"
      },
      rating: 4.7,
      reviewCount: 156,
      price: 75,
      originalPrice: null,
      category: "Digital Marketing",
      deliveryTime: "5 days",
      features: ["Campaign Setup", "Keyword Research", "Performance Report"],
      isPopular: false,
      discount: null
    },
    {
      id: 5,
      title: "I will edit your videos professionally",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=250&fit=crop",
      seller: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        level: "Level 2"
      },
      rating: 4.8,
      reviewCount: 89,
      price: 35,
      originalPrice: 50,
      category: "Video Editing",
      deliveryTime: "3 days",
      features: ["Color Correction", "Sound Enhancement", "Motion Graphics"],
      isPopular: true,
      discount: 30
    },
    {
      id: 6,
      title: "I will develop a mobile app for iOS and Android",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      seller: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        level: "Top Rated"
      },
      rating: 4.9,
      reviewCount: 167,
      price: 150,
      originalPrice: null,
      category: "Mobile Development",
      deliveryTime: "14 days",
      features: ["Cross Platform", "App Store Ready", "Source Code"],
      isPopular: false,
      discount: null
    },
    {
      id: 7,
      title: "I will create social media content strategy",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      seller: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        level: "Level 1"
      },
      rating: 4.6,
      reviewCount: 73,
      price: 40,
      originalPrice: 55,
      category: "Social Media",
      deliveryTime: "4 days",
      features: ["Content Calendar", "Hashtag Research", "Analytics Setup"],
      isPopular: true,
      discount: 27
    },
    {
      id: 8,
      title: "I will translate documents professionally",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      seller: {
        name: "Jean Pierre",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        level: "Level 2"
      },
      rating: 4.8,
      reviewCount: 112,
      price: 20,
      originalPrice: null,
      category: "Translation",
      deliveryTime: "2 days",
      features: ["Native Speaker", "Certified Translation", "Fast Delivery"],
      isPopular: false,
      discount: null
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Top Rated':
        return 'bg-primary text-white';
      case 'Level 2':
        return 'bg-secondary text-white';
      case 'Level 1':
        return 'bg-accent text-white';
      default:
        return 'bg-text-muted text-white';
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Popular Services
            </h2>
            <p className="text-text-secondary">
              Discover the most in-demand services from top freelancers
            </p>
          </div>
          <Link to="/service-browse-search">
            <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularServices.map((service) => (
            <Link
              key={service.id}
              to="/service-detail-page"
              className="group"
            >
              <div className="bg-surface rounded-xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300 group-hover:scale-105 border border-border">
                {/* Service Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {service.isPopular && (
                    <div className="absolute top-3 left-3 bg-error text-white px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                  {service.discount && (
                    <div className="absolute top-3 right-3 bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
                      -{service.discount}%
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {service.category}
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-4">
                  {/* Seller Info */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Image
                      src={service.seller.avatar}
                      alt={service.seller.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-text-secondary text-sm">{service.seller.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(service.seller.level)}`}>
                      {service.seller.level}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-semibold text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-50 text-primary text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="font-medium text-text-primary text-sm">{service.rating}</span>
                      <span className="text-text-secondary text-sm">({service.reviewCount})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-text-secondary text-sm">
                      <Icon name="Clock" size={14} />
                      <span>{service.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {service.originalPrice && (
                        <span className="text-text-muted text-sm line-through">
                          ${service.originalPrice}
                        </span>
                      )}
                      <span className="font-bold text-text-primary">
                        ${service.price}
                      </span>
                    </div>
                    <Button variant="primary" size="sm">
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;