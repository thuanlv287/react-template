import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PortalWrapped, getStackNode } from '../Portal';
import './drawer.scss';

const placements = Object.freeze({
    top: 'drawer--top',
    bottom: 'drawer--bottom',
    left: 'drawer--left',
    right: 'drawer--right',
})

class DrawerComponent extends React.PureComponent {
    render() {
        const { visible, className, placement, title, children } = this.props;
        if (!visible) return null;
        let placementDisplay = placements[placement] || 'drawer--left';
        placementDisplay = `${placementDisplay} slide-${placement}`;
        return (
            <div className={classNames('drawer', placementDisplay, className)}>
                {
                    title &&
                    <div className="drawer__header">
                        <div className="drawer__title">{title}</div>
                    </div>
                }
                <div className="drawer__body">
                    {children}
                </div>

            </div>
        )
    }
}
DrawerComponent.propTypes = {
    visible: PropTypes.bool,
    placement: PropTypes.oneOf(Object.keys(placements)),
    title: PropTypes.string,

}
DrawerComponent.defaultProps = {
    placement: 'left',
    visible: false,
    title: ''
}

export {
    DrawerComponent
}

class Drawer extends React.PureComponent {
    render() {
        const defaultNode = document.createElement('div');
        return (
            <PortalWrapped
                {...this.props}
                isOverlay={this.props.visible}
                anyDrawer={true}
                visible={this.props.visible}

                renderJSNode={defaultNode}
                {...getStackNode()}
            />
        )
    }
}
Drawer.displayName = 'Drawer';
Drawer.propTypes = {
    visible: PropTypes.bool,
    className: PropTypes.string,
}
Drawer.defaultProps = {
    placement: 'left',
    visible: false
}
export default Drawer