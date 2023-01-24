const fs = require ('fs');
const process = require ('process');
const axios = require('axios');


function cat(path,out) {
    fs.readFile(`./${path}`, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            console.log(process.argv[4]);
            process.exit(1);
        }
        if(out){
            fs.writeFile(`./${out}`,data,'utf8',err => {
                if(err){
                    console.log("Invalid route",err)
                    process.exit(1);
                }
                console.log(`successfully added to ${out}`)
            })
        }else{
            console.log(data);
        }
        
      }
    );
}

async function webCat(path,out){
    try{
        let req = await axios.get(`${path}`);
        if(out){
            fs.writeFile(out,req.data,"utf8",err => {
                if(err){
                    console.log("error",err);
                    process.kill(1);
                }
                console.log(`successfully added to ${out}`);
            })
        }else{
            console.log(req.data);
        }
    
    }catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.kill(1);
    }
}


if (process.argv[2].indexOf('http') > -1){
    webCat(process.argv[2]);
}else if (process.argv[2].indexOf('.txt') > -1) {
    cat(process.argv[2]);
}else if (process.argv[2] == "--out"){
    let out = process.argv[3];
    let path= process.argv[4];
    if (path.indexOf('.txt') > -1){
        cat(path,out)
        
    }else{
        webCat(path,out);
    }
}
