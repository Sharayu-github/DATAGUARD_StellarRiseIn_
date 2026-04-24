import React from 'react';
import { useToast } from '../context/ToastContext';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success-gradient text-white shadow-glow';
      case 'error':
        return 'bg-gradient-to-r from-error-500 to-error-600 text-white shadow-glow';
      case 'warning':
        return 'bg-gradient-to-r from-warning-500 to-warning-600 text-white shadow-glow';
      case 'info':
        return 'bg-primary-gradient text-white shadow-glow';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} px-6 py-4 rounded-2xl max-w-sm transform transition-all duration-500 ease-out animate-fade-in-right backdrop-blur-sm border border-white/20`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <span className="text-xl flex-shrink-0 mt-0.5">{getIcon(toast.type)}</span>
              <div className="flex-1">
                <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-white/80 hover:text-white transition-colors flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress bar for auto-dismiss */}
          <div className="mt-3 w-full bg-white/20 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-white/60 rounded-full animate-shimmer"
              style={{ 
                animation: 'shrink 5s linear forwards',
                transformOrigin: 'left'
              }}
            ></div>
          </div>
        </div>
      ))}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shrink {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
          }
        `
      }} />
    </div>
  );
};

export default Toast;