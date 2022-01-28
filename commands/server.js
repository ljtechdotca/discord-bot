const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDefaultPermission(true)
    .setDescription("Replies with server info!"),
  async execute(interaction) {
    await interaction.reply({
      content: `Server info: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
      ephemeral: true,
    });
  },
};
