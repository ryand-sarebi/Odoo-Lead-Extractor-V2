
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 right-5 bg-secondary text-white py-3 px-6 rounded-lg shadow-xl animate-fade-in"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default Toast;
