const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            }
        ]
    })
);

module.exports = User;