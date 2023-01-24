const fs = require ('fs');
fs.readFile(`./${process.argv[2]}`,"utf8",function(err,data){
    if(err){
        console.log("ERRORR",err);
        process.kill(1);
    }
    console.log(data);
})

