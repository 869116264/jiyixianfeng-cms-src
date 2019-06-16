import React, { Component } from 'react';
import BasicDetailInfo from './components/BasicDetailInfo';

export default class SelfActivityInfo extends Component {
  static displayName = 'SelfActivityInfo';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="self-activity-info-page">
        <BasicDetailInfo />
      </div>
    );
  }
}
