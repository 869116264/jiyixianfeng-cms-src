import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={{}}>
        <Link className="logo-text">
          同同同学
        </Link>
      </div>
    );
  }
}
