const express = require('express')
const app = express()
const jsonParser = express.json();
// const cors = require('cors');
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "markovrv.ru",
    user: "phonenumber_usr",
    database: "phonenumbers_krash",
    password: "EOIJQOc3WzhrT8RL"
});

app.use(express.static(__dirname + "/../frontend/dist"));

connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

// app.use(cors());

app.get('/api/contacts', function (req, res) {
    connection.query("SELECT * FROM phonenumbers",
        function (err, results) {
            if (err) {
                console.log(err);
                res.send([]);
            }
            else res.send(results);
        });
})

app.put('/api/contacts', jsonParser, function (req, res) {

    const contact = [req.body.name, req.body.number];
    const sql = "INSERT INTO phonenumbers (name, number) VALUES(?, ?)";

    connection.query(sql, contact, function (err, results) {
        if (err) res.send("ERROR");
        else res.send(results);
    });
})

app.post('/api/contact', jsonParser, function (req, res) {
    const contact = [req.body.name, req.body.number, req.body.id];
    const sql = "UPDATE phonenumbers SET name = ?, number = ? WHERE id = ?;";

    connection.query(sql, contact, function (err) {
        if (err) res.send("ERROR");
        else res.send("OK");
    });
})

app.delete('/api/contact', function (req, res) {
    let id = req.query.id;
    connection.query("DELETE FROM phonenumbers WHERE id="+ Number(id),
        function (err) {
            if (err) {
                console.log(err);
                res.send("error");
            }
            else res.send("OK");
        });
})

app.listen(3000, () => { console.log('http://localhost:3000') })