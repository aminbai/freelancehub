import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const trendingCategories = [
    {
      id: 1,
      name: "Web Development",
      icon: "Code",
      serviceCount: 2847,
      color: "bg-primary text-white"
    },
    {
      id: 2,
      name: "Graphic Design",
      icon: "Palette",
      serviceCount: 1923,
      color: "bg-secondary text-white"
    },
    {
      id: 3,
      name: "Content Writing",
      icon: "PenTool",
      serviceCount: 1456,
      color: "bg-accent text-white"
    },
    {
      id: 4,
      name: "Digital Marketing",
      icon: "TrendingUp",
      serviceCount: 1234,
      color: "bg-success text-white"
    },
    {
      id: 5,
      name: "Video Editing",
      icon: "Video",
      serviceCount: 987,
      color: "bg-warning text-white"
    },
    {
      id: 6,
      name: "Mobile Apps",
      icon: "Smartphone",
      serviceCount: 756,
      color: "bg-error text-white"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Find the Perfect
            <span className="text-primary block lg:inline lg:ml-3">Freelance Services</span>
          </h1>
          <p className="text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
            Connect with talented freelancers worldwide. From web development to creative design, 
            find the expertise you need to bring your projects to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/service-browse-search">
              <Button variant="primary" size="lg" iconName="Search" iconPosition="left">
                Browse Services
              </Button>
            </Link>
            <Link to="/user-registration-login">
              <Button variant="outline" size="lg" iconName="UserPlus" iconPosition="left">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>

        {/* Trending Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary">
              Trending Categories
            </h2>
            <Link to="/service-browse-search">
              <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
                View All
              </Button>
            </Link>
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {trendingCategories.map((category) => (
                <Link
                  key={category.id}
                  to="/service-browse-search"
                  className="flex-shrink-0 w-48 group"
                >
                  <div className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 group-hover:scale-105 border border-border">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                      <Icon name={category.icon} size={24} />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {category.serviceCount.toLocaleString()} services
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {trendingCategories.map((category) => (
              <Link
                key={category.id}
                to="/service-browse-search"
                className="group"
              >
                <div className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 group-hover:scale-105 border border-border">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                    <Icon name={category.icon} size={24} />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {category.serviceCount.toLocaleString()} services
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;