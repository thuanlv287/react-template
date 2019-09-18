import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './modal.scss';
import Button from '../Button';
import { PortalWrapped, getStackNode } from '../Portal';


class ModalComponent extends Component {
    render() {
        const { visible, onCancel, onOk, className, title, loading, loadingBtn, children } = this.props;
        if (!visible) {
            return null
        }
        return (
            <div className={classNames('modal zoom', className)}>
                {loading && <div className="modal__overlay" />}
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                    <span className="modal__turnOff" onClick={onCancel}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </div>
                <div className="modal__content">
                    {children}
                </div>
                <div className="modal__footer d-flex justify-content--end">
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onOk} type="primary" loading={loadingBtn}> OK</Button>
                </div>
            </div>
        )
    }
}

ModalComponent.displayName = 'Modal';
ModalComponent.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    title: PropTypes.string,
    loading: PropTypes.bool,
    loadingBtn: PropTypes.bool,
    className: PropTypes.string,
}
ModalComponent.defaultProps = {
    visible: false,
    loading: false,
    loadingBtn: false,
    onCancel: f => f,
    onOk: f => f,
    title: '',
}

export {
    ModalComponent
}

export default class Modal extends React.Component {

    render() {
        const defaultNode = document.createElement('div');
        return (
            <PortalWrapped
                {...this.props}
                isOverlay={this.props.visible}
                anyModal={true}

                renderJSNode={defaultNode}
                {...getStackNode()}
            />
        )
    }
}
Modal.defaultProps = {
    placement: 'top'
}