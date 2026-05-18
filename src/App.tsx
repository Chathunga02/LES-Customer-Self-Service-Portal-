import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Seats from './pages/Seats';
import Billing from './pages/Billing';
import Addons from './pages/Addons';
import Account from './pages/Account';
import SignIn from './pages/auth/SignIn';
import { Toaster } from '@/components/ui/sonner';
import { ProductProvider } from './contexts/ProductContext';

export default function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
        {/* Auth Routes */}
        <Route path="/auth/signin" element={<SignIn />} />

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/portal/dashboard" replace />} />
        
        {/* Portal Routes */}
        <Route path="/portal/*" element={
          <Layout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="seats" element={<Seats />} />
              <Route path="billing" element={<Billing />} />
              <Route path="addons" element={<Addons />} />
              <Route path="account" element={<Account />} />
            </Routes>
          </Layout>
        } />
      </Routes>
      <Toaster position="top-right" />
    </Router>
    </ProductProvider>
  );
}
