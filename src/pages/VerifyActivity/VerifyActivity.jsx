import React, { Component } from 'react';
import ContentEditor from './components/ContentEditor';

export default class VerifyActivity extends Component {
  static displayName = 'VerifyActivity';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="verify-activity-page">
        <ContentEditor />
      </div>
    );
  }
}
