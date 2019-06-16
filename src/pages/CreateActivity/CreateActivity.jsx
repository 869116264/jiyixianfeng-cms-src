import React, { Component } from 'react';
import ContentEditor from './components/ContentEditor';

export default class CreateActivity extends Component {
  static displayName = 'CreateActivity';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="create-activity-page">
        <ContentEditor />
      </div>
    );
  }
}
