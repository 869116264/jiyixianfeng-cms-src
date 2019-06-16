import React, { Component } from 'react';
import ContentEditor from './components/ContentEditor';

export default class EditActivity extends Component {
  static displayName = 'EditActivity';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="edit-activity-page">
        <ContentEditor />
      </div>
    );
  }
}
