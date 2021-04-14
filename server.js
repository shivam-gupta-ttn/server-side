const Express = require('express');

const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 5000;
const app = Express();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
})

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    const data = fs.readFileSync('./users.json')
    let users = JSON.parse(data);
    res.send(users)

})

app.delete('/delete', (req, res) => {
    console.log("received")
    console.log(req.body)
    const data = JSON.parse(fs.readFileSync('./users.json'));

    const updatedUsers = data.filter((e, i) => (i !== req.body.payload))
    fs.writeFileSync('./users.json', JSON.stringify(updatedUsers, null, 2))
    res.send({ success: true })
})

app.post('/register', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./users.json'));

    let fetchedUser = req.body;
    fetchedUser["Created_on"] = req.requestTime
    data.push(fetchedUser)
    fs.writeFileSync('./users.json', JSON.stringify(data, null, 2));
    res.send({ data: "success" })

})
app.listen(PORT, () => {
    console.log("Server is running @http://localhost:%d", PORT);
})