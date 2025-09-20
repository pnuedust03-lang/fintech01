
import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="bg-red-900 border border-red-600 text-red-100 px-4 py-3 rounded-lg relative shadow-lg" role="alert">
      <strong className="font-bold">오류!</strong>
      <span className="block sm:inline ml-2">{message}</span>
    </div>
  );
};

export default ErrorAlert;
