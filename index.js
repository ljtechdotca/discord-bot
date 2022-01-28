const { Client, Intents, GuildMember, Collection } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

// todo : replace hard coded ids with dynamic ids

const INIT_EMOJIS = {
  hype: {
    id: "910220377932828713",
    name: "ljtechHype",
    code: "<:ljtechHype:910220377932828713>",
  },
  gasp: {
    id: "910220378134183978",
    name: "ljtechGasp",
    code: "<:ljtechGasp:910220378134183978>",
  },
  derp: {
    id: "910220378025103401",
    name: "ljtechDerp",
    code: "<:ljtechDerp:910220378025103401>",
  },
};

const INIT_COMMANDS = {
  ping: "936031927973068851",
};

const INIT_ROLES = {
  admin: "812929873357307914",
};

const INIT_CHANNELS = {
  general: "788753558321102852",
  programming: "816566602010198036",
  frontend: "878815825719615498",
  backend: "919583674608009246",
  notifications: "815879442337366036",
  suggestions: "815879463412826143",
  socialMedia: "916772386563584121",
  projects: "916774445568368674",
};

const INIT_PERMISSIONS = [
  {
    id: INIT_ROLES.admin,
    type: "ROLE",
    permission: true,
  },
];

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
  console.log(client.application.commands);
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
