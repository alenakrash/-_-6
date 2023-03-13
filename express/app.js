const express = require("express");
 
const app = express();
 
app.use(express.static(__dirname + "/public"));
 
app.use("/", function(request, response){
    response.sendFile(__dirname + "/public/products.html");
});
 
app.listen(3000);