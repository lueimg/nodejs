$().ready(function () {
	//NOS CONECTAMOS AL SOCKET.IO
	window.io = io.connect();

	//cuando se conecte 
	io.on("connect",function(socket){
		console.log("hi");

		//mandamos un mensaje al servidor
		io.emit("hola?");

	});

	io.on("saludo",function(data){
		//debugger;
		console.log(data.message);
	});


	//configuramos los eventos log-in y log-out
	//info mandada por el server

	io.on("log-in",function(data){
		console.log("se logeo " + data.username)
		$("#users").prepend("<li>"+data.username+"</li>");
	});
	
	io.on("log-out",function(data){
		console.log("se fue " + data.username)
		$("#users li").each(function (i,item){
			if(item.innerText === data.username){
				$(item).remove();
			}
		});
	});

});