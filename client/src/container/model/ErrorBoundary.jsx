import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("Error caught in Error Boundary", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // A fall back UI when an error occurs or is returned
      return (
        <div className="error_page">
          <div className="error_content-page">
            <h1>Something Went Wrong!</h1>
            <p>We are sorry, an error occurred</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
