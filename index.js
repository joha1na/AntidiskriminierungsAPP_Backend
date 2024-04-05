const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.serverport;

app.use(bodyParser.json());
app.use(cors());

app.post('', (req, res) => {
    const mitgliedergruppe = req.body.mitgliedergruppe;
    const betroffenheit = req.body.betroffenheit;
    const message = req.body.message;
    const category = req.body.category;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;
    var checkbox = req.body.checkbox;
    const formulartyp = req.body.formulartyp;
    const apmail = req.body.apmail;
    const titel = req.body.titel;
    const vorname = req.body.vorname;
    const nachname = req.body.nachname;
    var sprache = req.body.sprache;

    const transporter = nodemailer.createTransport({
        host: process.env.host,
        port: process.env.port,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    var mailOptions = {};

    if (checkbox) {
        checkbox = 'ja';
    }

    if (sprache == 'de') {
        sprache = "deutsch";
    } else if (sprache == 'en') {
        sprache = "englisch";
    }

    if (formulartyp == 'Kontaktformular' && nachname !== 'NA') {
        mailOptions = {
            from: process.env.from,
            to: process.env.to,
            subject: `Neue Nachricht an ${apmail} über das ${formulartyp} der AntidiskriminierungsAPP`,
            text: `
            Folgende Informationen wurden in das ${formulartyp} eingegeben:
            Mitgliedergruppe: ${mitgliedergruppe}
            Betroffenheit: ${betroffenheit}
            Nachricht: ${message}
            Kategorie: ${category}
            Nachname: ${lastname}
            Vorname: ${firstname}
            E-Mail: ${email}
            Zustimmung zur Datenverarbeitung: ${checkbox}

            Folgende Ansprechperson wurde ${formulartyp} ausgewählt:
            Titel: ${titel}
            Vorname: ${vorname}
            Nachname: ${nachname}

            Die App wurde auf ${sprache} genutzt.
        `
        };
    } else if (formulartyp == 'Kontaktformular' && nachname == 'NA') {
        mailOptions = {
            from: process.env.from,
            to: process.env.to,
            subject: `Neue Nachricht an ${apmail} über das ${formulartyp} der AntidiskriminierungsAPP`,
            text: `
            Folgende Informationen wurden in das ${formulartyp} eingegeben:
            Mitgliedergruppe: ${mitgliedergruppe}
            Betroffenheit: ${betroffenheit}
            Nachricht: ${message}
            Kategorie: ${category}
            Nachname: ${lastname}
            Vorname: ${firstname}
            E-Mail: ${email}
            Zustimmung zur Datenverarbeitung: ${checkbox}

            Im ${formulartyp} wurde keine Anspechperson ausgewählt.

            Die App wurde auf ${sprache} genutzt.
        `
        };
    } else if (formulartyp == 'Meldeformular') {
        mailOptions = {
            from: process.env.from,
            to: process.env.to,
            subject: `Neue Nachricht über das ${formulartyp} der AntidiskriminierungsAPP`,
            text: `
            Folgende Informationen wurden in das ${formulartyp} eingegeben:
            Mitgliedergruppe: ${mitgliedergruppe}
            Nachricht: ${message}
            Kategorie: ${category}
            Nachname: ${lastname}
            Vorname: ${firstname}
            E-Mail: ${email}
            Zustimmung zur Datenverarbeitung: ${checkbox}
            
            Die App wurde auf ${sprache} genutzt.
        `
        };
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    });
});

app.listen(PORT, (error) => {
    if (error) {
    } else {
    } 
});