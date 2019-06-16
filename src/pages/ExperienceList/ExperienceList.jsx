import React, { Component } from 'react';
import TabArticle from './components/TabArticle';

export default class ExperienceList extends Component {
  static displayName = 'ExperienceList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="experience-list-page">
        <TabArticle />
      </div>
    );
  }
}
