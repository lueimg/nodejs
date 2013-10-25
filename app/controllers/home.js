//EMPEZAMOS A CARGAR LAS LIBRERIAS NECESARIOS 
var _ = require("underscore");

var homeController = function (server,users){


	var inLoggedIn = function(req, res, next){
	
	if(req.session.user){
		res.redirect("/app");
		return; 
	}

		next();
	};



	
	server.get("/",inLoggedIn, function (req, res){
		res.render("home");
	});


	//VIEWS DE UN POST
	server.post("/log-in",function (req,res){
		//POR DEFFECTO EL POST NO RETORNA LOS VALORES ENVIADOS DE UN FORM
		//PARA PODER RECIBIRLOS HAQY QUE CONFIGURAR EL SERVIDOR
		// server.configure
		//res.render("quien eres?");

		//LUEGO DE CONFIGURAR REDIS Y SERVER.CONFIG
		req.session.user = req.body.username;

		//guardamos los usuarios que se logean
		users.push(req.body.username);

		//emitimos por broadcast ::para mandarlo atodos los usuarios
		//io.emit :: un solo usuario
		//rooms :: 
		server.io.broadcast("log-in",{username:req.body.username})


		//LOS REDIRECCION SON GET
		res.redirect("app");


	});


	server.get("/log-out",function (req,res){
		//quitamos el usuario del listado con uderscore
		users = _.without(users, req.session.user);

		//emitimos a todos un delosgeo
		server.io.broadcast("log-out",{username:req.session.user})


		//destruimos la session
		req.session.destroy();
		res.redirect("/");
	});	

};

//PERMITE EXPORTAR LA FUNCION PARA SER USADA EN SERVER.JS
module.exports = homeController;

//LUEGO SERAN DEFINIDOS DENTRO DE SERVER.JS