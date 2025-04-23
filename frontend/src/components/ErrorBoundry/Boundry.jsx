import { useEffect, useState } from 'react';
import ErrorDisplay from './ErrorDisplay';

function Boundry(props) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      // You can log the error to an error reporting service
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
      setHasError(true);
      setErrorMessage(error.message); // Assuming error.message contains the error message

    };

    // Attach the error handler
    window.addEventListener('error', errorHandler);

    return () => {
      // Detach the error handler
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    // You can customize the error message or render a fallback UI
     return <ErrorDisplay message={errorMessage}/>;
  }

  return props.children;
}

export default Boundry;
