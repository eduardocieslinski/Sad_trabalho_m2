const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const bot = new Telegraf(env.token)

const tecladoFilme = Markup.keyboard([
    ['🧙 magia', '🔫 Ação', '😂 Comédia'],
    ['🌳 Aventura','😂😬 Comédia dramática'],
    ['❤️😂 Comédia romântica','😬 Drama'],
    ['😓 Nem uma das Opções/proxima atividade']
]).resize().extra()


bot.start(async ctx => {
    const from = ctx.update.message.from
    await  ctx.reply(`Seja bem vindo ${from.first_name}! 
    Eu sou um 'bot' em treinamento!
        -As Opções vão aparecer na tela escolha de acordo com seus gostos,
        -Escolha na ordem e nem um looping acontecera!
        -O Bot.on nao esta funcionando no Session, Somente no pv`)
    await ctx.reply(`O que voce mais gosta de fazer no seu fim de semana`,
        Markup.keyboard(['😴dormir','🍿📽Assistir']).resize().oneTime().extra())
})



bot.hears(['😴dormir','🍿📽Assistir'], async ctx => {
    await ctx.reply(`Eu também gosto de ${ctx.match}`)
    await ctx.reply('E qual o seu tipo de filme predileto?',tecladoFilme)
})

bot.hears('🔫 Ação', ctx => {
    ctx.reply('Esses sao os mais Legais, eu adoro um filme de ação ainda mais quando rola bastante trocas de tiros um bom filme de ação é Mad Max: Estrada da Fúria')
})

bot.hears('🌳 Aventura', ctx => {
    ctx.reply('Se você curte conhecer e explorar novos lugares e situações esse e o tipo certo de filme pra você!')    
})

bot.hears('🧙 magia', ctx => {
    ctx.reply('Este e sensacional viver em um mundo da magia é extraordinario bela escolha')    
})

bot.hears('😂 Comédia', ctx => {
    ctx.reply('Muito Bem é sempre bom dar umas gargalhadas em um filme de comédia')    
})
bot.hears('😂😬 Comédia dramática', ctx => {
    ctx.reply('aquelas gargalhadas com um tom dramatico, perfeito')    
})
bot.hears('❤️😂 Comédia romântica', ctx => {
    ctx.reply('Para assistir em casal, estes sao otimos')    
})
bot.hears('😬 Drama', ctx => {
    ctx.reply('Para assistir em casal, estes sao otimos')    
})


bot.on(['text'], async ctx => {
    await ctx.reply(`ahhh que pena`)
    await ctx.reply('Voce pode mandar uma foto para eu ver a resolução dela?')
})



bot.on('photo', ctx => {
    const foto = ctx.update.message.photo
    console.log(foto)
    console.log(foto.length)
    // criando um laço para varrer todas as possíveis fotos enviadas
    foto.forEach((ph, i) => {
        ctx.reply(`A ${i}a foto tem resolução de: ${ph.width} X ${ph.height} pixels`)        
    }) 
         ctx.reply('Voce pode mandar um audio?')      
    })

    bot.on('voice', ctx => {
        const voz = ctx.update.message.voice
        console.log(voz)
        ctx.reply(`Áudio de ${voz.duration} segundos recebido!`),
        ctx.reply('Voce pode mandar um sticker?') 
    })

    bot.on('sticker', ctx => {
        const stic = ctx.update.message.sticker
        console.log(stic)
        ctx.reply(`Você enviou o ${stic.emoji} do conjunto ${stic.set_name}`), 
        ctx.reply('Voce pode mandar um contato?')
    })
    bot.on('contact', ctx => {
        const cont = ctx.update.message.contact
        console.log(cont)
        ctx.reply(`Legal! O telefone do ${cont.first_name} é ${cont.phone_number}`),
        ctx.reply('Voce pode mandar a sua Localização?')
    
    })
    bot.on('location', ctx => {
        const loc = ctx.update.message.location
        console.log(loc)
        ctx.reply(`Entendido! Você está em: 
            Latitude: ${loc.latitude}, 
            Longitude: ${loc.longitude}`),
            ctx.reply('Este foi o bot criado para a m2 de sistemas de apoio a decisão, Muito obrigado')   
    })
    
    
bot.startPolling()

