import React, { Component } from 'react';
import LiteTable from './components/LiteTable';

export default class ActivityList extends Component {
  static displayName = 'ActivityList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="activity-list-page">
        <LiteTable />
      </div>
    );
  }
}
