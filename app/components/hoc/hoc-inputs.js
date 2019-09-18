import React from 'react';
import classNames from 'classnames';

const HOCHoriVertiInput = (Component) => {
    return class HoriVertiInput extends React.Component {
        render() {
            const { label, horizontal, vertical, labelStyles, ...rest } = this.props;
            let styleDisplay = '';
            let spacing = 'mr-10';
            if (horizontal) {
                styleDisplay = "flex-row"
            }
            if (vertical) {
                styleDisplay = "flex-column"
                spacing = "mb-10"
            }
            return (
                <React.Fragment>
                    <div className={classNames(`d-flex w-p--100 ${styleDisplay}`)}>
                        {label ? <label className={classNames(`label input__label ${spacing} ${labelStyles ? labelStyles : ''}`)}>{label}</label> : null}
                        <Component {...rest} />
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default HOCHoriVertiInput;