let path = require("path");
let fs = require("fs");

let inputArr = process.argv.slice(2);

let options = [];
let fileArr = [];

// let filePath = inputArr;
for(let i=0; i<inputArr.length ; i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        options.push(inputArr[i]);
    }else{
        fileArr.push(inputArr[i]);
    }
}



for(let i=0; i<fileArr.length; i++){
    if(fs.lstatSync(fileArr[i]).isFile()==false){
        console.log("File Does not exist");
        return;
    }
}

if(options[0] == undefined){
    let content = "";
    for(let i=0; i<fileArr.length; i++){
        content = content + fs.readFileSync(fileArr[i]) + "\n";
    }
    console.log(content);
}
else{
    let content ="";
    for(let i=0; i<fileArr.length; i++){
        content = content + fs.readFileSync(fileArr[i]) + "\n";
    }
    let ContentArr = content.split("\r\n");
    
    let isPresent = options.includes("-s");
    if(isPresent){
        for(let i=0; i<ContentArr.length; i++){
            if(ContentArr[i] == "" && ContentArr[i-1] == ""){
                ContentArr[i] = null;
            }else if(ContentArr[i] == "" && ContentArr[i-1] == null){
                ContentArr[i] = null;
            }
        }

        let tempArr = [];
        for(let i=0; i<ContentArr.length; i++){
            if(ContentArr[i]!=null){
                tempArr.push(ContentArr[i]);
            }
        }
        ContentArr = tempArr;
        // console.log(ContentArr.join("\n"));
    }
    let z=0;
    for(let i=0; i<options.length; i++){
        if(options[i] == "-n" || options[i] == "-b"){
            z=i;
            break;
        }
    }

    // let isPresentn = options.includes("-n");
    // let isPresentnb = options.includes("-b");
    if(options[z]=="-n"){
        let k = 1;
        let temp = []
        for(let i=0; i<ContentArr.length; i++){
            temp[i] = k +" "+ContentArr[i] ;
            k++;
        }
        ContentArr = temp;
        // console.log(ContentArr.join("\n"));
    }else if(options[z]=="-b"){
        let temp = [];
        let j = 1;
        for(let i=0; i<ContentArr.length; i++){
            if(ContentArr[i] != ""){
                temp[i] = j +" "+ ContentArr[i];
                j++;
            }else{
                temp[i] = ContentArr[i];
            }
        }
        ContentArr = temp;
    }
    console.log(ContentArr.join("\n"));
}




