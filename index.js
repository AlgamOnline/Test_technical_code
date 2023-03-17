const express = require('express');
const bodyParser = require('body-parser'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
app.use(bodyParser.json());
//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});


app.get('/getData/:mode?/:num?', (req, res) => {    
    console.log(req.params)


    let data  = []
    let max   = req.params.num;
    let mode  = req.params.mode

    if(mode  === "ganjil"){
        for (let i=0; i <= max;  i++){
      
            if(i % 2 !== 0 ){
                data.push(i)
            }
        }
    }


    if(mode  === "segitiga"){
     let xnum = 0
     let nol = "0"
        for(i=0; i<max.length; ) {
            
             xnum =parseInt(xnum)+1;
             console.log(xnum)
            for(x=1;  x<xnum; x++) {
                nol = nol +"0"
            }
            if(max[i]){
                data.push(max[i] + nol)
         
            }else{
                data.push("0" + nol)
            }
                
                i++
          }
    }


    if(mode  === "prima"){
            function prima(a){
                if(a==2) {
                    return true;
                }
                
                for(let b=2;b<a;b++) {
                    
                    if(a%b==0) 
                    return false;
                }	
                return true;
            }
       
        for (let i=0; i <= max;  i++){
            if(prima(i)){
                data.push(i)
            }
        
        }
    }

   
    res.send(data)
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});