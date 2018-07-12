// This event executes when a message is deleted
const Discord = require('discord.js');


module.exports = async (client, message) => {

    const logs = message.guild.channels.find('name', 'logging');

    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        message.guild.createChannel('logging', 'text');
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
    }

    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first());




    let user = ""
    if (entry.extra.channel.id === message.channel.id &&
        (entry.target.id === message.author.id) &&
        (entry.createdTimestamp > (Date.now() - 5000)) &&
        (entry.extra.count >= 1)) {
        user = entry.executor.username

    } else {

        user = message.author.username
    }

    // console.log(entry);
    if (entry.executor.lastMessage.attachments.first()) {

        var attachment = entry.executor.lastMessage.attachments.first()

        // || attachment.proxyURL + "\n *Attachment URL is currently broken*"
        // console.log(attachment);


        const embed = new Discord.RichEmbed().setTitle("Message Deleted").setAuthor(client.user.username, client.user.avatarURL).setColor(0xff000a);
        embed.addField("User", entry.executor.username + "#" + entry.executor.discriminator);
        embed.addField("Message", attachment.proxyURL + "\n *Attachment URL is currently broken*" || "Error");
        embed.addField("Location", entry.executor.lastMessage.channel.name);

        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/" +
            (currentdate.getMonth() + 1) + "/" +
            currentdate.getFullYear() + " @ " +
            currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds();

        embed.addField("Time", datetime);


        logs.send(embed);
    } else {
        const embed = new Discord.RichEmbed().setTitle("Message Deleted").setAuthor(client.user.username, client.user.avatarURL).setColor(0xff000a);
        embed.addField("User", entry.executor.username + "#" + entry.executor.discriminator);
        embed.addField("Message", entry.executor.lastMessage.content || "Error");
        embed.addField("Location", entry.executor.lastMessage.channel.name);

        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/" +
            (currentdate.getMonth() + 1) + "/" +
            currentdate.getFullYear() + " @ " +
            currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds();

        embed.addField("Time", datetime);


        logs.send(embed);
    }


};