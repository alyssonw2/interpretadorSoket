import io from 'socket.io-client'

export const sock = io("http://18.228.8.159:3000", {
reconnectionDelayMax: 10000
});

sock.on("connect",async () =>{
    console.log('id socket conectado:'+sock.id)
})

sock.on("Qrcode", async dados=>{
    console.log(dados)
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

    