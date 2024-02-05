import React, { Suspense } from 'react';

interface ErrorBoundaryProps {
  onError: (error: Error) => void;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error);
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const App2Fallback: React.FC = () => (
  <div>
    <p>Component unavailable</p>
  </div>
);

const loadRemoteApp2 = async () => {
  try {
    const module = await import('app2');
    return module;
  } catch (error) {
    console.error('Error loading remote app2:', error);
    return { default: () => <App2Fallback /> };
  }
};

const App2WithFallback: React.FC = () => {
  return (
    <Suspense fallback={<App2Fallback />}>
      <ErrorBoundary onError={(error) => console.error('Error boundary caught an error:', error)} fallback={<App2Fallback />}>
        {React.lazy(() => loadRemoteApp2())}
      </ErrorBoundary>
    </Suspense>
  );
};

export default App2WithFallback;
