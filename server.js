//INSTALAMOS 2 LIBRERIES 
//EXPRESS.IO  :: PARA HACER TIEMPO REAL :: UNION EXPRESS AND SOCKET.IO
//SWIG :: templates
//CONECT REDIS :: MANEJAR SISTEMAS DE CACHE :: CONNECT-REDIS

var express = require("express"),
	swig = require("swig"),
	_ = require("underscore");

//coneccion a redis
//JUNTAMOS CON EXPRESS
var RedisStore = require("connect-redis")(express);


var server = express();

//GUARDAREMOS LOS USUARIOS LOGEADOS
var users = [];



//CONFIGURACION PARA RENDEREAR VISTAS
//CONFIGURAMOS EL MOTOR CON HTML Y SWIG
server.engine("html",swig.renderFile);
//AHORA DECIMOS TIPO ES EL MOTOR DE HTML: EN ESTE CASO ES VIEW ENGINE
server.set("view engine","html");
//DONDE VAN A ESTAR MIS VISTAS
server.set("views","./app/views");


//EMPEZAMOS LA CONFIGURACION DE SERVER
// para que acepte post, cookies, sessiones
server.configure(function(){
	server.use(express.logger()); //PARA SABER LO QUE ESTA PASANDO EN NUESTRO SERVER
	server.use(express.cookieParser());
	
	//bodyParser genera una variable body dentro de req. :: req.body (object)
	//PARA RECIBIR LA INFO QUE LLEGE A NUESTRO SERVER
	server.use(express.bodyParser()); 

	//CREAMOS SESIONES CON REDIS EN EL SERVER
	server.use(express.session({
		secret:"lueimg",
		store: new RedisStore({})
	 // store: new RedisStore({host: '',port:"",user:"",pass:"" });
	}));


}); //fin server.configures


//MIDDLEWARES  :: se crean antes que todo
//-- PARA IMPLEMENTARLOS SOLO SE PONE ANTES DE LA FUNCION NORMAL
//PERMITE HACER VERIFICACIONES DE INGRESO
var instLoggedIn = function(req, res, next){
	
	if(!req.session.user){
		res.redirect("/");
		return; // TERMINA PARA QUE YA NO SE EJECUTE NADA MAS 
	}

	//NEXT PERMITE EJECUTAR LA SIGUIENTE FUNCION
	next();
};

var inLoggedIn = function(req, res, next){
	
	if(req.session.user){
		res.redirect("/app");
		return; 
	}

	next();
};


 
//MOSTAR VISTAS
server.get("/",inLoggedIn, function (req, res){
	res.render("home");
});

//redireccion de log-in
server.get("/app", instLoggedIn, function (req, res){

	//DEVOLVER LA VSTA app.html y le pasamos valores
	res.render("app", {
					user:req.session.user,
					users: users
			} );
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


	//LOS REDIRECCION SON GET
	res.redirect("app");


});


server.get("/log-out",function (req,res){
	//quitamos el usuario del listado con uderscore
	users = _.without(users, req.session.user);

	//destruimos la session
	req.session.destroy();
	res.redirect("/");
});



//Lanzar servidor
server.listen(3000);