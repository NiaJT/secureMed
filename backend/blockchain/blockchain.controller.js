const BlockchainBlock = require("./blockchain.model.js");
const { Blockchain } = require("./blockchain.service.js");

async function addBlockToChain(data) {
  const allBlocks = await BlockchainBlock.find().sort("index");
  const blockchain = new Blockchain(allBlocks);
  const newBlock = blockchain.addBlock(data);
  await BlockchainBlock.create(newBlock);
}

// Call this inside your logic after report upload:
await addBlockToChain({
  action: "report_uploaded",
  reportId: report._id,
  patientId: patient._id,
  hash: sha256(reportContent),
});

// Call this after verification:
await addBlockToChain({
  action: "report_verified",
  reportId: report._id,
  doctorId: doctor._id,
  remarks: remarks,
  hash: sha256(remarks),
});

// Call this after QR generation:
await addBlockToChain({
  action: "qr_generated",
  reportId: report._id,
  hash: sha256(qrContent),
});

router.get("/validate-chain", async (req, res) => {
  const BlockchainBlock = require("./blockchain.model.js");
  const { Blockchain } = require("./blockchain.service.js");
  const allBlocks = await BlockchainBlock.find().sort("index");
  const blockchain = new Blockchain(allBlocks);
  const isValid = blockchain.isChainValid();
  res.json({ valid: isValid });
});
