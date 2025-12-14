const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./db");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// --- REGISTRO ---
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    // Criptografar a senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

    db.run(query, [username, email, hashedPassword], function (err) {
        if (err) {
            return res.status(400).send("Erro: " + err.message);
        }
        res.send("Usuário registrado com sucesso!");
    });
});

// --- LOGIN ---
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) return res.status(500).send("Erro interno.");

        if (!row) {
            return res.status(400).send("Usuário não encontrado.");
        }

        const match = bcrypt.compareSync(password, row.password);

        if (!match) {
            return res.status(400).send("Senha incorreta.");
        }

        res.send("Login realizado com sucesso!");
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
