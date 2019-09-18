import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import HOCRef from '../hoc/hoc-ref';
import './radio.scss';

class Radio extends Component {
    render() {
        const { innerRef, className, label, ...rest } = this.props
        return (
            <label className={classNames("radio", className)}>
                {label}
                <input
                    type="radio"
                    ref={innerRef}
                    {...rest}
                />
                <span className="radio__box"></span>
            </label>
        )
    }
}

Radio.displayName = 'Radio';
Radio.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
}
Radio.defaultProps = {
    label: ''
}

export default HOCRef(Radio)