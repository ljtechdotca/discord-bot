const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDefaultPermission(true)
    .setDescription("Tell anyone @here that ljtechdotca is going live!"),
  async execute(interaction) {
    if (interaction.user.id === "184847128000987136") {
      await interaction.reply("Pinging server members...");
      await interaction.deleteReply();
      await interaction.channel.send(
        `Hey @here! ljtechdotca just went live! Come hang and vibe: \nhttps://www.twitch.tv/ljtechdotca ${INIT_EMOJIS.hype.code}`
      );
    }
  },
};
