import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';
import { hashFile } from '../services/hashService';
import { storeRecord } from '../services/contractService';

const UploadPage: React.FC = () => {
  const { isWalletConnected, publicKey } = useWallet();
  const { addToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'document',
    tags: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!formData.title) {
        setFormData(prev => ({ ...prev, title: selectedFile.name }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      addToast('Please select a file to upload', 'error');
      return;
    }

    if (!isWalletConnected) {
      addToast('Please connect your wallet first', 'error');
      return;
    }

    setIsUploading(true);

    try {
      // Generate file hash
      const fileHash = await hashFile(file);
      
      // Generate unique record ID
      const newRecordId = `DG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Prepare record data
      const recordData = {
        recordId: newRecordId,
        fileHash,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        owner: publicKey!,
        timestamp: new Date().toISOString()
      };

      // Store on blockchain
      await storeRecord(recordData);
      
      setRecordId(newRecordId);
      addToast('Data successfully protected on blockchain!', 'success');
      
      // Reset form
      setFile(null);
      setFormData({
        title: '',
        description: '',
        category: 'document',
        tags: ''
      });
      
    } catch (error) {
      console.error('Upload failed:', error);
      addToast('Failed to protect data. Please try again.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isWalletConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wallet Required</h2>
          <p className="text-gray-600 mb-4">Please connect your Stellar wallet to upload data.</p>
        </div>
      </div>
    );
  }

  if (recordId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protected!</h2>
          <p className="text-gray-600 mb-6">Your data has been successfully secured on the blockchain.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Record ID:</p>
            <p className="font-mono text-sm bg-white p-2 rounded border break-all">{recordId}</p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(recordId);
                addToast('Record ID copied to clipboard!', 'success');
              }}
              className="btn-primary w-full"
            >
              Copy Record ID
            </button>
            <button
              onClick={() => setRecordId(null)}
              className="btn-secondary w-full"
            >
              Upload Another File
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1>
          <span>Upload Health Record</span> 📤
        </h1>
      </div>

      <div className="card large-card max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File *
            </label>
            <div className="file-upload-area">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept="*/*"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
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
                    <p className="text-sm text-gray-600">Click to select a file</p>
                    <p className="text-xs text-gray-400">Any file type supported</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Enter a title for your data"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="form-textarea"
              placeholder="Describe your data (optional)"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="document">Document</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="code">Code</option>
              <option value="data">Data File</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter tags separated by commas"
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: important, contract, backup
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!file || isUploading}
            className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isUploading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Protecting Data...
              </>
            ) : (
              <>
                🛡️ Protect Data on Blockchain
              </>
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-blue-400 mr-3 mt-0.5">ℹ️</div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">How it works:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Your file is hashed using SHA-256 cryptography</li>
                <li>Only the hash is stored on the blockchain, not your file</li>
                <li>You keep the original file and can verify it anytime</li>
                <li>Transaction fee: ~0.01 XLM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;