//INICIANDO UN SERVIDOR CON EXPRESS()
var express = require("express"); // tipo import de python
var server = express();


//VARIABLE ALMACENADORA DE MENSAJES
//mientras este corriendo el server guardara los mensajes
var messages = [];


//GET RESPONDE PETICIONES URL
server.get("/", function (req, res){

	res.send("hola mundo");
}); //fin home

//RECIVE MENSAJES
server.get("/messages/:message", function (req, res) {
	//PARAMS TIENE LAS VARIABLES DE LA URL

	//ALMACENAMOS EN UNA VARIABLE JAVASCRIPT
	messages.push(req.params.message);

	//respondemos al browser
	res.send("tu mensaje es " + req.params.message);
});

server.get("/messages",function (req, res){
	
	//AGREGAMOS RECARGA CADA SEGUNDO
	var recarga = "<script>setTimeout(function(){window.location.reload()},1000);</script>";
	
	res.send(messages + recarga);
	
});


//EN CONSOLA NODE SERVER.JS
server.listen(3000);