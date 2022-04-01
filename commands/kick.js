var path = require('path'); var originalLoggingMethod = console.log; console.logTrace = (firstArgument, ...otherArguments) => { var originalPrepareStackTrace = Error.prepareStackTrace; Error.prepareStackTrace = (_, stack) => stack; var callee = new Error().stack[1]; Error.prepareStackTrace = originalPrepareStackTrace; var relativeFileName = path.relative(__dirname, callee.getFileName()); var prefix = `${relativeFileName}:${callee.getLineNumber()}:`; if (typeof firstArgument === 'string') { originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments) } else { originalLoggingMethod(prefix, firstArgument, ...otherArguments) } }

module.exports = {
    name: "kick",
    description: "embereket lehet vele kidobni a szerverből",
    enabled: true, //true: parancs engedélyezve, false: parancs kikapcsolva
    aliases: ["kick", "kidob", "kidobás", "kibaszás", "kibasz"], //ha van alias, akkor azt itt lehet megadni
    run: (Discord, bot, message, errors, dirname, args) => {
        if(!args[1]) return message.reply(errors.userNotFound)
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply(errors.permissionError);
        if (!message.mentions.users.size) return message.reply(errors.userNotFound);


        var kickMember = message.mentions.members.first();

        if (!kickMember) return message.reply(errors.userNotFound);

        args.forEach(function (arg, ind) {
            if(arg.includes("@")){
                args.splice(ind, 1);
            }
        })


        kickMember.kick(args[1] ? args[1] : "").then(member => {
            message.reply(`<@${member.id}> ki lett dobva \`${message.guild.name}\` szerverről ${args[1] ? "**" + args[1] + "** indokkal" : ""}!`);
        }).catch(err => {
            message.reply("nem tudtam kickelni a felhasználót!: " + err);
        });

    }
}