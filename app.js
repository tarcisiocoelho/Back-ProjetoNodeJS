const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// mostrando para o express que vamos usar dados json
app.use(express.json());

app.get('/', (req, res, next) => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'the_pink_store'
    });

connection.query("SELECT * FROM produtos", (error, result)=>{
    if(error){
        console.log(error)
    }
    res.json(result);
    })  
})

app.get('/noticia', (req, res) =>{
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'pedidos'
    });

    connection.query("SELECT pedido.nome, pedido.cidade, pedido.produto, pedido.quantidade, envio.empresa, envio.prazo FROM pedido LEFT OUTER JOIN matricula_pedido on pedido.id_pedido = matricula_pedido.id_pedido LEFT OUTER JOIN envio on envio.id_envio = matricula_pedido.id_envio", (error, result)=>{
        
    if(error){
        console.log(error)
    }
    res.json(result);
    })  
})

app.post('/noticia', (req, res) =>{
    const mysqlPedido = require('mysql');
    const conexao = mysqlPedido.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'pedidos'
    });

    {/*const {nome} = req.body;
    const {cidade} = req.body;
    const {produto} = req.body;
    const {quantidade} = req.body;*/}
    
    let post = [];

    //puxando dados para dentro de um array
    post.push({
        nome: req.body.nome,
        cidade: req.body.cidade,
        produto: req.body.produto,
        quantidade: req.body.quantidade
    });

//interrogação é que vamos passar algum parametro
conexao.query('INSERT INTO pedido SET ?', post, ()=>{
    post = [];
    return res.json({message: "Dados enviados com sucesso"})
})

})

app.post('/mensagem', (req, res) =>{
    const mysqlPedido = require('mysql');
    const conexao = mysqlPedido.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'the_pink_store'
    });
    
    let post = [];
   
    post.push({
        nome: req.body.nome,
        email: req.body.email,
        mensagem: req.body.mensagem
    });

conexao.query('INSERT INTO comentarios SET ?', post, ()=>{
    post = [];
    return res.json({message: "Dados enviados com sucesso"})
})

})

app.listen(3005, () => {
    console.log('Funcionou!');
})