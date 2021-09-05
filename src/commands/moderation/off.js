const { botReviews } = require('../../events/ready');
const { MessageEmbed } = require('discord.js');
let connection = require('../../../database/db');

module.exports = {
	run: async message => {

		if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed().setDescription('❗️ You do not have permission to use that command.').setColor('#E74C3C'));
		
		await connection.query(
			`UPDATE GuildConfigurable SET botReview = 'off' WHERE guildId = '${message.guild.id}'`
		).then(() => {
			botReviews.set(message.guild.id, 'off');
			message.channel.send(new MessageEmbed().setDescription(`✅ Guild links review was turned off.`).setColor('00ff00'));			
		}).catch(err => { console.error(err); });
	},

	command: 'off',

	aliases: ['turn-off', 'turnoff']
}