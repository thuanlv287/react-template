import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HOCRef from '../hoc/hoc-ref';
import HOCHoriVertiInput from '../hoc/hoc-inputs';
import './input.scss';

const sizes = Object.freeze({
    small: 'input--sm',
    middle: '',
    large: 'input--lg',
})

class InputComponent extends React.PureComponent {
    render() {
        const { innerRef, className, onChange, size, prefix, suffix, ...rest } = this.props;
        const styleSize = sizes[size] || 'input--md';
        return (
            <React.Fragment>
                {prefix ? <span className="input__prefix-i"><i>{prefix()}</i></span> : null}
                <input
                    onChange={onChange}
                    ref={innerRef}
                    className={classNames('input', { [styleSize]: true }, { ['input__prefix']: prefix }, { ['input__suffix']: suffix }, className)}
                    {...rest}
                />
                {suffix ? <span className="input__suffix-i"><i>{suffix()}</i></span> : null}
            </React.Fragment>
        )
    }
}


InputComponent.displayName = "InputComponent";
InputComponent.propTypes = {
    onChange: PropTypes.func,
    size: PropTypes.oneOf(Object.keys(sizes)),
    messageRequire: PropTypes.string,
    prefix: PropTypes.func,
    suffix: PropTypes.func,
    className: PropTypes.string,
}

InputComponent.defaultProps = {
    onChange: f => f,
    size: 'middle',

}
export default HOCRef(HOCHoriVertiInput(InputComponent));