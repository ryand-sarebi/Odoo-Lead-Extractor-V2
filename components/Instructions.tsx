
import React from 'react';

const Instructions: React.FC = () => (
  <div className="bg-primary-light border-l-4 border-primary p-4 rounded-r-lg">
    <h2 className="text-xl font-bold text-primary mb-3">How to Use</h2>
    <ol className="list-decimal list-inside space-y-2 text-neutral-700">
      <li>Navigate to your leads/pipeline page in Odoo.</li>
      <li>Right-click on the page and select "View Page Source" or "Inspect".</li>
      <li>Copy the entire HTML content (Ctrl+A, Ctrl+C).</li>
      <li>Paste the copied HTML into the text box below.</li>
      <li>Click the "Extract & Download Leads" button.</li>
    </ol>
  </div>
);

export default Instructions;
