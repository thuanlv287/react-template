import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '../button';
import './dropdown.scss';

const types = Object.freeze({
    text: 'dropdown__text',
    icon: 'dropdown__icon',
    button: 'dropdown__btn',
})

export default class DropDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false
        }
    }
    toggleSetting = () => {

        if (!this.state.isShow) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState({
            isShow: !this.state.isShow
        })
    }
    handleOutsideClick = (e) => {
        if (this.settingElement.contains(e.target)) {
            return;
        }

        this.toggleSetting();
    }

    render() {
        const { className, type, icon, textBtn, text } = this.props;
        const styleType = types[type] || 'dropdown__text';
        return (
            <div ref={e => this.settingElement = e} className={classNames('dropdown', className)}>
                {
                    type === 'icon' &&
                    <span className={classNames({ [styleType]: true })} onClick={this.toggleSetting} >
                        <FontAwesomeIcon icon={icon} />
                    </span>
                }
                {
                    type === 'button' &&
                    <Button className={classNames({ [styleType]: true })} onClick={this.toggleSetting} >{textBtn}</Button>
                }
                {
                    type === 'text' &&
                    <div className={classNames({ [styleType]: true })} onClick={this.toggleSetting}><p>{text}</p></div>
                }
                {this.state.isShow && (<div className="dropdown__content">{this.props.children}</div>)}
            </div>
        )
    }
}

DropDown.displayName = 'DropDown';

DropDown.propTypes = {
    type: PropTypes.oneOf(Object.keys(types)),
    onClick: PropTypes.func,
    icon: PropTypes.object,
    textBtn: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
}

DropDown.defaultProps = {
    type: 'text',
    onClick: f => f,
    icon: {},
    textBtn: '',
    text: '',
}