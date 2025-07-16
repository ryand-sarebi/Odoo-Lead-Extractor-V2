
import React, { useState, useCallback } from 'react';
import { Lead } from './types';
import { extractLeadsFromHtml } from './services/geminiService';
import { downloadCsv, copyCsvToClipboard } from './services/csvService';
import Header from './components/Header';
import Instructions from './components/Instructions';
import HtmlInput from './components/HtmlInput';
import ActionButtons from './components/ActionButtons';
import LeadsTable from './components/LeadsTable';
import Loader from './components/Loader';
import Toast from './components/Toast';

const App: React.FC = () => {
  const [htmlInput, setHtmlInput] = useState<string>('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleExtractLeads = useCallback(async () => {
    if (!htmlInput.trim()) {
      setError('Please paste the HTML content from your Odoo leads page first.');
      return;
    }

    setIsLoading(true);
    setError('');
    setLeads([]);

    try {
      const extractedData = await extractLeadsFromHtml(htmlInput);
      setLeads(extractedData);

      if (extractedData.length === 0) {
        setError('AI could not find any leads in the provided HTML. Please ensure you copied the correct content, including the leads table.');
      }
    } catch (e) {
      console.error("Error during AI extraction:", e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to extract leads with AI. ${errorMessage} Please check the console for more details.`);
    } finally {
      setIsLoading(false);
    }
  }, [htmlInput]);

  const handleDownload = useCallback(() => {
    if (leads.length > 0) {
      downloadCsv(leads, 'odoo_leads.csv');
    }
  }, [leads]);
  
  const handleCopy = useCallback(async () => {
    if (leads.length > 0) {
      const success = await copyCsvToClipboard(leads);
      if (success) {
        setToastMessage('Copied to clipboard!');
      } else {
        setError('Failed to copy to clipboard. Your browser might not support this feature.');
      }
    }
  }, [leads]);


  return (
    <div className="min-h-screen font-sans text-neutral-800 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 space-y-8">
          <Header />
          <Instructions />
          
          <div className="space-y-4">
            <HtmlInput value={htmlInput} onChange={setHtmlInput} disabled={isLoading} />
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
          </div>
          
          <ActionButtons
            onExtract={handleExtractLeads}
            isExtracting={isLoading}
          />
          
          {isLoading && <Loader />}
          
          {!isLoading && leads.length > 0 && (
            <div className="mt-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <h2 className="text-2xl font-bold text-neutral-700 text-center sm:text-left">
                  Extracted Leads ({leads.length})
                </h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCopy}
                        className="px-4 py-2 bg-secondary text-white font-semibold text-sm rounded-md shadow-sm hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
                    >
                        Copy to Clipboard
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-primary text-white font-semibold text-sm rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                    >
                        Download CSV
                    </button>
                </div>
              </div>
              <LeadsTable leads={leads} />
            </div>
          )}
        </div>
      </div>
       <footer className="text-center mt-8 text-neutral-500 text-sm">
        <p>Powered by Gemini AI</p>
      </footer>
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
};

export default App;
