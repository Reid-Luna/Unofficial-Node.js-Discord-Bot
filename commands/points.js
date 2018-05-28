exports.run = async (client, message) => {
  const scorePoints = client.points.get(message.author.id).points;
  !scorePoints ? message.channel.send("You have no points yet.") : message.channel.send(`You have ${scorePoints} points!`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "points",
  category: "Level",
  description: "Get your current amount of points",
  usage: "points"
};
