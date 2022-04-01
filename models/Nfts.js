const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NFT_Schema = new Schema({
  filename: { type: String, default: '' },
  metadata: { type: Object },
  filehash: { type: String, default: '' },
  hashtoken: { type: String, default: '' },
  created: { type: Date, default: Date.now() },
  status: { type: Number, default: 0 }
});

const NftModal = mongoose.model('nftdata', NFT_Schema);
module.exports = { NftModal }
