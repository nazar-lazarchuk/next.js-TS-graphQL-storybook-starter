import React, { FC, memo } from 'react';

type Props = {
  children: React.ReactNode;
};

const BaseLayout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      {children}
    </>
  );
};

export default memo(BaseLayout);
