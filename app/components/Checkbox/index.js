import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './checkbox.scss';
import HOCRef  from '../hoc/hoc-ref';


class Checkbox extends React.PureComponent {
    render() {
        const { innerRef, className, label, onClick, ...rest } = this.props;

        return (
            <React.Fragment>
                <label className={classNames('checkbox', className)}>
                    {label}
                    <input
                        type="checkbox"
                        {...rest}
                        onClick={onClick}
                        ref={innerRef}
                    />
                    <span className={'checkbox__box'} />
                </label>
            </React.Fragment>
        )
    }
}

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    className: PropTypes.string,
}

Checkbox.defaultProps = {
    onClick: f => f,
    label: ''
}

export default HOCRef(Checkbox)