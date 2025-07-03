import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses and freelancers who trust FreelanceHub 
            to connect, collaborate, and create amazing projects together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/service-browse-search">
              <Button 
                variant="secondary" 
                size="xl" 
                iconName="Search" 
                iconPosition="left"
                className="bg-white text-primary hover:bg-gray-50 shadow-lg"
              >
                Find Services
              </Button>
            </Link>
            <Link to="/user-registration-login">
              <Button 
                variant="outline" 
                size="xl" 
                iconName="UserPlus" 
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Start Selling
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
              <p className="opacity-90">
                Post your project and receive proposals from qualified freelancers within hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Protected</h3>
              <p className="opacity-90">
                Your payments are protected with our secure escrow system and money-back guarantee
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="opacity-90">
                Work with verified professionals and get high-quality results every time
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl lg:text-3xl font-bold mb-1">50K+</div>
                <div className="opacity-90 text-sm">Active Services</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold mb-1">25K+</div>
                <div className="opacity-90 text-sm">Freelancers</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold mb-1">100K+</div>
                <div className="opacity-90 text-sm">Projects Done</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold mb-1">4.8★</div>
                <div className="opacity-90 text-sm">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;