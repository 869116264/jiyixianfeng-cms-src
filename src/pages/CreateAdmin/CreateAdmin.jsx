import React, { Component } from 'react';
import CreateActivityForm from './components/CreateActivityForm';

export default class CreateAdmin extends Component {
  static displayName = 'CreateAdmin';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="create-admin-page">
        <CreateActivityForm />
      </div>
    );
  }
}
