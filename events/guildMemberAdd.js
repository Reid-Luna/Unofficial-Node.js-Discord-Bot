// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member);



  pmUserRules(member);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};



function pmUserRules(user) {
  user.sendMessage(`Welcome to our Discord Server, The Unofficial Node.js Server! 
  ----- 
  Before you start jumping into different rooms and such, go to the bottom left of the webpage/desktop app and click that gear on the bottom left! In there, change your display picture, and whatever settings you may think should be changed. We highly recommend you enable Push To Talk, it'll just help those in the same voice channels if you have a lot of background noise.
  -----
  Now, for the serious part.
  -----
  Rules(They're pretty simple):
  1. Don't be dumb. Use common sense.
  2. Be respectful, this one won't get you in trouble for breaking it but if you're disrespecting people on a personal level and everyone is aware, you're probably going to get yelled at.
  3. No NSFW images/videos/texts.
  4. Please keep all general JavaScript help to #js-help & all Discord.js help to #discord-js-help. All general talk about JavaScript should be in #main.
  -----
  If you need a mod to help you with an issue that is NOT regarding programming or Node.js please at me @ℚ.#7750 or sending me a private message if I am not online. To send me a private message, click the three people at the top left,  press the Find and Start a Conversation button, and type my name (@ℚ.#7750) in the area.
  
  *If you have any feedback, want to request a change, or add/remove something please send it in #feedback in a way that is well formatted and documented(We are almost all programmers we hopefully know how to document things well)*`, {
      code: "asciidoc"
  });
}