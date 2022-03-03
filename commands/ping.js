const { SlashCommandBuilder } = require("@discordjs/builders");
const { INIT_USERS, INIT_EMOJIS } = require("../constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDefaultPermission(true)
    .setDescription("Tell anyone @here that ljtechdotca is going live!"),
  async execute(interaction) {
    if (interaction.user.id === INIT_USERS.landon) {
      await interaction.reply(
        `Hey @here! ljtechdotca just went live! Come hang and vibe: \nhttps://www.twitch.tv/ljtechdotca ${INIT_EMOJIS.hype.code}`
      );
    }
  },
};
