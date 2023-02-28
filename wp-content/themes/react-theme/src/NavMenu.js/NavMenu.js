import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: '',
    };
  }

  componentDidMount() {
    this.setState({ route: this.props.location.pathname });
  }

  componentWillUpdate({ location, history }) {
    if (location.pathname === this.props.location.pathname) {
      return;
    }

    if (history.action === 'PUSH') {
      this.setState({ route: location.pathname });
    }
  }

  render() {
    const { items } = this.props;
    return (
      <nav className="header__menu">
        <ul>
          {items.map((item) => (
            <li
              key={item.ID}
              className={
                'menu__item ' +
                (new RegExp('^' + item.url + '/?$', 'g').exec(this.state.route)
                  ? 'menu__item--active'
                  : '')
              }
            >
              <Link to={item.url}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default withRouter(NavMenu);
