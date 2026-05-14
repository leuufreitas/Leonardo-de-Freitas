const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());
app.use(express.static('public'));

// Criar tabelas e inserir admin/admin
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, senha TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS ferramentas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, link TEXT, tipo TEXT, descricao TEXT, icone TEXT, capa TEXT)");
    
    db.get("SELECT count(*) as count FROM usuarios WHERE usuario = 'admin'", (err, row) => {
        if (row.count === 0) {
            // AQUI: Definindo como admin / admin
            db.run("INSERT INTO usuarios (usuario, senha) VALUES ('admin', 'admin')");
        }
    });
});

// ROTA DE LOGIN CORRIGIDA
app.post('/api/login', (req, res) => {
    // Pegando 'usuario' e 'senha' exatamente como o seu HTML envia
    const { usuario, senha } = req.body; 
    
    db.get("SELECT * FROM usuarios WHERE usuario = ? AND senha = ?", [usuario, senha], (err, row) => {
        if (row) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: "Incorreto" });
        }
    });
});

// --- DEMAIS ROTAS (FERRAMENTAS E USUÁRIOS) ---

app.get('/api/ferramentas', (req, res) => {
    db.all("SELECT * FROM ferramentas", [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

app.post('/api/ferramentas', (req, res) => {
    const { nome, link, tipo, descricao, icone, capa } = req.body;
    db.run("INSERT INTO ferramentas (nome, link, tipo, descricao, icone, capa) VALUES (?, ?, ?, ?, ?, ?)", 
    [nome, link, tipo, descricao, icone, capa], (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Cadastrada" });
    });
});

app.delete('/api/ferramentas/:id', (req, res) => {
    db.run("DELETE FROM ferramentas WHERE id = ?", req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Excluída" });
    });
});

app.get('/api/usuarios', (req, res) => {
    db.all("SELECT id, usuario FROM usuarios", [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

app.post('/api/usuarios', (req, res) => {
    const { novoAdmin, novaSenha } = req.body;
    db.run("INSERT INTO usuarios (usuario, senha) VALUES (?, ?)", [novoAdmin, novaSenha], (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Admin Criado" });
    });
});

app.delete('/api/usuarios/:id', (req, res) => {
    db.run("DELETE FROM usuarios WHERE id = ?", req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Admin removido" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));