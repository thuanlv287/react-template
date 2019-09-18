import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Form extends Component {
    render() {
        const { onSubmit, className, children } = this.props;
        return (
            <div className={classNames('form', className)}>
                <form
                    onSubmit={onSubmit}
                >
                    {children}
                </form>

            </div>
        )
    }
}

Form.displayName = 'Form';

Form.propTypes = {
    onSubmit: PropTypes.func,
    className: PropTypes.string,

}

Form.defaultProps = {
    onSubmit: f => f,
}

export default Form;