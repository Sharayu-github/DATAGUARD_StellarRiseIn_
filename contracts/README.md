# DataGuard Smart Contract

A Rust-based Soroban smart contract for secure data protection on the Stellar blockchain.

## Features

- **Data Record Storage**: Store cryptographic hashes of files immutably on blockchain
- **Ownership Control**: Only record owners can modify their data
- **Verification System**: Verify file integrity by comparing hashes
- **Statistics Tracking**: Monitor contract usage and user activity
- **Emergency Controls**: Admin functions for contract management

## Contract Functions

### Core Functions

#### `store_record`
Store a new data record on the blockchain.

**Parameters:**
- `record_id: String` - Unique identifier for the record
- `file_hash: String` - SHA-256 hash of the file
- `owner: Address` - Stellar address of the record owner
- `title: String` - Human-readable title
- `category: String` - Data category (document, image, etc.)
- `file_size: u64` - Size of the original file in bytes
- `metadata: String` - Additional metadata as JSON string

**Returns:** `bool` - Success status

#### `verify_record`
Verify a record by comparing file hash.

**Parameters:**
- `record_id: String` - Record identifier
- `file_hash: String` - Hash to verify against

**Returns:** `bool` - True if hashes match

#### `get_record`
Retrieve record information by ID.

**Parameters:**
- `record_id: String` - Record identifier

**Returns:** `Option<DataRecord>` - Record data or None

### Query Functions

#### `get_user_records`
Get all records for a specific owner.

**Parameters:**
- `owner: Address` - Owner's Stellar address

**Returns:** `Vec<DataRecord>` - Array of user's records

#### `get_all_records`
Get all records (public view).

**Returns:** `Vec<DataRecord>` - Array of all records

#### `get_stats`
Get contract statistics.

**Returns:** `ContractStats` - Usage statistics

### Administrative Functions

#### `initialize`
Initialize the contract with an admin address (one-time only).

**Parameters:**
- `admin: Address` - Admin Stellar address

#### `update_metadata`
Update record metadata (owner only).

**Parameters:**
- `record_id: String` - Record identifier
- `new_metadata: String` - Updated metadata
- `owner: Address` - Record owner address

**Returns:** `bool` - Success status

#### `emergency_pause`
Emergency pause function (admin only).

**Parameters:**
- `admin: Address` - Admin address

**Returns:** `bool` - Success status

## Data Structures

### DataRecord
```rust
pub struct DataRecord {
    pub record_id: String,
    pub file_hash: String,
    pub owner: Address,
    pub title: String,
    pub category: String,
    pub timestamp: u64,
    pub file_size: u64,
    pub metadata: String,
}
```

### ContractStats
```rust
pub struct ContractStats {
    pub total_records: u32,
    pub total_users: u32,
}
```

## Deployment

### Prerequisites

1. **Install Rust and Cargo**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Install Stellar CLI**
   ```bash
   cargo install --locked stellar-cli
   ```

3. **Add WebAssembly target**
   ```bash
   rustup target add wasm32-unknown-unknown
   ```

### Build Contract

```bash
cargo build --target wasm32-unknown-unknown --release
```

### Deploy to Testnet

```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual Deployment

```bash
# Deploy contract
stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/dataguard_contract.wasm \
    --source YOUR_SECRET_KEY \
    --network testnet

# Initialize contract
stellar contract invoke \
    --id CONTRACT_ID \
    --source YOUR_SECRET_KEY \
    --network testnet \
    -- initialize \
    --admin YOUR_PUBLIC_KEY
```

## Testing

### Unit Tests

```bash
cargo test
```

### Integration Testing

Use the Stellar Laboratory to test contract functions:
1. Visit https://laboratory.stellar.org/
2. Navigate to "Explore and Execute Contracts"
3. Enter your contract ID
4. Test individual functions

### Example Function Calls

#### Store a Record
```bash
stellar contract invoke \
    --id CONTRACT_ID \
    --source SECRET_KEY \
    --network testnet \
    -- store_record \
    --record_id "DG_123456789" \
    --file_hash "a1b2c3d4e5f6..." \
    --owner PUBLIC_KEY \
    --title "My Document" \
    --category "document" \
    --file_size 1024 \
    --metadata "{\"description\":\"Important document\"}"
```

#### Verify a Record
```bash
stellar contract invoke \
    --id CONTRACT_ID \
    --source SECRET_KEY \
    --network testnet \
    -- verify_record \
    --record_id "DG_123456789" \
    --file_hash "a1b2c3d4e5f6..."
```

## Security Features

- **Access Control**: Only record owners can modify their data
- **Immutable Storage**: Records cannot be deleted, only metadata updated
- **Hash Verification**: Cryptographic proof of file integrity
- **Admin Controls**: Emergency functions for contract management
- **Input Validation**: Comprehensive parameter validation

## Gas Optimization

- Efficient data structures using Soroban SDK
- Minimal storage operations
- Optimized iteration patterns
- Batch operations where possible

## Error Handling

The contract includes comprehensive error handling:
- Duplicate record prevention
- Ownership verification
- Input validation
- Initialization checks

## Integration

### Frontend Integration

Use the contract service in your React application:

```javascript
import { CONTRACT_CONFIG } from './contract-config.js';

// Store a record
const result = await contractService.storeRecord(keypair, recordData);

// Verify a record
const isValid = await contractService.verifyRecord(recordId, fileHash);
```

### Backend Integration

Integrate with your Node.js backend for additional functionality:

```javascript
const { Server } = require('stellar-sdk');
const server = new Server('https://horizon-testnet.stellar.org');

// Monitor contract events
server.operations()
  .forAccount(CONTRACT_ID)
  .cursor('now')
  .stream({
    onmessage: (operation) => {
      console.log('Contract operation:', operation);
    }
  });
```

## Monitoring

### Contract Explorer
- **Stellar Expert**: https://stellar.expert/explorer/testnet/contract/CONTRACT_ID
- **Stellar Laboratory**: https://laboratory.stellar.org/

### Metrics
- Total records stored
- Active users
- Transaction volume
- Error rates

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure Rust and wasm32 target are installed
   - Check Cargo.toml dependencies

2. **Deployment Failures**
   - Verify Stellar CLI installation
   - Check network connectivity
   - Ensure sufficient XLM balance

3. **Function Call Errors**
   - Verify contract initialization
   - Check parameter types and values
   - Ensure proper authentication

### Debug Mode

Enable debug logging:
```bash
RUST_LOG=debug cargo test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- GitHub Issues: Create an issue in the repository
- Documentation: Check the integration guides
- Community: Join the Stellar Discord

---

**Built with ❤️ for Data Security and Blockchain Innovation**