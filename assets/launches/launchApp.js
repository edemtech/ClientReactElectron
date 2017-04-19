var config = require('./etc/config.json');

var startMFC = function(exe,login,password){
	var shell = require('autoit');
	var title = "[TITLE:Chat Server Login]";
	shell.Run(exe);
	shell.Sleep(5000);
	if (shell.WinExists(title)==true){
		shell.WinSetOnTop(title,"",1);
		shell.Sleep(5000);
		shell.WinActivate(title);
		shell.Send(password);
		shell.Send("{TAB}");
		shell.Send("{TAB}");
		shell.Send("{TAB}");
		shell.Send(login);
		shell.Send("{ENTER}");
	};
};


var startJasmin = function(exe,login,password){
	var shell = require('autoit');
	var title = "[TITLE:JASMINCAM]";
	shell.Run(exe);
	shell.Sleep(10000);
	if (shell.WinExists(title)==true){
		shell.WinSetOnTop(title,"",1);
		shell.WinActivate(title);
		shell.Send("{TAB}");
		shell.Send(login);
		shell.Send("{TAB}");
		shell.Send(password);
		shell.Sleep(6000);
	} else {
		shell.Sleep(5000);
		if (shell.WinExists("[TITLE:JASMINCAM]")==true){
			shell.WinClose("[TITLE:JASMINCAM]");
		};
		return(null);
	}
};


var startF4F = function(exe,login,password){
	var shell = require('autoit'),
		title = '',
		commercial = function(){
			shell.Sleep(5000);
			title = shell.WinGetTitle("[ACTIVE]");
			if(title!=='Enter e-mail'){
				shell.Send('{ENTER}');
			};
			shell.Sleep(2000);
		};
	shell.Run(exe);
	shell.Sleep(7500);
	if (shell.WinExists("[TITLE:Login Process - Step 1 of 3]")==true){
		shell.WinSetOnTop("[TITLE:Login Process - Step 1 of 3]","",1);
		shell.WinActivate("[TITLE:Login Process - Step 1 of 3]");
		shell.Send(login);
		shell.Send("{TAB}");
		shell.Send(password);
		shell.Send("{ENTER}");
		shell.Sleep(3000);
		shell.Send("{ENTER}");
	} else{
		shell.Sleep(10000);
		if (shell.WinExists("[TITLE:Login Process - Step 1 of 3]")==true){
			shell.WinClose("[TITLE:Login Process - Step 1 of 3]");
			shell.Send("{TAB}");
			shell.Send("{SPACE}");
		};
		return(null);
	};
};


switch(process.env.envApp){
	case 'MFC':
		startMFC(config.apps.mfc, process.env.envLogin, process.env.envPass);
		break;
	case 'F4F':
		startF4F(config.apps.f4f, process.env.envLogin, process.env.envPass);
		break;
	case 'Jasmin':
		startJasmin(config.apps.jasmin, process.env.envLogin, process.env.envPass);
		break;
};
