var express = require('express');
var app = express();
 
 
app.get('/', function(req, res) {
 
    res.send('Welcome to Assignment Manager');
    app.use('/admin', express.static('admin'))
 
});
 
 
app.listen(8080, function(err) {
 
    if (!err)
        console.log("Site is live");
    else console.log(err)
 
});