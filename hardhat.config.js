require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("./tasks/block-number")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage") // Aufruf via yarn hardhat coverage

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 *
 * yarn hardhat node würde eine lokale Node erzeugen
 * Wir könnten dann in einem neuen Terminal unser deploy-Skript aufrufen.
 */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL ||
  "https://eth-rinkeby.alchemyapi.io/v2/fCaKdgV-oZyifIj6O7eR6qcmRl0-E2dW"
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "ec8d49121cee06df31ae193bf7aff501bd326d21b19a7803416335cedd27c12a"
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "53TJYYIV1YNEVEAT1MGZ1AZR3F64RJHQP3"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    // yarn hardhat run scripts/deploy.js --network rinkeby
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY], // erstellt Account mit unserem PK
      chainId: 4,
    },
    // yarn hardhat run scripts/deploy.js --network localhost
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337, // hardhat ChainId
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    // yarn add harthat-gas-reporter --dev
    // zeigt an, welcher Contract wie viel Gas kostet
    // wird erstellt nach yarn hardhat test
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  },
}
