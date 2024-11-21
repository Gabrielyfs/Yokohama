const express = require('express')
const server = express()
const path = require('path')
const db = require('./config/db_connect')
const { error } = require('console')

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true }))

server.use(express.json());

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './html/home.html'))
});

server.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, './html/menu.html'))
});

server.get('/menu-rodizio', (req, res) => {
    res.sendFile(path.join(__dirname, './html/menu-rodizio.html'))
});

server.get('/delivery', (req, res) => {
    res.sendFile(path.join(__dirname, './html/delivery.html'))
});

server.get('/restaurantes', (req, res) => {
    res.sendFile(path.join(__dirname, './html/restaurantes.html'))
});

server.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, './html/cadastro.html'))
});

server.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, './html/sobre.html'))
});
server.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './html/home-login.html'))
});

server.post('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, './html/cadastro.html'))

    console.log(req.body);

    const {email, senha} = req.body

    const sql = 'INSERT INTO clientes (email, senha) VALUES (?,?)'

    db.query(sql, [email, senha], (error, results) => {
        if (error) {
            console.log("Erro ao cadastrar.")
            return res.status(500).send("Erro ao realizar o cadastro.");
        } else {
            console.log("Usuario cadastrado com sucesso")
            console.log(results)

            if (results.length > 0) {  
                res.redirect('/')
            } else {
                res.redirect('/cadastro')
            }
        }
    })
});
 
server.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './html/login.html'))
});

server.post('/login', (req, res) => {
    const {email, senha } = req.body

    const sql = 'SELECT * FROM clientes WHERE email = ? AND senha = ?'

    db.query(sql, [email, senha], (error, results) => {
        if (error) {
            console.log("Erro ao logar");
        } else {
            console.log("Usuário logado com sucesso");
            console.log(results);

            if (results.length > 0) {  
                res.redirect('/reservar')
            } else {
                res.redirect('/')
            }
        }
    })
});

server.get('/reservar', (req, res) => {
    res.sendFile(path.join(__dirname, './html/reserva.html'))
});

server.post('/reservar', (req, res) => {

    const { restaurantes, data, hora } = req.body;

    // Verificar se já existe uma reserva com o mesmo restaurante, data e hora
    const checkSql = 'SELECT * FROM reservas WHERE restaurantes = ? AND data = ? AND hora = ?';
    
    db.query(checkSql, [restaurantes, data, hora], (error, results) => {
        if (error) {
            console.log("Erro ao verificar reservas existentes.");
            return res.status(500).send("Erro no servidor");
        }
        
        // Se já houver uma reserva, retorna uma mensagem para o cliente
        if (results.length > 0) {
            console.log("Já existe uma reserva para este restaurante, data e hora.");
            return res.status(400).send("Já existe uma reserva para este restaurante, data e hora. Por favor, escolha outro horário.");
        }

        // Se não houver reserva, faz a inserção
        const sql = 'INSERT INTO reservas (restaurantes, data, hora) VALUES (?, ?, ?)';
        db.query(sql, [restaurantes, data, hora], (error, results) => {
            if (error) {
                console.log("Erro ao realizar a reserva.");
                return res.status(500).send("Erro ao realizar a reserva.");
            }

            console.log("Reserva feita com sucesso");
            // Após sucesso, redireciona para a página inicial ou outro lugar
            res.redirect('/');
        });
    });
});

server.listen(5000, () => {
    console.log('Servidor rodando na porta 5000')
})