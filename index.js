const { Client, Intents } = require("discord.js");

require("dotenv").config();

const INIT_COMMANDS = {
  ping: "929534845716152401",
  server: "929534845716152402",
  roll: "929720345886351410",
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

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});

client.once("ready", async () => {
  console.log("Client Ready!");

  if (!client.application?.owner) await client.application?.fetch();
  const command = await client.guilds.cache
    .get(process.env.GUILD_ID)
    ?.commands.fetch(INIT_COMMANDS.ping);
  await command.permissions.add({ permissions: INIT_PERMISSIONS });
});

// todo : guild member add may be firing but its not sending messages
client.on("guildMemberAdd", (member) => {
  member.guild.channels
    .get(INIT_CHANNELS.general)
    .send(`Welcome ${member.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  try {
    switch (commandName) {
      case "ping":
        await interaction.reply(
          "Just went live!\nhttps://www.twitch.tv/ljtechdotca"
        );
        break;
      case "user":
        await interaction.reply(
          `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
        );
      case "roll":
        const range = Math.max(interaction.options.get("range", true).value, 2);
        await interaction.reply(
          `${interaction.user.tag} is rolling 🎲\n${Math.ceil(
            Math.random() * range
          )} / ${range}`
        );
        break;
      default:
        throw new Error("Bad Command Name!");
    }
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.BOT_TOKEN);
