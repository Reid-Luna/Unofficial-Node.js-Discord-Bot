// console.table is how we format the leaderboard
const ctable = require("console.table");

// this function will get usernames (nicknames) from an array of user ids
let getUsernames = async (userArray, message) => {
  // establishing the array that we will return
  let returnARR = [];

  // a for loop for every item in the user array
  userArray.forEach(async (userId) => {
    // gets the user's collection
    let userCollection = await message.guild.fetchMember(userId);

    // sets the nickname for the user
    let username = userCollection.displayName;

    // pushes to the return array
    returnARR.push(username);
  });

  // returns the array
  return returnARR;
};

// this function will combine keys and data together
let combine = async (usernames, data) => {
  // establishing the array we will return
  let returnARR = [];

  // a for loop for every user in the usernames (key) array
  for (let i = 0; i < usernames.length; i++) {
    // sets the object for the user
    let obj = {
      // username / nickname
      username: usernames[i],
      // position
      pos: null,
      // points
      points: data[i].points,
      // level
      level: data[i].level
    };
    // pushes previous obj to the return array
    returnARR.push(obj);
  }

  // returns the array
  return returnARR;
};

// this function will sort the users by score and set a position
let sort = (unsorted) => {
  // will sort by points highest to lowest
  // P.S. i know it should be a-b but that didnt work
  let sorted = unsorted.sort((a, b) => {
    return b.points - a.points;
  });

  // for loop for every item in the sorted array to set the position
  for (let i = 0; i < sorted.length; i++) {
    sorted[i].pos = i + 1;
  }

  // returns the sorted array
  return sorted;
};

// makes a table for the leaderboard
let makeTable = async (sorted, setLimit, args, message) => {
  // establish the table that we are returning
  let ReturnTable = null;

  // establish the array of objects for the table
  let tableArr = [];

  // if there are arguments we will show a specific user
  if (args) {
    // if the args starts with a < then we know it is a mention, therefore a user
    // ex: <@!261567666102206464>
    if (args.startsWith("<")) {
      // we just want the numbers from the menton for the user id
      args = args.replace(/[^0-9.]/g, "");

      // get the user and the nickname for the user
      let user = await message.guild.fetchMember(args);
      let nickname = user.displayName;

      // loop through the sorted array of users to get a specific user
      for (let i = 0; i < sorted.length; i++) {
        // using deconstruction to set the user's variables
        let { pos, username, points, level } = sorted[i];

        // if the username in the sorted array matches the user we got from args
        // then set the obj to that specific user and output the table array
        if (username === nickname) {
          let obj = {
            pos,
            username,
            points,
            level
          };
          tableArr.push(obj);
        }
      }
    } else {
      // if the args is just a number, then it will show the user with the position
      // specified. ex: +board 1 will show the first user
      for (i = 0; i < sorted.length; i++) {
        // using deconstruction like before and if the args match the position
        // then push the user to the table array
        let { pos, username, points, level } = sorted[i];
        if (pos === parseInt(args)) {
          let obj = {
            pos,
            username,
            points,
            level
          };
          tableArr.push(obj);
        }
      }
    }
  } else {
    // if there are no arguments, set the limit to either the limit specified
    // or the length of the sorted array
    let limit = setLimit > sorted.length ? sorted.length : setLimit;

    // look at me using deconstruction again, but this time we are pushing all
    // users to the table
    for (let i = 0; i < limit; i++) {
      let { pos, username, points, level } = sorted[i];
      let obj = {
        pos,
        username,
        points,
        level
      };
      tableArr.push(obj);
    }
  }
  // we then return the table to the caller
  ReturnTable = ctable.getTable(tableArr);
  return ReturnTable;
};

exports.run = async (client, message, args) => {
  // start the array for the table (Leaderboard Array)
  let tableArr = null;

  // get key and value for all users points and levels
  let pointsKeyArray = client.points.keyArray();
  let pointsArray = client.points.array();

  // convert keys into usernames
  let usernames = await getUsernames(pointsKeyArray, message);

  // combine usernames with points and levels
  let unsortedScores = await combine(usernames, pointsArray);

  // sort out positions
  let sortedScores = sort(unsortedScores);

  // make the leaderboard table. with the sorted scores, a limit of ten, pass
  // in the args from the message, and the message object
  let leaderboard = await makeTable(sortedScores, 10, args[0], message);

  // send the leaderboard to the user
  message.channel.send(leaderboard, {
    // this code is markdown
    code: "md",
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
  usage: "leaderboard [username or pos or blank]",
  category: "Points & Level",
  extended:
    "if the space after leaderboard is left blank, then it will default to the top ten, if it has a user or a position then it will show the specific user"
};
