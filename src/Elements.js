import React, { Component } from 'react';
import PropTypes from 'prop-types';
import concat from 'lodash/concat';
import Button from './Button';

class Elements extends Component {
  static propTypes = {
    elements: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string,
    })).isRequired,
    limit: PropTypes.number,
  }

  static defaultProps = {
    limit: 2,
  }

  constructor(props) {
    super(props);

    this.state = {
      indexElements: 0,
      listedElements: [],
      othersElements: [],
    };
  }

  componentWillMount() {
    this.initElements(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.initElements(nextProps);
    }
  }

  initElements({ elements, limit }) {
    /* Set initial elements division */

    if (elements.length <= limit + 1) {
      this.setState({
        indexElements: 0,
        listedElements: elements,
        othersElements: [],
      });
    } else {
      this.setState({
        indexElements: limit,
        listedElements: elements.slice(0, limit),
        othersElements: elements.slice(limit, elements.length),
      });
    }
  }

  handleClickElement = (button) => {
    const { indexElements, listedElements, othersElements } = this.state;
    const { limit } = this.props;
    const { type } = button;
    const shouldPickAllOtherElements = (othersElements.length <= limit + 1);

    if (type === 'other-button') {
      this.setState({
        indexElements: indexElements + limit,
        listedElements: concat(listedElements, shouldPickAllOtherElements ? othersElements : othersElements.slice(0, limit)),
        othersElements: shouldPickAllOtherElements ? [] : othersElements.slice(limit, othersElements.length),
      });
    }
  }

  renderButton = button => (
    <Button
      key={`${button.type}-${button.label}`}
      label={button.label}
      onClick={() => this.handleClickElement(button)}
    />
  )

  renderLimitElements = () => {
    const { listedElements } = this.state;

    return concat(listedElements, {
      label: 'Altro..',
      type: 'other-button',
    }).map(this.renderButton);
  }

  render() {
    const { listedElements, othersElements } = this.state;

    return othersElements.length === 0 ? listedElements.map(this.renderButton) : this.renderLimitElements();
  }
}

export default Elements;
