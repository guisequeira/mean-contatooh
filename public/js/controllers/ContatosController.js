angular.module('contatooh').controller('ContatosController', 
	function($scope, Contato){
		
		// $scope.contato = {
		// 	nome: 'Flávio Henrique',
		// 	sobrenome: 'Souza Almeida'
		// };
		// $scope.exibir = true;
		// $scope.salario = 100.12;
		// $scope.admissao = new Date();

		$scope.contatos = [];
		$scope.total = 0;
		$scope.filtro = '';

		$scope.mensagem = {texto: ''};

		function buscaContatos(){
			Contato.query(
				function(contatos){
					$scope.contatos = contatos;
				},
				function(erro){
					$scope.mensagem = {
						texto: 'Não foi possivle obter a lista'
					}
					console.log('Não foi possivle obter a lista');
					console.log(erro);
				}
			);
		}

		$scope.remove = function(contato){
			console.log(contato);

			Contato.delete({id: contato._id}, 
				buscaContatos, 
				function(erro){
					console.log('não foi possivel rmeover o contato');
					console.log(erro);
				}
			);
		};

		$scope.incrementa = function(){
			$scope.total++;
		}

		$scope.init = function(){
			buscaContatos();
		};

		$scope.init();

});