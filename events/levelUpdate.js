// This event executes when a new member joins a server. Let's welcome them!

module.exports = async (client, member, guild, message) => {


    const key = `${guild.id}-${member.id}`;
    let level = parseInt(client.points.getProp(key, "level"));

    // NOTE: Debug messages
    // console.log("Key: ", key);
    // console.log("Level: ", level);
    // console.log("Member ID: ", member.id)


    //TODO: In the future use better removal of previous roles
    //TODO: Add automatic role creation
    // FUTURE: Add a prestige funciton for staff, but only based off of points that users approve, ie. +approve <User> and it boosts their points. Has to be low points


    // BUG: This is not working
    //Exempt ranks
    if (member.roles.find("name", "Geek") || member.roles.find("name", "Mod") || member.roles.find("name", "Admin")) return;


    if (level <= 3) {
        //Intern < 225

        //Remove higher role
        if (member.roles.find("name", "Junior Dev")) member.removeRole(guild.roles.find(role => role.name == "Junior Dev"));
        if (member.roles.find("name", "Dev")) member.removeRole(guild.roles.find(role => role.name == "Dev"));
        if (member.roles.find("name", "Senior Dev")) member.removeRole(guild.roles.find(role => role.name == "Senior Dev"));


        //Ensure they already have the role
        if (member.roles.find("name", "Intern")) return;

        //Add Intern role
        member.addRole(guild.roles.find(role => role.name === "Intern"));

    } else if (level > 3 && level <= 5) {
        //Junior Dev, 225 - 624

        // Check if user already has the role
        if (member.roles.find("name", "Junior Dev")) return;

        //Remove previous role
        if (member.roles.find("name", "Intern")) member.removeRole(guild.roles.find(role => role.name === "Intern"));

        //Add JD role
        member.addRole(guild.roles.find(role => role.name === "Junior Dev"));

        if (message) return message.reply(`You have leveled up to the next rank, **Junior Dev**! Congratulations!`);

    } else if (level > 5 && level <= 7) {
        //Dev, 625-1224

        // Check if user already has the role
        if (member.roles.find("name", "Dev")) return;

        //Remove previous roles
        if (member.roles.find("name", "Intern")) member.removeRole(guild.roles.find(role => role.name === "Intern"));
        if (member.roles.find("name", "Junior Dev")) member.removeRole(guild.roles.find(role => role.name == "Junior Dev"));

        //Add Dev role
        member.addRole(guild.roles.find(role => role.name === "Dev"));

        if (message) return message.reply(`You have leveled up to the next rank, **Dev**! Congratulations!`);



    } else if (level > 7 && level <= 9) {
        //Senior Dev, 1224 - 2025

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
        //What ever, 2+ points
        //NOTE: Decide last rank at this time they have 10k+ messages so either a bug, rewarded these points or other
    }


};