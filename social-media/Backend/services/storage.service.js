const {ImageKit} = require("@imagekit/nodejs")

const imageKit = new ImageKit({
    privateKey : process.env.IMAGE_KIT
})


async function uploadFile(fileBuffer, fileName){
    console.log("filename" ,fileName)
    
    const response = await imageKit.files.upload({
        file:fileBuffer.toString("base64"),
        fileName:fileName
    })
    return response

}

module.exports = uploadFile

