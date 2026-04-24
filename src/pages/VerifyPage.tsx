import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { hashFile } from '../services/hashService';
import { verifyRecord } from '../services/contractService';

const VerifyPage: React.FC = () => {
  const { addToast } = useToast();
  const [recordId, setRecordId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recordId.trim()) {
      addToast('Please enter a Record ID', 'error');
      return;
    }

    if (!file) {
      addToast('Please select a file to verify', 'error');
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      // Generate file hash
      const fileHash = await hashFile(file);
      
      // Verify against blockchain
      const result = await verifyRecord(recordId.trim(), fileHash);
      
      setVerificationResult(result);
      
      if (result.isValid) {
        addToast('Verification successful! File is authentic.', 'success');
      } else {
        addToast('Verification failed! File may be modified.', 'error');
      }
      
    } catch (error) {
      console.error('Verification failed:', error);
      addToast('Verification failed. Please try again.', 'error');
    } finally {
      setIsVerifying(false);
    }
  };

  const resetForm = () => {
    setRecordId('');
    setFile(null);
    setVerificationResult(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1>
          <span>Verify Data Integrity</span> ✅
        </h1>
      </div>

      <div className="card large-card max-w-2xl mx-auto">
        <form onSubmit={handleVerify} className="space-y-6">
          {/* Record ID Input */}
          <div>
            <label htmlFor="recordId" className="block text-sm font-medium text-gray-700 mb-2">
              Record ID *
            </label>
            <input
              type="text"
              id="recordId"
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
              required
              className="form-input font-mono text-sm"
              placeholder="DG_1234567890_abcdef123"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the Record ID you received when uploading your data
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File to Verify *
            </label>
            <div className="file-upload-area">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="verify-file-upload"
                accept="*/*"
              />
              <label htmlFor="verify-file-upload" className="cursor-pointer">
                {file ? (
                  <div>
                    <div className="text-2xl mb-2">📄</div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl mb-2">📁</div>
                    <p className="text-sm text-gray-600">Click to select the file to verify</p>
                    <p className="text-xs text-gray-400">Must be the same file you originally uploaded</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!recordId.trim() || !file || isVerifying}
            className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isVerifying ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Verifying...
              </>
            ) : (
              <>
                🔍 Verify Data Integrity
              </>
            )}
          </button>
        </form>

        {/* Verification Result */}
        {verificationResult && (
          <div className="mt-8 p-6 rounded-lg border-2 border-dashed">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                verificationResult.isValid 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                <span className="text-2xl">
                  {verificationResult.isValid ? '✅' : '❌'}
                </span>
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${
                verificationResult.isValid ? 'text-green-600' : 'text-red-600'
              }`}>
                {verificationResult.isValid ? 'Verification Successful' : 'Verification Failed'}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {verificationResult.message}
              </p>

              {verificationResult.record && (
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Record Details:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Title:</span> {verificationResult.record.title}</p>
                    <p><span className="font-medium">Category:</span> {verificationResult.record.category}</p>
                    <p><span className="font-medium">Upload Date:</span> {new Date(verificationResult.record.timestamp).toLocaleString()}</p>
                    <p><span className="font-medium">File Size:</span> {(verificationResult.record.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                    {verificationResult.record.blockchainTxId && (
                      <p><span className="font-medium">Blockchain TX:</span> 
                        <span className="font-mono text-xs ml-1">{verificationResult.record.blockchainTxId}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={resetForm}
                className="btn-secondary mt-4"
              >
                Verify Another File
              </button>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-blue-400 mr-3 mt-0.5">ℹ️</div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">How verification works:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>We generate a SHA-256 hash of your uploaded file</li>
                <li>This hash is compared with the one stored on blockchain</li>
                <li>If hashes match, your file is authentic and unmodified</li>
                <li>Any change to the file will result in a different hash</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;