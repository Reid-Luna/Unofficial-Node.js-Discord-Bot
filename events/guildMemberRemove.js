// This event executes when a message is deleted
const Discord = require('discord.js');


module.exports = async (client, member) => {
    const logs = member.guild.channels.find('name', 'logging');

    const entry = await member.guild.fetchAuditLogs({
        type: 'MEMBER_KICK'
    }).then(audit => audit.entries.first());


    const embed = new Discord.RichEmbed().setTitle("User Left").setAuthor(client.user.username, client.user.avatarURL).setColor(0xff268f);
    embed.addField("Kicker", entry.executor.username + "#" + entry.executor.discriminator);
    embed.addField("User", entry.target.username + "#" + entry.target.discriminator);
    embed.addField("Reason", entry.reason || "No reason specified.");

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();

    embed.addField("Time", datetime);


    logs.send(embed);

};