const { Client, Intents } = require("discord.js");
require("dotenv").config();

const channels = {
  general: "788753558321102852",
  programming: "816566602010198036",
  frontend: "878815825719615498",
  backend: "919583674608009246",
  notifications: "815879442337366036",
  suggestions: "815879463412826143",
  socialMedia: "916772386563584121",
  projects: "916774445568368674",
};

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Client Ready!");
});

client.on("guildMemberAdd", (member) => {
  member.guild.channels.get(channels.general).send(`Welcome ${member.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case "ping":
      await interaction.reply("Pong!");
      break;
    case "server":
      await interaction.reply(
        `Server info: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
      );
      break;
    case "user":
      await interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
      );
    case "roll":
      const range = interaction.options.get("range", true).value;
      await interaction.reply(
        `${interaction.user.tag} is rolling 🎲\n${Math.ceil(
          Math.random() * range
        )} / ${range}`
      );
      break;
    default:
      console.error("Bad Command Name!");
      break;
  }
});

client.login(process.env.BOT_TOKEN);
