const { client } = require('../../bot');
let connection = require('../../database/db');
const modChannels = new Map();
const botReviews = new Map();

module.exports = {
	run: () => {
		console.log('Hello! 🖤');
		// OPTIONS: PLAYING, WATCHING, STREAMING, LISTENING
		client.user.setActivity('your links', { type: 'WATCHING' });

		client.guilds.cache.forEach(guild => {
			connection.query(
				`SELECT modChannelId, botReview FROM GuildConfigurable WHERE guildId = ${guild.id}`
			).then(result => {
				modChannels.set(guild.id, result[0][0].modChannelId);
				botReviews.set(guild.id, result[0][0].botReview);
			}).catch(err => console.error(err));
		});
	},

	eventName: 'ready',

	modChannels,

	botReviews
}