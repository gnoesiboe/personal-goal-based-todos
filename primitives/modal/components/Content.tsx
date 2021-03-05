import React, { ReactNode } from 'react';
import classNames from '../modal.module.scss';

type Props = {
    children: ReactNode;
};

const Content: React.FC<Props> = ({ children }) => (
    <div className={classNames.content}>{children}</div>
);

export default Content;
