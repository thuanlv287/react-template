import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './menu.scss';

const placements = Object.freeze({
    top: 'menu--top',
    bottom: 'menu--bottom',
    left: 'menu--left',
    right: 'menu--right',
})

class Menu extends Component {
    render() {
        const { visible, title, className, placement, children } = this.props;
        if (!visible) return null;
        const styleDisplay = placements[placement] || 'menu--left';
        return (
            <div className={classNames('menu', { [styleDisplay]: true }, className)}>
                {
                    title &&
                    <div className="menu__header">
                        <div className="menu__title">{title}</div>
                    </div>
                }
                <div className="menu__body">
                    {children}
                </div>
            </div>
        )
    }
}

Menu.displayName = "Menu";

Menu.propTypes = {
    placement: PropTypes.oneOf(Object.keys(placements)),
    visible: PropTypes.bool,
    title: PropTypes.string,
    className: PropTypes.string,
}

Menu.defaultProps = {
    placement: 'left',
    visible: false,
    title: ''
}


export default Menu