const table = require("text-table");
const ctable = require("console.table");

exports.run = async (client, message) => {
  // set headers for table
  let tableArr = [["pos", "user", "points", "level"]];

  // get key and value for all users
  let pointsKeyArray = client.points.keyArray();
  let pointsArray = client.points.array();

  // convert keys into usernames
  let getUsernames = async userArray => {
    let returnARR = [];
    userArray.forEach(async userId => {
      let userCollection = await message.guild.fetchMember(userId);
      let username = userCollection.user.username;
      returnARR.push(username);
    });
    return returnARR;
  };
  let usernames = await getUsernames(pointsKeyArray);

  // combine users and data
  let combine = async (usernames, data) => {
    let returnARR = [];
    for (i = 0; i < usernames.length; i++) {
      returnARR[i] = {
        username: usernames[i],
        pos: null,
        points: data[i].points,
        level: data[i].level
      };
    }
    return returnARR;
  };
  let unsortedScores = await combine(usernames, pointsArray);

  // sort out positions
  let sort = unsorted => {
    let sorted = unsorted.sort((a, b) => {
      return b.points - a.points;
    });
    for (i = 0; i < sorted.length; i++) {
      sorted[i].pos = i + 1;
    }
    return sorted;
  };
  let sortedScores = sort(unsortedScores);

  let makeTable = sorted => {
    for (i = 0; i < sorted.length; i++) {
      let { pos, username, points, level } = sorted[i];
      tableArr.push([pos, username, points, level]);
    }
  };
  makeTable(sortedScores);
  console.log(tableArr);
  let leaderboard = table(tableArr);
  message.channel.send(leaderboard, {
    code: "asciidoc",
    split: { char: "\u200b" }
  });

  let newLeader = ctable.getTable([
    {
      pos: 1,
      user: "reid",
      points: 10,
      level: 1
    },
    {
      pos: 1,
      user: "snowman",
      points: 10,
      level: 1
    }
  ]);
  message.channel.send(newLeader, {
    code: "asciidoc",
    split: { char: "\u200b" }
  });
};

exports.conf = {
  hidden: false,
  guildOnly: true,
  aliases: ["leader", "board", /leaderboard/i],
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
