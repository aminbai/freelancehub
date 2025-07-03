import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import OrderCard from './components/OrderCard';
import OrderTabs from './components/OrderTabs';
import OrderFilters from './components/OrderFilters';
import OrderDetailView from './components/OrderDetailView';
import OrderStats from './components/OrderStats';
import BulkActions from './components/BulkActions';

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for orders
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      title: 'Modern Website Design & Development',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      status: 'Active',
      type: 'seller',
      clientName: 'John Smith',
      clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      amount: 2500,
      deadline: new Date(Date.now() + 432000000), // 5 days from now
      priority: 'high',
      progress: 75,
      hasMessages: true,
      messageCount: 3,
      hasFiles: true,
      needsRevision: false,
      category: 'Web Development',
      createdAt: new Date(Date.now() - 604800000),
      description: `Complete website design and development for a modern business website. The project includes homepage design, about us page, services page, contact page, responsive design for all devices, SEO optimization, and performance optimization.`
    },
    {
      id: 'ORD-2024-002',
      title: 'Logo Design & Brand Identity',
      thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400',
      status: 'Delivered',
      type: 'seller',
      clientName: 'Sarah Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      amount: 800,
      deadline: new Date(Date.now() + 86400000), // 1 day from now
      priority: 'medium',
      progress: 100,
      hasMessages: true,
      messageCount: 8,
      hasFiles: true,
      needsRevision: false,
      category: 'Graphic Design',
      createdAt: new Date(Date.now() - 1209600000)
    },
    {
      id: 'ORD-2024-003',
      title: 'Content Writing for Blog Posts',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
      status: 'Active',
      type: 'seller',
      clientName: 'Michael Brown',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      amount: 450,
      deadline: new Date(Date.now() + 259200000), // 3 days from now
      priority: 'low',
      progress: 40,
      hasMessages: true,
      messageCount: 2,
      hasFiles: false,
      needsRevision: true,
      category: 'Content Writing',
      createdAt: new Date(Date.now() - 345600000)
    },
    {
      id: 'ORD-2024-004',
      title: 'Mobile App UI/UX Design',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
      status: 'Completed',
      type: 'seller',
      clientName: 'Emily Davis',
      clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      amount: 3200,
      deadline: new Date(Date.now() - 86400000), // 1 day ago
      priority: 'high',
      progress: 100,
      hasMessages: true,
      messageCount: 15,
      hasFiles: true,
      needsRevision: false,
      category: 'UI/UX Design',
      createdAt: new Date(Date.now() - 1814400000)
    },
    {
      id: 'ORD-2024-005',
      title: 'Digital Marketing Campaign',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      status: 'Cancelled',
      type: 'seller',
      clientName: 'David Wilson',
      clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      amount: 1200,
      deadline: new Date(Date.now() + 604800000), // 7 days from now
      priority: 'medium',
      progress: 20,
      hasMessages: true,
      messageCount: 5,
      hasFiles: false,
      needsRevision: false,
      category: 'Digital Marketing',
      createdAt: new Date(Date.now() - 172800000)
    },
    {
      id: 'ORD-2024-006',
      title: 'E-commerce Website Development',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      status: 'Disputed',
      type: 'seller',
      clientName: 'Lisa Anderson',
      clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      amount: 4500,
      deadline: new Date(Date.now() + 1209600000), // 14 days from now
      priority: 'high',
      progress: 60,
      hasMessages: true,
      messageCount: 12,
      hasFiles: true,
      needsRevision: true,
      category: 'Web Development',
      createdAt: new Date(Date.now() - 864000000)
    }
  ];

  // Filter orders based on active tab and filters
  const getFilteredOrders = () => {
    let filtered = mockOrders;

    // Filter by tab
    switch (activeTab) {
      case 'active':
        filtered = filtered.filter(order => 
          ['Active', 'In Progress', 'Delivered'].includes(order.status)
        );
        break;
      case 'completed':
        filtered = filtered.filter(order => order.status === 'Completed');
        break;
      case 'cancelled':
        filtered = filtered.filter(order => order.status === 'Cancelled');
        break;
      case 'disputed':
        filtered = filtered.filter(order => order.status === 'Disputed');
        break;
      default:
        break;
    }

    // Apply additional filters
    if (filters.search) {
      filtered = filtered.filter(order =>
        order.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.clientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.id.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(order => order.category === filters.category);
    }

    if (filters.amountMin) {
      filtered = filtered.filter(order => order.amount >= parseInt(filters.amountMin));
    }

    if (filters.amountMax) {
      filtered = filtered.filter(order => order.amount <= parseInt(filters.amountMax));
    }

    if (filters.dateStart) {
      filtered = filtered.filter(order => 
        order.createdAt >= new Date(filters.dateStart)
      );
    }

    if (filters.dateEnd) {
      filtered = filtered.filter(order => 
        order.createdAt <= new Date(filters.dateEnd)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'oldest':
        filtered.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'amount-high':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-low':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case 'deadline':
        filtered.sort((a, b) => a.deadline - b.deadline);
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default: // newest
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  // Calculate order counts for tabs
  const orderCounts = {
    active: mockOrders.filter(order => 
      ['Active', 'In Progress', 'Delivered'].includes(order.status)
    ).length,
    completed: mockOrders.filter(order => order.status === 'Completed').length,
    cancelled: mockOrders.filter(order => order.status === 'Cancelled').length,
    disputed: mockOrders.filter(order => order.status === 'Disputed').length
  };

  // Calculate stats
  const stats = {
    total: mockOrders.length,
    active: orderCounts.active,
    completed: orderCounts.completed,
    revenue: mockOrders
      .filter(order => order.status === 'Completed')
      .reduce((sum, order) => sum + order.amount, 0)
  };

  const handleStatusUpdate = (orderId, newStatus, note = '') => {
    console.log('Updating order status:', { orderId, newStatus, note });
    // In a real app, this would make an API call
  };

  const handleSendMessage = (orderId, message) => {
    console.log('Sending message:', { orderId, message });
    // In a real app, this would make an API call
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleOrderSelection = (orderId, isSelected) => {
    if (isSelected) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

  const handleBulkAction = (actionId, orderIds) => {
    console.log('Bulk action:', { actionId, orderIds });
    // In a real app, this would make an API call
    setSelectedOrders([]);
  };

  const handleExportOrders = () => {
    console.log('Exporting orders...');
    // In a real app, this would generate and download a report
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="pt-16 lg:pt-20">
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/marketplace-homepage" className="text-text-secondary hover:text-primary">
                Dashboard
              </Link>
              <Icon name="ChevronRight" size={14} className="text-text-muted" />
              <span className="text-text-primary font-medium">Orders</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-surface border-b border-border px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
                  Order Management
                </h1>
                <p className="text-text-secondary mt-1">
                  Track and manage your service orders
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleExportOrders}
                  className="flex items-center space-x-2"
                >
                  <Icon name="Download" size={16} />
                  <span>Export</span>
                </Button>
                <Link to="/service-browse-search">
                  <Button variant="primary" className="flex items-center space-x-2">
                    <Icon name="Plus" size={16} />
                    <span>New Order</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Order Stats */}
        <OrderStats stats={stats} />

        {/* Order Tabs */}
        <OrderTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          orderCounts={orderCounts}
        />

        {/* Order Filters */}
        <OrderFilters
          onFilterChange={setFilters}
          activeFilters={filters}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-4">
          <div className="lg:grid lg:grid-cols-12 lg:gap-6">
            {/* Orders List */}
            <div className={`${selectedOrder ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Package" size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    No orders found
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {activeTab === 'active' 
                      ? "You don't have any active orders yet."
                      : `No ${activeTab} orders match your current filters.`
                    }
                  </p>
                  <Link to="/service-browse-search">
                    <Button variant="primary">
                      Browse Services
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusUpdate={handleStatusUpdate}
                      onViewDetails={handleViewDetails}
                      isSelected={selectedOrders.includes(order.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Order Detail View - Desktop Only */}
            {selectedOrder && (
              <div className="hidden lg:block lg:col-span-7">
                <div className="sticky top-24">
                  <div className="bg-surface border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-text-primary">Order Details</h2>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedOrder(null)}
                      >
                        <Icon name="X" size={20} />
                      </Button>
                    </div>
                    <OrderDetailView
                      order={selectedOrder}
                      onClose={() => setSelectedOrder(null)}
                      onStatusUpdate={handleStatusUpdate}
                      onSendMessage={handleSendMessage}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Order Detail Modal */}
        {selectedOrder && (
          <div className="lg:hidden">
            <OrderDetailView
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
              onStatusUpdate={handleStatusUpdate}
              onSendMessage={handleSendMessage}
            />
          </div>
        )}

        {/* Bulk Actions */}
        <BulkActions
          selectedOrders={selectedOrders}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedOrders([])}
        />

        {/* Mobile Navigation */}
        <PrimaryNavigation />
      </div>
    </div>
  );
};

export default OrderManagement;