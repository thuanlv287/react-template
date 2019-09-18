import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omit } from 'lodash/fp';
import { canUseDOM } from '../../utils'
import './message.scss';
import { PortalWrapped, getStackNode } from '../Portal';

const types = Object.freeze({
    info: 'message--info',
    success: 'message--success',
    error: 'message--error',
    warning: 'message--warning'
})

class Message extends React.PureComponent {
    timer = null;

    state = {
        isShow: true,
    };

    componentDidMount() {
        if (this.props.duration) {
            // can use fp.delay(this.props.duration)(this.closeMessage) to replace
            // howerver for best perfomance canse
            // use setTimeout and clear async task in componentWillUnmount lifecycle
            const timer = setTimeout(() => this.closeMessage(), this.props.duration);

            this.timer = timer;
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    closeMessage = () =>
        this.setState({ isShow: false }, () => this.props.onClose());

    render() {
        if (!this.state.isShow) {
            return null;
        }

        const {
            className,
            message,
            type,
            ...otherProps
        } = omit(['duration'])(this.props);
        const styleType = types[type] || 'message--info';

        return (
            <div className={classNames('message slide-top', className)} {...otherProps}>
                <div className={classNames("message__content", { [styleType]: true })}>
                    {message}
                </div>
            </div>
        );
    }
}

Message.displayName = 'Message';
Message.propTypes = {
    duration: PropTypes.oneOfType([PropTypes.number]),
    onClose: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(types)),
    message: PropTypes.node.isRequired,
};
Message.defaultProps = {
    type: 'info',
    duration: 3000,
    onClose: f => f,
};

const anyMessage = (type) => (props) => {
    if (!canUseDOM) {
        return null;
    }
    const defaultNode = document.createElement('div');
    // document.body.appendChild(defaultNode);

    const otherProps = omit('type')(props);
    let anymessage = true
    ReactDOM.render(
        <PortalWrapped
            {...otherProps}
            anyMessage={anymessage}
            type={type}
            renderJSNode={defaultNode}
            visible={true}
            {...getStackNode()}

        />,
        defaultNode,
    );
}



Message.info = anyMessage('info')
Message.success = anyMessage('success')
Message.error = anyMessage('error')
Message.warning = anyMessage('warning')

export default Message
export {
    Message
}