var path = require('path');var originalLoggingMethod = console.log;console.logTrace = (firstArgument, ...otherArguments) => { var originalPrepareStackTrace = Error.prepareStackTrace; Error.prepareStackTrace = (_, stack) => stack; var callee = new Error().stack[1]; Error.prepareStackTrace = originalPrepareStackTrace; var relativeFileName = path.relative(__dirname, callee.getFileName()); var prefix = `${relativeFileName}:${callee.getLineNumber()}:`; if (typeof firstArgument === 'string') { originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments) } else { originalLoggingMethod(prefix, firstArgument, ...otherArguments) } }
const fs = require("fs")

module.exports = {
    name: "prefix",
    description: "átálítja a bot prefixét",
    enabled: true, //true: parancs engedélyezve, false: parancs kikapcsolva
    aliases: ["prefix", "setprefix"], //ha van alias, akkor azt itt lehet megadni
    run: (Discord, bot, message, errors, dirname) => {
        if (!message.content.split(" ")[1]) return message.reply(errors.notEnoughArgs);
        var readJson = fs.readFileSync(dirname + "/config.json", "utf8");

        readJson = JSON.parse(readJson);
        readJson.prefix = message.content.split(" ")[1];
        
        message.reply(`prefix beállítva: ${readJson.prefix}`);
        fs.writeFileSync(dirname + "/config.json", JSON.stringify(readJson, null, 4), "utf8");
    }
}