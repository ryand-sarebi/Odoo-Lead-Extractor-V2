
import React from 'react';

const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
      Odoo AI Lead Extractor
    </h1>
    <p className="mt-3 text-lg text-neutral-600 max-w-2xl mx-auto">
      Instantly parse HTML from Odoo and convert your leads into a clean, ready-to-use CSV file.
    </p>
  </header>
);

export default Header;
