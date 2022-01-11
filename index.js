const { Client, Intents } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Client Ready!");
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
