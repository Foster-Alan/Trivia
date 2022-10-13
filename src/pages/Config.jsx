import React, { Component } from 'react';
import '../Styles/Config.css';

class Config extends Component {
  render() {
    return (
      <div className="config">
        <h1 data-testid="settings-title">
          Configuração
        </h1>
      </div>
    );
  }
}

export default Config;
