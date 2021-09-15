import React from 'react';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'styles/sidebar/InfiniteScroll.scss';

interface InfiniteScrollProps {
    children: React.ReactNode[];
    // Function to call when we have scrolled to the bottom of the results
    loadMore: () => Promise<void>;
}

const InfiniteScroll = ({
  children,
  loadMore,
}: InfiniteScrollProps): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState(false);

  const observer = React.useRef<IntersectionObserver | null>();
  const lastElementRef = React.useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setIsLoading(true);
        await loadMore();
        setIsLoading(false);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, loadMore]);

  return (
    <div>
      {children.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`Item ${index}`} ref={index === children.length - 1 ? lastElementRef : null}>
          {child}
        </div>
      ))}
      <div className="loader">
        <Loader
          color="#1DA1F2"
          height={25}
          type="Oval"
          visible={isLoading}
          width={25}
        />
      </div>
    </div>
  );
};

export default InfiniteScroll;
