import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import ProductDetails from "./pages/shopping-view/product-details";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import { useSelector } from "react-redux";

// Protected route component for actions that require login
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Public Shopping Pages */}
        <Route path="/" element={<ShoppingLayout />}>
          <Route index element={<ShoppingHome />} />
          <Route path="shop/listing" element={<ShoppingListing />} />
          <Route path="shop/search" element={<SearchProducts />} />
          <Route path="shop/product/:id" element={<ProductDetails />} />

        </Route>

        {/* Protected Shopping Actions */}
        <Route
          path="/shop/checkout"
          element={
            <ProtectedRoute>
              <ShoppingCheckout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop/account"
          element={
            <ProtectedRoute>
              <ShoppingAccount />
            </ProtectedRoute>
          }
        />
        <Route path="/shop/paypal-return" element={<PaypalReturnPage />} />
        <Route path="/shop/payment-success" element={<PaymentSuccessPage />} />

        {/* Auth Pages */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
