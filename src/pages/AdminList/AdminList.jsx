import React, { Component } from 'react';
import LiteTable from './components/LiteTable';

export default class AdminList extends Component {
  static displayName = 'AdminList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="admin-list-page">
        <LiteTable />
      </div>
    );
  }
}
