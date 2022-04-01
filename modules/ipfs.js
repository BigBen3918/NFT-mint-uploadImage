
const config = require('../config/config');
const pinataApiKey = config.pinataApiKey;
const pinataSecretApiKey = config.pinataSecretApiKey
const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'


const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const uploadController = require('../controllers/nft');
const { sign } = require('crypto');
const insertImageList = async (imgDataPath) => {
    fs.readdir(imgDataPath, function (err, files) {
        if (err) return console.log('Unable to scan directory: ' + err);
        files.forEach(function (file) {
            var fileMetadata = getMetadata(file)
            uploadController.insertData({ filename: file, metadata: fileMetadata, filehash: '', hashtoken: '', status: 0 })
            console.log(file);
        });
    });
}


const uploadImages = async (imgDataPath) => {
    var uploadFiles = await uploadController.getUploadFilelist();
        uploadFiles.forEach(async (row) => {
            var filePath = path.resolve(`./export-images/`, row.filename)
            var file = fs.readFileSync(filePath);
            var res = await uploadFile(file);
            var filehash = res.hash;
            await uploadController.updateFilehash(row._id, filehash)
            // var sign = sign(filehash+row.metadata);
            // uploadController.updateHashtoken(row._id, sign)
        }
    );
}

// const sign = (plain) => {
//     return plain;
// }

const getMetadata = (file) => {
    var fileMetadata = {
        name: { type: String, default: file + ' name' },
        description: { type: String, default: file + 'description' },
        external_url: { type: String, default: file + ' external_url' },
        image: { type: String, default: file + 'image' },
        status: { type: Number, min: 0, default: 1 }
    }
    return fileMetadata;
}
const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post(url, {
        headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
        },
        body: formData
    })
    if (response.status === 200) {
        console.log('Upload complete');
    } else {
        console.log('upload error')
    }
    return response;
}


module.exports = { insertImageList, uploadImages }