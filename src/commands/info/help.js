const { MessageEmbed } = require('discord.js');

module.exports = {
	run: message => {
		return message.channel.send(new MessageEmbed()
			.setColor('00ff00')
			.setAuthor('LinkReviewer Commands', 'https://cdn.discordapp.com/attachments/868061485425893408/884113634689703986/dp_curr.png')
			.setThumbnail('https://cdn.discordapp.com/attachments/868061485425893408/884113634689703986/dp_curr.png')
			.addFields(
				{ name: 'Info', value: `\`!about\n!invite\n!git\``, inline: true },
				{ name: 'Moderation', value: `\`!choose-channel\n!on\n!off\``, inline: true }
			)
			.setFooter('Having issues? Suggestions? Send me a message on Twitter! @tokyio___')
		);
	},

	command: 'help',

	aliases: ['h']
}