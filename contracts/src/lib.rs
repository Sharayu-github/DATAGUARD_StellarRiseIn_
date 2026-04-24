#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, String, Symbol, Address, Map, Vec};

#[derive(Clone)]
#[contracttype]
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

#[derive(Clone)]
#[contracttype]
pub struct ContractStats {
    pub total_records: u32,
    pub total_users: u32,
}

const RECORDS: Symbol = symbol_short!("RECORDS");
const STATS: Symbol = symbol_short!("STATS");
const ADMIN: Symbol = symbol_short!("ADMIN");

#[contract]
pub struct DataGuardContract;

#[contractimpl]
impl DataGuardContract {
    /// Initialize the contract with an admin address
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&ADMIN) {
            panic!("Contract already initialized");
        }
        
        env.storage().instance().set(&ADMIN, &admin);
        
        let initial_stats = ContractStats {
            total_records: 0,
            total_users: 0,
        };
        env.storage().instance().set(&STATS, &initial_stats);
    }

    /// Store a new data record on the blockchain
    pub fn store_record(
        env: Env,
        record_id: String,
        file_hash: String,
        owner: Address,
        title: String,
        category: String,
        file_size: u64,
        metadata: String,
    ) -> bool {
        // Verify the caller is the owner
        owner.require_auth();

        // Check if record already exists
        let records_key = RECORDS;
        let mut records: Map<String, DataRecord> = env
            .storage()
            .persistent()
            .get(&records_key)
            .unwrap_or(Map::new(&env));

        if records.contains_key(record_id.clone()) {
            return false; // Record already exists
        }

        // Create new record
        let record = DataRecord {
            record_id: record_id.clone(),
            file_hash,
            owner: owner.clone(),
            title,
            category,
            timestamp: env.ledger().timestamp(),
            file_size,
            metadata,
        };

        // Store the record
        records.set(record_id, record);
        env.storage().persistent().set(&records_key, &records);

        // Update statistics
        let mut stats: ContractStats = env
            .storage()
            .instance()
            .get(&STATS)
            .unwrap_or(ContractStats {
                total_records: 0,
                total_users: 0,
            });

        stats.total_records += 1;

        // Check if this is a new user
        let mut is_new_user = true;
        for (_, existing_record) in records.iter() {
            if existing_record.owner == owner {
                is_new_user = false;
                break;
            }
        }

        if is_new_user {
            stats.total_users += 1;
        }

        env.storage().instance().set(&STATS, &stats);

        true
    }

    /// Verify a record by comparing file hash
    pub fn verify_record(env: Env, record_id: String, file_hash: String) -> bool {
        let records_key = RECORDS;
        let records: Map<String, DataRecord> = env
            .storage()
            .persistent()
            .get(&records_key)
            .unwrap_or(Map::new(&env));

        match records.get(record_id) {
            Some(record) => record.file_hash == file_hash,
            None => false,
        }
    }

    /// Get record information by ID
    pub fn get_record(env: Env, record_id: String) -> Option<DataRecord> {
        let records_key = RECORDS;
        let records: Map<String, DataRecord> = env
            .storage()
            .persistent()
            .get(&records_key)
            .unwrap_or(Map::new(&env));

        records.get(record_id)
    }

    /// Get all records for a specific owner
    pub fn get_user_records(env: Env, owner: Address) -> Vec<DataRecord> {
        let records_key = RECORDS;
        let records: Map<String, DataRecord> = env
            .storage()
            .persistent()
            .get(&records_key)
            .unwrap_or(Map::new(&env));

        let mut user_records = Vec::new(&env);
        
        for (_, record) in records.iter() {
            if record.owner == owner {
                user_records.push_back(record);
            }
        }

        user_records
    }

    /// Get all records (public view)
    pub fn get_all_records(env: Env) -> Vec<DataRecord> {
        let records_key = RECORDS;
        let records: Map<String, DataRecord> = env
            .storage()
            .persistent()
            .get(&records_key)
            .unwrap_or(Map::new(&env));

        let mut all_records = Vec::new(&env);
        
        for (_, record) in records.iter() {
            all_records.push_back(record);
        }

        all_records
    }

    /// Get contract statistics
    pub fn get_stats(env: Env) -> ContractStats {
        env.storage()
            .instance()
            .get(&STATS)
            .unwrap_or(ContractStats {
                total_records: 0,
                total_users: 0,
            })
    }

    /// Update record metadata (only by owner)
    pub fn update_metadata(
        env: Env,
        record_id: String,
        new_metadata: String,
        owner: Address,
    ) -> bool {
        owner.require_auth();

        let records_key = RECORDS;
        let mut records: Map<String, DataRecord> = env
            .storage()
            .persistent()
            .get(&records_key)
            .unwrap_or(Map::new(&env));

        match records.get(record_id.clone()) {
            Some(mut record) => {
                if record.owner != owner {
                    return false; // Not the owner
                }
                
                record.metadata = new_metadata;
                records.set(record_id, record);
                env.storage().persistent().set(&records_key, &records);
                true
            }
            None => false, // Record not found
        }
    }

    /// Emergency pause function (admin only)
    pub fn emergency_pause(env: Env, admin: Address) -> bool {
        admin.require_auth();
        
        let stored_admin: Address = env
            .storage()
            .instance()
            .get(&ADMIN)
            .expect("Contract not initialized");

        admin == stored_admin
    }

    /// Get the admin address
    pub fn get_admin(env: Env) -> Option<Address> {
        env.storage().instance().get(&ADMIN)
    }
}