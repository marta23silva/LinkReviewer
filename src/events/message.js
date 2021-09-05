const { commands } = require('../utils/register');
const discord = require('discord.js');

module.exports = {
	run: message => {
		console.log(message.author.username + ' said: ' + message.content);

		const prefix = '!';
		// Ignore if a message comes from a bot
		if(message.author.bot) return;

		let command;
		let tokens;
		if(!message.content.toLowerCase().startsWith(prefix)) {
			command = 'review';
		} else {
			tokens = message.content.slice(prefix.length).trim().split(/ +/g);
			command = tokens.shift().toLowerCase();
		}
		const loadedCommand = commands.get(command);
		
		// Ignore if the command does not exist
		if(!loadedCommand) return;
		loadedCommand(message);
	},

	eventName: 'message'
}