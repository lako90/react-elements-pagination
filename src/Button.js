import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    label: '',
    onClick: () => null,
  }

  onClick = () => this.props.onClick;

  render() {
    const { label } = this.props;

    return <button onClick={this.onClick()}>{label}</button>;
  }
}

export default Button;
