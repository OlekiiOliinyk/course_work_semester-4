const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {type: String, unique: true},
        password: String,

    },
    {
        collection: "users",
    }
);

mongoose.model("users", UserSchema);
