module.exports = class ticket {
    constructor(user, description, categories = [], guild) {
        this.user = user;
        this.description = description;
        this.categories = categories;
        this.guild = guild;
    }

}