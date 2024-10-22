import fs from 'node:fs/promises';
import express from 'express';

const app = express();
const PORT = 8080;
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/properties', async (req, res) => {
    const properties = await fs.readFile('./data/available-properties.json', 'utf8');
    res.json(JSON.parse(properties));
});

app.use((req, res) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    res.status(404).json({message: 'Not found'});
})

app.listen(PORT);