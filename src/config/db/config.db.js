const mongoose = require('mongoose')
const db = require("../../models");
const Role = db.role;
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect to mongo DB successfully!!!')
        initial();
    } catch (error) {
        console.log(error)
        console.log('Connect failed!!!')
    }
}

async function initial() {
    // Sử dụng find() để kiểm tra xem collection có rỗng không
    const roles = await Role.find();
    if (roles.length === 0) {
        await new Role({ name: "user" }).save();
        await new Role({ name: "moderator" }).save();
        await new Role({ name: "admin" }).save();

        console.log("Added 'user', 'moderator', and 'admin' to roles collection");
    }
}

module.exports = {connect}