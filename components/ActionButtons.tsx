
import React from 'react';

interface ActionButtonsProps {
  onExtract: () => void;
  isExtracting: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onExtract, isExtracting }) => (
  <div className="flex justify-center">
    <button
      onClick={onExtract}
      disabled={isExtracting}
      className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-neutral-400 disabled:cursor-wait transition-all duration-300 ease-in-out transform hover:scale-105"
      aria-live="polite"
    >
      {isExtracting ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Extracting...
        </>
      ) : (
        'Extract Leads'
      )}
    </button>
  </div>
);

export default ActionButtons;
