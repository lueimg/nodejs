//INICIANDO UN SERVIDOR CON EXPRESS()
var express = require("express"); // tipo import de python
var server = express();


//GET RESPONDE PETICIONES URL
server.get("/", function (req, res){

	res.send("hola mundo");
}); //fin home


//EN CONSOLA NODE SERVER.JS
server.listen(3000);