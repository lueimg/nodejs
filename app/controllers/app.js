var addController =function(server,users) {
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




	//redireccion de log-in
	server.get("/app", instLoggedIn, function (req, res){

		//DEVOLVER LA VSTA app.html y le pasamos valores
		res.render("app", {
						user:req.session.user,
						users: users
				} );
	});
};

module.exports = addController;