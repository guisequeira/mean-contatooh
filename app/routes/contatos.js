function verificaAutenticacao(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('Não autorizado');
	}
}


module.exports = function (app) {
	var controller = app.controllers.contato;

	app.route('/contatos')
		.get(controller.listaContatos)
		.post(controller.salvaContato);

	app.route('/contatos/:id')
		.get(controller.obtemContato)
		.delete(controller.removeContato);	
}