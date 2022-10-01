const fs = require("fs");
const moment = require("moment");
const config = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

moment.locale("pt-BR");


bot.on('ready', () => {

    console.log(`=-=-=-=- Comandos carregados =-=-=-=-`);
    console.log(`\n   #### ##    ## ####  ######  ####    ###    ########   #######  \n    ##  ###   ##  ##  ##    ##  ##    ## ##   ##     ## ##     ## \n    ##  ####  ##  ##  ##        ##   ##   ##  ##     ## ##     ## \n    ##  ## ## ##  ##  ##        ##  ##     ## ##     ## ##     ## \n    ##  ##  ####  ##  ##        ##  ######### ##     ## ##     ## \n    ##  ##   ###  ##  ##    ##  ##  ##     ## ##     ## ##     ## \n   #### ##    ## ####  ######  #### ##     ## ########   ####### `);
    console.log(`=========================================================================\n`);
	console.log(`Logado como: ${bot.user.username}#${bot.user.discriminator} \n\t ID: ${bot.user.id}\n Servidores: ${bot.guilds.size}`);
    console.log(`\n=========================================================================`);
    console.log(`\nCom ${bot.users.size} usuarios, em ${bot.channels.size} canais e ${bot.guilds.size} servidor.`); 

});

bot.on('message', message => {

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    if(message.author.bot) return;
    //if(message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    if (message.content.startsWith(config.prefix + "bots")) {

        /*
        let bots = message.guild.members.filter(m => m.user.bot == 'true')
        for(let i=0; i <= bots.size; i++){
            console.log(bots[i])
        }
        */

        message.guild.members.forEach(member => {
            if(member.user.bot){
                message.channel.send("<@" + member.user.id + ">");
            }
        
        });
    }

    if (message.content.startsWith(config.prefix + "servidores")) {

        let string = '';

        bot.guilds.forEach(guild => {
            message.channel.send('**Nome do servidor:** ' + guild.name + '\n' + '**ID do servidor:**  ' + guild.id  +  '\n **Quantidade de membros: **' + guild.memberCount + '\n\n------------------------------------');
        })
    }

    if (message.content.startsWith(config.prefix + "avatar")) {
        
        const avatar = args.slice(0).join(" ")
        bot.user.setAvatar(avatar)
        message.reply(avatar)
    }

    if (message.content.startsWith(config.prefix + "nick")) {
        
        const nick = args.slice(1).join(" ")
        console.log(args.join(" "))
        bot.user.setUsername(args.join(" "))
    }

    if (message.content.startsWith(config.prefix + "sairtodos")) {
        bot.guilds.forEach(guild => {
            bot.guilds.get(guild.id).leave()
        })
    }

    if (message.content.startsWith(config.prefix + "leave")) {
        bot.guilds.get(args[0]).leave().catch((err)=>{
            message.reply("Erro ao sair do servidor \n" + err);
        })
        message.reply("Acabei sair do servidor!");
    }
});

bot.login(config.token);