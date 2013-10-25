//INSTALAMOS 2 LIBRERIES 
//EXPRESS.IO  :: PARA HACER TIEMPO REAL :: UNION EXPRESS AND SOCKET.IO
//SWIG :: templates
//CONECT REDIS :: MANEJAR SISTEMAS DE CACHE :: CONNECT-REDIS

var express = require("express.io"),
	swig = require("swig"),
	_ = require("underscore");

//coneccion a redis
//JUNTAMOS CON EXPRESS
var RedisStore = require("connect-redis")(express);


var server = express();
//corremos express con socket.io juntos, por el mismo puerto , al mismo tiempo
server.http().io();
//- /socket.io/socket.io.js

//GUARDAREMOS LOS USUARIOS LOGEADOS
var users = [];



//CONFIGURACION PARA RENDEREAR VISTAS
//CONFIGURAMOS EL MOTOR CON HTML Y SWIG
server.engine("html",swig.renderFile);
//AHORA DECIMOS TIPO ES EL MOTOR DE HTML: EN ESTE CASO ES VIEW ENGINE
server.set("view engine","html");
//DONDE VAN A ESTAR MIS VISTAS
server.set("views","./app/views");

//PARA CARGAR ARCHIVOS ESTATICOS (JS, CSS)
server.use(express.static("./public"));



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


//AGREGAMOS LOS CONTROLES
//TENEMOS QUE ESCRIBIR LA RUTA DE CARPETAS
var homeController = require("./app/controllers/home");
//INICAMOS EL MODULO y le pasamos la conf de server
homeController(server,users);

var addController = require("./app/controllers/app");
addController(server,users);




//RECIBIENDO MENSAJES DE SOCKET
server.io.route("hola?",function(req){
	//debugger;
	//mandarle algo al usuario
	req.io.emit("saludo",{
		message:"Servidor Listo"
	});
});




//Lanzar servidor
server.listen(3000);