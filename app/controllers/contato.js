var contatos = [
	{_id: 1, nome: 'Contato exemplo 1', email: 'cont1@empresa.com.br'},
	{_id: 2, nome: 'Contato exemplo 2', email: 'cont2@empresa.com.br'},
	{_id: 3, nome: 'Contato exemplo 3', email: 'cont3@empresa.com.br'}
]

var sanitize = require('mongo-sanitize');

module.exports = function (app) {
	
	var ID_CONTATO_INC = 3;
	
	var Contato = app.models.contato;
	var controller = {};



	controller.listaContatos = function(req, res){
		// res.render('contato', {nome: 'MEAN'});
		

		Contato.find().populate('emergencia').exec()
			.then(function(contatos){
				res.json(contatos);		
			}, 
			function(erro){
				console.error(erro);
				res.status(500).json(erro);
			}
		);
	};
	controller.obtemContato = function (req, res) {
		// var idContato = req.params.id;
		// var contato = contatos.filter(function(contato) {
		// 	return contato._id == idContato ;
		// })[0];
		// contato ?
		// 	res.json(contato) : 
		// 	res.status(404).send('Contato não encontrado');
		var _id = req.params.id;
		Contato.findById(_id).exec()
			.then(
					function(contato){
						if(!contato) throw new Error("Contato não encontrado");
						res.json(contato);
					},
					function(erro){
						console.log(erro);
						res.status(404).json(erro);
					}
				)
	};
	controller.removeContato = function(req, res){
		// var idContato = req.params.id;
		// contatos = contatos.filter(function(contato){
		// 	return contato._id != idContato;
		// })
		res.status(204).end();
		// console.log('API: removeContato')
		var _id = sanitize(req.params.id);
		Contato.remove({"_id": _id}).exec()
			.then(
				function(){
					res.end();
				},
				function(erro){
					return console.error(erro);
				}
			)
	};
	controller.salvaContato = function(req, res){
		// var contato = req.body;
		// contato = controller._id ?
		// 	atualiza(contato) :
		// 	adiciona(contato);
		// res.json(contato);
		var _id = req.body._id;
		var dados = {
			"nome": req.body.nome,
			"email": req.body.email,
			"emergencia": req.body.emergencia || null
		};

		if(_id){
			Contato.findByIdAndUpdate(_id, req.body).exec()
			.then(function(contato){
				res.json(contato);
			}, function(erro){
				console.error(erro)
				res.status(500).json(erro);
			})
		}else{
			Contato.create(req.body)
				.then(function(contato){
					res.status(201).json(contato);
				}, function(erro){
					console.log(erro);
					res.status(500).json(erro);
				})
		}
	};

	function adiciona(contatoNovo){
		contatoNovo._id = ++ID_CONTATO_INC;
		contatos.push(contatoNovo);
		return contatoNovo;
	}
	function atualiza(contatoAlterar){
		contatos = contatos.map(function(contato){
			if(contato._id == contatoAlterar._id){
				contato = contatoAlterar;
			}
			return contato;
		});
		return contatoAlterar;
	}


	return controller;
}