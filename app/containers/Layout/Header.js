import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from '../LocaleToggle';
import messages from './messages';

export default class Header extends Component {
  render() {
    return (
      <div className="header d-flex justify-content--between align-items--center">
        <FormattedMessage {...messages.header} />

        <LocaleToggle />
      </div>
    )
  }
}