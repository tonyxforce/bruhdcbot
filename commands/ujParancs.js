var path = require('path'); var originalLoggingMethod = console.log; console.logTrace = (firstArgument, ...otherArguments) => { var originalPrepareStackTrace = Error.prepareStackTrace; Error.prepareStackTrace = (_, stack) => stack; var callee = new Error().stack[1]; Error.prepareStackTrace = originalPrepareStackTrace; var relativeFileName = path.relative(__dirname, callee.getFileName()); var prefix = `${relativeFileName}:${callee.getLineNumber()}:`; if (typeof firstArgument === 'string') { originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments) } else { originalLoggingMethod(prefix, firstArgument, ...otherArguments) } }
var fs = require("fs");
var templateStr = require("./commandtemplate.js");

var customConsolelog = fs.readFileSync(path.join(__dirname, "customConsolelog.js"), { encoding: "utf-8" });


module.exports = {
    name: "ujcmd",
    description: "új, saját parancsok létrehozása sablonból",
    enabled: true, //true: parancs engedélyezve, false: parancs kikapcsolva
    aliases: ["ujcmd", "ujparancs", "newcmd", "newcommand"], //ha van alias, akkor azt itt lehet megadni
    run: (Discord, bot, message, errors, dirname, args) => {
        var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../config.json"), { encoding: "utf-8" }));

        if (!config.admins.includes(message.author.id)) return message.reply(errors.permissionError)

        var questions = ["mi legyen a parancs neve?", "mi legyen a parancs leírása?", "engedélyezve legyen a parancs? [igen/nem][i/n][true/false][y/n][yes/no][1/0]"]
        //if(!questions[2]) return message.reply(errors.notEnoughArgs);

        var opt = {
            name: null,
            description: null,
            enabled: null
        };


        message.reply(questions[0]);

        var collector = new Discord.MessageCollector(message.channel, () => true);

        collector.on("collect", (m) => {
            if (m.author.bot) return;

            if (opt.name && opt.description && opt.enabled == null) {
                opt.enabled = m.content == "true" || m.content == "igen" || m.content == "y" || m.content == "yes" || m.content == "1" || m.content == "i" || m.content == "n" || m.content == "no";
                collector.stop();
                console.logTrace(opt)

                var cmdDetails = opt;

                var newCmd = templateStr;

            newCmd.run = () => {/*ide ird a kodot...*/ }



                fs.writeFile(path.join(dirname, "commands", cmdDetails.name + ".js"),
`${customConsolelog}

module.exports = ${JSON.stringify(cmdDetails, null, 4).replace("\n}", ",\n\n    ")}run: (Discord, bot, message, errors, dirname, args)=>{
\t//ide ird a kodot...
    }
}`, (err) => {


                        if (err) message.reply(err);
                        message.reply(`új parancs létrehozva: ${cmdDetails.name}`);
                    });
                console.logTrace(cmdDetails);
            }


            if (opt.name && !opt.description && !opt.enabled) {
                opt.description = m.content;
                m.reply(questions[2])
            }

            if (!opt.name && !opt.description && !opt.enabled) {
                opt.name = m.content.replace(/\s/g, "");
                m.reply(questions[1]);
            }
        });
    }
}