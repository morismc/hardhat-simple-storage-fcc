const { task } = require("hardhat/config")

// Damit wir den Task in der Taskliste von Hardhat sehen,
// müssen wir in hardhat.config.js dieses File importieren
// Danach liefert yarn hardhat --help den Task als Output

// task(name,beschreibung)
task("block-number", "Prints the current block number").setAction(
  // const blockTask = async function() => {}
  // async function blockTask() {}
  // hre = hardhat runtime environment
  async (taskArgs, hre) => {
    // Ermittle die aktuelle Blocknummer auf der aktuell verwendeten Chain
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current block number: ${blockNumber}`)
  }
)

module.exports = {}
