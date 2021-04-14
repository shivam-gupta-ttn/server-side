const Express = require('express');
const PORT = 5000;
const app = Express();
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser')
const data = fs.readFileSync('./users.json')
let users = JSON.parse(data);

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req,res,next)=>{
    req.requestTime = Date.now();
    next(); 
})
app.use(bodyParser.json());

app.get('/users',(req,res)=>{
    res.send(users)
    
})
app.post('/login', (req,res)=>{
    let users = req.body;
    users["key"]= req.requestTime 
    // console.log(req.body)
    // console.log(req.requestTime)
    console.log(users);
    users = JSON.stringify(users)
    fs.appendFile('./users.json',users, (err,data)=>{
        if (err) throw err
        console.log("Appending file completed");
    })
})
app.listen(PORT,()=>{
    console.log("Server is running @http://localhost:%d",PORT);
})