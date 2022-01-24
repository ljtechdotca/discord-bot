const { Client, Intents, GuildMember } = require("discord.js");

require("dotenv").config();

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
  ping: "929534845716152401",
  test: "934972731768852510",
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

client.on("guildMemberAdd", (member) => {
  client.channels.cache
    .get(INIT_CHANNELS.general)
    .send(`Welcome @${member.displayName}! ${INIT_EMOJIS.hype.code}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  try {
    switch (commandName) {
      case "ping":
        await interaction.channel.send(
          `Hey @here! ljtechdotca just went live! Come hang and vibe: \nhttps://www.twitch.tv/ljtechdotca ${INIT_EMOJIS.hype.code}`
        );
        await interaction.reply("PONG!");
        await interaction.deleteReply();
        break;
      case "test":
        await interaction.channel.send(
          `Testing something ${INIT_EMOJIS.derp.code}`
        );
        await interaction.reply(INIT_EMOJIS.gasp.code);
        await interaction.deleteReply();
        break;
      case "server":
        await interaction.reply(
          `Server info: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
        );
        break;
      case "roll":
        const range = Math.max(interaction.options.get("range", true).value, 2);
        await interaction.reply(
          `${interaction.user.tag} is rolling ${
            INIT_EMOJIS.gasp.code
          }\n${Math.ceil(Math.random() * range)} / ${range}`
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
