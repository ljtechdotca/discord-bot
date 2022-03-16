const { SlashCommandBuilder } = require("@discordjs/builders");
const { INIT_EMOJIS } = require("../constants");

module.exports = {
  data: new SlashCommandBuilder()
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
  async execute(interaction) {
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
    
    await interaction.channel.send("Hello World this is a test! 🙋‍♀️");
  },
};
