

const express = require('express')
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    // res.sendStatus(200)
    res.send('Hello from server.')
})









const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};
start();