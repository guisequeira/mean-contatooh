var config = require('../app/config/config')();

exports.config = {
	sauceUser: config.sauceUser,
	sauceKey: config.sauceKey,
	// capabilities: {
	// 	'name': config.sauceTestName,
	// 	'browserName': 'chrome',
	// 	'tunnel-identifier': config.travisJobNumber,
	// 	'build': config.travisBuild
	// },
	maxSessions: 10,
	multiCapabilities: [
	    {
	        browserName: 'internet explorer',
	        version: '10',
	        shardTestFiles: true,
	        maxInstances: 3,
	        'screen-resolution': '1024x768',
	        build: config.travisBuild
	    },
	    {
	        browserName: 'internet explorer',
	        version: '8',
	        platform: 'Windows XP',
	        shardTestFiles: true,
	        maxInstances: 10,
	        'screen-resolution': '1024x768',
	        build: config.travisBuild
	    },
	    {
	        browserName: 'firefox',
	        platform: 'Windows 8',
	        shardTestFiles: true,
	        maxInstances: 3,
	        'screen-resolution': '1024x768',
	        build: config.travisBuild
	    },
	    {
	        browserName: 'safari',
	        version: '7',
	        platform: 'OS X 10.9',
	        shardTestFiles: true,
	        maxInstances: 3,
	        'screen-resolution': '1024x768',
	        build: config.travisBuild
	    },
	    {
	        browserName: 'chrome',
	        platform: 'Windows 8.1',
	        shardTestFiles: true,
	        maxInstances: 3,
	        'screen-resolution': '1024x768',
	        build: config.travisBuild
	    }
	],
	
	specs: ['../test/e2e/**/*.js'],
	onPrepare: function(){
		browser.driver.get('http://localhost:3000');
		// browser.driver.findElement(by.id('login')).click();
		// browser.sleep(500);
		// browser.driver.findElement(by.name('login')).sendKeys('guisequeira@hotmail.com');
		// browser.driver.findElement(by.name('password')).sendKeys('gui@2710');
		// browser.driver.findElement(by.name('commit')).click();
	}
};