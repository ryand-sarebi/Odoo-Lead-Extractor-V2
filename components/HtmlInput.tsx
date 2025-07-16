
import React from 'react';

interface HtmlInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const HtmlInput: React.FC<HtmlInputProps> = ({ value, onChange, disabled }) => (
  <div>
    <label htmlFor="html-input" className="block text-sm font-medium text-neutral-700 mb-2">
      Paste Odoo HTML Content Here
    </label>
    <textarea
      id="html-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder="Paste your full HTML source code here..."
      className="w-full h-48 p-4 border border-neutral-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition duration-150 ease-in-out bg-neutral-100 disabled:bg-neutral-200 disabled:cursor-not-allowed"
      aria-label="Paste Odoo HTML Content Here"
      aria-describedby="html-input-description"
    />
    <p id="html-input-description" className="mt-2 text-sm text-neutral-500">
      Ensure you copy the entire HTML of the leads page for best results.
    </p>
  </div>
);

export default HtmlInput;
