import React, { Component } from 'react';
import Archive from './Archive/Archive';
import './css/theme.css';
class App extends Component {
  render() {
    return (
      <div className="site-wrapper">
        <Archive />
      </div>
    );
  }
}

export default App;
