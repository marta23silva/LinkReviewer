const { MessageEmbed } = require('discord.js');

module.exports = {
	run: message => {
		return message.channel.send(new MessageEmbed()
			.setAuthor('Do you want to invite me to another guild? Click here!', 'https://cdn.discordapp.com/attachments/868061485425893408/884113634689703986/dp_curr.png', 'https://discord.com/oauth2/authorize?client_id=882362749353623622&scope=bot&permissions=8')
			.setColor('00ff00')
		);
	},

	command: 'invite',

	aliases: []
}