var path = require('path');var originalLoggingMethod = console.log;console.logTrace = (firstArgument, ...otherArguments) => { var originalPrepareStackTrace = Error.prepareStackTrace; Error.prepareStackTrace = (_, stack) => stack; var callee = new Error().stack[1]; Error.prepareStackTrace = originalPrepareStackTrace; var relativeFileName = path.relative(__dirname, callee.getFileName()); var prefix = `${relativeFileName}:${callee.getLineNumber()}:`; if (typeof firstArgument === 'string') { originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments) } else { originalLoggingMethod(prefix, firstArgument, ...otherArguments) } }

module.exports = {
    "name": "ping",
    "description": "returns 'pong!'",
    "enabled": true,
    "aliases": ["ping", "pong"],
    "run": (Discord, bot, message)=>{
        message.reply("pong!")
    }

}