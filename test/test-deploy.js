const { ethers } = require("hardhat") // Für alles was den SC angeht
const { expect, assert } = require("chai") // für Assert und Expect

// Aufruf via yarn hardhat test
// oder yarn hardhat test --grep "...."

// Kommt von Mocha.js
// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
  // Factory und Storage-Objekt sind ausserhalb beforeEach
  // weil andere Funktionen auch damit interagieren
  let simpleStorageFactory, simpleStorage

  // Bevor jedem Test wird diese Methode aufgerufen
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  // Hier beschreiben wir, was der Test machen soll
  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"

    assert.equal(currentValue.toString(), expectedValue)
  })
  it("Should update when we call store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })

  // Extra - this is not in the video
  it("Should work correctly with the people struct and array", async function () {
    const expectedPersonName = "Patrick"
    const expectedFavoriteNumber = "16"
    const transactionResponse = await simpleStorage.addPerson(
      expectedPersonName,
      expectedFavoriteNumber
    )
    await transactionResponse.wait(1)
    const { favoriteNumber, name } = await simpleStorage.people(0)
    // We could also do it like this
    // const person = await simpleStorage.people(0)
    // const favNumber = person.favoriteNumber
    // const pName = person.name

    assert.equal(name, expectedPersonName)
    assert.equal(favoriteNumber, expectedFavoriteNumber)
  })
})
