const mysql = require('mysql');
const config = require('./config.json');

class TicketSQL {
	constructor(host, user, password, db) {
		this.host = host;
		this.user = user;
		this.password = password;
		this.db = db;
		this.table = config['db']['table'];
		this.reconnectToConnection();
		this.connection.connect((err) => {
			if (err) throw err;
			console.log('SQL Connected');
		});
	}
	reconnectToConnection() {
		this.connection = mysql.createConnection({
			host: this.host,
			user: this.user,
			password: this.password,
			db: this.db,
		});
		this.checkForDatabase();
	}
	checkForDatabase() {
		const ticketCreationDB = 'CREATE TABLE ' + this.connection.escapeId(config['db']['database'] + '.' + config['db']['ticket_table']) + ' ('
			+ '`global_ticket_id` INT NOT NULL AUTO_INCREMENT,'
			+ '`server_ticket_id` VARCHAR(45) NULL,'
			+ '`server_id` VARCHAR(45) NULL,'
			+ '`user_id` VARCHAR(45) NULL,'
			+ '`description` VARCHAR(45) NULL,'
			+ 'PRIMARY KEY(`global_ticket_id`),'
			+ 'UNIQUE INDEX`ticket_id_UNIQUE`(`global_ticket_id` ASC) VISIBLE);';
		const ticketServerCheck = 'SELECT `TABLE_NAME` FROM `information_schema`.`TABLES` WHERE `TABLE_NAME` = "' + config['db']['ticket_table'] + '"';
		this.connection.query(ticketServerCheck, (error, results, fields) => {
			if (error) throw error;
			console.log(results);
			console.log(fields);
		})
		this.connection.query(ticketCreationDB, (error, results, fields) => {
			if (error) throw error;
			console.log(results);
			console.log(fields);
		});
	}
	addTicket(description, userID, guildID) {
		const addTicket = 'INSERT INTO '
			+ this.connection.escapeId(config['db']['database'] + '.' + config['db']['ticket_table'])
			+ ' (`server_id`,`user_id`,`description`) VALUES (?,?,?)';
		if (this.connection.state === 'disconnected') this.reconnectToConnection();
		this.connection.beginTransaction();
		this.connection.query(addTicket, [guildID, userID, description], (error, results, fields) => {
			// Insert a new query
			if (error) throw error;
			console.log(results);
			console.log(fields);
		});
	}

}
module.exports = TicketSQL;