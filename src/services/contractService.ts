// Mock contract service for development
// In production, this would interact with actual Stellar smart contracts

interface RecordData {
  recordId: string;
  fileHash: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  fileName: string;
  fileSize: number;
  mimeType: string;
  owner: string;
  timestamp: string;
}

interface StoredRecord extends RecordData {
  blockchainTxId?: string;
}

// Mock storage (in production, this would be blockchain)
const mockStorage: { [key: string]: StoredRecord } = {};

export const storeRecord = async (recordData: RecordData): Promise<string> => {
  // Simulate blockchain transaction delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate mock transaction ID
  const txId = `TX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Store record with transaction ID
  const storedRecord: StoredRecord = {
    ...recordData,
    blockchainTxId: txId
  };
  
  mockStorage[recordData.recordId] = storedRecord;
  
  // Also store by hash for verification
  mockStorage[recordData.fileHash] = storedRecord;
  
  console.log('Record stored on blockchain:', storedRecord);
  
  return txId;
};

export const getRecord = async (recordId: string): Promise<StoredRecord | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockStorage[recordId] || null;
};

export const verifyRecord = async (recordId: string, fileHash: string): Promise<{
  isValid: boolean;
  record?: StoredRecord;
  message: string;
}> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const record = mockStorage[recordId];
  
  if (!record) {
    return {
      isValid: false,
      message: 'Record not found on blockchain'
    };
  }
  
  if (record.fileHash === fileHash) {
    return {
      isValid: true,
      record,
      message: 'File is authentic and unmodified'
    };
  } else {
    return {
      isValid: false,
      record,
      message: 'File has been modified or corrupted'
    };
  }
};

export const getUserRecords = async (ownerAddress: string): Promise<StoredRecord[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return Object.values(mockStorage).filter(record => 
    record.owner === ownerAddress && record.recordId.startsWith('DG_')
  );
};

export const getAllRecords = async (): Promise<StoredRecord[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return Object.values(mockStorage).filter(record => 
    record.recordId.startsWith('DG_')
  );
};

export const getStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const records = Object.values(mockStorage).filter(record => 
    record.recordId.startsWith('DG_')
  );
  
  const categories = records.reduce((acc, record) => {
    acc[record.category] = (acc[record.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  return {
    totalRecords: records.length,
    totalUsers: new Set(records.map(r => r.owner)).size,
    categories,
    recentRecords: records
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5)
  };
};