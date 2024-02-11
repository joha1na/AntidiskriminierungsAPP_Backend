const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.serverport;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
    const mitgliedergruppe = req.body.mitgliedergruppe;
    const message = req.body.message;
    const category = req.body.category;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const checkbox = req.body.checkbox;

    const transporter = nodemailer.createTransport({
        host: process.env.host,
        port: process.env.port,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    const mailOptions = {
        from: process.env.from,
        to: process.env.to,
        subject: 'Neue Meldung über das Meldeformular der AntidiskriminierungsAPP',
        text: `
        Folgende Informationen wurden in das Formular eingegeben:
        Mitgliedergruppe: ${mitgliedergruppe}
        Nachricht: ${message}
        Kategorie: ${category}
        Nachname: ${lastname}
        Vorname: ${firstname}
        E-Mail: ${email}
        Zustimmung zur Datenverarbeitung: ${checkbox}
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send();
        } else {
            console.log(info.response);
            res.status(200).send();
        }
    });
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server startet and listening at http://localhost:${PORT}`);
    } 
});