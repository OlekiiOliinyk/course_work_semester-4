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

mongoose.model("readEvents", EventReadSchema);
