import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  isConnected, 
  getAddress, 
  signTransaction
} from '@stellar/freighter-api';

interface WalletContextType {
  isWalletConnected: boolean;
  publicKey: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signTransaction: (xdr: string) => Promise<string>;
  isTestMode: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const connectionResult = await isConnected();
      if (connectionResult.isConnected) {
        const addressResult = await getAddress();
        if (addressResult.address) {
          setPublicKey(addressResult.address);
          setIsWalletConnected(true);
          setIsTestMode(false);
        } else {
          throw new Error('No address available');
        }
      } else {
        // Enable test mode if Freighter is not available
        setIsTestMode(true);
        setPublicKey('GDQNY3PBOJOKYZSRMK2S7LHHGWZIUISD4QORETLMXEWXBI7KFZZMKTL3'); // Test public key
        setIsWalletConnected(true);
      }
    } catch (error) {
      console.log('Freighter not available, enabling test mode');
      setIsTestMode(true);
      setPublicKey('GDQNY3PBOJOKYZSRMK2S7LHHGWZIUISD4QORETLMXEWXBI7KFZZMKTL3'); // Test public key
      setIsWalletConnected(true);
    }
  };

  const connectWallet = async () => {
    try {
      const connectionResult = await isConnected();
      if (connectionResult.isConnected) {
        const addressResult = await getAddress();
        if (addressResult.address) {
          setPublicKey(addressResult.address);
          setIsWalletConnected(true);
          setIsTestMode(false);
        } else {
          throw new Error('No address available');
        }
      } else {
        throw new Error('Freighter wallet not found');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // Fall back to test mode
      setIsTestMode(true);
      setPublicKey('GDQNY3PBOJOKYZSRMK2S7LHHGWZIUISD4QORETLMXEWXBI7KFZZMKTL3');
      setIsWalletConnected(true);
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setPublicKey(null);
    setIsTestMode(false);
  };

  const handleSignTransaction = async (xdr: string): Promise<string> => {
    if (isTestMode) {
      // Return mock signed transaction for test mode
      return xdr + '_signed_test';
    }
    
    try {
      const result = await signTransaction(xdr, {
        networkPassphrase: 'Test SDF Network ; September 2015',
        address: publicKey!
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result.signedTxXdr;
    } catch (error) {
      console.error('Failed to sign transaction:', error);
      throw error;
    }
  };

  const value: WalletContextType = {
    isWalletConnected,
    publicKey,
    connectWallet,
    disconnectWallet,
    signTransaction: handleSignTransaction,
    isTestMode
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};