const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS
const { exec } = require('child_process');

const app = express();
const port = 5000;

app.use(cors());  // Enable CORS
app.use(bodyParser.json());

app.post('/scan', (req, res) => {
    const { target } = req.body;
    if (!target) {
        return res.status(400).send('Target is required');
    }

    exec(`nmap -A -T4 ${target}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            return res.status(500).send(`Stderr: ${stderr}`);
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
