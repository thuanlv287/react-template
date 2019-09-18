import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HOCRef from '../hoc/hoc-ref';
import HOCHoriVertiInput from '../hoc/hoc-inputs';
import { sizes, getBorderColor } from './constant';
import './input.scss';


class InputValidate extends React.PureComponent {
  render() {
    const { innerRef, prefix, suffix, onChange, size, className, messageRequire, ...rest } = this.props;
    const styleSize = sizes[size] || 'input--md';
    return (
      <React.Fragment>
        <div className="w-p--100">
          {prefix ? <span className="input__prefix-i"><i>{prefix()}</i></span> : <span />}
          <input
            onChange={onChange}
            ref={innerRef}
            {...rest}
            className={classNames('input', getBorderColor(messageRequire), { ['input__prefix']: prefix }, { ['input__suffix']: suffix }, { [styleSize]: true }, className)}
          />
          {suffix ? <span className="input__suffix-i"><i>{suffix()}</i></span> : <span />}
          {messageRequire ? <span className="input__message-require" style={{ display: ' block', color: 'red' }}>{messageRequire}</span> : null}
        </div>
      </React.Fragment>
    )
  }
}
InputValidate.displayName = 'InputValidate';

InputValidate.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(sizes)),
  messageRequire: PropTypes.string,
  prefix: PropTypes.func,
  suffix: PropTypes.func,
  className: PropTypes.string,
}

InputValidate.defaultProps = {
  onChange: f => f,
  size: 'middle',

}


export default HOCRef(HOCHoriVertiInput(InputValidate));