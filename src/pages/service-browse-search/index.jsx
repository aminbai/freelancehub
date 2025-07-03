import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ActiveFilters from './components/ActiveFilters';
import SortingOptions from './components/SortingOptions';
import ServiceGrid from './components/ServiceGrid';
import Breadcrumbs from './components/Breadcrumbs';

const ServiceBrowseSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    subcategory: [],
    priceRange: [0, 10000],
    deliveryTime: [],
    sellerLevel: [],
    rating: 0
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);

  // Mock service data
  const mockServices = [
    {
      id: 1,
      title: 'I will create a professional React web application',
      thumbnail: '/assets/images/no_image.png',
      seller: {
        name: 'John Doe',
        avatar: '/assets/images/no_image.png',
        isVerified: true
      },
      rating: 4.9,
      reviewCount: 247,
      startingPrice: 150,
      deliveryTime: '3 days',
      level: 'Pro',
      tags: ['React', 'JavaScript', 'Web Development'],
      isFavorited: false
    },
    {
      id: 2,
      title: 'I will design a modern logo for your brand',
      thumbnail: '/assets/images/no_image.png',
      seller: {
        name: 'Sarah Smith',
        avatar: '/assets/images/no_image.png',
        isVerified: true
      },
      rating: 4.8,
      reviewCount: 189,
      startingPrice: 75,
      deliveryTime: '2 days',
      level: 'Top Rated',
      tags: ['Logo Design', 'Branding', 'Graphic Design'],
      isFavorited: true
    },
    {
      id: 3,
      title: 'I will write SEO optimized blog content',
      thumbnail: '/assets/images/no_image.png',
      seller: {
        name: 'Mike Johnson',
        avatar: '/assets/images/no_image.png',
        isVerified: false
      },
      rating: 4.7,
      reviewCount: 156,
      startingPrice: 25,
      deliveryTime: '1 day',
      level: 'Level 2',
      tags: ['SEO', 'Content Writing', 'Blog Posts'],
      isFavorited: false
    },
    {
      id: 4,
      title: 'I will create a custom WordPress website',
      thumbnail: '/assets/images/no_image.png',
      seller: {
        name: 'Emily Davis',
        avatar: '/assets/images/no_image.png',
        isVerified: true
      },
      rating: 4.9,
      reviewCount: 324,
      startingPrice: 200,
      deliveryTime: '5 days',
      level: 'Pro',
      tags: ['WordPress', 'Website Development', 'Custom Design'],
      isFavorited: false
    },
    {
      id: 5,
      title: 'I will edit your videos professionally',
      thumbnail: '/assets/images/no_image.png',
      seller: {
        name: 'Alex Wilson',
        avatar: '/assets/images/no_image.png',
        isVerified: true
      },
      rating: 4.6,
      reviewCount: 98,
      startingPrice: 50,
      deliveryTime: '3 days',
      level: 'Level 1',
      tags: ['Video Editing', 'Post Production', 'Motion Graphics'],
      isFavorited: false
    },
    {
      id: 6,
      title: 'I will develop a mobile app using React Native',
      thumbnail: '/assets/images/no_image.png',
      seller: {
        name: 'David Brown',
        avatar: '/assets/images/no_image.png',
        isVerified: true
      },
      rating: 4.8,
      reviewCount: 203,
      startingPrice: 300,
      deliveryTime: '7 days',
      level: 'Top Rated',
      tags: ['React Native', 'Mobile Development', 'iOS', 'Android'],
      isFavorited: false
    },
    {
      id: 7,
      title: 'I will design stunning social media graphics',
      thumbnail: '/assets/images/no_image.png',
      seller: {
        name: 'Lisa Anderson',
        avatar: '/assets/images/no_image.png',
        isVerified: true
      },
      rating: 4.7,
      reviewCount: 267,
      startingPrice: 35,
      deliveryTime: '1 day',
      level: 'Level 2',
      tags: ['Social Media', 'Graphics', 'Instagram', 'Facebook'],
      isFavorited: true
    },
    {
      id: 8,
      title: 'I will optimize your website for better SEO',
      thumbnail: '/assets/images/no_image.png',
      seller: {
        name: 'Robert Miller',
        avatar: '/assets/images/no_image.png',
        isVerified: false
      },
      rating: 4.5,
      reviewCount: 134,
      startingPrice: 80,
      deliveryTime: '4 days',
      level: 'Level 1',
      tags: ['SEO', 'Website Optimization', 'Google Analytics'],
      isFavorited: false
    }
  ];

  // Simulate API call
  const fetchServices = async (reset = false) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Mock filtering and sorting logic
      let filteredServices = [...mockServices];
      
      // Apply search filter
      if (searchQuery) {
        filteredServices = filteredServices.filter(service =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      // Apply category filter
      if (filters.category.length > 0) {
        // Mock category filtering
        filteredServices = filteredServices.filter(service => 
          filters.category.some(cat => 
            service.tags.some(tag => tag.toLowerCase().includes(cat.replace('-', ' ')))
          )
        );
      }
      
      // Apply price range filter
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) {
        filteredServices = filteredServices.filter(service =>
          service.startingPrice >= filters.priceRange[0] &&
          service.startingPrice <= filters.priceRange[1]
        );
      }
      
      // Apply rating filter
      if (filters.rating > 0) {
        filteredServices = filteredServices.filter(service =>
          service.rating >= filters.rating
        );
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filteredServices.sort((a, b) => a.startingPrice - b.startingPrice);
          break;
        case 'price-high':
          filteredServices.sort((a, b) => b.startingPrice - a.startingPrice);
          break;
        case 'rating':
          filteredServices.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredServices.sort((a, b) => b.id - a.id);
          break;
        case 'reviews':
          filteredServices.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          // Keep original order for relevance
          break;
      }
      
      setResultsCount(filteredServices.length);
      
      if (reset) {
        setServices(filteredServices);
        setPage(1);
      } else {
        setServices(prev => [...prev, ...filteredServices]);
      }
      
      setHasMore(filteredServices.length >= 8);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and when filters change
  useEffect(() => {
    fetchServices(true);
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    setFilters(prev => {
      const updated = { ...prev };
      
      if (filterType === 'priceRange') {
        updated.priceRange = [0, 10000];
      } else if (filterType === 'rating') {
        updated.rating = 0;
      } else if (Array.isArray(updated[filterType])) {
        updated[filterType] = updated[filterType].filter(item => item !== value);
      }
      
      return updated;
    });
  };

  const handleClearAllFilters = () => {
    setFilters({
      category: [],
      subcategory: [],
      priceRange: [0, 10000],
      deliveryTime: [],
      sellerLevel: [],
      rating: 0
    });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    fetchServices(false);
  };

  const handleToggleFavorite = (serviceId) => {
    setServices(prev =>
      prev.map(service =>
        service.id === serviceId
          ? { ...service, isFavorited: !service.isFavorited }
          : service
      )
    );
  };

  const handleRefresh = async () => {
    await fetchServices(true);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category?.length > 0) count++;
    if (filters.subcategory?.length > 0) count++;
    if (filters.deliveryTime?.length > 0) count++;
    if (filters.sellerLevel?.length > 0) count++;
    if (filters.rating > 0) count++;
    if (filters.priceRange?.[0] > 0 || filters.priceRange?.[1] < 10000) count++;
    return count;
  };

  const getBreadcrumbItems = () => {
    const items = [];
    if (filters.category?.length > 0) {
      items.push({
        label: filters.category[0].replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        path: '/service-browse-search'
      });
    }
    return items;
  };

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumbs */}
          <Breadcrumbs items={getBreadcrumbItems()} />

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              onFilterToggle={() => setIsFilterPanelOpen(true)}
              activeFiltersCount={getActiveFilterCount()}
            />
          </div>

          {/* Active Filters */}
          <ActiveFilters
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />

          {/* Main Content Layout */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isOpen={false}
                  onClose={() => {}}
                  isMobile={false}
                />
              </div>
            </div>

            {/* Service Grid */}
            <div className="lg:col-span-9">
              {/* Sorting Options */}
              <SortingOptions
                currentSort={sortBy}
                onSortChange={handleSortChange}
                resultsCount={resultsCount}
              />

              {/* Service Grid */}
              <ServiceGrid
                services={services}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onToggleFavorite={handleToggleFavorite}
                onRefresh={handleRefresh}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <PrimaryNavigation />
      </div>

      {/* Mobile Filter Panel */}
      <FilterPanel
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        isMobile={true}
      />
    </div>
  );
};

export default ServiceBrowseSearch;