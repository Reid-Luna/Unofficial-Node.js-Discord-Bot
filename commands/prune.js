exports.run = async (client, message, _args, _level) => {
  const belowTenMems = [];
  const pruned = [];

  // Get the guild's members with points
  const filtered = client
    .points
    .filterArray((p) => p.guild === message.guild.id);

  filtered.push({user: '447994075035992064', guild: '329061577498034187', points: 1, level: 0});

  // Get all members with below 10 points
  const belowTen = filtered.filter((m) => m.points < 10);

  // TODO: Refactor to make it faster, possible just mirror the array
  belowTen.forEach((m) => {
    belowTenMems.push(m.user);
  });

  belowTenMems.forEach((m) => {
    const guildMem = message
      .guild
      .members
      .get(m);

    if (guildMem.lastMessage !== null) {
      let lastMessageTime = guildMem.lastMessage.createdTimestamp;
      const diff = Date.now() - lastMessageTime;
      const twoWeeks = (1.2096 * Math.pow(10, 9));

      if (diff > twoWeeks) {
        //   Prune user
        pruned.push(guildMem.user.id);
        console.log(`Prune(10 > Points, Last Message): ${guildMem.user.id}`);
      }
    } else {
      // No last message and points are less than 10.
      //   TODO: Check if joined within the past 7 days, if so don't prune
      const joinedTimestamp = guildMem.joinedTimestamp;
      const sevenDays = (8.64 * Math.pow(10, 7));
      const diff = Date.now() - joinedTimestamp;

      if (diff > sevenDays) {
        //   Prune user
        pruned.push(guildMem.user.id);
        console.log(`Prune(10 > Points, No Last Message): ${guildMem.user.id}`);
      }
    }
  });

  client
    .logger
    .log(`+== PRUNING SPAM ==+`);

  pruned.forEach((mID) => {
    let member = message
      .guild
      .members
      .get(mID);

    if (!member.kickable) {
      //   Member can't be kicked
      client
        .logger
        .error(`Error pruning member ${member.user.tag}`);
    }

    const reason = `${message.author} issued prune command, you have been pruned!`;

    member
      .kick(reason)
      .catch((error) => message.channel.send(`ERROR: Could not kick ${member.user.tag} because of ${error}`));
    client
      .logger
      .log(`Pruned User: ${member.user.tag}`);
  });

  await message
    .channel
    .send('Pruning ' + pruned.length + ' user(s).');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator',
};

exports.help = {
  name: 'prune',
  category: 'System',
  description: 'Prunes people but prunes people with roles',
  usage: 'prune',
};
