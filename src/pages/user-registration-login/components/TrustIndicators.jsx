import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustIndicators = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "FreelanceHub helped me find amazing designers for our brand refresh. The quality exceeded expectations!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Freelance Developer",
      company: "Independent",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "I've built my entire freelance career on this platform. Great clients and steady work flow.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Content Manager",
      company: "Digital Agency",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "The project management tools make collaboration seamless. Highly recommend for any business.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Freelancers", value: "50,000+", icon: "Users" },
    { label: "Projects Completed", value: "2M+", icon: "CheckCircle" },
    { label: "Client Satisfaction", value: "98%", icon: "Star" },
    { label: "Countries Served", value: "190+", icon: "Globe" }
  ];

  const features = [
    {
      icon: "Shield",
      title: "Secure Payments",
      description: "Your money is protected with our escrow system"
    },
    {
      icon: "Clock",
      title: "24/7 Support",
      description: "Get help whenever you need it from our team"
    },
    {
      icon: "Award",
      title: "Quality Guarantee",
      description: "Work with verified professionals and top talent"
    },
    {
      icon: "Lock",
      title: "Privacy Protected",
      description: "Your data is encrypted and completely secure"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Platform Stats */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
          Trusted by millions worldwide
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name={stat.icon} size={16} className="text-primary" />
                </div>
              </div>
              <div className="text-xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary text-center">
          Why choose FreelanceHub?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-surface rounded-lg border border-border">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary text-sm">{feature.title}</h4>
                <p className="text-text-secondary text-xs mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary text-center">
          What our users say
        </h3>
        <div className="space-y-4">
          {testimonials.slice(0, 2).map((testimonial) => (
            <div key={testimonial.id} className="bg-surface rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-medium text-text-primary text-sm">{testimonial.name}</p>
                    <p className="text-text-muted text-xs">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 py-4">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-text-secondary">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs text-text-secondary">GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-xs text-text-secondary">Verified Platform</span>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;