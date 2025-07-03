import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';  
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, isMobile = false }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    delivery: true,
    seller: true,
    rating: true
  });

  const categories = [
    { id: 'web-dev', name: 'Web Development', count: 2847 },
    { id: 'graphic-design', name: 'Graphic Design', count: 1923 },
    { id: 'content-writing', name: 'Content Writing', count: 1456 },
    { id: 'digital-marketing', name: 'Digital Marketing', count: 1234 },
    { id: 'video-editing', name: 'Video Editing', count: 987 },
    { id: 'mobile-apps', name: 'Mobile Apps', count: 756 }
  ];

  const subcategories = {
    'web-dev': ['Frontend', 'Backend', 'Full Stack', 'WordPress', 'E-commerce'],
    'graphic-design': ['Logo Design', 'Branding', 'Print Design', 'UI/UX', 'Illustrations'],
    'content-writing': ['Blog Posts', 'Copywriting', 'SEO Content', 'Technical Writing', 'Social Media'],
    'digital-marketing': ['SEO', 'Social Media Marketing', 'PPC', 'Email Marketing', 'Content Marketing'],
    'video-editing': ['Promotional Videos', 'Educational Content', 'Social Media Videos', 'Documentary', 'Animation'],
    'mobile-apps': ['iOS', 'Android', 'React Native', 'Flutter', 'Hybrid Apps']
  };

  const sellerLevels = [
    { id: 'new-seller', name: 'New Seller', count: 1234 },
    { id: 'level-1', name: 'Level 1', count: 987 },
    { id: 'level-2', name: 'Level 2', count: 654 },
    { id: 'pro', name: 'Pro', count: 321 },
    { id: 'top-rated', name: 'Top Rated', count: 156 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (type, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleMultiSelect = (type, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [type]: prev[type]?.includes(value) 
        ? prev[type].filter(item => item !== value)
        : [...(prev[type] || []), value]
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile) {
      onClose();
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: [],
      subcategory: [],
      priceRange: [0, 10000],
      deliveryTime: [],
      sellerLevel: [],
      rating: 0
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.category?.length > 0) count++;
    if (localFilters.subcategory?.length > 0) count++;
    if (localFilters.deliveryTime?.length > 0) count++;
    if (localFilters.sellerLevel?.length > 0) count++;
    if (localFilters.rating > 0) count++;
    if (localFilters.priceRange?.[0] > 0 || localFilters.priceRange?.[1] < 10000) count++;
    return count;
  };

  const FilterSection = ({ title, children, sectionKey }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-4 px-0 text-left hover:text-primary transition-colors"
      >
        <span className="font-medium text-text-primary">{title}</span>
        <Icon 
          name={expandedSections[sectionKey] ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-text-secondary" 
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="pb-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  const content = (
    <div className="space-y-0">
      {/* Category Filter */}
      <FilterSection title="Category" sectionKey="category">
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
              <Input
                type="checkbox"
                checked={localFilters.category?.includes(category.id) || false}
                onChange={() => handleMultiSelect('category', category.id)}
                className="flex-shrink-0"
              />
              <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                {category.name}
              </span>
              <span className="text-xs text-text-muted">
                ({category.count})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Subcategory Filter */}
      {localFilters.category && localFilters.category.length > 0 && (
        <FilterSection title="Subcategory" sectionKey="subcategory">
          <div className="space-y-2">
            {localFilters.category.flatMap(cat => 
              subcategories[cat] || []
            ).map((subcategory, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                <Input
                  type="checkbox"
                  checked={localFilters.subcategory?.includes(subcategory) || false}
                  onChange={() => handleMultiSelect('subcategory', subcategory)}
                  className="flex-shrink-0"
                />
                <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  {subcategory}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Price Range Filter */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-xs text-text-secondary mb-1">Min Price</label>
              <Input
                type="number"
                placeholder="0"
                value={localFilters.priceRange?.[0] || ''}
                onChange={(e) => handleFilterChange('priceRange', [
                  parseInt(e.target.value) || 0, 
                  localFilters.priceRange?.[1] || 10000
                ])}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-text-secondary mb-1">Max Price</label>
              <Input
                type="number"
                placeholder="10000"
                value={localFilters.priceRange?.[1] || ''}
                onChange={(e) => handleFilterChange('priceRange', [
                  localFilters.priceRange?.[0] || 0,
                  parseInt(e.target.value) || 10000
                ])}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>$0</span>
            <span>$10,000+</span>
          </div>
        </div>
      </FilterSection>

      {/* Delivery Time Filter */}
      <FilterSection title="Delivery Time" sectionKey="delivery">
        <div className="space-y-2">
          {['24 hours', '3 days', '7 days', '14 days', '30+ days'].map((time) => (
            <label key={time} className="flex items-center space-x-3 cursor-pointer group">
              <Input
                type="checkbox"
                checked={localFilters.deliveryTime?.includes(time) || false}
                onChange={() => handleMultiSelect('deliveryTime', time)}
                className="flex-shrink-0"
              />
              <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                {time}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Seller Level Filter */}
      <FilterSection title="Seller Level" sectionKey="seller">
        <div className="space-y-2">
          {sellerLevels.map((level) => (
            <label key={level.id} className="flex items-center space-x-3 cursor-pointer group">
              <Input
                type="checkbox"
                checked={localFilters.sellerLevel?.includes(level.id) || false}
                onChange={() => handleMultiSelect('sellerLevel', level.id)}
                className="flex-shrink-0"
              />
              <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                {level.name}
              </span>
              <span className="text-xs text-text-muted">
                ({level.count})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection title="Minimum Rating" sectionKey="rating">
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
              <Input
                type="radio"
                name="rating"
                checked={localFilters.rating === rating}
                onChange={() => handleFilterChange('rating', rating)}
                className="flex-shrink-0"
              />
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={14}
                      className={`${
                        star <= rating 
                          ? 'text-warning fill-current' :'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">& up</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-1200 lg:hidden" onClick={onClose} />
        )}
        
        {/* Mobile Filter Panel */}
        <div className={`fixed inset-x-0 bottom-0 bg-surface rounded-t-2xl border-t border-border z-1300 lg:hidden transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary">
              Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </h2>
            <Button variant="ghost" onClick={onClose} className="p-2">
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          <div className="max-h-[70vh] overflow-y-auto p-4">
            {content}
          </div>
          
          <div className="p-4 border-t border-border bg-surface">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                onClick={handleApplyFilters}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Filter Panel
  return (
    <div className="w-full bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">
          Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </h2>
        {getActiveFilterCount() > 0 && (
          <Button variant="ghost" onClick={handleClearFilters} className="text-sm">
            Clear All
          </Button>
        )}
      </div>
      
      {content}
      
      <div className="mt-6 pt-6 border-t border-border">
        <Button
          variant="primary"
          onClick={handleApplyFilters}
          className="w-full"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;