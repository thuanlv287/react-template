import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './pop-confirm.scss';
import Button from '../button';

export default class PopConfirm extends Component {
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
    onCancel = () => {
        this.setState({ isShow: false })
        this.props.onCancel()
    }
    onOk = () => {
        this.setState({ isShow: false })
        this.props.onOk()
    }

    render() {
        const { children, className, content, textOk, textCancel } = this.props;
        return (
            <div ref={e => this.settingElement = e} onClick={this.toggleSetting} className={classNames("pop-confirm", className)}>
                {children}
                {this.state.isShow && (
                    <div className="pop-confirm__content">
                        <span>{content}</span>
                        <div className="pop-confirm__button">
                            <Button onClick={this.onCancel}>{textCancel}</Button>
                            <Button onClick={this.onOk} type="primary">{textOk}</Button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
PopConfirm.displayName = 'PopConfirm';

PopConfirm.propTypes = {
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    textOk: PropTypes.string,
    textCancel: PropTypes.string,
    content: PropTypes.string,
    className: PropTypes.string,
}
PopConfirm.defaultProps = {
    onOk: f => f,
    onCancel: f => f,
    textOk: 'Ok',
    textCancel: 'Cancel',
    content: '',
}