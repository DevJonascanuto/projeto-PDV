const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let users = []; // Simulação de banco de dados

app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    users.push({ email, passwordHash });
    res.json({ success: true, message: "Usuário cadastrado!" });
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (user && await bcrypt.compare(password, user.passwordHash)) {
        res.json({ success: true, message: "Login bem-sucedido!" });
    } else {
        res.json({ success: false, message: "E-mail ou senha incorretos!" });
    }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
