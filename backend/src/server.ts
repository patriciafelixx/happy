import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send({ message: 'Helow'})
})

app.listen(3333);