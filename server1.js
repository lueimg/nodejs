//----------------------------------------------------
//USAMOS SUPERVISOR PARA CORREGIR Y REACTUALIZAR EL 
//SERVIDOR EN TIEMPO REAL
//npm install supervisor -g 
//supervisor server.js
//TAMBIEN INSTALAR 
// NODE-INSPECTOR :: 
// FOREVER :: PARA PRODUCCION

//usar forever con node-inspector
// which node-inspector :: /usr/local/bin/node-inspector
//forever <ruta de node-inspector>
//forever /usr/local/bin/node-inspector --web-port=9999
//supervisor --debug server.js 

//----------------------------------------------------


//INICIANDO UN SERVIDOR CON EXPRESS()
var express = require("express"); // tipo import de python
var server = express();


//VARIABLE ALMACENADORA DE MENSAJES
//mientras este corriendo el server guardara los mensajes
var messages = [];

//ALMACENAMOS LOS RESPONSES
var responses = [];


//GET RESPONDE PETICIONES URL
server.get("/", function (req, res){
	//debugger; 
	res.send("hola mundo");
}); //fin home

//RECIVE MENSAJES
server.get("/messages/:message", function (req, res) {
	//PARAMS TIENE LAS VARIABLES DE LA URL

	//ALMACENAMOS EN UNA VARIABLE JAVASCRIPT
	messages.push(req.params.message);

	//ENVIAMOS LOS RESPONSES ALMACENADOS
	//ejecutaran las paginas que esten haciendo el llamado
	responses.forEach(function(res){
		res.send( messages + "<script>window.location.reload();</script>" );
	});

	//respondemos al browser
	res.send("tu mensaje es " + req.params.message);


});

server.get("/messages",function (req, res){

	//TAMBIEN PODEMOS ALMACENAR LOS RESPONSES Y
	//MANDARLOS CUANDO QUERAMOS
	responses.push(res);	
});


//EN CONSOLA NODE SERVER.JS
server.listen(3000);


