import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { getStats, getUserRecords } from '../services/contractService';

const Dashboard: React.FC = () => {
  const { isWalletConnected, publicKey } = useWallet();
  const [stats, setStats] = useState<any>(null);
  const [userRecords, setUserRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isWalletConnected) {
      loadDashboardData();
    }
  }, [isWalletConnected, publicKey]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, userRecordsData] = await Promise.all([
        getStats(),
        publicKey ? getUserRecords(publicKey) : Promise.resolve([])
      ]);
      
      setStats(statsData);
      setUserRecords(userRecordsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
          <p className="text-gray-600 mb-4">Please connect your Stellar wallet to view dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600">
            Overview of your data protection activity and platform statistics
          </p>
        </div>

        {/* Personal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">My Records</p>
                <p className="text-2xl font-bold text-gray-900">{userRecords.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💾</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Size</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatFileSize(userRecords.reduce((sum, r) => sum + r.fileSize, 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(userRecords.map(r => r.category)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last Upload</p>
                <p className="text-sm font-bold text-gray-900">
                  {userRecords.length > 0 
                    ? new Date(Math.max(...userRecords.map(r => new Date(r.timestamp).getTime()))).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Records */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Records</h3>
            {userRecords.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📭</span>
                </div>
                <p className="text-gray-600">No records yet</p>
                <p className="text-sm text-gray-500">Upload your first file to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userRecords
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .slice(0, 5)
                  .map((record) => (
                    <div key={record.recordId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-lg">{getCategoryIcon(record.category)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{record.title}</p>
                        <p className="text-xs text-gray-500">{new Date(record.timestamp).toLocaleDateString()}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatFileSize(record.fileSize)}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Data by Category</h3>
            {userRecords.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📊</span>
                </div>
                <p className="text-gray-600">No data to display</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(
                  userRecords.reduce((acc, record) => {
                    acc[record.category] = (acc[record.category] || 0) + 1;
                    return acc;
                  }, {} as { [key: string]: number })
                ).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{getCategoryIcon(category)}</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${((count as number) / userRecords.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{count as number}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Platform Stats */}
        {stats && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalRecords}</div>
                <div className="text-sm text-gray-600">Total Records</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.totalUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Object.keys(stats.categories).length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>

            {/* Global Category Distribution */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">Global Data Distribution</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(stats.categories).map(([category, count]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">{getCategoryIcon(category)}</div>
                    <div className="text-sm font-medium text-gray-900 capitalize">{category}</div>
                    <div className="text-xs text-gray-600">{count as number} records</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;