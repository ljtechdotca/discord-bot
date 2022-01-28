const { Client, Intents, GuildMember, Collection } = require("discord.js");
const { INIT_CHANNELS } = require("./constants");
const { INIT_EMOJIS } = require("./constants");
const fs = require("fs");
require("dotenv").config();

// create a new client - add intents options
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});

// create a new collection - read and save commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// client ready - fetch command permissions
client.once("ready", async (client) => {
  console.log("Client Ready!");
});

// welcome members - say hello to newbies
client.on("guildMemberAdd", (member) => {
  client.channels.cache
    .get(INIT_CHANNELS.general)
    .send(`Welcome <@${member.user.id}>! ${INIT_EMOJIS.hype.code}`);
});

// create interactions - dynamic command handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.BOT_TOKEN);
