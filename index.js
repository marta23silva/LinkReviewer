const { config } = require('dotenv');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

// Load environment variables
config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel],
});

client.commands = new Collection();
const commandsPath = join(__dirname, './src/commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = join(commandsPath, file);
	const command = require(filePath);
	console.log(`Loaded ${command.data.name}.js`);
	client.commands.set(command.data.name, command);
}

client.login(process.env.TOKEN);

client.on('ready', () => {
	console.log(`${client.user.tag} is here to protect your Discord server! Hello! 🏹🛡`);
});