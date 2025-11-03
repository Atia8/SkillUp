// src/components/skills/CertificateUpload.jsx
import { useState } from 'react';

const CertificateUpload = ({ onCertificateChange }) => {
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState(null);

  const handleCertificateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if it's a PDF
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }
      
      // Check file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      setCertificateFile(file);
      setCertificatePreview(URL.createObjectURL(file));
      onCertificateChange(file); // Pass file to parent
    }
  };

  const removeCertificate = () => {
    setCertificateFile(null);
    setCertificatePreview(null);
    onCertificateChange(null); // Notify parent
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
        Certificate (Optional)
      </label>
      
      {!certificateFile ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            id="certificate-upload"
            accept=".pdf"
            onChange={handleCertificateUpload}
            className="hidden"
          />
          <label
            htmlFor="certificate-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm text-gray-600">
              Click to upload certificate PDF
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Maximum file size: 5MB
            </span>
          </label>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {certificateFile.name}
              </span>
            </div>
            <button
              type="button"
              onClick={removeCertificate}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateUpload;