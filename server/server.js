const express = require('express');
const app = express();
const port = 8000;

//adding cors
const cors = require('cors')

// import config
require('./config/mongoose.config')

app.use(cors(), express.json(), express.urlencoded({extended:true}))

// Import routes
require("./routes/project.routes")(app);

// listen to port 8000
app.listen(port, () => console.log(`Listening on port: ${port}`) );