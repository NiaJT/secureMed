// E:/secureMed/backend/blockchain/blockchain.service.js
import crypto from "crypto";

export class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const blockString =
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash;
    return crypto.createHash("sha256").update(blockString).digest("hex");
  }
}

export class Blockchain {
  constructor(chainFromDB = []) {
    this.chain = chainFromDB.length ? chainFromDB : [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now().toString(), { isGenesis: true }, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const previousBlock = this.getLatestBlock();
    const newBlock = new Block(
      this.chain.length,
      Date.now().toString(),
      data,
      previousBlock.hash
    );
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const prev = this.chain[i - 1];
      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== prev.hash) return false;
    }
    return true;
  }
}
