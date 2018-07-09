module.exports = async client => {

  // Log that the bot is online.
  client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // Make the bot "Watch" for a command starting with the default prefix.
  client.user.setActivity(`${client.config.defaultSettings.prefix}help`, {type: "WATCHING"});
};
