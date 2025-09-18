import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface Portfolio {
  id: string;
  name: string;
  description?: string;
  holdings: any[];
  createdAt: Date;
  updatedAt: Date;
}

interface Scenario {
  id: string;
  portfolioId: string;
  name: string;
  parameters: any;
  results?: any;
  createdAt: Date;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - could trigger re-authentication
          console.error('Authentication required');
          // You might want to redirect to login or refresh token here
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  // Portfolio endpoints
  async getPortfolios(): Promise<Portfolio[]> {
    const response = await this.client.get<Portfolio[]>('/portfolios');
    return response.data;
  }

  async getPortfolio(portfolioId: string): Promise<Portfolio> {
    const response = await this.client.get<Portfolio>(`/portfolios/${portfolioId}`);
    return response.data;
  }

  async createPortfolio(portfolioData: Partial<Portfolio>): Promise<Portfolio> {
    const response = await this.client.post<Portfolio>('/portfolios', portfolioData);
    return response.data;
  }

  async updatePortfolio(portfolioId: string, portfolioData: Partial<Portfolio>): Promise<Portfolio> {
    const response = await this.client.put<Portfolio>(`/portfolios/${portfolioId}`, portfolioData);
    return response.data;
  }

  async deletePortfolio(portfolioId: string): Promise<void> {
    await this.client.delete(`/portfolios/${portfolioId}`);
  }

  // Scenario endpoints
  async getScenarios(portfolioId: string): Promise<Scenario[]> {
    const response = await this.client.get<Scenario[]>(`/portfolios/${portfolioId}/scenarios`);
    return response.data;
  }

  async getScenario(scenarioId: string): Promise<Scenario> {
    const response = await this.client.get<Scenario>(`/scenarios/${scenarioId}`);
    return response.data;
  }

  async runScenarioCalculation(scenarioData: Partial<Scenario>): Promise<Scenario> {
    const response = await this.client.post<Scenario>('/scenarios/calculate', scenarioData);
    return response.data;
  }

  async saveScenario(scenarioData: Partial<Scenario>): Promise<Scenario> {
    const response = await this.client.post<Scenario>('/scenarios', scenarioData);
    return response.data;
  }

  async deleteScenario(scenarioId: string): Promise<void> {
    await this.client.delete(`/scenarios/${scenarioId}`);
  }

  // Market data endpoints (example)
  async getMarketData(symbol: string): Promise<any> {
    const response = await this.client.get(`/market-data/${symbol}`);
    return response.data;
  }

  // User profile endpoints
  async getUserProfile(): Promise<any> {
    const response = await this.client.get('/user/profile');
    return response.data;
  }

  async updateUserProfile(profileData: any): Promise<any> {
    const response = await this.client.put('/user/profile', profileData);
    return response.data;
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();
