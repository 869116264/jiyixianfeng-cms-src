import React, { Component } from 'react';
import LiteTable from './components/LiteTable';

export default class SelfValidateList extends Component {
  static displayName = 'SelfValidateList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="self-validate-list-page">
        <LiteTable />
      </div>
    );
  }
}
