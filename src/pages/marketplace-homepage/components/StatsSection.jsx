import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: "Briefcase",
      value: "50,000+",
      label: "Active Services",
      description: "Professional services available",
      color: "text-primary"
    },
    {
      id: 2,
      icon: "Users",
      value: "25,000+",
      label: "Freelancers",
      description: "Talented professionals worldwide",
      color: "text-secondary"
    },
    {
      id: 3,
      icon: "CheckCircle",
      value: "100,000+",
      label: "Projects Completed",
      description: "Successfully delivered projects",
      color: "text-success"
    },
    {
      id: 4,
      icon: "Star",
      value: "4.8/5",
      label: "Average Rating",
      description: "Client satisfaction score",
      color: "text-warning"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Join a thriving marketplace where quality meets opportunity. 
            Our platform connects businesses with top freelance talent globally.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center group"
            >
              <div className="bg-surface rounded-xl p-6 lg:p-8 shadow-soft hover:shadow-soft-hover transition-all duration-300 group-hover:scale-105 border border-border">
                <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center`}>
                  <Icon 
                    name={stat.icon} 
                    size={24} 
                    className={`lg:w-8 lg:h-8 ${stat.color}`} 
                  />
                </div>
                <div className="mb-2">
                  <span className="text-2xl lg:text-3xl font-bold text-text-primary block">
                    {stat.value}
                  </span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1">
                  {stat.label}
                </h3>
                <p className="text-text-secondary text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 lg:mt-16">
          <div className="bg-surface rounded-xl p-6 lg:p-8 shadow-soft border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <Icon name="Shield" size={20} className="text-success" />
                  <span className="font-semibold text-text-primary">Secure Payments</span>
                </div>
                <p className="text-text-secondary text-sm">
                  Your money is protected with our secure escrow system
                </p>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <span className="font-semibold text-text-primary">24/7 Support</span>
                </div>
                <p className="text-text-secondary text-sm">
                  Get help whenever you need it from our support team
                </p>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <Icon name="Award" size={20} className="text-accent" />
                  <span className="font-semibold text-text-primary">Quality Guaranteed</span>
                </div>
                <p className="text-text-secondary text-sm">
                  Work with verified professionals and get quality results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;