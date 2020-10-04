const config = require('./config.json');
const chatMod = require('./chatting.js');
const ticketMod = require('./ticket-setup.js');
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Discord Bot is ready to gooooo...VROOM...VROOM..');
});

client.on('message', msg => {
	chatMod.chatting(client, msg);
	if (msg.content.toLowerCase().startsWith(config.prefix + "ticket")) {
		if (msg.channel.type != 'dm') {
			//Set up user with current stage and the guild they used the command in
			ticketMod.awaitingResponses[msg.author.id] = { stage: 1, guild: msg.guild.id };
		} else {
			//Set up user with current stage and since were in a dm we have no guild to go to
			ticketMod.awaitingResponses[msg.author.id] = { stage: 1 };
		}
	} else if (ticketMod.isCreatingTicket(msg)) {
		ticketMod.setupTicket(client, msg);
	}

	if (msg.channel.type == 'dm') {
		if (awaitingMessages[msg.author.id] != null) {
			if (awaitingMessages[msg.author.id]['stage'] == 1) {
				awaitingMessages[msg.author.id]
			}
		}
		return;
	}
	if (msg.content.startsWith(config.prefix + "ticket")) {
		msg.author.send(config["default-message"]);
		if (msg.channel.type == 'text') {
			awaitingMessages[msg.author.id] = { stage: 1, guild: msg.guild.id };
		} else {
			awaitingMessages[msg.author.id] = { stage: 1 };
		}
		console.log(awaitingMessages);
		if (msg.channel.type != 'dm') {
			msg.delete();
		}
		return;
	}
});

client.login(config.token);