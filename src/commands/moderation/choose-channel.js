const { modChannels, botReviews } = require('../../events/ready');
const { MessageEmbed } = require('discord.js');
let connection = require('../../../database/db');

module.exports = {
	run: async message => {

		if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed().setDescription('❗️ You do not have permission to use that command.').setColor('#E74C3C'));
		
		const channelId = message.channel.id;
		await connection.query(
			`UPDATE GuildConfigurable SET modChannelId = '${channelId}', botReview = 'on' WHERE guildId = '${message.guild.id}'`
		).then(() => {
			modChannels.set(message.guild.id, channelId);
			botReviews.set(message.guild.id, 'on');
			message.channel.send(new MessageEmbed().setDescription(`✅ Guild links will be reviewed by mods on this channel.`).setColor('00ff00'));			
		}).catch(err => { console.error(err); });
	},

	command: 'choose-channel',

	aliases: ['cc', 'this-channel']
}