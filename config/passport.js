var mongoose = require('mongoose');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;


module.exports = function(){
	
	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID: 'f1abcb153e71f9c088ee',
		clientSecret: '7033207f917dc0942fc5abb4ce5862c5b7ccdf5a',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done){
			Usuario.findOrCreate(
				{"login": profile.username},
				{"nome": profile.username},
				function(erro, usuario){
					if(erro){
						console.log(erro);
						return done(erro);
					}
					return done(null, usuario);
				}
			);
	}));

	// Chamado apenas UMA vez e recebe o usuário do nosso
	// banco disponibilizado pela callback da estratégia de 
	// autenticação. realizará apenas do 
	// ObjectId do usuário na sessão

	passport.serializeUser(function(usuario, done){
		done(null, usuario._id);
	});

	// Recebe o ObjectId do usuário armazenado na sessão
	// Chamado a CADA requisição
	passport.deserializeUser(function(id, done){
		Usuario.findById(id).exec()
		.then(function(usuario){
			done(null, usuario);
		});
	});
};