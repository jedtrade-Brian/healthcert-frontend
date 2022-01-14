import React, { Component } from 'react';
import Routes from './Components/Include/Routes';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="dynamic">
        <Routes />
        </div>
      </div>
    );
  }
}

export default App;
