import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistrationLogin from "pages/user-registration-login";
import OrderPlacementCheckout from "pages/order-placement-checkout";
import OrderManagement from "pages/order-management";
import ServiceDetailPage from "pages/service-detail-page";
import ServiceBrowseSearch from "pages/service-browse-search";
import MarketplaceHomepage from "pages/marketplace-homepage";
import UserDashboard from "pages/user-dashboard";
import MessagingCenter from "pages/messaging-center";
import UserProfileManagement from "pages/user-profile-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MarketplaceHomepage />} />
        <Route path="/marketplace-homepage" element={<MarketplaceHomepage />} />
        <Route path="/service-browse-search" element={<ServiceBrowseSearch />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/order-placement-checkout" element={<OrderPlacementCheckout />} />
        <Route path="/order-management" element={<OrderManagement />} />
        <Route path="/service-detail-page" element={<ServiceDetailPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/messaging-center" element={<MessagingCenter />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;