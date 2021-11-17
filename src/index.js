const express = require('express')
const route = require('./routes')
const db = require('./db')

const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        code: 200,
        message: "Welcome to Blog"
    })
})
app.use(route)

//ERROR HANDLING
app.use((req, res) => {
    res.status(404).json({
        status: "Not Found",
    })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        status: 'failed',
        message: 'internal server error',
        data: []
    })
})

db.connect()
    .then((obj) => {
        app.listen(port, () => {
            console.log(`Starting on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
module.exports = app