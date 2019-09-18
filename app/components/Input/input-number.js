import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HOCRef from '../hoc/hoc-ref';
import HOCHoriVertiInput from '../hoc/hoc-inputs';
import { sizes, getBorderColor } from './constant';
import './input.scss';

class InputNumber extends React.PureComponent {
    render() {
        const { innerRef, onChange, className, prefix, suffix, size, messageNumberRequire, ...rest } = this.props;
        const styleSize = sizes[size] || 'input--md';
        return (
            <React.Fragment>
                <div className="w-p--100">
                    {prefix ? <span className="input__prefix-i"><i>{prefix()}</i></span> : <span />}
                    <input
                        onChange={onChange}
                        ref={innerRef}
                        {...rest}
                        className={classNames('input', getBorderColor(messageNumberRequire), { ['input__prefix']: prefix }, { ['input__suffix']: suffix }, { [styleSize]: true }, className)}
                    />
                    {suffix ? <span className="input__suffix-i"><i>{suffix()}</i></span> : <span />}
                    {messageNumberRequire ? <span className="input__message-require" style={{ display: ' block', color: 'red' }}>{messageNumberRequire}</span> : null}
                </div>
            </React.Fragment>
        )
    }
}
InputNumber.displayName = 'InputNumber';

InputNumber.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(sizes)),
  messageRequire: PropTypes.string,
  prefix: PropTypes.func,
  suffix: PropTypes.func,
  className: PropTypes.string,
}

InputNumber.defaultProps = {
  onChange: f => f,
  size: 'middle',

}

export default HOCRef(HOCHoriVertiInput(InputNumber));