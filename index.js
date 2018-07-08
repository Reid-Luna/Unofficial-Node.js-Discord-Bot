const Discord = require('discord.js');
const client = new Discord.Client();


const {
  promisify
} = require("util");
const readdir = promisify(require("fs").readdir);

const Enmap = require("enmap");
const Provider = require("enmap-sqlite");
const EnmapLevel = require('enmap-level');


client.config = require('./config.js')
client.logger = require('./util/Logger')
require("./modules/functions.js")(client);


client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({
  provider: new EnmapLevel({
    name: "settings"
  })
});

client.points = new Enmap({ provider: new Provider({ name: "points" }) });

const init = async () => {

  //Each of our command files
  const cmdFiles = await readdir("./commands/");
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  //Each of our event files
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events;`);
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0]
    const event = require(`./events/${file}`);

    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  //Create a cache of our clients permissions
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(client.config.token);

}

init();
