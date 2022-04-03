var fs = require("fs");

const chalk = require('chalk');

var path = require('path'); var originalLoggingMethod = console.log; console.logTrace = (firstArgument, ...otherArguments) => { var originalPrepareStackTrace = Error.prepareStackTrace; Error.prepareStackTrace = (_, stack) => stack; var callee = new Error().stack[1]; Error.prepareStackTrace = originalPrepareStackTrace; var relativeFileName = path.relative(__dirname, callee.getFileName()); var prefix = `${relativeFileName}:${callee.getLineNumber()}:`; if (typeof firstArgument === 'string') { originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments) } else { originalLoggingMethod(prefix, firstArgument, ...otherArguments) } }

const { readdirSync } = require("fs"); 
const ascii = require("ascii-table"); 
let table = new ascii("Parancsok");
table.setHeading("Parancsok", "Statusz"); 


module.exports = {

    name: "ready",

    description: "runs when the bot is ready",

    enabled: true,

    run: (Discord, bot, config, errors) => {


       const commands = readdirSync(`./commands/`).filter(file => file.endsWith(".js"));

       for(let file of commands) {
           let pull = require(`../commands/${file}`);

           if(pull.name)
               table.addRow(file, 'Működik');
           } else {
               table.addRow(file, 'Hiba');
               continue;
           }
       }

    console.log(table.toString());


        console.log(`bot elindult ${chalk.green(bot.user.tag)} néven`)

        var commands = []

        fs.readdirSync("commands", { withFileTypes: true, encoding: "utf-8" }).forEach(({ name }) => {

            if(!name.endsWith(".js")) return;



            var command = require(`../commands/${name}`)



            if(!command.name) return;



            if (!command.enabled) return console.log(`${name} is disabled`);

            command.command = name.replace(".js", "")

            command.filename = name

            commands.push(command);

        });



        var statusCount = 0;

        setInterval(()=>{

            var status = config.status[statusCount].replace("%prefix%", config.prefix).replace("%scount%", bot.guilds.cache.size)

            bot.user.setActivity(status, { type: "WATCHING" })

            statusCount++

            if(statusCount >= config.status.length) statusCount = 0

        }, 3000)



        return commands

    }



}
