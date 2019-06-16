import React, { Component } from 'react';
import LiteTable from './components/LiteTable';

export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-list-page">
        <LiteTable />
      </div>
    );
  }
}
