
import { Lead } from '../types';

const convertToCSV = (leads: Lead[]): string => {
  if (!leads || leads.length === 0) {
    return '';
  }
  const headers = ['company', 'contactName', 'email', 'phone'];
  const csvRows = [headers.join(',')];

  for (const lead of leads) {
    const values = headers.map(header => {
      const value = lead[header as keyof Lead] || '';
      const escaped = ('' + value).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

export const downloadCsv = (leads: Lead[], filename: string): void => {
  if (!leads || leads.length === 0) {
    return;
  }

  const csvString = convertToCSV(leads);
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const copyCsvToClipboard = async (leads: Lead[]): Promise<boolean> => {
    if (!navigator.clipboard) {
        // Clipboard API not available
        return false;
    }
    const csvString = convertToCSV(leads);
    if (!csvString) return false;
    
    try {
        await navigator.clipboard.writeText(csvString);
        return true;
    } catch (err) {
        console.error('Failed to copy text to clipboard', err);
        return false;
    }
};
