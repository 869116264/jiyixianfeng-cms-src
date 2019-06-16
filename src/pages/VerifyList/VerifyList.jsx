import React, { Component } from 'react';
import LiteTable from './components/LiteTable';

export default class VerifyList extends Component {
  static displayName = 'VerifyList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="verify-list-page">
        <LiteTable />
      </div>
    );
  }
}
