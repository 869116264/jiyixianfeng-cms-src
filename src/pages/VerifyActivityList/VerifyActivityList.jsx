import React, { Component } from 'react';
import LiteTable from './components/LiteTable';

export default class VerifyActivityList extends Component {
  static displayName = 'VerifyActivityList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="verify-activity-list-page">
        <LiteTable />
      </div>
    );
  }
}
