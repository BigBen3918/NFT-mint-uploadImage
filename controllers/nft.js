const {NftModal} = require('../models/Nfts')
const config = require('../config/config')

const insertData = async (props) => {
    try{
        const instance = new NftModal(props);
        await instance.save();
        return {err:0, msg:'success'}
    }catch(ex){
        return {err:1, msg:ex}
    }   
}

const updateFilehash = async (id, hash) => {
    try{
        await NftModal.updateOne({ _id: id }, { $set: { filehash: hash}});
        return {err:0, msg:'success'}
    }catch(ex){
        return {err:1, msg:ex}
    } 
}

const updateHashtoken = async (id, token) => {
    try{
        await NftModal.updateOne({ _id: id }, { $set: { hashtoken: token}});
        return {err:0, msg:'success'}
    }catch(ex){
        return {err:1, msg:ex}
    } 
}

const getUploadFilelist = async () =>{
    try{
        return await NftModal.find({status : {$ne:10}});
    }catch(ex){
        return {err:1, msg:ex}
    }
}

module.exports = {
    insertData,
    updateFilehash,
    updateHashtoken,
    getUploadFilelist
}