const express = require('express')
require("./config/database").connect();

const app = express();

app.use(express.urlencoded({ extended: true} ));

const port = process.env.PORT || 5000;


app.use('/api', require('./api/routes'))


// server listening 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});