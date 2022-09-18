const fs = require("fs");
const path = require("path");
let fileName = "abc";
''
const filePath = path.join(__dirname, `./files/${fileName}.json`);

const read_filedata = fs.readFileSync(filePath, "utf-8").split("\r\n");

const new_written = {
  university: "comsats university",
};
read_filedata.splice(2, 1, '    "university 5 ":"Comsats University",');
console.log(read_filedata);

const new_data = read_filedata.join('\r\n')
const file_data = fs.writeFileSync(filePath,new_data ,'utf8');