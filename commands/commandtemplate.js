var path = require('path');var originalLoggingMethod = console.log;console.logTrace = (firstArgument, ...otherArguments) => { var originalPrepareStackTrace = Error.prepareStackTrace; Error.prepareStackTrace = (_, stack) => stack; var callee = new Error().stack[1]; Error.prepareStackTrace = originalPrepareStackTrace; var relativeFileName = path.relative(__dirname, callee.getFileName()); var prefix = `${relativeFileName}:${callee.getLineNumber()}:`; if (typeof firstArgument === 'string') { originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments) } else { originalLoggingMethod(prefix, firstArgument, ...otherArguments) } }

module.exports = {
    name: "parancs neve, bármi lehet",
    description: "parancs leírása, bármi lehet",
    enabled: true, //true: parancs engedélyezve, false: parancs kikapcsolva
    aliases: ["alias1", "alias2"], //ha van alias, akkor azt itt lehet megadni
    run: (Discord, bot, message, errors, dirname, args)=>{
    //ide ird a kodot...
    message.reply("bruh");
    }
}