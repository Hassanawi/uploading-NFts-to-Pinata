
# Uploading-NFts-to-Pinata

This file will let you to have a different attributes in JSON files for an NFT to be uploaded





## API Reference 

Write the metadata files for you nfts in ```metadata``` folder

Put you nfts in ```images``` folder

Updata your pinata information in scripts/pinataApi.js 
``` 
const pinataEndPoint = "";
const pinataAPI = "";
const pinataApiSecret ="";
  ```

run the following command in terminal

- to install dependencies
```http
  npm i --yes
```
- to get uploaded file hash
```http
  node /scripts/uploadMetadata.js
```

The image hash will be updated to the ```metadata``` folder in respective file.



## Pre-Requisites

Make sure the your JSON files in ```metadata``` folder have the 
```http
   "image":"",
```
in line no 4

Or you can update the code in ```scripts/pinataApi.js```

```http
      read_filedata.splice(
      3,
      1,
      '    "image":"https://gateway.pinata.cloud/ipfs/' + imageHash + '",'
    );
```
instead of ``` 3``` update it with the respective line no of code line with 1 subtracted
## Author

- [@Hassanawi](https://github.com/Hassanawi)

