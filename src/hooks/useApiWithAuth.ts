import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { apiClient } from '../services/apiClient';

export const useApiWithAuth = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const setupApiClient = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              scope: 'read:portfolios write:portfolios read:scenarios write:scenarios'
            }
          });
          
          apiClient.setAuthToken(token);
        } catch (error) {
          console.error('Failed to get access token:', error);
          apiClient.setAuthToken(null);
        }
      } else {
        apiClient.setAuthToken(null);
      }
    };

    setupApiClient();
  }, [isAuthenticated, getAccessTokenSilently]);

  return apiClient;
};
