import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Button from '../ui/Button';
import { RefreshCcw } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Something went wrong</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error.message}
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={resetErrorBoundary}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}