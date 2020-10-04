const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Discord Bot is ready to gooooo...VROOM...VROOM..');
});

client.login(config.token);