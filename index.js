const config = require('./config.json');
const ticketMod = require('./ticket-setup.js');
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log(ticketMod);
	this.ticketSetup = new ticketMod.ticketSetup(client, config['db']['host'], config['db']['user'], config['db']['password'], config['db']['database']);
	console.log('Discord Bot is ready to go!');
});

client.on('message', async (msg) => {
	this.ticketSetup.handleNewTicket(msg);
});

client.login(config.token);