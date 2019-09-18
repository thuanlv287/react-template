import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { omit } from 'lodash/fp';
import { canUseDOM } from '../../utils'
import './portal.scss';
import Message from '../Message';
import Alert from '../Alert';
import { ModalComponent } from '../Modal';
import { DrawerComponent } from '../Drawer';

const placements = Object.freeze({
    'center': 'portal--center',
    'top': 'portal--top',
    'bottom': 'portal--bottom',
    'left': 'portal--left',
    'right': 'portal--right',
    'top-left': 'portal--top-left',
    'top-right': 'portal--top-right',
    'bottom-left': 'portal--bottom-left',
    'bottom-right': 'portal--bottom-right',
});

export const isStack = Object.freeze({
    'center': 'centerStackNode',
    'top': 'topStackNode',
    'bottom': 'bottomStackNode',
    'left': 'leftStackNode',
    'right': 'rightStackNode',
    'top-left': 'topLeftStackNode',
    'top-right': 'topRightStackNode',
    'bottom-left': 'bottomLeftStackNode',
    'bottom-right': 'bottomRightStackNode',
});


let topStackNode = null;
let bottomStackNode = null;
let leftStackNode = null;
let rightStackNode = null;
let topLeftStackNode = null;
let topRightStackNode = null;
let bottomLeftStackNode = null;
let bottomRightStackNode = null;
let centerStackNode = null;

if (canUseDOM) {
    const classCommon = 'portal';
    topLeftStackNode = document.createElement('div');
    topLeftStackNode.className = `${classCommon} portal--top-left`;

    topStackNode = document.createElement('div');
    topStackNode.className = `${classCommon} portal--top`;

    topRightStackNode = document.createElement('div');
    topRightStackNode.className =
        `${classCommon} portal--top-right`;

    rightStackNode = document.createElement('div');
    rightStackNode.className = `${classCommon} portal--right`;

    bottomRightStackNode = document.createElement('div');
    bottomRightStackNode.className =
        `${classCommon} portal--bottom-right`;

    bottomStackNode = document.createElement('div');
    bottomStackNode.className = `${classCommon} portal--bottom`;

    bottomLeftStackNode = document.createElement('div');
    bottomLeftStackNode.className =
        `${classCommon} portal--bottom-left`;

    leftStackNode = document.createElement('div');
    leftStackNode.className = `${classCommon} portal--left`;

    centerStackNode = document.createElement('div');
    centerStackNode.className = `${classCommon} portal--center`;

    document.body.appendChild(topLeftStackNode);
    document.body.appendChild(topStackNode);
    document.body.appendChild(topRightStackNode);
    document.body.appendChild(rightStackNode);
    document.body.appendChild(bottomRightStackNode);
    document.body.appendChild(bottomStackNode);
    document.body.appendChild(bottomLeftStackNode);
    document.body.appendChild(leftStackNode);
    document.body.appendChild(centerStackNode);
}

export {
    topStackNode,
    bottomStackNode,
    leftStackNode,
    rightStackNode,
    topLeftStackNode,
    topRightStackNode,
    bottomLeftStackNode,
    bottomRightStackNode,
    centerStackNode,
}

const getStackNode = () => {
    return {
        topStackNode,
        bottomStackNode,
        leftStackNode,
        rightStackNode,
        topLeftStackNode,
        topRightStackNode,
        bottomLeftStackNode,
        bottomRightStackNode,
        centerStackNode,
    }
}

export {
    getStackNode
}
export default class Portal extends React.Component {
    componentWillUnmount() {
        if (this.defaultNode) {
            document.body.removeChild(this.defaultNode)
        }
        if (this.overlayNode) {
            document.body.removeChild(this.overlayNode)
        }
        this.defaultNode = null;
        this.overlayNode = null;

        this.props.unmountCallback();
    }
    render() {
        if (!canUseDOM) {
            return null;
        }
        if (!this.props.node && !this.defaultNode) {
            this.defaultNode = document.createElement('div');

            this.defaultNode.className = 'portal';
            document.body.appendChild(this.defaultNode);
        }
        // add overlay for modal, ...
        if (this.props.isOverlay && !this.overlayNode) { // create 
            this.overlayNode = document.createElement('div');
            this.overlayNode.className = 'overlay';
            document.body.appendChild(this.overlayNode);

        }
        if (this.overlayNode) { // remove click overlay
            this.overlayNode.addEventListener('click', () => {
                this.props.onCloseOverlay();
                this.overlayNode ? this.overlayNode.remove() : null
            })
        }

        return ReactDOM.createPortal(
            this.props.children,
            this.props.node || this.defaultNode,
        );
    }
}


class PortalWrapped extends React.Component {
    state = {
        visible: true,
    };

    shouldComponentUpdate() {
        return true;
    }

    closeAlert = () =>
        this.setState({ visible: false }, () => this.props.onClose());

    unmountPortalCallback = () => {
        if (canUseDOM && this.props.renderJSNode) {
            try {
                document.body.removeChild(this.props.renderJSNode);
            } catch (e) {
                // console.warn(e); //eslint-disable-line
            }
        }
    };

    render() {
        if (!this.state.visible) {
            return null;
        }
        if (!this.props.visible) {
            return null;
        }

        const {
            anyMessage,
            anyAlert,
            anyModal,
            anyDrawer,
            className,
            placement,
            renderJSNode,
            ...otherProps
        } = omit([
            'onClose',
            'topLeftStackNode',
            'topStackNode',
            'topRightStackNode',
            'rightStackNode',
            'bottomRightStackNode',
            'bottomStackNode',
            'bottomLeftStackNode',
            'leftStackNode',
            'centerStackNode',
        ])(this.props);
        const stackNode = this.props[isStack[placement]];

        const isOverlay = this.props.isOverlay;
        return (
            <Portal node={stackNode} isOverlay={isOverlay} onCloseOverlay={this.props.onCancel} unmountCallback={this.unmountPortalCallback}>
                {
                    anyAlert &&
                    <Alert
                        className={className}
                        {...otherProps}
                        onClose={this.closeAlert}
                    />
                }
                {
                    anyMessage &&
                    <Message
                        className={className}
                        {...otherProps}
                        onClose={this.closeAlert}
                    />
                }
                {
                    anyModal &&
                    <ModalComponent
                        className={className}
                        {...otherProps}
                    />
                }
                {
                    anyDrawer &&
                    <DrawerComponent
                        className={className}
                        {...otherProps}
                        placement={placement}
                    />
                }
            </Portal>
        );
    }
}
PortalWrapped.propTypes = {
    onClose: PropTypes.func,
    placement: PropTypes.oneOf(Object.keys(placements)),
};
PortalWrapped.defaultProps = {
    placement: 'top',
    onClose: f => f,
};
export {
    PortalWrapped,

}