import React, { Component } from 'react';
import LiteTable from './components/LiteTable';

export default class Uplist extends Component {
  static displayName = 'Uplist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="uplist-page">
        <LiteTable />
      </div>
    );
  }
}
