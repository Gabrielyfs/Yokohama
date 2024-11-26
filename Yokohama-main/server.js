const express = require('express')
const notifier = require('node-notifier')
const server = express()
const path = require('path')
const imagePath = path.join(__dirname, './public/img/logo.png');
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

server.post('/cadastro', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'INSERT INTO clientes (email, senha) VALUES (?, ?)';

    db.query(sql, [email, senha], (error, results) => {
        if (error) {
            console.log("Erro ao cadastrar.");
            console.log(error)

            // Check if the error is related to duplicate email
            if (error.code === 'ER_DUP_ENTRY') {
                notifier.notify({
                    title: 'Erro ao realizar o cadastro.',
                    message: 'Este e-mail já está cadastrado. Tente outro e-mail.',
                    icon: imagePath,  // Definindo a imagem personalizada
                    sound: true       // Opção para emitir som na notificação (opcional)
                });
            } else {
                notifier.notify({
                    title: 'Erro ao realizar o cadastro.',
                    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
                    icon: imagePath,
                    sound: true
                });
            }

            res.redirect('/cadastro');
        } else {
            console.log("Usuário cadastrado com sucesso");
            console.log(results);

            notifier.notify({
                title: 'Cadastro realizado com sucesso!',
                message: 'Bem-vindo ao nosso serviço. Agora, faça login para continuar.',
                timeout: 5,
                icon: imagePath,  // Definindo a imagem personalizada
                sound: true       // Opção para emitir som na notificação (opcional)
            });

            // After successful registration, redirect to login page or homepage
            res.redirect('/reservar');  // Or res.redirect('/') if the homepage is preferred
        }
    });
});


server.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './html/login.html'))
});

server.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM clientes WHERE email = ? AND senha = ?';

    db.query(sql, [email, senha], (error, results) => {
        if (error) {
            console.log("Erro ao logar");

            // Notify user of an error in the process
            notifier.notify({
                title: 'Erro ao realizar login!',
                message: 'Houve um problema durante o processo de login. Tente novamente.',
                timeout: 5,
                icon: imagePath,  // Definindo a imagem personalizada
                sound: true       // Opção para emitir som na notificação (opcional)
            });

            res.redirect('/login');
        } else {
            if (results.length > 0) {
                // Usuário logado com sucesso
                console.log("Usuário logado com sucesso");
                console.log(results);

                // Notify user of successful login
                notifier.notify({
                    title: 'Login efetuado com sucesso!',
                    message: 'Bem-vindo ao sistema!',
                    timeout: 5,
                    icon: imagePath,  // Definindo a imagem personalizada
                    sound: true       // Opção para emitir som na notificação (opcional)
                });

                res.redirect('/reservar'); // Redirect to a dashboard or home page after login
            } else {
                // Incorrect credentials
                console.log("Usuário ou senha incorretos");

                // Notify user of incorrect credentials
                notifier.notify({
                    title: 'As informações estão erradas!',
                    message: 'E-mail ou senha incorretos. Tente novamente.',
                    timeout: 5,
                    icon: imagePath,  // Definindo a imagem personalizada
                    sound: true       // Opção para emitir som na notificação (opcional)
                });

                res.redirect('/login');
            }
        }
    });
});


server.get('/reservar', (req, res) => {
    res.sendFile(path.join(__dirname, './html/reserva.html'))
});

server.post('/reservar', (req, res) => {
    const { restaurantes, data, hora, quantidade} = req.body;  // Incluindo 'cliente' na requisição

    // Verificar se todos os campos foram preenchidos
    if (!restaurantes || !data || !hora || !quantidade ) {
        notifier.notify({
            title: 'Preencha todos os campos!',
            message: 'É necessário que você complete todas as informações.',
            timeout: 5,
            icon: imagePath,  // Definindo a imagem personalizada
            sound: true       // Opção para emitir som na notificação (opcional)
        });
        return res.redirect('/'); // Redirect if fields are missing
    }

    // Verificar se já existe uma reserva com o mesmo restaurante, data, e hora (sem considerar quantidade)
    const checkSql = 'SELECT * FROM reservas WHERE restaurantes = ? AND data = ? AND hora = ?';
    db.query(checkSql, [restaurantes, data, hora], (error, results) => {
        if (error) {
            console.log("Erro ao verificar reservas existentes.");
            return res.status(500).send("Erro no servidor");
        }

        // Se já houver uma reserva com o mesmo restaurante, data, e hora, retorna uma mensagem para o cliente
        if (results.length > 0) {
            console.log("Conflito de reserva.");
            notifier.notify({
                title: 'Não foi possível realizar a reserva!',
                message: 'Horário indisponível. Escolha outro horário ou data para este restaurante.',
                icon: imagePath,  // Definindo a imagem personalizada
                sound: true       // Opção para emitir som na notificação (opcional)
            });
            return res.redirect('/reservar'); // Stop execution if there's a conflict
        }

        // Se não houver conflito, faz a inserção da reserva associada ao cliente logado
        const sql = 'INSERT INTO reservas (restaurantes, data, hora, quantidade) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [restaurantes, data, hora, quantidade], (error, results) => {
            if (error) {
                console.log("Erro ao realizar a reserva.");
                notifier.notify({
                    title: 'Erro ao realizar a reserva!',
                    message: 'Tente novamente mais tarde.',
                    icon: imagePath,
                    sound: true
                });
                return res.status(500).send("Erro ao realizar a reserva.");
            }

            console.log("Reserva feita com sucesso");
            console.log(results);

            notifier.notify({
                title: 'Reserva feita com sucesso!',
                message: 'Agradecemos por escolher nosso serviço.',
                timeout: 5,
                icon: imagePath,  // Definindo a imagem personalizada
                sound: true       // Opção para emitir som na notificação (opcional)
            });

            res.redirect('/reservar'); // Redirect to reservation page or other page as needed
        });
    });
});

server.listen(5000, () => {
    console.log('Servidor rodando na porta 5000')
})