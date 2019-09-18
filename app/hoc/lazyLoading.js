import React from 'react';

/**
 * using const OtherComponent = React.lazy(() => import('./Hello'));
 * const HelloLazy = withLazyLoad(OtherComponent);
 * 
 */
export default (ComponentLoad) => {
  return class LayzyLoad extends Component {
    constructor() {
      super();
    }
    render() {
      return (
        <Suspense fallback={<h1>Loading...</h1>}>
          <ComponentLoad {...this.props} />
        </Suspense>
      )
    }
  }
}
