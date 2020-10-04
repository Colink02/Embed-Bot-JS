awaitingResponses = [];

module.exports = {
    setupTicket: function (client, msg) {

    },
    isCreatingTicket: function (msg) {
        if (awaitingResponses[msg.author.id] != null) {
            return true;
        } else {
            return false;
        }
    },
    awaitingResponses,
}