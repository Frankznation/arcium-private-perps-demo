# Solana Program Setup Guide

This project uses the following prerequisites:

- **Rust** (latest stable)
- **Solana CLI** v2.3.0+
- **Anchor** 0.32.1
- **Arcium CLI** (for private computation)
- **Node.js** 18+

## Installation Steps

### 1. Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustc --version
```

### 2. Install Solana CLI

```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
solana --version  # Should show v2.3.0 or higher
```

### 3. Install Anchor 0.32.1

```bash
# Install avm (Anchor Version Manager)
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# Install Anchor 0.32.1
avm install 0.32.1
avm use 0.32.1

# Verify installation
anchor --version  # Should show 0.32.1
```

### 4. Install Arcium CLI

```bash
# Follow Arcium documentation for CLI installation
# Typically:
npm install -g @arcium/cli
# OR
cargo install arcium-cli

# Verify installation
arcium --version
```

### 5. Install Node.js 18+

```bash
# Using nvm (recommended)
nvm install 18
nvm use 18

# Or download from https://nodejs.org/
node --version  # Should show v18.x or higher
```

## Build and Deploy

### Build the Solana Program

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone

# Build the Anchor program
anchor build

# This will:
# 1. Compile the Rust program
# 2. Generate the IDL (Interface Definition Language)
# 3. Create the program binary
```

### Deploy to Localnet

```bash
# Start local validator
solana-test-validator

# In another terminal, deploy
anchor deploy

# Or deploy to devnet
solana config set --url devnet
anchor deploy --provider.cluster devnet
```

### Deploy to Mainnet

```bash
# Set to mainnet
solana config set --url mainnet-beta

# Build for mainnet
anchor build

# Deploy (requires SOL for fees)
anchor deploy --provider.cluster mainnet-beta
```

## Project Structure

```
arcium-private-perps-standalone/
├── programs/
│   └── private-perps/
│       └── src/
│           └── lib.rs          # Solana program code
├── app/                        # Next.js frontend
├── Anchor.toml                 # Anchor configuration
├── Cargo.toml                  # Rust dependencies
└── package.json                # Node.js dependencies
```

## Key Features

The Solana program includes:

1. **Initialize Trader** - Create a trading account
2. **Deposit Collateral** - Deposit SOL as collateral
3. **Open Private Position** - Store encrypted position data
4. **Place Private Order** - Store encrypted order data
5. **Execute Order Match** - Match orders privately
6. **Check Liquidation Risk** - Private health checks
7. **Settle PnL** - Settle profit/loss
8. **Withdraw Collateral** - Withdraw SOL

## Integration with Arcium

The program stores encrypted data (via Arcium) and uses hash verification:

- `encrypted_position_data`: Encrypted via Arcium SDK
- `position_hash`: Keccak hash for verification
- Private computation happens off-chain via Arcium network
- Only results (PnL, liquidation status) are stored on-chain

## Testing

```bash
# Run Anchor tests
anchor test

# Run specific test file
anchor test --skip-local-validator tests/test_private_perps.ts
```

## Troubleshooting

**Issue: Anchor version mismatch**
```bash
avm use 0.32.1
anchor build --clean
```

**Issue: Solana CLI not found**
```bash
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
```

**Issue: Rust not found**
```bash
source $HOME/.cargo/env
```

**Issue: Program ID mismatch**
```bash
# Update the program ID in lib.rs and Anchor.toml
anchor keys list
anchor build
```

## Next Steps

1. Install all prerequisites
2. Build the program: `anchor build`
3. Deploy to devnet: `anchor deploy --provider.cluster devnet`
4. Update frontend to interact with deployed program
5. Integrate Arcium SDK for encryption
