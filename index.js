
require('dotenv').config();
const resImgPath = 'export-images';

const mongoose = require("mongoose");
const {uploadImages, insertImageList} = require('./modules/ipfs.js');


// Connect to MongoDB
const mongourl = require("./config/config").mongoURI;
mongoose
.connect(mongourl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(async () => {
    console.log("MongoDB Connected");
    // await insertImageList(resImgPath);
    await uploadImages(resImgPath);
})
.catch((err) => console.log(err));