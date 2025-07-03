import React from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import HeroSection from './components/HeroSection';
import FeaturedFreelancers from './components/FeaturedFreelancers';
import PopularServices from './components/PopularServices';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

const MarketplaceHomepage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {/* Desktop Navigation Integration */}
        <div className="hidden lg:block bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <PrimaryNavigation />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Featured Freelancers */}
        <FeaturedFreelancers />

        {/* Popular Services */}
        <PopularServices />

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Call to Action */}
        <CTASection />
      </main>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <PrimaryNavigation />
      </div>

      {/* Footer */}
      <footer className="bg-text-primary text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FH</span>
                </div>
                <span className="text-xl font-bold">FreelanceHub</span>
              </div>
              <p className="text-gray-300 mb-4">
                The world's largest marketplace for freelance services. 
                Connect, collaborate, and create amazing projects.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Graphic Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Content Writing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video Editing</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust & Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Hub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} FreelanceHub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Accessibility
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketplaceHomepage;