const { client } = require('../../bot');
let connection = require('../../database/db');
const { modChannels, botReviews } = require('./ready');

module.exports = {
	run: async (guild) => {

		await connection.query(
			`INSERT INTO Guild VALUES('${guild.id}', '${guild.ownerID}')`
		).then(() => { console.log(`${guild.id} inserted in database.`); }
		).catch(err => { console.error(err); });

		await connection.query(
			`INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
		).then(() => { console.log(`GuildId inserted into GuildConfigurable.`); }
		).catch(err => { console.error(err); });

		modChannels.set(guild.id, '0');
		botReviews.set(guild.id, 'off');
	},

	eventName: 'guildCreate'
}