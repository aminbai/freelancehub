import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Jennifer Martinez",
      role: "Marketing Director",
      company: "TechStart Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      content: `FreelanceHub has been a game-changer for our business. We've found incredible talent for our projects, from web development to content creation. The quality of work and professionalism of freelancers here is outstanding.`,
      project: "Website Redesign & Content Strategy",
      serviceCategory: "Web Development"
    },
    {
      id: 2,
      name: "Robert Chen",
      role: "Startup Founder",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      content: `As a startup, we needed high-quality work on a tight budget. FreelanceHub delivered exactly that. The freelancers are skilled, responsive, and deliver on time. It's been instrumental in our growth.`,
      project: "Mobile App Development",
      serviceCategory: "App Development"
    },
    {
      id: 3,
      name: "Sarah Thompson",
      role: "Creative Director",
      company: "Design Studio Pro",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      content: `The platform makes it so easy to find the right freelancer for any project. The review system and portfolio showcases help us make informed decisions. We've built long-term relationships with several freelancers.`,
      project: "Brand Identity & Logo Design",
      serviceCategory: "Graphic Design"
    },
    {
      id: 4,
      name: "Michael Rodriguez",
      role: "E-commerce Manager",
      company: "RetailMax",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      content: `FreelanceHub's secure payment system and project management tools make working with freelancers seamless. We've scaled our operations significantly by leveraging the talent available on this platform.`,
      project: "Digital Marketing Campaign",
      serviceCategory: "Digital Marketing"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-12 lg:py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Hear from businesses and entrepreneurs who have found success 
            working with freelancers on our platform
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-soft border border-border relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
              <Icon name="Quote" size={24} className="text-primary" />
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-6 right-6 flex space-x-2">
              <Button
                variant="ghost"
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full hover:bg-primary-50"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <Button
                variant="ghost"
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full hover:bg-primary-50"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>

            <div className="pt-8">
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(current.rating)].map((_, index) => (
                  <Icon key={index} name="Star" size={20} className="text-warning fill-current" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed mb-8">
                "{current.content}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <Image
                  src={current.avatar}
                  alt={current.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary text-lg">
                    {current.name}
                  </h4>
                  <p className="text-text-secondary">
                    {current.role} at {current.company}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                      {current.serviceCategory}
                    </span>
                    <span className="text-text-muted text-sm">
                      • {current.project}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial
                    ? 'bg-primary scale-125' :'bg-border hover:bg-primary-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Testimonials Grid - Desktop Only */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-soft border border-border hover:shadow-soft-hover transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Icon key={index} name="Star" size={16} className="text-warning fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-text-secondary mb-4 line-clamp-3">
                "{testimonial.content}"
              </p>

              {/* Client */}
              <div className="flex items-center space-x-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-medium text-text-primary text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-text-muted text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;