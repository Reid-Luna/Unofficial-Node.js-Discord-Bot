exports.run = async (client, message, _args, _level) => { // eslint-disable-line no-unused-vars
  const msg = await message
    .channel
    .send('Hey Q!');
  msg.edit('<@206857563206189058>');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'gogetq',
  category: 'Miscelaneous',
  description: 'It pings Q, the supernatural being from Star Trek....think we have a script mixu' +
      'p',
  usage: 'Hey Q!',
};
