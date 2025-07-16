
import React from 'react';
import { Lead } from '../types';

interface LeadsTableProps {
  leads: Lead[];
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full divide-y divide-neutral-200">
      <thead className="bg-neutral-100">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Company
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Contact Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Email
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Phone
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-neutral-200">
        {leads.map((lead, index) => (
          <tr key={index} className="hover:bg-neutral-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{lead.company || 'N/A'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{lead.contactName || 'N/A'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{lead.email || 'N/A'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{lead.phone || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LeadsTable;
