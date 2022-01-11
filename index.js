const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const { StaticAuthProvider } = require("@twurple/auth");
const { ApiClient } = require("@twurple/api");
const {
  DirectConnectionAdapter,
  EventSubListener,
} = require("@twurple/eventsub");

// Twitch keys
// const accessToken = "blah";
// const clientId = "blahh";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// todo : see _.todo file
// const handleTwitchAuth = async () => {
//   const authProvider = new StaticAuthProvider(clientId, accessToken);
//   const apiClient = new ApiClient({ authProvider });
//   const adapter = new DirectConnectionAdapter({
//     hostName: "example.com",
//     sslCert: {
//       key: "aaa",
//       cert: "bbb",
//     },
//   });
//   const secret = "superSecret";
//   const listener = new EventSubListener({ apiClient, adapter, secret });
//   await listener.listen();
// };

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

client.login(token);
