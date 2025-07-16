
import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center py-8" aria-label="Loading content">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
  </div>
);

export default Loader;
