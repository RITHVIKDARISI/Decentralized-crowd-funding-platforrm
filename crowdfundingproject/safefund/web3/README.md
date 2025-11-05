🚀 Getting Started with Thirdweb Hardhat Project

This project is built using Thirdweb and Hardhat, providing a simple way to develop, build, and deploy smart contracts on the blockchain.

🧱 Create a New Project

To create a new Thirdweb Hardhat project, run the following command in your terminal:

npx thirdweb create --contract --template hardhat-javascript-starter


This will set up a project with all the necessary dependencies and configurations.

📝 Editing Smart Contracts

You can start customizing your project by modifying the default contract file:

contracts/Contract.sol


To extend your contracts with ready-to-use modules (such as ERC20, ERC721, permissions, royalties, etc.), use the @thirdweb-dev/contracts package — already installed with this template.

📚 Learn more: Thirdweb Contract Extensions Documentation

🛠️ Building the Project

After making any changes to your contracts, compile them using:

npm run build
# or
yarn build


This command compiles your Solidity contracts and detects any Thirdweb extensions used in them.

🚢 Deploying Contracts

When you’re ready to deploy your contracts to the blockchain, run one of the following commands:

npm run deploy
# or
yarn deploy


Follow the on-screen instructions to choose a network and deploy.

🌍 Releasing Contracts

To publish a version of your contract for others to use, you can release it publicly:

npm run release
# or
yarn release


This will create a new release of your contract on Thirdweb, making it accessible to the community.