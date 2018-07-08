exports.run = async (client, message) => {
    // Limited to guild owner - adjust to your own preference!
    if (!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");​
    const user = message.mentions.users.first() || client.users.get(args[0]);
    if (!user) return message.reply("You must mention someone or give their ID!");​
    const pointsToAdd = parseInt(args[1], 10);
    if (!pointsToAdd) return message.reply("You didn't tell me how many points to give...")​
    // Get their current points.
    const userPoints = client.points.getProp(key, "points");
    userPoints += pointsToAdd;​
    // And we save it!
    client.points.setProp(key, "points", userPoints)​
    return message.channel.send(`${user.tag} has received ${pointstoAdd} points and now stands at ${userPoints} points.`);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "Give",
    category: "Level",
    description: "Give points to a user",
    usage: "give"
};