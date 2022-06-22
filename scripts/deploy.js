// importiert alle Libs aus Hardhat
const { ethers, run, network } = require("hardhat")

// Aufruf: yarn hardhat run scripts/deploy.js
// Einzelne Commands via Hardhat aufrufen:
// yarn hardhat console --network localhost (oder rinkeby)

// async main
async function main() {
  // Erstellt die StorageFactory zur SC-Erstellung
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  // Erstellt den SC zu einer Adresse auf der Blockchain
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)

  // what happens when we deploy to our hardhat network?
  // === bedeutet wir vergleichen auch den Datentyp
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await simpleStorage.deployTransaction.wait(6)
    // ruft Verify-Funktion auf
    await verify(simpleStorage.address, [])
  }

  // Ruft die retrieve()-Methode auf dem Smart Contract auf
  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  // Ruft die store(..)-Methode auf dem Smart Contract auf
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value is: ${updatedValue}`)
}

// Verifiziert den Smart Contract
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    // Ersetzt Konsolenkommando mit Parametern
    // yarn hardhat verify --help liefert alle Möglichkeiten
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
