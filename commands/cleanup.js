exports.run = async (client, message) => {
    // Let's clean up the database of all "old" users, and those who haven't been around for... say a month.
    // This will require you to add the following in the points code above: client.points.setProp(key, "lastSeen", new Date());
    ​
    // Get a filtered list (for this guild only).
    const filtered = client.points.filter(p => p.guild === message.guild.id);​
    // We then filter it again (ok we could just do this one, but for clarity's sake...)
    // So we get only users that haven't been online for a month, or are no longer in the guild.
    const rightNow = new Date();
    const toRemove = filtered.filter(data => {
        return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
    });​
    toRemove.forEach(data => {
        client.points.delete(`${message.guild.id}-${data.user}`);
    });​
    return message.channel.send(`I've cleaned up ${toRemove.size} old farts.`);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "Clean Up",
    category: "Level",
    description: "Clean up old users",
    usage: "cleanup"
};