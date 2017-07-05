import React from 'react';
import { connect } from 'react-redux';
import childProcess from 'child_process';

class WorkEnvPage extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  launchDev( type,path,login,pass ){
    this.setState({ isLoading: true });
    const exec = childProcess.exec;
    if (type === 'app'){
      exec( 'node launchApp', { env:{envApp: path, envLogin: login, envPass: pass} } , ()=>this.setState({isLoading: false}) );
			console.log(window.location);
    } else if (type === 'site'){
      exec('node launchSite', { env: {envSite: path, envLogin: login, envPass: pass} }, ()=>this.setState({isLoading: false}) );
			console.log(path);
		}
  }
  launch( type,path,login,pass ){
    this.setState({ isLoading: true });
    const exec = childProcess.execFile;
    if (type === 'app'){
      let executablePath = process.cwd().replace(/\//g,'\\')+"\\resources\\launches\\launchApp.js";
	  	//let executablePath = process.cwd().replace(/\//g,'\\')+"\\launchApp.js";
      let parameters = { env:{envApp: path, envLogin: login, envPass: pass} };
      exec('node',[executablePath], parameters , ()=>this.setState({isLoading: false}) );
    }
    if (type === 'site'){
      let executablePath = process.cwd().replace(/\//g,'\\')+"\\resources\\launches\\launchSite.js";
      let parameters = { env:{envSite: path, envLogin: login, envPass: pass} };
      exec('node',[executablePath], parameters , ()=>this.setState({isLoading: false}) );
    }
  }


	render(){
			const { isLoading } = this.state;
			const u = this.props.auth.user;

			return(
				<div className="panel panel-default">
					<div className="row">
						<div className="col-md-1">
							<div className="btn-group btn-group-vertical btn-group-md">
								<button className="btn btn-danger" disabled={isLoading} onClick={ this.launch.bind(this, 'app',  'MFC',       u.mfc, u.mfcPass)  }>MFC</button>
								<button className="btn btn-danger" disabled={isLoading} onClick={ this.launch.bind(this, 'app',  'F4F',       u.f4f, u.f4fPass)  }>F4F</button>
								<button className="btn btn-danger" disabled={isLoading} onClick={ this.launch.bind(this, 'app',  'Jasmin',    u.jasmin, u.jasminPass)  }>Jasmin</button>
								<button className="btn btn-danger" disabled={isLoading} onClick={ this.launch.bind(this, 'site', 'camcon',    u.camcon,u.camconPass) }>Camcontacts</button>
								<button className="btn btn-danger" disabled={isLoading} onClick={ this.launch.bind(this, 'site', 'streamray', u.streamray,u.streamrayPass) }>Streamray</button>
								<button className="btn btn-danger" disabled={isLoading} onClick={ this.launch.bind(this, 'site', 'imlive',    u.imlive,u.imlivePass) }>imlive</button>
								<button className="btn btn-danger" disabled={isLoading} onClick={ this.launch.bind(this, 'site', 'streamate', u.streamate,u.streamatePass) }>Streamate</button>
							</div>
						</div>
						<div className="col-md-3 hidden">
							<ol>
								<li>
									<span>Camcon: {u.camcon} , {u.camconPass}</span>
								</li>
								<li>
									<span>Streamate: {u.streamate} , {u.streamatePass}</span>
								</li>
								<li>
									<span>Streamray: {u.streamray} , {u.streamrayPass}</span>
								</li>
								<li>
									<span>Imlive: {u.imlive} , {u.imlivePass}</span>
								</li>
								<li>
									<span>MFC: {u.mfc} , {u.mfcPass}</span>
								</li>
								<li>
									<span>F4F: {u.f4f} , {u.f4fPass}</span>
								</li>
								<li>
									<span>Jasmin: {u.jasmin} , {u.jasminPass}</span>
								</li>
							</ol>
						</div>
					</div>
				</div>
			);
	}
}

function someProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(someProps)(WorkEnvPage);
