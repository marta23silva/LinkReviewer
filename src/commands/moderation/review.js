const { modChannels, botReviews } = require('../../events/ready');
const { client } = require('../../../bot');
const { MessageEmbed } = require('discord.js');

module.exports = {
	run: async message => {
		
		const modChannel = modChannels.get(message.guild.id);
		const botReview = botReviews.get(message.guild.id);

		if(botReview == 'off' || modChannel == '0') return;
		// Mods can post links without review
		if(message.member.hasPermission('KICK_MEMBERS')) return;

		const domains = ['http://', 'https://', 'www.', '.com', '.co', '.gov', '.int', '.mil', '.edu', '.org', '.net', '.ads', '.adult', '.amazon', '.app', '.site', '.apple', '.aws', '.tv', '.hd', '.us', '.ca', '.mx', '.es', '.fr', '.pt', '.de', '.nl', '.be', '.ly', '.sg', '.ee', '.it', '.uk', '.at', '.ch', '.ru', '.bg', '.br', '.jp', '.cn', '.kr'];
		
		if(!domains.some(word => message.content.toLowerCase().includes(word))) return;

		message.delete();
		message.channel.send(new MessageEmbed().setDescription('❗️ **You sent a link!**\nYour message will be reviewed by mods and published again if approved.').setColor('#FFFF00'));
		client.channels.cache.get(modChannel).send('<@' + message.author.id + '>:' + message.content).then(botMsg => {
			botMsg.react('👍').then(r => { botMsg.react('👎') });

			botMsg.awaitReactions((reaction, user) => (reaction.emoji.name == '👍' || reaction.emoji.name == '👎') && (user != process.env.BOT_ID),
				{ max: 1 }).then(collected => {
					if(collected.first().emoji.name == '👍') {
						message.channel.send('<@' + message.author.id + '>: ' + message.content);
					} else {
						message.channel.send('<@' + message.author.id + '>: ❗️ Your message was not approved by the mods.');
					}
				}).catch(err => { console.error(err); });
		});
	},

	command: 'review',

	aliases: []
}