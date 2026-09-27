import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center p-4">
          <h1 className="display-4 fw-bold text-danger mb-3">
            <i className="bi bi-exclamation-triangle"></i>
          </h1>
          <h2 className="mb-4">Something went wrong</h2>
          <p className="text-muted mb-4" style={{ maxWidth: '500px' }}>
            We're sorry, but an unexpected error occurred. Please try refreshing the page or navigating back home.
          </p>
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            <button onClick={() => window.location.reload()} className="btn btn-outline-primary btn-material px-4 py-2">
              <i className="bi bi-arrow-clockwise me-2"></i> Refresh Page
            </button>
            <Link to="/" className="btn btn-primary btn-material px-4 py-2" onClick={() => this.setState({ hasError: false })}>
              <i className="bi bi-house me-2"></i> Go Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
