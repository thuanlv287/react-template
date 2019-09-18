import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omit } from 'lodash/fp';
import { canUseDOM } from '../../utils';
import { PortalWrapped, getStackNode } from '../Portal';
import './alert.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const types = Object.freeze({
    info: 'alert--info',
    success: 'alert--success',
    error: 'alert--error',
    warning: 'alert--warning'
})

export default class Alert extends React.PureComponent {
    timer = null;
    state = {
        isShow: true,
    };
    componentDidMount() {
        if (this.props.duration) {
            // can use fp.delay(this.props.duration)(this.closeAlert) to replace
            // howerver for best perfomance canse
            // use setTimeout and clear async task in componentWillUnmount lifecycle
            const timer = setTimeout(() => this.closeAlert(), this.props.duration);

            this.timer = timer;
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    closeAlert = () =>
        this.setState({ isShow: false });

    render() {
        if (!this.state.isShow) {
            return null;
        }

        const {
            className,
            message,
            description,
            type,
            children,
            closable,
            isHideIcon,
            ...otherProps
        } = this.props;
        const styleType = types[type] || 'alert--info';
        return (
            <div className={classNames('alert slide-top', className)}>
                <div
                    {...otherProps}
                    className={classNames(
                        { [styleType]: true },
                        'alert__content',
                        { 'alert__without-icon': isHideIcon }
                    )}
                >
                    <div className="alert__body">
                        {message && <span className="alert__message">{message}</span>}
                        {description && <span className="alert__description">{description}</span>}
                    </div>
                    {closable && (
                        <span className="alert__closeable-icon">
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={this.closeAlert}
                            />
                        </span>
                    )}
                </div>
            </div>

        );
    }
}

Alert.displayName = 'Alert';
Alert.propTypes = {
    duration: PropTypes.oneOfType([PropTypes.number]),
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(types)),
    message: PropTypes.node.isRequired,
    description: PropTypes.node,
    children: PropTypes.node,
};
Alert.defaultProps = {
    type: 'info',
    duration: 0,
    closable: false,
    onClose: f => f,
    isHideIcon: false
};

const anyAlert = (type) => (props) => {
    if (!canUseDOM) {
        return null;
    }

    const defaultNode = document.createElement('div');

    const otherProps = omit('type')(props);
    ReactDOM.render(
        <PortalWrapped
            {...otherProps}
            anyAlert={true}
            visible={true}
            type={type}
            renderJSNode={defaultNode}
            {...getStackNode()}

        />,
        defaultNode,
    );
}

Alert.info = anyAlert('info')
Alert.success = anyAlert('success')
Alert.error = anyAlert('error')
Alert.warning = anyAlert('warning')