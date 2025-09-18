import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

const AuthDebug: React.FC = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
    error 
  } = useAuth0();
  
  const [showDebug, setShowDebug] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'read:portfolios write:portfolios read:scenarios write:scenarios'
        }
      });
      setToken(accessToken);
      setTokenError(null);
    } catch (err: any) {
      setTokenError(err.message);
      setToken(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-[#1a2332] text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-[#2c3340] transition-colors"
      >
        <span>Auth Debug</span>
        <ChevronUp className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[600px] overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a2332] text-white p-4 flex items-center justify-between">
        <h3 className="font-semibold">Auth0 Debug Panel</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="hover:bg-white/10 p-1 rounded"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto max-h-[500px]">
        {/* Status */}
        <div className="mb-4">
          <h4 className="font-semibold text-[#1a2332] mb-2">Status</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Loading:</span>
              <span className={isLoading ? 'text-orange-500' : 'text-gray-800'}>
                {isLoading ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Authenticated:</span>
              <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                {isAuthenticated ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-1">Error</h4>
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
        )}

        {/* User Info */}
        {user && (
          <div className="mb-4">
            <h4 className="font-semibold text-[#1a2332] mb-2">User Info</h4>
            <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono overflow-x-auto">
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mb-4">
          <h4 className="font-semibold text-[#1a2332] mb-2">Actions</h4>
          <div className="space-y-2">
            {!isAuthenticated ? (
              <button
                onClick={() => loginWithRedirect()}
                className="w-full bg-[#1a2332] text-white py-2 px-4 rounded-lg hover:bg-[#2c3340] transition-colors text-sm"
              >
                Login
              </button>
            ) : (
              <>
                <button
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Logout
                </button>
                <button
                  onClick={fetchToken}
                  className="w-full bg-[#2d5a3d] text-white py-2 px-4 rounded-lg hover:bg-[#4a9d5f] transition-colors text-sm"
                >
                  Get Access Token
                </button>
              </>
            )}
          </div>
        </div>

        {/* Token */}
        {token && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-[#1a2332]">Access Token</h4>
              <button
                onClick={() => copyToClipboard(token)}
                className="text-sm text-[#5a7ba3] hover:text-[#3d4c6b] flex items-center space-x-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono overflow-x-auto">
              <div className="break-all">{token.substring(0, 50)}...</div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Token length: {token.length} characters
            </p>
          </div>
        )}

        {/* Token Error */}
        {tokenError && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-1">Token Error</h4>
            <p className="text-sm text-yellow-700">{tokenError}</p>
          </div>
        )}

        {/* Environment */}
        <div className="mb-4">
          <h4 className="font-semibold text-[#1a2332] mb-2">Environment</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Domain:</span>
              <span className="text-gray-800 font-mono">
                {process.env.REACT_APP_AUTH0_DOMAIN || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Client ID:</span>
              <span className="text-gray-800 font-mono">
                {process.env.REACT_APP_AUTH0_CLIENT_ID?.substring(0, 10)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Audience:</span>
              <span className="text-gray-800 font-mono">
                {process.env.REACT_APP_AUTH0_AUDIENCE || 'Not set'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
