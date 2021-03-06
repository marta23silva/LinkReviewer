const { client } = require('../../bot');
let connection = require('../../database/db');
const { modChannels, botReviews } = require('./ready');

module.exports = {
	run: async (guild) => {

		await connection.query(
			`DELETE FROM GuildConfigurable WHERE guildId = ${guild.id}`
		).then(() => { console.log('All guild info was deleted.'); }
		).catch(err => { console.error(err); });

		await connection.query(
			`DELETE FROM Guild WHERE guildId = ${guild.id}`
		).then(() => { console.log(`LinkReviewer was kicked from ${guild.id}.`); }
		).catch(err => { console.error(err); });
	},

	eventName: 'guildDelete'
}