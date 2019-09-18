import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HOCRef from '../hoc/hoc-ref';
import HOCHoriVertiInput from '../hoc/hoc-inputs';
import './select.scss';

class OptionHOC extends Component {
    render() {
        const { innerRef, className, ...rest } = this.props;
        return (
            <option
                className={classNames("option", className)}
                ref={innerRef}
                {...rest}
            />

        )
    }
}

// to be continue
class Select extends Component {
    render() {
        const { children, className, empty, innerRef, ...rest } = this.props;
        if (!children) return (
            <select>
                <option>{empty}</option>
            </select>
        )
        return (
            <React.Fragment>
                <div
                    className={classNames("select", className)}
                >
                    <select
                        ref={innerRef}
                        {...rest}
                    >
                        {this.props.children}
                    </select>
                    <span className="select__arrow"><i /></span>
                </div>
            </React.Fragment>
        )
    }
}

const Option = HOCRef(OptionHOC)
export { Option }

Option.displayName = "Option";
Option.propTypes = {
    empty: PropTypes.string,
    className: PropTypes.string,
}
Option.defaultProps = {

}

Select.displayName = "Select";
Select.propTypes = {
    empty: PropTypes.string,
    className: PropTypes.string,
}
Select.defaultProps = {

}
export default HOCRef(HOCHoriVertiInput(Select))