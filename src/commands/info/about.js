const { MessageEmbed } = require('discord.js');

module.exports = {
	run: message => {
		return message.channel.send(new MessageEmbed()
			.setDescription('I will delete every message that contains a link, resend it to your prefered channel and make it public again after your approval.\nYou can change your prefered channel by typing `!choose-channel` on it.')
			.setColor('00ff00')
		);
	},

	command: 'about',

	aliases: []
}