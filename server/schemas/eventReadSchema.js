const mongoose = require("mongoose");

const EventReadSchema = new mongoose.Schema(
    {
        emailId: String,
        eventId: Number,

    },
    {
        collection: "readEvents",
    }
);

module.exports = mongoose.model('EventRead', EventReadSchema);
