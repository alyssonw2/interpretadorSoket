import * as dotenv from 'dotenv' 
import express from 'express'
import {sock} from './soket/conexao.js'
import {getToquen} from './soket/comandos.js'
import { connection } from './mysql/index.js'
export const app = express()
dotenv.config()
//console.log(process.env.IP)
//console.log(process.env.WS)
const port = process.env.PORTA

app.get('/', (req, res) => {
    res.send('O interpretador está online')
})
app.get('/conexoes', (req, res) => {
    let query = "SELECT * FROM `sessoes`"
    connection.connect();
    connection.query(query, function (error, results, fields) {
        if (error){ res.send(error)};
        console.log('The solution is: ', results);
        res.send(results[0])
      });
    connection.end();
})
app.listen(port, () => {
    console.log(process.env.MESSAGE)  
})


