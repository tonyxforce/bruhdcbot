var path = require('path');var originalLoggingMethod = console.log;console.logTrace = (firstArgument, ...otherArguments) => { var originalPrepareStackTrace = Error.prepareStackTrace; Error.prepareStackTrace = (_, stack) => stack; var callee = new Error().stack[1]; Error.prepareStackTrace = originalPrepareStackTrace; var relativeFileName = path.relative(__dirname, callee.getFileName()); var prefix = `${relativeFileName}:${callee.getLineNumber()}:`; if (typeof firstArgument === 'string') { originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments) } else { originalLoggingMethod(prefix, firstArgument, ...otherArguments) } }

module.exports = {
    name: "ban",
    description: "embereket lehet vele kitiltani",
    enabled: true, //true: parancs engedélyezve, false: parancs kikapcsolva
    aliases: ["ban", "kitilt", "kitiltás"], //ha van alias, akkor azt itt lehet megadni
    usage: "%prefix%ban @felhasználó",
    run: (Discord, bot, message, errors, dirname)=>{
        if(message.member.permissions.has("BAN_MEMBERS")){
            var member = message.mentions.members.first();
            if(member){
                member.ban().then((member)=>{
                    message.channel.send(`${member.displayName} sikeresen kikiltva!`);
                }).catch((error)=>{
                    message.channel.send(`Hiba történt: ${error}`)
                })
            }else{
                message.channel.send(errors.userNotFound);
            }
        }else{
            message.channel.send(errors.permissionError);
        }
    }
}