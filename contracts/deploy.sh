#!/bin/bash

# DataGuard Smart Contract Deployment Script
# This script deploys the DataGuard contract to Stellar Testnet

set -e

echo "🚀 Starting DataGuard Smart Contract Deployment..."

# Check if stellar CLI is installed
if ! command -v stellar &> /dev/null; then
    echo "❌ Stellar CLI not found. Please install it first:"
    echo "   cargo install --locked stellar-cli"
    exit 1
fi

# Build the contract
echo "📦 Building smart contract..."
cargo build --target wasm32-unknown-unknown --release

# Deploy to testnet
echo "🌐 Deploying to Stellar Testnet..."

# Generate a new keypair for deployment (you should use your own)
DEPLOYER_SECRET="SCDQNY3PBOJOKYZSRMK2S7LHHGWZIUISD4QORETLMXEWXBI7KFZZMKTL3"

# Deploy the contract
CONTRACT_ID=$(stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/dataguard_contract.wasm \
    --source $DEPLOYER_SECRET \
    --network testnet)

echo "✅ Contract deployed successfully!"
echo "📋 Contract ID: $CONTRACT_ID"

# Initialize the contract
echo "🔧 Initializing contract..."
stellar contract invoke \
    --id $CONTRACT_ID \
    --source $DEPLOYER_SECRET \
    --network testnet \
    -- initialize \
    --admin GDQNY3PBOJOKYZSRMK2S7LHHGWZIUISD4QORETLMXEWXBI7KFZZMKTL3

echo "✅ Contract initialized successfully!"

# Save contract ID to config file
echo "💾 Saving contract configuration..."
cat > contract-config.js << EOF
// DataGuard Smart Contract Configuration
export const CONTRACT_CONFIG = {
  contractId: '$CONTRACT_ID',
  network: 'testnet',
  horizonUrl: 'https://horizon-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  deployedAt: '$(date -u +"%Y-%m-%dT%H:%M:%SZ")',
  deployer: 'GDQNY3PBOJOKYZSRMK2S7LHHGWZIUISD4QORETLMXEWXBI7KFZZMKTL3'
};
EOF

echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Contract Details:"
echo "   Contract ID: $CONTRACT_ID"
echo "   Network: Stellar Testnet"
echo "   Explorer: https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID"
echo "   Laboratory: https://laboratory.stellar.org/#explorer?resource=contracts&endpoint=single&network=test"
echo ""
echo "🔧 Next Steps:"
echo "   1. Update your frontend configuration with the new contract ID"
echo "   2. Test the contract functions using the Stellar Laboratory"
echo "   3. Update your environment variables"