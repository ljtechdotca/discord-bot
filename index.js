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
    .send(`Welcome <@${member.user.id}>! ${INIT_EMOJIS.hype.code}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  try {
    switch (commandName) {
      case "ping":
        await interaction.reply("Pinging server members...");
        await interaction.deleteReply();
        await interaction.channel.send(
          `Hey @here! ljtechdotca just went live! Come hang and vibe: \nhttps://www.twitch.tv/ljtechdotca ${INIT_EMOJIS.hype.code}`
        );
        break;
      case "server":
        await interaction.reply({
          content: `Server info: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
          ephemeral: true,
        });
        break;
      case "roll":
        const range = Math.max(interaction.options.get("range", true).value, 2);
        const roll = Math.ceil(Math.random() * range);
        await interaction.reply({
          content: `Rolling a ${range} sided die.`,
          ephemeral: true,
        });
        await interaction.followUp({
          content: `You rolled a ${roll}!`,
          ephemeral: true,
        });
        if (range === roll) {
          await interaction.followUp({
            content: `WINNER! ${INIT_EMOJIS.gasp.code}`,
            ephemeral: true,
          });
        }
        break;
      default:
        throw new Error("Bad Command Name!");
    }
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.BOT_TOKEN);
