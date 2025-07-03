import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthForm from './components/AuthForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import TrustIndicators from './components/TrustIndicators';

const UserRegistrationLogin = () => {
  const [mode, setMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for testing
  const mockCredentials = {
    freelancer: { email: 'freelancer@example.com', password: 'FreelancePass123!' },
    client: { email: 'client@example.com', password: 'ClientPass123!' }
  };

  useEffect(() => {
    // Clear messages when mode changes
    setSuccessMessage('');
    setErrorMessage('');
    setShowForgotPassword(false);
  }, [mode]);

  const handleAuthSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (mode === 'login') {
        // Check mock credentials
        const isValidCredentials = Object.values(mockCredentials).some(
          cred => cred.email === formData.email && cred.password === formData.password
        );

        if (!isValidCredentials) {
          throw new Error('Invalid email or password. Try: freelancer@example.com / FreelancePass123! or client@example.com / ClientPass123!');
        }

        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/marketplace-homepage');
        }, 1000);
      } else {
        // Registration success
        setSuccessMessage('Account created successfully! Please check your email to verify your account.');
        setTimeout(() => {
          setMode('login');
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage(`${provider} login successful! Redirecting...`);
      setTimeout(() => {
        navigate('/marketplace-homepage');
      }, 1000);
    } catch (error) {
      setErrorMessage(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      setErrorMessage('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('Password reset link sent to your email!');
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (error) {
      setErrorMessage('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/marketplace-homepage" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-text-primary">FreelanceHub</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-text-secondary">
                <Icon name="Globe" size={16} className="mr-2" />
                English
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-8">
            {/* Tab Navigation */}
            <div className="text-center">
              <div className="flex bg-surface rounded-lg p-1 border border-border mb-8">
                <Button
                  variant={mode === 'login' ? 'primary' : 'ghost'}
                  onClick={() => setMode('login')}
                  className="flex-1 py-2"
                >
                  Sign In
                </Button>
                <Button
                  variant={mode === 'signup' ? 'primary' : 'ghost'}
                  onClick={() => setMode('signup')}
                  className="flex-1 py-2"
                >
                  Sign Up
                </Button>
              </div>

              <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  {mode === 'signup' ? 'Join FreelanceHub' : 'Welcome back'}
                </h1>
                <p className="text-text-secondary">
                  {mode === 'signup' ?'Create your account and start your freelance journey' :'Sign in to your account to continue'
                  }
                </p>
              </div>
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-success-50 border border-success-200 rounded-lg p-4 flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <p className="text-success text-sm">{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className="bg-error-50 border border-error-200 rounded-lg p-4 flex items-center space-x-2">
                <Icon name="AlertCircle" size={20} className="text-error" />
                <p className="text-error text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Forgot Password Modal */}
            {showForgotPassword && (
              <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">Reset Password</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setShowForgotPassword(false)}
                    className="p-1"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
                <p className="text-text-secondary text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    loading={isLoading}
                    className="w-full"
                  >
                    Send Reset Link
                  </Button>
                </form>
              </div>
            )}

            {!showForgotPassword && (
              <>
                {/* Social Login */}
                <SocialLoginButtons
                  onSocialLogin={handleSocialLogin}
                  isLoading={isLoading}
                />

                {/* Auth Form */}
                <AuthForm
                  mode={mode}
                  onSubmit={handleAuthSubmit}
                  isLoading={isLoading}
                  onModeChange={setMode}
                  onForgotPassword={() => setShowForgotPassword(true)}
                />

                {/* Mock Credentials Info */}
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-accent mt-0.5" />
                    <div>
                      <p className="text-accent text-sm font-medium mb-1">Demo Credentials</p>
                      <div className="text-accent text-xs space-y-1">
                        <p><strong>Freelancer:</strong> freelancer@example.com / FreelancePass123!</p>
                        <p><strong>Client:</strong> client@example.com / ClientPass123!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Trust Indicators Sidebar - Desktop Only */}
        <div className="hidden lg:block w-96 bg-surface border-l border-border p-8 overflow-y-auto">
          <TrustIndicators />
        </div>
      </div>

      {/* Mobile Trust Indicators */}
      <div className="lg:hidden bg-surface border-t border-border p-6">
        <TrustIndicators />
      </div>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <Link to="/marketplace-homepage" className="hover:text-text-primary transition-colors">
                About
              </Link>
              <Link to="/marketplace-homepage" className="hover:text-text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/marketplace-homepage" className="hover:text-text-primary transition-colors">
                Terms
              </Link>
              <Link to="/marketplace-homepage" className="hover:text-text-primary transition-colors">
                Help
              </Link>
            </div>
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} FreelanceHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistrationLogin;