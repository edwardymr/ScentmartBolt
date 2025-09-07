import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastNotification as ToastType } from '../types';

interface ToastNotificationProps {
  notification: ToastType;
  onRemove: (id: string) => void;
}

export default function ToastNotification({ notification, onRemove }: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`${getBgColor()} border rounded-lg p-4 shadow-lg backdrop-blur-sm transition-all duration-300 transform translate-x-0`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="text-gray-800 font-medium">
            {notification.message}
          </p>
        </div>
        <button
          onClick={() => onRemove(notification.id)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}