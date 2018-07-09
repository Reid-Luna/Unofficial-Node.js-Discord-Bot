exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const key = `${message.guild.id}-${message.author.id}`

  if (!message.author.id === message.guild.owner) return message.reply("You need permission to control me!");

  const user = message.mentions.users.first() || client.users.get(args[0]);
  if (!user) return message.reply("You have to specify me a user to give points to!");

  const pointsToAdd = parseInt(args[1], 10);
  if (!pointsToAdd) return message.reply("Please specify how many points to give...");



  const userPoints = parseInt(client.points.getProp(key, "points"), 10);
  var u1 = userPoints + pointsToAdd;

  client.points.setProp(key, "points", u1);

  message.channel.send(`${user.tag} has received ${pointsToAdd} points and now has a total of ${u1} points.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "give",
  category: "Level",
  description: "Give users a certain amount of points",
  usage: "give [user] [points]"
};