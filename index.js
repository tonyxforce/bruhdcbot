var path = require('path'); var originalLoggingMethod = console.log; console.logTrace = (firstArgument, ...otherArguments) => { var originalPrepareStackTrace = Error.prepareStackTrace; Error.prepareStackTrace = (_, stack) => stack; var callee = new Error().stack[1]; Error.prepareStackTrace = originalPrepareStackTrace; var relativeFileName = path.relative(__dirname, callee.getFileName()); var prefix = `${relativeFileName}:${callee.getLineNumber()}:`; if (typeof firstArgument === 'string') { originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments) } else { originalLoggingMethod(prefix, firstArgument, ...otherArguments) } }




var fs = require("fs")


var { Client, Intents } = require('discord.js');

var Discord = require("discord.js");



var commands = []



var config = require("./config.json");

var errors = require("./errs.json");

var message = require('./events/message.js');



var bot = new Client({

    intents: [

        Intents.FLAGS.GUILDS,

        Intents.FLAGS.GUILD_MESSAGES,

        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS

    ]

});


var logFile = fs.createWriteStream("logz/latest.log")
process.stdout.pipe(logFile)


process.on('uncaughtException', function(err) { console.error((err && err.stack) ? err.stack : err); 

});

var access = fs.createWriteStream('logz/latest.log');

process.stdout.write = process.stderr.write = access.write.bind(access);


access.on("data", consle.log)


bot.on("ready", _ => commands = require("./events/ready.js").run(Discord, bot, config, errors));



bot.on("messageCreate", m => require("./events/message.js").run(Discord, bot, m, commands, config, errors, __dirname));



bot.login(process.env.token || config.token)

/* 

bot.on("messageCreate", message => {

    if(message.content.startsWith("!interactive")){

        if(!message.content.split(" ")[2]) return message.reply(errors.notEnoughArgs)

        console.logTrace(interactiveCommand([message.content.split(" ")[1], message.content.split(" ")[2]], message, Discord));

    }

})





function interactiveCommand(questions = ["not Defined", "not Defined"], message, Discord) {



    let opt = {

        first: null,

        second: null

    };





    message.channel.send(questions[0]);



    let collector = new Discord.MessageCollector(message.channel, () => true);



    collector.on("collect", (m) => {

        if (m.author.bot) return;



        if (opt.first && !opt.second) {

            opt.second = m.content;

            collector.stop();

            return opt

        }



        if (!opt.first && !opt.second) {

            opt.first = m.content;

            message.channel.send(questions[1]);

        }

    });

} */
