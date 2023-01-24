const fs = require ('fs');
const process = require ('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(`./${process.argv[2]}`, 'utf8', function(err, data) {
      if (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.kill(1);
      } else {
        console.log(data);
      }
    });
}

async function webCat(url){
    try{
        let req = await axios.get(`${process.argv[2]}`);
        console.log(req)
    
    }catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.kill(1);
    }
}


if (process.argv[2].indexOf('http') > -1){
    webCat(process.argv[2]);
}else{
    cat(process.argv[2]);

}