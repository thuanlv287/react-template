/**
 * High Order Component to forwardRef
 */
import React from 'react';


const HOCRef = (Component) => {
    class HOC extends React.Component {
        render() {
            const { innerRef ,  ...rest} = this.props;
             // Assign the custom prop "forwardedRef" as a innerRef
            return  <Component innerRef={innerRef} {...rest} />
        }
    }

    // Note the second param "ref" provided by React.forwardRef.
    // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
    // And it can then be attached to the Component.
    return React.forwardRef((props, ref) => {
        return <HOC {...props} innerRef={ref} />
    })
}

export default HOCRef