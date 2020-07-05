import React, { FC } from 'react';
import cn from 'classnames';
//
import s from './PageLayout.scss';

import { withClassName } from 'app/types';

type Props = {} & withClassName;

const PageLayout: FC<Props> = props => {
  const { className, children } = props;
  return <main className={cn([className, s.root])}>{children}</main>;
};

export { PageLayout };
