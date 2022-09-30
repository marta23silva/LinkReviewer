const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Bot info.'),

	async execute(interaction) {
		const msgEmbed = new EmbedBuilder()
			.setDescription(
				'LinkReviewer will delete every message that contains an URL and resend them to another channel for approval. ' +
				'These messages are published again when approved.'
			)
			.setColor('00ff00');
			
		interaction.reply({ embeds: [msgEmbed] });
	}
}
