import io from 'socket.io-client'
import { connection } from '../mysql/index.js'
export const sock = io("http://:7777", {
reconnectionDelayMax: 10000
});


sock.on("connect",async () =>{
    console.log('id socket conectado:'+sock.id)
})

sock.on("Qrcode", async dados=>{
    console.log('qrcode recebido socket origem'+dados.soket)
})

sock.on("MensagemNotifi",async(dados)=>{
    console.log(dados)
})

sock.on("Message",async(dados)=>{
    console.log(dados)
})

sock.on("statusSession",e => {
       console.log(e)
})

sock.on("group-participants.update",async(dados)=>{
    let {id} =  dados
    let {participants} = dados
    let {action} = dados
    let {avatar} = dados
    let {user}= dados
    let {browserName}= dados
    let {soketID}= dados
    let {ClientID}= dados
    let {webhook}= dados
    let query = "INSERT INTO `logsgrupos` (`id_logsGrupos`, `logs_sessionName`, `log_logsGrupos`,`log_action`, `data_logsGrupos`) VALUES (NULL, '"+user+"', '"+JSON.stringify(dados)+"', '"+action+"', current_timestamp());"
    connection.query(query, function (error, results, fields) {
        if (error){ res.send(error)};
      });
})
  
