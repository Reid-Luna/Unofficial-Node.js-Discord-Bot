exports.run = (client, message, args, level) => {
  console.log("hi");
};

exports.conf = {
  hidden: false,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "leaderboard",
  description: "view the leaderboard of points",
  usage: "leaderboard [username or blank]",
  category: "Points & Level",
  extended:
    "if the space after leaderboard is left blank, then it will default to the top ten, if it has a user then it will show their position"
};
