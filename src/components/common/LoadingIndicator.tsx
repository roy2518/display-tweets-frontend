import React from 'react';
import Loader from 'react-loader-spinner';

import 'styles/common/LoadingIndicator.scss';

interface LoadingIndicatorProps {
    isLoading: boolean;
}

const LoadingIndicator = ({ isLoading }: LoadingIndicatorProps): JSX.Element => (
  <div className="loader">
    <Loader
      color="#1DA1F2"
      height={25}
      type="Oval"
      visible={isLoading}
      width={25}
    />
  </div>
);

export default LoadingIndicator;
