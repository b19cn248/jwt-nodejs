const express = require('express')
const app = express()
const port = 8080;
const bodyParser = require('body-parser');
const db = require('./config/db/config.db')
const cors = require('cors')
const cookieSession = require('cookie-session')

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to jwt Nguyen Minh Hieu." });
});

db.connect();

// require("./sroutes/auth.routes")(app);
// require("./app/routes/user.routes")(app);

require("./routes/auth.routes")(app)
require("./routes/user.routes")(app)
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
