# Arcium Integration Guide

This guide covers setting up Arcium for private computation in the Private Perps platform.

## Prerequisites

- Arcium CLI installed (see SETUP_SOLANA.md)
- Arcium account and cluster ID
- Solana program deployed

## Quick Start

### 1. Install Arcium CLI

```bash
curl --proto '=https' --tlsv1.2 -sSfL https://install.arcium.com/ | bash
export PATH="$HOME/.arcium/bin:$PATH"
arcium --version
```

### 2. Build Program with Arcium Circuits

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone

# Build Anchor program + Arcium circuits
arcium build

# This generates:
# - target/deploy/private_perps.so (Solana program)
# - build/*.arcis files (Arcium circuits)
```

### 3. Deploy Solana Program

```bash
# Deploy to devnet
solana program deploy target/deploy/private_perps.so \
  --url devnet --use-rpc

# Save the program ID for later use
export PROGRAM_ID=$(solana address -k target/deploy/private_perps-keypair.json)
echo "Program ID: $PROGRAM_ID"
```

### 4. Initialize Arcium MXE

```bash
# Get your cluster ID from Arcium dashboard
# Replace <cluster-id> with your actual cluster ID

arcium mxe init \
  --cluster-id <your-cluster-id> \
  --recovery-set-size 4

# For devnet, recovery-set-size of 4 is sufficient
# For mainnet, use higher values (8-16) for better security
```

### 5. Upload Arcium Circuits

```bash
# Upload each circuit that was built
arcium mxe upload-circuit build/open_position.arcis
arcium mxe upload-circuit build/place_order.arcis
arcium mxe upload-circuit build/check_liquidation.arcis
arcium mxe upload-circuit build/settle_pnl.arcis

# Verify circuits are uploaded
arcium mxe list-circuits
```

## Circuit Descriptions

### open_position.arcis
- **Purpose**: Encrypts position data before storing on-chain
- **Inputs**: Position size, direction, leverage, entry price
- **Outputs**: Encrypted data blob + hash for verification
- **Privacy**: Position details remain private, only hash is public

### place_order.arcis
- **Purpose**: Encrypts order intent for private order matching
- **Inputs**: Order type, size, price limit
- **Outputs**: Encrypted order data + hash
- **Privacy**: Order intent hidden until execution

### check_liquidation.arcis
- **Purpose**: Privately computes position health ratio
- **Inputs**: Encrypted position data, current price
- **Outputs**: Health ratio, liquidatable boolean
- **Privacy**: Only result (liquidatable: yes/no) is revealed

### settle_pnl.arcis
- **Purpose**: Privately computes profit/loss
- **Inputs**: Encrypted position data, current price
- **Outputs**: PnL amount (can be negative)
- **Privacy**: Only final PnL revealed, position details hidden

## Frontend Integration

In your Next.js frontend, use the Arcium SDK to encrypt data:

```typescript
import { ArciumSDK } from '@arcium/sdk';

const arcium = new ArciumSDK({
  clusterId: process.env.NEXT_PUBLIC_ARCIUM_CLUSTER_ID,
});

// Encrypt position data
const encryptedData = await arcium.encrypt({
  size: positionSize,
  direction: 'long',
  leverage: 10,
  entryPrice: entryPrice,
});

// Generate hash for verification
const hash = keccak256(encryptedData);

// Call Solana program with encrypted data
await program.methods
  .openPrivatePosition(encryptedData, hash)
  .accounts({...})
  .rpc();
```

## Environment Variables

Add to your `.env`:

```bash
# Arcium Configuration
NEXT_PUBLIC_ARCIUM_CLUSTER_ID=your-cluster-id
ARCIUM_API_KEY=your-api-key  # If required

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=your-program-id
```

## Testing Private Computation

```bash
# Test circuit execution
arcium mxe execute-circuit \
  --circuit-id <circuit-id> \
  --input '{"size": 100, "direction": "long", "leverage": 10}'

# Verify encryption
arcium mxe verify-circuit <circuit-id>
```

## Troubleshooting

**Issue: Arcium CLI not found**
```bash
export PATH="$HOME/.arcium/bin:$PATH"
# Or add to ~/.bashrc or ~/.zshrc
```

**Issue: Cluster ID not found**
- Check Arcium dashboard for your cluster ID
- Ensure you have an active Arcium account

**Issue: Circuit upload fails**
```bash
# Verify circuit file exists
ls -la build/*.arcis

# Check circuit format
arcium mxe validate-circuit build/open_position.arcis
```

**Issue: MXE initialization fails**
- Ensure cluster ID is correct
- Check recovery-set-size (must be >= 4)
- Verify network connectivity

## Next Steps

1. Complete Arcium setup
2. Update frontend to use Arcium SDK
3. Test end-to-end flow:
   - Connect wallet
   - Open private position
   - Check PnL
   - Check liquidation risk
4. Deploy to mainnet when ready

## Resources

- Arcium Documentation: https://docs.arcium.com
- Arcium Dashboard: https://dashboard.arcium.com
- Solana Devnet Explorer: https://explorer.solana.com/?cluster=devnet
