exports.run = async (client, message, _args, level) => {
  const { id } = message.author;
  const { guild } = message;
  const channelId = message.channel.id;
  const isMod = level === 2 ? true : false;
  // open tickets category id
  const categoryId = "490738686028414977";

  // user key
  const key = `${guild}-${id}`;

  // check if user is in database
  if (!client.tickets.has(key)) {
    return message.reply("you do not have any open tickets!");
  }

  // get amount of open tickets
  const openTickets = client.tickets.getProp(key, "openTickets");
  const closedTickets = client.tickets.getProp(key, "closedTickets");

  // only make a new ticket if there are none open
  if (openTickets.length > 0 || isMod) {
    if (openTickets.indexOf(channelId) > -1 || isMod) {
      let index = openTickets.indexOf(channelId);
      openTickets.splice(index, 1);
      message.channel.setParent(categoryId).then( (u) => {
        let topic = u.topic;
        u.setTopic(`[CLOSED] ${topic}`);
        client.tickets.setProp(key, "openTickets", openTickets);
        client.tickets.setProp(key, "closedTickets", [
          ...closedTickets,
          channelId
        ]);
        message.reply(`ticket **${message.channel.name}** was closed.`);
      });
    } else {
      return message.reply(
        "either this channel is not a ticket, or this channel is not your ticket. in both cases you are unable to resolve this ticket."
      );
    }
  } else {
    return message.reply("you do not have any open tickets!");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "resolve",
  category: "Development Help",
  description: "Moves the open ticket to the archived tickets category.",
  usage: "resolve"
};
