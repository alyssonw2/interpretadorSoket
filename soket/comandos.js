import {sock} from './conexao.js'
//Mapeando comandos
export const ComadosWhats = {
    async groupFetchAllParticipating(){},
    async CriarGrupo(){},
    async getToquen(){return sock.id},
    async ObterConviteGrupo(){},
    async Metadadosdeumgrupo(){},
    async AlterarFotoGrupo(){},
    async AddouRemoverPessoas(){},
    async EntrandoEmGrupos(){},
    async sendMessage(){},
    async AddouRemoverPessoas(){},
    async AddouRemoverPessoas(){},
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
    async sendMessageTemp(){},
    async listaBloqueados(){},
    async sendMessage(){},
    async EncaminhandoMensagem(){},
    async sendMessageTemp(){},
    async Bloquear(){},
    async SendBotoesLINK(){},
    async DeletMessage(){},
    async sendMediaAudio(){},
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
           return await ret
        })
    },
} 
