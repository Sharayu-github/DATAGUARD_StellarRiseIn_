import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';
import { getUserRecords, getAllRecords } from '../services/contractService';

interface Record {
  recordId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  fileName: string;
  fileSize: number;
  timestamp: string;
  owner: string;
  blockchainTxId?: string;
}

const RecordsPage: React.FC = () => {
  const { isWalletConnected, publicKey } = useWallet();
  const { addToast } = useToast();
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'my' | 'all'>('my');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadRecords();
  }, [viewMode, publicKey]);

  const loadRecords = async () => {
    setLoading(true);
    try {
      let fetchedRecords: Record[] = [];
      
      if (viewMode === 'my' && publicKey) {
        fetchedRecords = await getUserRecords(publicKey);
      } else {
        fetchedRecords = await getAllRecords();
      }
      
      setRecords(fetchedRecords);
    } catch (error) {
      console.error('Failed to load records:', error);
      addToast('Failed to load records', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(records.map(r => r.category)))];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const copyRecordId = (recordId: string) => {
    navigator.clipboard.writeText(recordId);
    addToast('Record ID copied to clipboard!', 'success');
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      document: '📄',
      image: '🖼️',
      video: '🎥',
      audio: '🎵',
      code: '💻',
      data: '📊',
      other: '📁'
    };
    return icons[category] || '📁';
  };

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wallet Required</h2>
          <p className="text-gray-600 mb-4">Please connect your Stellar wallet to view records.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Records</h1>
          <p className="text-gray-600">
            Browse and manage your protected data records
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('my')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'my'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Records ({records.filter(r => r.owner === publicKey).length})
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Records ({records.length})
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Records Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📭</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
            <p className="text-gray-600">
              {viewMode === 'my' 
                ? "You haven't uploaded any data yet." 
                : "No records match your search criteria."
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecords.map((record) => (
              <div key={record.recordId} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getCategoryIcon(record.category)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate">{record.title}</h3>
                      <p className="text-xs text-gray-500">{record.category}</p>
                    </div>
                  </div>
                  {record.owner === publicKey && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Mine
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{record.description || 'No description'}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{record.fileName}</span>
                    <span>{formatFileSize(record.fileSize)}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(record.timestamp).toLocaleDateString()}
                  </p>
                </div>

                {record.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {record.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {record.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{record.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Record ID:</span>
                    <button
                      onClick={() => copyRecordId(record.recordId)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-mono bg-gray-50 px-2 py-1 rounded"
                      title="Click to copy"
                    >
                      {record.recordId.slice(0, 12)}...
                    </button>
                  </div>
                  {record.blockchainTxId && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">Blockchain TX:</span>
                      <span className="text-xs text-gray-400 font-mono">
                        {record.blockchainTxId.slice(0, 12)}...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && filteredRecords.length > 0 && (
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{filteredRecords.length}</div>
                <div className="text-sm text-gray-600">Records Shown</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {filteredRecords.filter(r => r.owner === publicKey).length}
                </div>
                <div className="text-sm text-gray-600">Your Records</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {categories.length - 1}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatFileSize(filteredRecords.reduce((sum, r) => sum + r.fileSize, 0))}
                </div>
                <div className="text-sm text-gray-600">Total Size</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordsPage;