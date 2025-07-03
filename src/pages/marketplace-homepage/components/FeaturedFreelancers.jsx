import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedFreelancers = () => {
  const featuredFreelancers = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      specialization: "UI/UX Designer",
      rating: 4.9,
      reviewCount: 127,
      startingPrice: 25,
      completedProjects: 89,
      responseTime: "1 hour",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      isOnline: true,
      badge: "Top Rated"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      specialization: "Full Stack Developer",
      rating: 4.8,
      reviewCount: 203,
      startingPrice: 35,
      completedProjects: 156,
      responseTime: "2 hours",
      skills: ["React", "Node.js", "MongoDB"],
      isOnline: false,
      badge: "Pro"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      specialization: "Content Writer",
      rating: 4.9,
      reviewCount: 94,
      startingPrice: 15,
      completedProjects: 67,
      responseTime: "30 minutes",
      skills: ["SEO Writing", "Copywriting", "Blog Posts"],
      isOnline: true,
      badge: "Rising Talent"
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      specialization: "Digital Marketer",
      rating: 4.7,
      reviewCount: 156,
      startingPrice: 30,
      completedProjects: 112,
      responseTime: "1 hour",
      skills: ["Google Ads", "Facebook Ads", "Analytics"],
      isOnline: true,
      badge: "Top Rated"
    }
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Top Rated':
        return 'bg-primary text-white';
      case 'Pro':
        return 'bg-secondary text-white';
      case 'Rising Talent':
        return 'bg-accent text-white';
      default:
        return 'bg-text-muted text-white';
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Featured Freelancers
            </h2>
            <p className="text-text-secondary">
              Work with top-rated professionals trusted by thousands of clients
            </p>
          </div>
          <Link to="/service-browse-search">
            <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {featuredFreelancers.map((freelancer) => (
              <Link
                key={freelancer.id}
                to="/service-browse-search"
                className="flex-shrink-0 w-72 group"
              >
                <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 group-hover:scale-105 border border-border">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          src={freelancer.avatar}
                          alt={freelancer.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {freelancer.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                          {freelancer.name}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          {freelancer.specialization}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(freelancer.badge)}`}>
                      {freelancer.badge}
                    </span>
                  </div>

                  {/* Rating & Stats */}
                  <div className="flex items-center space-x-4 mb-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="font-medium text-text-primary">{freelancer.rating}</span>
                      <span className="text-text-secondary">({freelancer.reviewCount})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-text-secondary">
                      <Icon name="CheckCircle" size={14} />
                      <span>{freelancer.completedProjects} projects</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {freelancer.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-1 text-text-secondary text-sm">
                      <Icon name="Clock" size={14} />
                      <span>Responds in {freelancer.responseTime}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-text-secondary text-sm">Starting at</p>
                      <p className="font-bold text-text-primary">${freelancer.startingPrice}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredFreelancers.map((freelancer) => (
            <Link
              key={freelancer.id}
              to="/service-browse-search"
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 group-hover:scale-105 border border-border">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={freelancer.avatar}
                        alt={freelancer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {freelancer.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {freelancer.name}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {freelancer.specialization}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(freelancer.badge)}`}>
                    {freelancer.badge}
                  </span>
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center space-x-4 mb-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="font-medium text-text-primary">{freelancer.rating}</span>
                    <span className="text-text-secondary">({freelancer.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="CheckCircle" size={14} />
                    <span>{freelancer.completedProjects} projects</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-1 text-text-secondary text-sm">
                    <Icon name="Clock" size={14} />
                    <span>Responds in {freelancer.responseTime}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-text-secondary text-sm">Starting at</p>
                    <p className="font-bold text-text-primary">${freelancer.startingPrice}</p>
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

export default FeaturedFreelancers;