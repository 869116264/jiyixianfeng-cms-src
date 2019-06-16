import React, { Component } from 'react';
import BasicDetailInfo from './components/BasicDetailInfo';

export default class BranchInfo extends Component {
  static displayName = 'BranchInfo';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="branch-info-page">
        <BasicDetailInfo />
      </div>
    );
  }
}
