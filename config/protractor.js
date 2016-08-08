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
	multiCapabilities:[
		{
			platformName: 'iOS',
			platformVersion: '7.1',
			browserName: '',
			app: 'safari',
			deviceName: 'iPhone Simulator', 
			'appium-version': '1.4.0',
		},
		{
			platformName: 'Android',
			platformVersion: '4.4',
			browserName: 'Browser',
			deviceName: 'Android Emulator', 
			'appium-version': '1.4.0',
		},
		{
			'name': config.sauceTestName,
			'browserName': 'chrome',
			'tunnel-identifier': config.travisJobNumber,
			'build': config.travisBuild
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