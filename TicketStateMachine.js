const state_machines = new Map();
module.exports = {
	TicketStateMachine: class {
		constructor(msg, user, guild = null) {
			this.user = user;
			this.stage = 1;
			this.guild = guild;
			state_machines.set(this.user.id, this);
		}
		getStage() {
			return this.stage;
		}
		setStage(stage) {
			this.stage = stage;
		}
		setDescription(description) {
			this.description = description;
		}
		getDescription() {
			return this.description;
		}
		setCategory(category) {
			this.categories = [];
			this.categories += category;
			console.log("Categories is now " + this.categories);
		}
		getCategories() {
			return this.categories;
		}
		setGuild(guild) {
			this.guild = guild;
		}
		getGuild() {
			return this.guild;
		}
		setOptions(options) {
			this.options = options;
		}
		getOptions() {
			return this.options;
		}
	},
	state_machines,
};