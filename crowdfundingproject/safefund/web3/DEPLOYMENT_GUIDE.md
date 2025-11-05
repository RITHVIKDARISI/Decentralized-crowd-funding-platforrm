# 🚀 Smart Contract Deployment Guide

## What Was Fixed
- ✅ Fixed deadline validation bug (changed `<` to `>`)
- ✅ Now properly validates that deadline is in the FUTURE
- ✅ Updated Hardhat config for Sepolia testnet

## Prerequisites

1. **MetaMask Wallet** with Sepolia ETH
   - Get free Sepolia ETH from: https://sepoliafaucet.com/

2. **Your Private Key**
   - Open MetaMask → Click 3 dots → Account Details → Export Private Key
   - ⚠️ NEVER share this with anyone!

## Step-by-Step Deployment

### 1. Setup Environment Variables

Create a `.env` file in the `web3` folder:

```bash
cd web3
```

Create `.env` file with:
```
PRIVATE_KEY=your_private_key_here_without_0x_prefix
```

⚠️ **Important:** Remove the `0x` prefix from your private key!

### 2. Install Dependencies

```bash
npm install
```

### 3. Compile the Contract

```bash
npm run compile
```

You should see:
```
Compiled 1 Solidity file successfully
```

### 4. Deploy to Sepolia

```bash
npm run deploy:sepolia
```

You should see output like:
```
Deploying CrowdFunding contract to Sepolia...
✅ CrowdFunding contract deployed to: 0xYourNewContractAddress

📝 Update this address in your client code:
   - client/src/client.ts
   - client/src/context/index.jsx
```

### 5. Update Client Code

Copy the new contract address and update these files:

**File 1: `client/src/client.ts`**
```typescript
export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xYourNewContractAddress", // ← Update this
});
```

**File 2: `client/src/context/index.jsx`**
```javascript
const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: '0xYourNewContractAddress', // ← Update this
});
```

### 6. Test the Application

```bash
cd ../client
npm run dev
```

Now try creating a campaign with:
- A future date for the deadline
- Valid ETH amount (e.g., 0.5)
- All required fields filled

## Troubleshooting

### Error: "insufficient funds"
- Make sure you have Sepolia ETH in your wallet
- Get free test ETH from: https://sepoliafaucet.com/

### Error: "invalid private key"
- Check that you removed the `0x` prefix from your private key in `.env`
- Make sure there are no spaces or quotes around the key

### Error: "network not found"
- Make sure you're connected to Sepolia in MetaMask
- Check that the RPC URL in `hardhat.config.js` is correct

### Contract not deploying
- Run `npm run compile` first
- Check that your `.env` file exists and has the correct private key
- Verify you have Sepolia ETH

## Verify on Etherscan

After deployment, view your contract on Sepolia Etherscan:
```
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

## Security Notes

⚠️ **NEVER commit your `.env` file to git!**
- The `.env` file is already in `.gitignore`
- Never share your private key with anyone
- Use a separate wallet for testing (not your main wallet)

## What Changed in the Contract

**Before (Bug):**
```solidity
require(campaign.deadline < block.timestamp, "...");
```

**After (Fixed):**
```solidity
require(_deadline > block.timestamp, "...");
```

This now correctly validates that the deadline is in the future! 🎉
