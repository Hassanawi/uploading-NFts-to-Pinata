require("dotenv").config();
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const Formdata = require("form-data");
const pinataEndPoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const pinataAPI = "815baa4d5bb61868e4e1";
const pinataApiSecret =
  "259c361bf15ce15f9ee8433525896e23ff20ac09561c223cd89e75fbb20f68a0";

const PinImageToIpfs = async (filePath, filename) => {
  const form_data = new Formdata();
  try {
    form_data.append("file", fs.createReadStream(`${filePath}//${filename}`));

    const request = {
      method: "post",
      url: pinataEndPoint,
      maxContentLength: "Infinity",
      headers: {
        pinata_api_key: pinataAPI,
        pinata_secret_api_key: pinataApiSecret,
        "Content-Type": `multipart/form-data; boundry=${form_data._boundry}`,
      },
      data: form_data,
    };
    const response = await axios(request);
    const imageHash = response.data.IpfsHash;
    console.log(imageHash);
    let name = filename;
    const Name = name.slice(0, -4);

    let metadataFilePath = path.join(__dirname, `../metadata/${Name}.json`);
    const read_filedata = fs.readFileSync(metadataFilePath, "utf-8").split("\r\n");
    read_filedata.splice(
      3,
      1,
      '    "image":"https://gateway.pinata.cloud/ipfs/' + imageHash + '",'
    );
    const new_data = read_filedata.join("\r\n");
    fs.writeFileSync(metadataFilePath, new_data, "utf8");



    const getMetadataJson = path.join(__dirname, `../metadata/${Name}.json`);

    const form_meta_data = new Formdata();
    try {
      form_meta_data.append("file", fs.createReadStream(getMetadataJson));

      const request = {
        method: "post",
        url: pinataEndPoint,
        maxContentLength: "Infinity",
        headers: {
          pinata_api_key: pinataAPI,
          pinata_secret_api_key: pinataApiSecret,
          "Content-Type": `multipart/form-data; boundry = ${form_meta_data._boundry}`,
        },
        data: form_meta_data,
      };
      const response = await axios(request);
      console.log(response.data.IpfsHash);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { PinImageToIpfs };
