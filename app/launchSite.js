var launchSite = function (site,login,password){
		var webdriver = require('selenium-webdriver'),
			  By = webdriver.By,
			  until = webdriver.until;
		var firefox = require('selenium-webdriver/firefox');
		var profile = new firefox.Profile();
			  profile.setPreference('browser.urlbar.autocomplete.enabled', false);
		var options = new firefox.Options()
			.setProfile(profile);
		var driver = new (require('selenium-webdriver')).Builder()
		    .forBrowser('firefox')
		    .setFirefoxOptions(options)
		    .build();

		switch(site){
			case 'imlive':
				var script = 'var x = new XMLHttpRequest();'+
							 'x.open("GET", "https://host.imlive.com/login.asp?Return=&login='+login+'&password='+password+'&btnSubmit=Submit", false);'+
							 'x.send(null);';
				driver.get('https://host.imlive.com/');
				driver.executeScript( script );
				driver.get('https://host.imlive.com/starthostvideochat.asp');
				break;

			case 'camcon':
				var script = 'var x = new XMLHttpRequest();'+
							 'x.open("GET", "https://www.camcontacts.com/chathost/logon.html?action=1&username='+login+'&password='+password+'", false);'+
							 'x.send(null);';
				driver.get('https://www.camcontacts.com/chathost/logon.html');
				driver.executeScript( script );
				driver.get('https://www.camcontacts.com/chathost/sessionstart.html?action=2&getAgreement=0&sessionTitle=Lets play&charge=1.99&isAgreed=on&startSession=START SESSION');
				break;
				//
			case 'streamate': //smdbroad encoder
				var script = 'var x = new XMLHttpRequest();'+
							 'x.open( "GET", "https://www.streamatemodels.com/login.php?submitted=1&sausr='+login+'&sapwd='+password+'&login-form-submit=login", false );'+
							 'x.send(null);';
				driver.get('https://www.streamatemodels.com/');
				driver.executeScript(script);
				driver.get('https://www.streamatemodels.com/performer/');
				driver.get('https://www.streamatemodels.com/flash/');
				break;

			case 'streamray': //encoder
				var script = 'var x = new XMLHttpRequest();'+
							 'x.open( "GET", "https://models.streamray.com/p/login.cgi?site=cams&stream=1&action=login&handle='+login+'&password='+password+'",false );'+
							 'x.send(null);'+
							 'location.reload()';
				driver.get('https://models.streamray.com');
				driver.executeScript(script);
				driver.get('https://models.streamray.com');
				driver.get('https://models.streamray.com/p/cams/stream.cgi?no_perf=1&action=start_broadcast');
				break;

		};
};


var launchSiteApp = function(siteapp, login, pass){
	var shell = require('autoit');
	var config = require('./etc/config.json');

	switch(siteapp){
		case 'streamate':
			var title = "SMBroadcast - Login";
			shell.Run(config.sites.streamate);
			shell.Sleep(5000);
			if (shell.WinExists(title)==true){
				shell.WinSetOnTop(title,"",1);
				shell.Sleep(5000);
				shell.WinActivate(title);
				shell.Send(pass);
				shell.Send("{TAB}");
				shell.Send("{TAB}");
				shell.Send("{TAB}");
				shell.Send(login);
				shell.Send("{ENTER}");
				shell.WinSetOnTop(title,"",0);
			}
			break;
		case 'streamray':
			var title = "Adobe Flash Media Live Encoder 3.2";
			shell.Run(config.sites.streamray);
			shell.Sleep(5000);
			if (shell.WinExists(title)==true){
				shell.WinSetOnTop(title,"",1);
				shell.Sleep(5000);
				shell.WinActivate(title);
				shell.WinSetOnTop(title,"",0);
			}
			break;
	};
};



if(process.env.envSite==='streamray' ||'streamate'){
	launchSite(process.env.envSite,process.env.envLogin,process.env.envPass);
	launchSiteApp(process.env.envSite,process.env.envLogin,process.env.envPass);
} else {
	launchSite(process.env.envSite,process.env.envLogin,process.env.envPass);
}
