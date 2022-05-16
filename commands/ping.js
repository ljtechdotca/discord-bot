const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { INIT_USERS, INIT_EMOJIS } = require("../constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDefaultPermission(true)
    .setDescription("Tell anyone @here that ljtechdotca is going live!"),
  async execute(interaction) {
    if (interaction.user.id === INIT_USERS.landon) {
      await interaction.deferReply({ ephemeral: true });

      const embeds = [
        new MessageEmbed()
          .setColor("RED")
          .setTitle("ljtechdotca is LIVE")
          .setDescription(
            "Hey ljtechdotca just went live! Come hang out and vibe."
          )
          .setTimestamp()
          .setThumbnail("https://i.imgur.com/YsoqzDO.png")
          .setURL("https://www.twitch.tv/ljtechdotca"),
      ];

      await interaction.channel.send({ embeds });

      interaction.editReply("Server was pinged!");
    }
  },
};
