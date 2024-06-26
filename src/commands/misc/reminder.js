const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const data = require("../../../config.json");
module.exports = {
	name: "reminder",
	description: "reminder a member!!!",
	options: [
		{
			name: "target-user",
			description: "The user to give the reminder.",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
	],
	callback: async (client, interaction) => {
		if (!interaction.guild)
			return await interaction.reply("Command can ba ran inside server only.");

		await interaction.deferReply();
		const user = interaction.options.getUser("target-user");
		if (!user)
			return await interaction.editReply("User does not exist in the server.");

		if (!interaction.member.roles.cache.has(process.env.STAFF_ROLE_ID))
			return await interaction.editReply("Staff only.");

		const reminderMessage = `Reminder <@${user.id}> your reply is needed in the <#${interaction.channelId}> as soon as possible`;
		const serverIcon = interaction.guild.iconURL();
		const userIcon = user.displayAvatarURL();

		const reminderEmbed = new EmbedBuilder()
			.setColor(0x0099ff) // Blue color
			// .setTitle("Reminder")
			.setDescription(reminderMessage)
			.setThumbnail(serverIcon)
			.setAuthor({
				name: user.tag,
				iconURL: userIcon,
			});

		try {
			await user.send({ embeds: [reminderEmbed] });
			await interaction.editReply(`Message sent to ${user.tag}`);
		} catch (error) {
			console.error("Error sending DM:", error);
			await interaction.editReply(
				"Failed to send the message, Bot could not dm the user because he has not allowed to be send the message"
			);
		}
	},
};
