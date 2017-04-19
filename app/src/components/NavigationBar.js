import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';


class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const outputUser = this.props.auth.user;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><a>Здравствуй, {outputUser.username} </a></li>
        <li><a href="#" onClick={this.logout.bind(this)}>Выйти <span className="glyphicon glyphicon-log-out"></span></a></li>
      </ul>
    );
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">Войти<span className="glyphicon glyphicon-log-in"></span> </Link></li>
      </ul>
    );

    const modelLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/workenv"> Моя комната <span className="glyphicon glyphicon-home"></span> </Link> </li>
      </ul>
    );
    const adminLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Зарегистрировать пользователя <span className="glyphicon glyphicon-plus"></span> </Link></li>
        <li><Link to="/admin">Админка</Link></li>
      </ul>
    );


    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Big proj</Link>
            <a>{outputUser.permission}</a>
          </div>

          <div className="collapse navbar-collapse">
              { isAuthenticated ? userLinks : guestLinks }
              { outputUser.permission==='admin' ? adminLinks : '' }
              { outputUser.permission==='user' ? modelLinks : '' }
          </div>
        </div>
      </nav>
    );

  }
}


NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);