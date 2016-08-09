var config = require('../app/config/config')();

exports.config = {
	sauceUser: config.sauceUser,
	sauceKey: config.sauceKey,
	multiCapabilities: [
	{
    // by default, these first two browsers will come up in 
    // Linux if you don't specify an OS
    'name': 'Chrome',
    'browserName': 'chrome'
  }, 
  {
    'name': 'Firefox',
    'browserName': 'firefox'
  }, 
  {
    'name': 'Win XP/IE8',
    'os': 'Windows XP',
    'browserName': 'internet explorer',
    'version': '8.0'
  }, 
  {
    'name': 'Win7/IE8',
    'os': 'Windows 7',
    'browserName': 'internet explorer',
    'version': '8.0'
  }, 
  {
    'name': 'Win7/IE9',
    'os': 'Windows 7',
    'browserName': 'internet explorer',
    'version': '9.0'
  }, 
  {
    'name': 'Win8/IE10',
    'os': 'Windows 8',
    'browserName': 'internet explorer',
    'version': '10.0'
  }, 
  {
    'name': 'Win8.1/IE11',
    'os': 'Windows 8.1',
    'browserName': 'internet explorer',
    'version': '11.0'
  }],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000
  },
	
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