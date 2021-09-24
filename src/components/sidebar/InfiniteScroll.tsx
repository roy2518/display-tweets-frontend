import React from 'react';

import LoadingIndicator from 'components/common/LoadingIndicator';

import 'styles/sidebar/InfiniteScroll.scss';

interface InfiniteScrollProps {
    children: React.ReactNode[];
    error: string | undefined;
    // Function to call when we have scrolled to the bottom of the results
    loadMore: () => Promise<void>;
}

const InfiniteScroll = ({
  children,
  error,
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
      {error && (
        <div className="error">
          <b>Error: </b>
          {error}
        </div>
      )}
      <LoadingIndicator
        isLoading={isLoading}
      />
    </div>
  );
};

export default InfiniteScroll;
