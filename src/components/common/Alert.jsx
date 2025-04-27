import React from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const alertStyles = {
  success: {
    container: 'bg-green-50 border-green-400 text-green-800',
    icon: <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    icon: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
  },
  info: {
    container: 'bg-blue-50 border-blue-400 text-blue-800',
    icon: <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
  },
  error: {
    container: 'bg-red-50 border-red-400 text-red-800',
    icon: <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
  }
};

const Alert = ({ type = 'info', title, message, className = '' }) => {
  const style = alertStyles[type] || alertStyles.info;
  
  return (
    <div className={`border-l-4 p-4 rounded-md ${style.container} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {style.icon}
        </div>
        <div className="ml-3">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          {message && <div className="text-sm mt-1">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default Alert;