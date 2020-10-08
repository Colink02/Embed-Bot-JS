const stateMachine = require('./TicketStateMachine');
const config = require('./config.json');
const Discord = require('discord.js');
const mysql = require('mysql');

class ticketSetup {
	constructor(client, host, user, password, database) {
		this.client = client;
		this.connection = mysql.createConnection({
			host: host,
			user: user,
			password: password,
			database: database,
		});
	}
	getCategories(guildID) {
		// TODO get categories from SQL
		guildID;
		return 'None';
	}
	handleNewTicket(msg) {
		if (msg.content.startsWith(config.prefix + 'ticket')) {
			if (stateMachine.state_machines.has(msg.author.id)) {
				msg.channel.send('You already are working on a ticket! Do you want to restart?');
			}
			else {
				if (msg.channel.type != 'dm') {
					new stateMachine.TicketStateMachine(msg, msg.author, msg.guild);
				}
				else {
					new stateMachine.TicketStateMachine(msg, msg.author);
				}
				msg.author.send({ embed: config['default-message'] });
			}
		}
		else {
			if (!stateMachine.state_machines.has(msg.author.id)) return;
			// Check if were waiting on a message from them
			const userState = stateMachine.state_machines.get(msg.author.id);
			switch (userState.getStage()) {
				// Check stage
				case 1:
					userState.setDescription(msg.content);
					if (userState.getGuild() != null) {
						userState.setStage(3);
					}
					else {
						userState.setStage(2);
						const userGuilds = [];
						this.client.guilds.cache.forEach(server => {
							if (server.members.cache.has(msg.author.id)) {
								userGuilds.push(server);
							}
						});
						const serverSelectionEmbed = new Discord.MessageEmbed()
							.setColor('#32a8a4')
							.setTitle('Server Selection            Step 2/3')
							.setDescription('Please choose 1 - ' + userGuilds.length);
						const guildOptions = {};
						userGuilds.forEach(guild => {
							guildOptions[userGuilds.indexOf(guild).toString()] = guild;
							serverSelectionEmbed.addField((userGuilds.indexOf(guild) + 1) + '. ' + guild.name, 'Contains categories: ' + this.getCategories(guild.id), false);
						});
						userState.setOptions(guildOptions);
						// Set the options available for the user to validate input
						console.log(userState.getOptions());
						msg.channel.send(serverSelectionEmbed);
					}
					break;
				case 2:
					if ((msg.content - 1).toString() in userState.getOptions()) {
						userState.setGuild(userState.getOptions()[(msg.content - 1).toString()]);
						userState.setStage(3);
					}
					else {
						msg.channel.send('That is not a valid option `' + msg.content + '`! Try again');
					}
					break;
				case 3:
					// Select a category
					console.log('Case 3 active');
					break;
				case 4:
				// Check that everything is correct

			}
		}
	}
	setupTicket(msg) {
		switch (this.awaitingResponses[msg.author.id]['stage']) {
			case 1:
				this.awaitingResponses[msg.author.id] += { description: msg.content };
				break;
			case 2:
				// If this ticket wasn't orginated from a server then we need to ask which server
				this.awaitingResponses[msg.author.id] += {};
				// locate if that server exists
				break;
			case 3:
				// if this server has categories ask which one it should go into
				break;
		}
	}
}
module.exports = { ticketSetup };