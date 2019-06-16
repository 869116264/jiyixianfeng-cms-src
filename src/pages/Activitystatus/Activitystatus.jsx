import React, { Component } from 'react';
import BasicDetailInfo from './components/BasicDetailInfo';

export default class Activitystatus extends Component {
  static displayName = 'Activitystatus';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="activitystatus-page">
        <BasicDetailInfo />
      </div>
    );
  }
}
