var path = require('path');var originalLoggingMethod = console.log;console.logTrace = (firstArgument, ...otherArguments) => { var originalPrepareStackTrace = Error.prepareStackTrace; Error.prepareStackTrace = (_, stack) => stack; var callee = new Error().stack[1]; Error.prepareStackTrace = originalPrepareStackTrace; var relativeFileName = path.relative(__dirname, callee.getFileName()); var prefix = `${relativeFileName}:${callee.getLineNumber()}:`; if (typeof firstArgument === 'string') { originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments) } else { originalLoggingMethod(prefix, firstArgument, ...otherArguments) } }
var fs = require("fs")
var chalk = require("chalk")

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

module.exports = {
    "name": "msgEvent",
    "description": "Ez a fájl van meghívva, ha valaki üzenetet küld.",
    "enabled": true,
    "run": (Discord, bot, message, commands, _, errs, dirname) => {
        var date = new Date();
        var formattedDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();


        var invertedRgb = rgbToHex(255 - hexToRgb(message.member.displayHexColor).r, 255 - hexToRgb(message.member.displayHexColor).g, 255 - hexToRgb(message.member.displayHexColor).b);
        console.log(chalk.hex(message.member.displayHexColor).bgHex(invertedRgb)(`{${formattedDate}}[${message.channel.guild}] <${message.author.tag}> ${message.content}`))

        config = JSON.parse(fs.readFileSync(path.join(dirname, "config.json"), "utf-8"));
        if (!message.content.startsWith(config.prefix)) return;

        var args = message.content.replace(config.prefix, "").split(" ");

        var hasRun = 0;

        commands.forEach(e => {
            console.log(e)

            if (e.enabled && (e.aliases.includes(args[0]) || e.name == args[0])) {
                hasRun = 1
                e.run(Discord, bot, message, errs, dirname, args);
            }
            else return;
        });

        if(!hasRun) return message.reply(errs.notFound)

    }

}