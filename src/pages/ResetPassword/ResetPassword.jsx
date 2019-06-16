import React, { Component } from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';

export default class ResetPassword extends Component {
  static displayName = 'ResetPassword';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="reset-password-page">
        <ChangePasswordForm />
      </div>
    );
  }
}
