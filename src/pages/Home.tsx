import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, Home as HomeIcon, Car, PiggyBank } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 opacity-0 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Navigate Your Financial Future with Clarity
        </h1>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
          Compare financial scenarios side-by-side and see the long-term impact of your decisions.
          No guesswork, just clear insights.
        </p>
        <Link
          to="/buy-vs-rent"
          className="btn-primary inline-flex items-center"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Start Comparing Scenarios
        </Link>
      </div>

      {/* Features/Templates */}
      <div className="mb-16 opacity-0 animate-fade-in-up stagger-1">
        <h2 className="text-2xl font-semibold text-text-primary mb-6 text-center">
          Answer Your Financial Questions
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Buy vs Rent */}
          <div className="card card-sweep opacity-0 animate-fade-in-up stagger-1">
            <div className="w-12 h-12 bg-accent-primary rounded-lg flex items-center justify-center mb-4 transition-all hover:shadow-glow-blue">
              <HomeIcon className="w-6 h-6 text-bg-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Buy vs Rent</h3>
            <p className="text-text-secondary mb-4">
              Should you buy a home or rent and invest the difference?
            </p>
            <Link
              to="/buy-vs-rent"
              className="text-accent-primary hover:text-accent-light font-medium transition-colors"
            >
              Compare →
            </Link>
          </div>

          {/* Car vs Invest */}
          <div className="card card-sweep opacity-0 animate-fade-in-up stagger-2">
            <div className="w-12 h-12 bg-accent-primary rounded-lg flex items-center justify-center mb-4 transition-all hover:shadow-glow-blue">
              <Car className="w-6 h-6 text-bg-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Car vs Invest</h3>
            <p className="text-text-secondary mb-4">
              What's the impact of buying a car now vs investing that money?
            </p>
            <Link
              to="/scenario-setup?template=car-vs-invest"
              className="text-accent-primary hover:text-accent-light font-medium transition-colors"
            >
              Compare →
            </Link>
          </div>

          {/* Contribution Impact */}
          <div className="card card-sweep opacity-0 animate-fade-in-up stagger-3">
            <div className="w-12 h-12 bg-accent-primary rounded-lg flex items-center justify-center mb-4 transition-all hover:shadow-glow-blue">
              <PiggyBank className="w-6 h-6 text-bg-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Contribution Impact</h3>
            <p className="text-text-secondary mb-4">
              How much do your monthly contributions affect your net worth?
            </p>
            <Link
              to="/scenario-setup?template=contribution"
              className="text-accent-primary hover:text-accent-light font-medium transition-colors"
            >
              Compare →
            </Link>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-bg-secondary border border-border-default rounded-md p-8 text-center opacity-0 animate-fade-in-up stagger-4">
        <TrendingUp className="w-12 h-12 text-accent-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-text-primary mb-3">
          See the 20-Year Impact
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto mb-6">
          Every financial decision compounds over time. True North shows you exactly how your
          choices today will impact your wealth 20-30 years from now.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-sm text-text-tertiary">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-accent-primary rounded-full mr-2"></div>
            <span>No Auth Required</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-accent-primary rounded-full mr-2"></div>
            <span>Save Scenarios Locally</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-accent-primary rounded-full mr-2"></div>
            <span>Free Forever</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
