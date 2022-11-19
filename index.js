import * as dotenv from 'dotenv' 
import express from 'express'
dotenv.config()
//console.log(process.env.IP)
//console.log(process.env.WS)
const app = express()
const port = process.env.PORTA
//importando rotas 
import './rotas/index.js'

app.listen(port, () => {
  console.log(`Rodando interpretador na porta: ${port}`)
})
