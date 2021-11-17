import React, { Component, PropsWithChildren, ReactNode } from 'react';

import ErrorPage from './ErrorPage';

export interface ErrorHandlerState {
  error: Error | null;
}

class ErrorBoundary extends Component<PropsWithChildren<ReactNode>> {
  state: ErrorHandlerState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  render(): ReactNode {
    if (this.state.error) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
