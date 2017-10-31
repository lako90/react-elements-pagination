import React, { Component } from 'react';
import Button from './Button';
import Elements from './Elements';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      numberElements: 7,
    };
  }

  createMockElements = () => {
    const { numberElements } = this.state;
    const elements = [];

    for (let i = 0; i < numberElements; i += 1) {
      elements.push({
        type: 'button',
        label: `button_${i + 1}`,
      });
    }

    return elements;
  }

  renderButtons = () => (
    this.createMockElements().map(({ type, label }) => (
      <Button key={`${type}-${label}`} label={label} type={type} />
    ))
  );

  render() {
    const { numberElements } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          {`We have ${numberElements} elements to pass into Elements Component`}
        </p>
        <div className="Buttons-container">{this.renderButtons()}</div>
        <div>
          <Elements elements={this.createMockElements()} />
        </div>
      </div>
    );
  }
}

export default App;
