import * as dotenv from 'dotenv' 
import express from 'express'
import {sock} from './soket/conexao.js'
import {ComadosWhats} from './soket/comandos.js'
import { connection } from './mysql/index.js'
export const app = express()
app.use(express.json({limit: '50mb'}));
async function timer(segundos) {
    segundos*1000
    setTimeout(() => {
        return
    }, segundos);
}
dotenv.config()
//console.log(process.env.IP)
//console.log(process.env.WS)
const port = process.env.PORTA

app.get('/', (req, res) => {
    res.send('O interpretador está online:'+ ComadosWhats.getToquen())
})
app.post('/start',  async (req, res) => {
    console.log(req.body)
    await ComadosWhats.start(req.body)
    .then(
        async(ret)=>{
            res.send(ret)
        }
    )
    .catch(
        console.log('')
    )
    
})

app.post('/logout',  async (req, res) => {
    console.log(req.body)
 let d = {
            "sessionName":req.body.nomeAPI,
            "browserName":req.body.NomeSessao,
            "soketID":"",
            "webhook":"",
            "ClientID":req.body.ClientID
        }
    sock.emit('logout',d,async(ret)=>{
        res.send({"Return":"Logout :"+req.body.nomeAPI})
            await ComadosWhats.logout(d)
            .then(
                async(ret)=>{
                    res.send(ret)
                }
            )
            .catch(
                (err)=>{res.send(err)}

            )
            res.send({"Return":"Logout :"+req.body.nomeAPI})
    })
   
})

app.post('/fetchBlocklist',  async (req, res) => {
    let dados = req.body
    let d = {
        "sessionName":dados.nomeAPI,
        "browserName":dados.NomeSessao,
        "soketID":sock.id,
        "webhook":"",
        "ClientID":dados.ClientID
    }
    sock.emit("fetchBlocklist",d, async (ret)=>{
        res.send(ret)
    })
    
})
app.post('/getstatus',  async (req, res) => {
    let dados = req.body
    let d = {
        "sessionName":dados.nomeAPI,
        "browserName":dados.NomeSessao,
        "soketID":sock.id,
        "webhook":"",
        "ClientID":dados.ClientID
    }
    sock.emit("fetchStatus",d, async (ret)=>{
       res.send(ret)
    })
    
})
app.post('/sendMessage',  async (req, res) => {
   let dados = req.body
   let d = {
    "sessionName":dados.nomeAPI,
    "browserName":dados.NomeSessao,
    "soketID":sock.id,
    "webhook":"",
    "ClientID":dados.ClientID,
    "base64":dados.base64,
    "imgName":dados.imgName,
    "message":dados.mensagem,
    "forward":dados.forward,
    "id":dados.recebedor,
    "ephemeralExpiration":dados.ephemeralExpiration,
    "delet":dados.delet,
    "quoted":dados.quoted,
    "audio":dados.audio,
    "audioName":dados.audioName,
    "audio64":dados.audio64,
    "ptt":dados.ptt,
    "videonome":dados.videonome,
    "videobase64":dados.videobase64,
    "filebase64":dados.filebase64,
    "filenome":dados.filenome,
    
    }
    sock.emit("sendMessage",d,async (ret)=>{
        console.log(ret)
        res.send(ret)
    })
   
})
app.post('/groupFetchAllParticipating',  async (req, res) => {
    let dados = req.body
    let d = {
        "sessionName":dados.nomeAPI,
        "browserName":dados.NomeSessao,
        "soketID":sock.id,
        "webhook":"",
        "ClientID":dados.ClientID
    }
    sock.emit("groupFetchAllParticipating",d, async (ret)=>{
        res.send(ret)
    })

})
app.post('/groupToggleEphemeral',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "browserName":dados.NomeSessao,
     "soketID":sock.id,
     "webhook":"",
     "ClientID":dados.ClientID,
     "base64":dados.base64,
     "imgName":dados.imgName,
     "message":dados.mensagem,
     "forward":dados.forward,
     "id":dados.recebedor,
     "ephemeralExpiration":dados.ephemeralExpiration,
     "delet":dados.delet,
     }
     sock.emit("groupToggleEphemeral",d,async (ret)=>{
         console.log(ret)
         res.send(ret)
     })
    
 })
app.post('/groupMetadata',  async (req, res) => {
let dados = req.body
let d = {
    "sessionName":dados.nomeAPI,
    "browserName":dados.NomeSessao,
    "soketID":sock.id,
    "webhook":"",
    "ClientID":dados.ClientID,
    "id":dados.recebedor,
    }
    sock.emit("groupMetadata",d,async (ret)=>{
        console.log(ret)
        res.send(ret)
    })

})
app.post('/getqrcode',  async (req, res) => {
    let dados = req.body
    let d = {
        "sessionName":dados.nomeAPI,
        "browserName":dados.NomeSessao,
        "soketID":sock.id,
        "webhook":"",
        "ClientID":dados.ClientID
    }
   
    let q = "SELECT * FROM `sessoes` WHERE sessionName = '"+d.sessionName+"'"
    console.log(q)
    connection.query(q, function (error, results) {
        if (error){console.log(error); res.send(error); return;};
        res.send(results)
    })
    
    return
    
})
app.get('/GetAllPorts',  async (req, res) => {
    let q = "SELECT * FROM `sessoes`"
    console.log(q)
    connection.query(q, function (error, results) {
        if (error){console.log(error); res.send(error); return;};
        res.send(results)
    })
    
    return
})
app.get('/conexoes', (req, res) => {
    let query = "SELECT * FROM `sessoes`"
    connection.connect();
    connection.query(query, function (error, results, fields) {
        if (error){ res.send(error)};
        console.log('The solution is: ', results);
        res.send(results[0])
        connection.end();
      });
    
})
app.post('/GetLogsGroups',  async (req, res) => {
    let dados =  req.body
    let {nomeAPI} = dados
    let q = "SELECT * FROM `logsgrupos` WHERE logs_sessionName = '"+nomeAPI+"'"
    console.log(q)
    connection.query(q, function (error, results) {
        if (error){console.log(error); res.send(error); return;};
        res.send(results)
    })
    return
})
app.post('/CriarGrupo',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "browserName":dados.NomeSessao,
     "soketID":sock.id,
     "webhook":"",
     "GrupoNome":dados.GrupoNome,
     "GrupoParticipantes":dados.GrupoParticipantes
     }
     sock.emit("CreatNewGroup",d,async (ret)=>{
         console.log(ret)
         res.send(ret)
     })
    
 })
app.post('/ObterConviteGrupo',  async (req, res) => {
let dados = req.body
let d = {
    "sessionName":dados.nomeAPI,
    "browserName":dados.NomeSessao,
    "soketID":sock.id,
    "webhook":"",
    "GroupID":dados.GroupID
    }
    sock.emit("groupInviteCode",d,async (ret)=>{
        console.log(ret)
        res.send(ret)
    })

})
app.post('/AlterarFotoGrupo',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "browserName":dados.NomeSessao,
     "soketID":sock.id,
     "webhook":"",
     "GroupID":dados.GroupID,
     "imgBase64":dados.imgBase64
     }
     sock.emit("updateProfilePicture",d,async (ret)=>{
         console.log(ret)
         res.send(ret)
     })
    
 })
 app.post('/AddouRemoverPessoas',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "soketID":sock.id,
     "webhook":"",
     "GroupID":dados.GroupID,
     "participantes":dados.participantes,
     "comando":dados.acao
     }
     sock.emit("groupParticipantsUpdate",d,async (ret)=>{
         console.log(ret)
         res.send(ret)
     })
    
 })
 app.post('/AlterarAsuntoGrupo',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "soketID":sock.id,
     "webhook":"",
     "GroupID":dados.GroupID,
     "subject":dados.subject,
     }
     sock.emit("groupUpdateSubject",d,async (ret)=>{
         console.log(ret)
         res.send({"return":"sucesso"})
     })
    
 })
 app.post('/AlterarDescricaoGrupo',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "soketID":sock.id,
     "webhook":"",
     "GroupID":dados.GroupID,
     "description":dados.description,
     }
     sock.emit("groupUpdateDescription",d,async (ret)=>{
         console.log(ret)
         res.send({"return":"sucesso"})
     })
    
 })
 app.post('/groupSettingUpdate',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "soketID":sock.id,
     "webhook":"",
     "GroupID":dados.GroupID,
     "config":dados.config,
     }
     sock.emit("groupSettingUpdate",d,async (ret)=>{
         console.log(ret)
         res.send({"return":"sucesso"})
     })
    
 })
 app.post('/ObterPerfilComercial',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "soketID":sock.id,
     "webhook":"",
     "WhatsappID":dados.WhatsappID,
     }
     sock.emit("getBusinessProfile",d,async (ret)=>{
         console.log(ret)
         res.send(ret)
     })
    
 })
 app.post('/profilePictureUrl',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "soketID":sock.id,
     "webhook":"",
     "WhatsappID":dados.WhatsappID,
     }
     sock.emit("profilePictureUrl",d,async (ret)=>{
         console.log(ret)
         res.send(ret)
     })
    
 })
 app.post('/checkWhatsapp',  async (req, res) => {
    let dados = req.body
    let d = {
     "sessionName":dados.nomeAPI,
     "soketID":sock.id,
     "webhook":"",
     "WhatsappID":dados.WhatsappID,
     }
     sock.emit("checkWhatsapp",d,async (ret)=>{
         console.log(ret)
         res.send(ret)
     })
    
 })

 app.post('/Upload',  async (req, res) => {
    let dados = req.body
    let d = {
     "filename":dados.filename,
     "filebase64":sock.id,
     }
     sock.emit("Upload",d,async (ret)=>{
         console.log(ret)
         res.send(ret)
     })
     res.send('sucesso')
 })
 app.post('/DeletFile',  async (req, res) => {
    let dados = req.body
    let d = {
     "filename":dados.filename
     }
     sock.emit("DeletFile",d,async (ret)=>{
         console.log(ret)
         res.send(ret)
     })
 })

app.listen(port, () => {
    console.log(process.env.MESSAGE)  
    console.log(sock.id)
})
