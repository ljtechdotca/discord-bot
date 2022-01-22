const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Tell anyone @here that ljtechdotca is going live!")
    .setDefaultPermission(false),
  new SlashCommandBuilder()
    .setName("server")
    .setDefaultPermission(true)
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("roll")
    .setDefaultPermission(true)
    .setDescription("Rolls a random number!")
    .addIntegerOption((option) =>
      option
        .setName("range")
        .setDescription("The max roll range.")
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(true)
    ),
].map((command) => {
  console.log({ command });
  return command.toJSON();
});

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then((response) =>
    console.log("Successfully registered application commands.", response)
  )
  .catch(console.error);
