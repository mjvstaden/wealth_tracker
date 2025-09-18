import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Calculator,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Check
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      loginWithRedirect();
    }
  };

  const features = [
    {
      icon: PieChart,
      title: 'Portfolio Tracking',
      description: 'Monitor your investments across multiple accounts in one unified dashboard.'
    },
    {
      icon: Calculator,
      title: 'Scenario Modeling',
      description: 'Test different investment strategies and see projected outcomes over time.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Projections',
      description: 'Visualize your wealth trajectory with advanced forecasting algorithms.'
    },
    {
      icon: Shield,
      title: 'Risk Analysis',
      description: 'Understand and optimize your portfolio risk with professional-grade metrics.'
    },
    {
      icon: Zap,
      title: 'Real-Time Data',
      description: 'Get live market data and instant updates on your portfolio performance.'
    },
    {
      icon: Globe,
      title: 'Asset Allocation',
      description: 'Optimize your asset distribution based on your goals and risk tolerance.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Track up to 3 portfolios',
        'Basic scenario modeling',
        'Monthly market updates',
        'Standard support'
      ]
    },
    {
      name: 'Professional',
      price: '$19',
      period: '/month',
      description: 'For serious investors',
      features: [
        'Unlimited portfolios',
        'Advanced scenario modeling',
        'Real-time market data',
        'Priority support',
        'Risk analytics',
        'Custom alerts'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and advisors',
      features: [
        'Everything in Professional',
        'Multi-user access',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'White-label options'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-deep-navy">True North</span>
                <span className="text-sm text-medium-gray ml-2">Wealth Analytics</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-dark-gray hover:text-deep-navy transition-colors">
                Features
              </button>
              <button className="text-dark-gray hover:text-deep-navy transition-colors">
                Pricing
              </button>
              <button className="text-dark-gray hover:text-deep-navy transition-colors">
                About
              </button>
              <button 
                onClick={handleGetStarted}
                className="btn-primary"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-deep-navy mb-6">
              Take Control of Your
              <span className="text-gradient gradient-success"> Financial Future</span>
            </h1>
            <p className="text-xl text-dark-gray mb-8 max-w-3xl mx-auto">
              Professional-grade portfolio tracking and financial modeling tools that transform complex planning into clear, actionable insights.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={handleGetStarted}
                className="btn-primary flex items-center space-x-2"
              >
                <span>{isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-secondary">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/5 to-forest-green/5 rounded-2xl"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
              <div className="bg-light-gray rounded-lg p-6">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-medium-gray mb-1">Portfolio Value</p>
                    <p className="text-2xl font-bold text-deep-navy">$524,890</p>
                    <p className="text-sm text-success-green">+12.4%</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-medium-gray mb-1">Monthly Growth</p>
                    <p className="text-2xl font-bold text-deep-navy">$8,420</p>
                    <p className="text-sm text-success-green">+3.2%</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-medium-gray mb-1">Active Scenarios</p>
                    <p className="text-2xl font-bold text-deep-navy">5</p>
                    <p className="text-sm text-medium-gray">Running</p>
                  </div>
                </div>
                <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-32 h-32 text-light-gray" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-deep-navy mb-4">
              Everything You Need to Build Wealth
            </h2>
            <p className="text-lg text-dark-gray">
              Professional tools that make financial planning accessible to everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card card-hover">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-deep-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-dark-gray">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-deep-navy mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-dark-gray">
              Choose the plan that fits your investment journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`card ${tier.highlighted ? 'border-2 border-forest-green' : ''}`}
              >
                {tier.highlighted && (
                  <span className="inline-block px-3 py-1 bg-forest-green text-white text-xs font-semibold rounded-full mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-semibold text-deep-navy mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-deep-navy">{tier.price}</span>
                  {tier.period && <span className="text-medium-gray ml-1">{tier.period}</span>}
                </div>
                <p className="text-dark-gray mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-success-green mr-2 flex-shrink-0" />
                      <span className="text-dark-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={handleGetStarted}
                  className={tier.highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Journey to Financial Freedom Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of investors who are taking control of their financial future.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-white text-deep-navy px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">True North</div>
                  <div className="text-sm text-white/80">Wealth Analytics</div>
                </div>
              </div>
              <p className="text-white/60 text-sm">Professional-grade tools for personal wealth building.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>Roadmap</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
            © 2025 True North Wealth Analytics. All rights reserved.
         </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
