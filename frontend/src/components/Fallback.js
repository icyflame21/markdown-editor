import React from 'react';
import { Alert } from 'react-bootstrap';

function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div className="fallback-container">
      <Alert variant="danger" onClose={resetErrorBoundary} dismissible>
        <Alert.Heading>Something went wrong</Alert.Heading>
        <p>{error.message || "An unexpected error occurred."}</p>
      </Alert>
    </div>
  );
}

export default FallbackComponent;
