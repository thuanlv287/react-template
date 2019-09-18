import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './button.scss';


const types = Object.freeze({
    normal: 'btn--normal',
    primary: 'btn--primary',
    danger: 'btn--danger',
    info: 'btn--info',
    success: 'btn--success',
    warning: 'btn--warning',
    light: 'btn--light',
    dark: 'btn--dark',
    link: 'btn--link',
})
const sizes = Object.freeze({
    small: 'btn--sm',
    middle: '',
    large: 'btn--lg',
})

class Button extends React.PureComponent {
    constructor() {
        super();
        this.buttonElement = React.createRef();
    }

    componentDidMount() {
        if (this.props.active && this.buttonElement) {
            this.buttonElement.current.classList.add('active');
        }
        if (!this.props.active && this.buttonElement) {
            this.buttonElement.current.classList.remove('active');
        }
        if (this.props.loading && this.buttonElement) {
            this.buttonElement.current.classList.add('loading');
        }
        if (!this.props.loading && this.buttonElement) {
            this.buttonElement.current.classList.remove('loading');
        }

    }
    componentDidUpdate() {
        if (this.props.active && this.buttonElement) {
            this.buttonElement.current.classList.add('active');
        }
        if (!this.props.active && this.buttonElement) {
            this.buttonElement.current.classList.remove('active');
        }
        if (this.props.loading && this.buttonElement) {
            this.buttonElement.current.classList.add('loading');
        }
        if (!this.props.loading && this.buttonElement) {
            this.buttonElement.current.classList.remove('loading');
        }

    }
    render() {
        const {
            submit,
            reset,
            loading,
            type,
            size,
            active,
            className,
            children,
            ...rest
        } = this.props;
        const styleType = types[type];
        const styleSize = sizes[size] || '';
        let typeBtn = 'button';
        if (submit) {
            typeBtn = 'submit';
        }
        if (reset) {
            typeBtn = 'reset';
        }
        return (
            <React.Fragment>
                <button
                    ref={this.buttonElement}
                    type={typeBtn}
                    {...rest}
                    className={classNames('btn', { [styleType]: true }, { [styleSize]: true }, className)}
                >
                    {children}
                </button>
            </React.Fragment>
        )
    }
}

Button.displayName = 'Button';

Button.propTypes = {
    type: PropTypes.oneOf(Object.keys(types)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    loading: PropTypes.bool,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
}

Button.defaultProps = {
    type: 'normal',
    size: 'middle',
    loading: false,
    active: false,
    onClick: f => f
}

export default Button