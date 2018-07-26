// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member, guild, message) => {


    const key = `${guild.id}-${member.id}`;
    let level = parseInt(client.points.getProp(key, "level"));

    // NOTE: Debug messages
    // console.log("Key: ", key);
    // console.log("Level: ", level);
    // console.log("Member ID: ", member.id)


    //TODO: In the future use better removal of previous roles
    //TODO: Add automatic role creation


    //Exempt ranks
    if (member.roles.find("name", "Geek") || member.roles.find("name", "Mod") || member.roles.find("name", "Admin")) return;
    

    if (level <= 3) {
        //Intern < 900

        //Remove higher role
        if (member.roles.find("name", "Junior Dev")) member.removeRole(guild.roles.find(role => role.name == "Junior Dev"));
        if (member.roles.find("name", "Dev")) member.removeRole(guild.roles.find(role => role.name == "Dev"));
        if (member.roles.find("name", "Senior Dev")) member.removeRole(guild.roles.find(role => role.name == "Senior Dev"));


        //Ensure they already have the role
        if (member.roles.find("name", "Intern")) return;

        //Add Intern role
        member.addRole(guild.roles.find(role => role.name === "Intern"));

    } else if (level > 3 && level <= 5) {
        //Junior Dev, 900 - 3599

        // Check if user already has the role
        if (member.roles.find("name", "Junior Dev")) return;

        //Remove previous role
        if (member.roles.find("name", "Intern")) member.removeRole(guild.roles.find(role => role.name === "Intern"));

        //Add JD role
        member.addRole(guild.roles.find(role => role.name === "Junior Dev"));

        if (message) return message.reply(`You have leveled up to the next rank, **Junior Dev**! Congratulations!`);

    } else if (level > 5 && level <= 7) {
        //Dev, 3600-6399

        // Check if user already has the role
        if (member.roles.find("name", "Dev")) return;

        //Remove previous roles
        if (member.roles.find("name", "Intern")) member.removeRole(guild.roles.find(role => role.name === "Intern"));
        if (member.roles.find("name", "Junior Dev")) member.removeRole(guild.roles.find(role => role.name == "Junior Dev"));

        //Add JD role
        member.addRole(guild.roles.find(role => role.name === "Dev"));

        if (message) return message.reply(`You have leveled up to the next rank, **Dev**! Congratulations!`);



    } else if (level > 7 && level <= 9) {
        //Senior Dev, 6400 - 9999

        // Check if user already has the role
        if (member.roles.find("name", "Senior Dev")) return;

        //Remove previous roles
        if (member.roles.find("name", "Intern")) member.removeRole(guild.roles.find(role => role.name === "Intern"));
        if (member.roles.find("name", "Junior Dev")) member.removeRole(guild.roles.find(role => role.name == "Junior Dev"));
        if (member.roles.find("name", "Dev")) member.removeRole(guild.roles.find(role => role.name === "Dev"));

        //Add JD role
        member.addRole(guild.roles.find(role => role.name === "Senior Dev"));

        if (message) return message.reply(`You have leveled up to the next rank, **Senior Dev**! Congratulations!`);



    } else {
        //What ever, 10k+ 
        //NOTE: Decide last rank at this time they have 10k+ messages so either a bug, rewarded these points or other
    }


};