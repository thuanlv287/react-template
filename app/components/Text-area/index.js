import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HOCRef from '../hoc/hoc-ref';
import HOCHoriVertiInput from '../hoc/hoc-inputs';
import './text-area.scss';

class TextArea extends React.PureComponent {
  render() {
    const { innerRef, className, onChange, ...rest } = this.props;
    return (
      <textarea
        onChange={onChange}
        ref={innerRef}
        {...rest}
        className={classNames('textarea', className)}
      />
    )
  }
}

TextArea.displayName = "TextArea";
TextArea.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
}
TextArea.defaultProps = {
  onChange: f => f
}

export default HOCRef(HOCHoriVertiInput(TextArea));
