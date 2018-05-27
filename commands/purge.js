/*
The PURGE command will remove a certain amount of messages,
or the messages from a certain user.
*/

exports.run = (client, message, args, level) => {
  // determines if it should delete a number of messages or not
  let argType = (isNaN(Number(args))) ? "string" : "num";
  client.logger.log(argType);

  // if it is a num, we will continue to remove the amount of messages
  if (argType === "num") {
    // we add 2 to the total count to account for the purge message, and the message that
    // confirms the removal
    let numToDel = Number(args) + 2;
    message.channel.send(`Removing ${numToDel - 2} message(s)`);

    // do a while loop to compensate for the 100 messsage limit
    while (numToDel !== 0) {
      if (numToDel >= 100) {
        message.channel.bulkDelete(100)
          .then(client.logger.log(`Removed 100 messages from channel: ${message.channel.name}`))
          .catch((e) => client.logger.log(e, "error"));
        numToDel = numToDel - 100;
      } else {
        message.channel.bulkDelete(numToDel)
          .then(client.logger.log(`Removed ${numToDel} messages from channel: ${message.channel.name}`))
          .catch((e) => client.logger.log(e, "error"));
        numToDel = 0;
      }
    }
  } else { // if it is not a number, we will remove all messages from a certain user
    // sets user to the guild member, or null
    let user = message.mentions.members.first() || null;
    if (user == null) {
      message.channel.send(`User ${args[0]} does not exist`);
    } else {
      let removeMessages = (arr) => {
        // remove array of messages
        message.channel.bulkDelete(arr)
          .then((res) => {
            client.logger.log(`Removed ${arr.size} messages from ${args[0]}`);
            message.channel.send(`Removed ${arr.size} messages from ${args[0]}. Deleting in 3 seconds`)
              .then((m) => {
                m.delete(5000);
              });
          })
          .catch((e) => client.logger.log(e, "error"));
      };
      message.channel.fetchMessages()
        // m is an array of messages from the specific user
        .then((m) => removeMessages(m))
        .catch((e) => client.logger.log(e, "error"));
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["p", "purgeee"],
  permLevel: "Moderator"
};

exports.help = {
  name: "purge",
  category: "Messages",
  description: "Removes number of messages or all messages from a certain user",
  usage: "purge [number or user]"
};
