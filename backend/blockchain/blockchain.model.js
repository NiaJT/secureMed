// E:/secureMed/backend/blockchain/blockchain.model.js
import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
  index: Number,
  timestamp: String,
  data: Object,
  previousHash: String,
  hash: String,
});
const BlockchainBlock = mongoose.model("BlockchainBlock", blockSchema);
export default BlockchainBlock;
