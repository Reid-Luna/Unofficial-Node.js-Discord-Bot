module.exports = async (client) => {
  // Log that the bot is online.
  client
    .logger
    .log(`I am ready as ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');

  // Itterates through all of the guilds and creates the loggin channel
  client
    .guilds
    .forEach((guild) => {
      const logs = guild
        .channels
        .find((c) => c.name == 'logging');

      // TODO: Delete all muted roles on ready to prevent permenatly muted members.

      if (guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        guild.createChannel('logging', 'text');
        client
          .logger
          .info(`Created the logging chat on the server ${guild.name}.`);
      }
      if (!guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        client
          .logger
          .error(`The logs channel does not exist and tried to create the channel but I am lacking permissions for the server ${guild.name}.`);
              //  TODO: Need a better way to do this
              process.exit(1);
        }
      if (!guild.me.hasPermission('VIEW_AUDIT_LOG') && !logs) {
        client
          .logger
          .error(`The logs channel does not exist and tried to create the channel but I am lacking permissions for the server ${guild.name}. Shutting down...`);
        //  TODO: Need a better way to do this
        process.exit(1);
      }
    });

  // Make the bot 'Watch' for a command starting with the default prefix.
  client
    .user
    .setActivity(`${client.config.defaultSettings.prefix}help`, {
      type: 'WATCHING',
    });
};
