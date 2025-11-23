import React, { useState } from 'react';
import {
  TrendingUp,
  Home,
  Calculator,
  Calendar,
  DollarSign,
  Percent,
  PlusCircle,
  Play,
  BarChart3,
  Info,
  Building2,
  RefreshCw
} from 'lucide-react';

interface ScenarioParameters {
  // Basic Parameters
  currentNetWorth: number;
  currentContributions: number;
  contributionsInterval: 'monthly' | 'quarterly' | 'annually';
  forecastHorizon: number;
  stocksOnly: boolean;
  
  // Property Parameters
  includeProperty: boolean;
  propertyParams?: {
    propertyCount: number;
    propertyCost: number;
    depositPercent: number;
    oneOffCost: number;
    rentalYield: number;
    capitalAppreciation: number;
    rentalGrowth: number;
    reinvestRentalIncome: boolean;
    
    // Mortgage Parameters
    includeMortgage: boolean;
    mortgageRate?: number;
    mortgageTerm?: number;
  };
}

const Scenarios: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [scenarioParams, setScenarioParams] = useState<ScenarioParameters>({
    currentNetWorth: 0,
    currentContributions: 0,
    contributionsInterval: 'monthly',
    forecastHorizon: 10,
    stocksOnly: true,
    includeProperty: false
  });

  const handleRunScenario = async () => {
    setIsRunning(true);
    
    try {
      // TODO: Send to backend API
      console.log('Running scenario with parameters:', scenarioParams);
      
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Handle response and display results
    } catch (error) {
      console.error('Error running scenario:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const updatePropertyParams = (key: string, value: any) => {
    setScenarioParams(prev => ({
      ...prev,
      propertyParams: {
        ...prev.propertyParams,
        propertyCount: prev.propertyParams?.propertyCount || 1,
        propertyCost: prev.propertyParams?.propertyCost || 0,
        depositPercent: prev.propertyParams?.depositPercent || 20,
        oneOffCost: prev.propertyParams?.oneOffCost || 0,
        rentalYield: prev.propertyParams?.rentalYield || 5,
        capitalAppreciation: prev.propertyParams?.capitalAppreciation || 5,
        rentalGrowth: prev.propertyParams?.rentalGrowth || 3,
        reinvestRentalIncome: prev.propertyParams?.reinvestRentalIncome || true,
        includeMortgage: prev.propertyParams?.includeMortgage || true,
        mortgageRate: prev.propertyParams?.mortgageRate || 5,
        mortgageTerm: prev.propertyParams?.mortgageTerm || 30,
        [key]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-green-600" />
            Wealth Scenarios
          </h1>
          <p className="mt-2 text-gray-600">
            Model different investment strategies and visualize your wealth-building journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Parameters Panel - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Financial Parameters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Financial Foundation
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Net Worth
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={scenarioParams.currentNetWorth}
                      onChange={(e) => setScenarioParams({...scenarioParams, currentNetWorth: Number(e.target.value)})}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="100,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Regular Contributions
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={scenarioParams.currentContributions}
                      onChange={(e) => setScenarioParams({...scenarioParams, currentContributions: Number(e.target.value)})}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="5,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contribution Frequency
                  </label>
                  <select
                    value={scenarioParams.contributionsInterval}
                    onChange={(e) => setScenarioParams({...scenarioParams, contributionsInterval: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Forecast Horizon (Years)
                  </label>
                  <select
                    value={scenarioParams.forecastHorizon}
                    onChange={(e) => setScenarioParams({...scenarioParams, forecastHorizon: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={5}>5 Years</option>
                    <option value={10}>10 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Investment Type Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Investment Strategy
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={scenarioParams.stocksOnly}
                    onChange={(e) => setScenarioParams({...scenarioParams, stocksOnly: e.target.checked})}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Stocks & ETFs Only</div>
                    <div className="text-sm text-gray-500">Traditional market-based portfolio</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={scenarioParams.includeProperty}
                    onChange={(e) => setScenarioParams({...scenarioParams, includeProperty: e.target.checked})}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Include Property Investment</div>
                    <div className="text-sm text-gray-500">Add real estate to your portfolio mix</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Property Parameters - Only show if property is selected */}
            {scenarioParams.includeProperty && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  Property Investment Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Properties
                    </label>
                    <input
                      type="number"
                      value={scenarioParams.propertyParams?.propertyCount || 1}
                      onChange={(e) => updatePropertyParams('propertyCount', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Cost
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={scenarioParams.propertyParams?.propertyCost || 0}
                        onChange={(e) => updatePropertyParams('propertyCost', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="500,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deposit (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={scenarioParams.propertyParams?.depositPercent || 20}
                        onChange={(e) => updatePropertyParams('depositPercent', Number(e.target.value))}
                        className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="100"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Once-off Costs
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={scenarioParams.propertyParams?.oneOffCost || 0}
                        onChange={(e) => updatePropertyParams('oneOffCost', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="10,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rental Yield (% p.a.)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={scenarioParams.propertyParams?.rentalYield || 5}
                        onChange={(e) => updatePropertyParams('rentalYield', Number(e.target.value))}
                        className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capital Appreciation (% p.a.)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={scenarioParams.propertyParams?.capitalAppreciation || 5}
                        onChange={(e) => updatePropertyParams('capitalAppreciation', Number(e.target.value))}
                        className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rental Growth (% p.a.)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={scenarioParams.propertyParams?.rentalGrowth || 3}
                        onChange={(e) => updatePropertyParams('rentalGrowth', Number(e.target.value))}
                        className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={scenarioParams.propertyParams?.reinvestRentalIncome ?? true}
                        onChange={(e) => updatePropertyParams('reinvestRentalIncome', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Reinvest Rental Income
                      </span>
                    </label>
                  </div>
                </div>

                {/* Mortgage Sub-section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="flex items-center gap-2 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={scenarioParams.propertyParams?.includeMortgage ?? true}
                      onChange={(e) => updatePropertyParams('includeMortgage', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-lg font-medium text-gray-900">Include Mortgage</span>
                  </label>

                  {scenarioParams.propertyParams?.includeMortgage && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mortgage Rate (% p.a.)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={scenarioParams.propertyParams?.mortgageRate || 5}
                            onChange={(e) => updatePropertyParams('mortgageRate', Number(e.target.value))}
                            className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            step="0.1"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            %
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mortgage Term (Years)
                        </label>
                        <input
                          type="number"
                          value={scenarioParams.propertyParams?.mortgageTerm || 30}
                          onChange={(e) => updatePropertyParams('mortgageTerm', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="1"
                          max="30"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions Panel - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Scenario Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Investment Types</span>
                    <span className="text-sm font-medium text-gray-900">
                      {scenarioParams.stocksOnly && scenarioParams.includeProperty 
                        ? 'Mixed Portfolio' 
                        : scenarioParams.includeProperty 
                        ? 'Property Only'
                        : 'Stocks Only'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Time Horizon</span>
                    <span className="text-sm font-medium text-gray-900">
                      {scenarioParams.forecastHorizon} Years
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Starting Capital</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${scenarioParams.currentNetWorth.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Contributions</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${scenarioParams.currentContributions.toLocaleString()}/{scenarioParams.contributionsInterval}
                    </span>
                  </div>
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex gap-2">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      This scenario will model three strategies: Stocks Only, Property Only, and a Mixed Portfolio approach.
                    </div>
                  </div>
                </div>
              </div>

              {/* Run Scenario Button */}
              <button
                onClick={handleRunScenario}
                disabled={isRunning || (!scenarioParams.stocksOnly && !scenarioParams.includeProperty)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
                  ${isRunning || (!scenarioParams.stocksOnly && !scenarioParams.includeProperty)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl'
                  }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Running Scenario...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Model Scenario
                  </>
                )}
              </button>

              {/* Help Text */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Configure your parameters and run the scenario to see projected outcomes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - Will be populated after scenario runs */}
        <div className="mt-12">
          {/* Placeholder for results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Scenario Results Yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Configure your scenario parameters above and click "Model Scenario" to see your wealth projections
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;