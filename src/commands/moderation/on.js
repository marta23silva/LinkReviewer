const { modChannels, botReviews } = require('../../events/ready');
const { MessageEmbed } = require('discord.js');
let connection = require('../../../database/db');

module.exports = {
	run: async message => {

		let modChannel = modChannels.get(message.guild.id);
		if(!modChannel) modChannel = '0';
		if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed().setDescription('❗️ You do not have permission to use that command.').setColor('#E74C3C'));
		if(modChannel == '0') return message.channel.send(new MessageEmbed().setDescription('❗️ **Please choose a channel for me to send the messages first!**\nYou can do so by using `!choose-channel` in your prefered channel.').setColor('#E74C3C'));
		
		await connection.query(
			`UPDATE GuildConfigurable SET botReview = 'on' WHERE guildId = '${message.guild.id}'`
		).then(() => {
			botReviews.set(message.guild.id, 'on');
			message.channel.send(new MessageEmbed().setDescription(`✅ Guild links review was turned on.`).setColor('00ff00'));			
		}).catch(err => { console.error(err); });
	},

	command: 'on',

	aliases: ['turn-on', 'turnon']
}