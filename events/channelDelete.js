// This event executes when a message is deleted
const Discord = require('discord.js');


module.exports = async (client, channel) => {

    const logs = channel.guild.channels.find('name', 'logging');

    const entry = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first());

    const embed = new Discord.RichEmbed().setTitle("Channel Deleted").setAuthor(client.user.username, client.user.avatarURL).setColor(0xff6b21);
    embed.addField("User", entry.executor.username + "#" + entry.executor.discriminator);

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();

    embed.addField("Time", datetime);

    // TODO: Add channel name

    logs.send(embed);

};