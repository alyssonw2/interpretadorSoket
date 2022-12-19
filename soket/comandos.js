import {sock} from './conexao.js'
async function timer(segundos) {
    segundos*1000
    setTimeout(() => {
        return
    }, segundos);
}
//Mapeando comandos
export const ComadosWhats = {
   
    async CriarGrupo(){},
    async getToquen(){return sock.id},
    async ObterConviteGrupo(){},
    async Metadadosdeumgrupo(){},
    async AlterarFotoGrupo(){},
    async AddouRemoverPessoas(){},
    async EntrandoEmGrupos(){},
    
    async AlterarAsuntoGrupo(){},
    async ApenasAdministradores(){},
    async ColocarGrupoAberto(){},
    async ApenasAdministradorModifiqueOGrupo(){},
    async TodosModifiquemOGrupo(){},
    async AlterarDescricaoGrupo(){},
    async sendMediaAudio(){},
    async RevogarConvite(){},
    async EnviarLink(){},
    async SendBotoes(){},
    async AtivarDesativarTempMessage(){},
    async listaBloqueados(dados){
        let d = {
            "sessionName":dados.nomeAPI,
            "browserName":dados.NomeSessao,
            "soketID":sock.id,
            "webhook":"",
            "ClientID":dados.ClientID
        }
         sock.emit("startConexao",d, async (ret)=>{
            console.log(ret)
           return await ret
        })
    },
    async EncaminhandoMensagem(){},
    async sendMessageTemp(){},
    async Bloquear(){},
    async SendBotoesLINK(){},
    async DeletMessage(){},
    async DeletFile(){},
    async Upload(){},
    async sendImage(){},
    async sendFile(){},
    async sendPDF(){},
    async sendMedia(){},
    async enviarLista(){},
    async start(dados){
        let d = {
            "sessionName":dados.nomeAPI,
            "browserName":dados.NomeSessao,
            "soketID":sock.id,
            "webhook":"",
            "ClientID":dados.ClientID
        }
        sock.emit("startConexao",d, async (ret)=>{
            console.log(ret)
           return await ret
        })
    },
    async logout(dados){
        let d = {
            "sessionName":dados.nomeAPI,
            "browserName":dados.NomeSessao,
            "soketID":sock.id,
            "webhook":"",
            "ClientID":dados.ClientID
        }
        sock.emit("logout",d, async (ret)=>{
            console.log(ret)
           return await ret
        })
    }
} 
