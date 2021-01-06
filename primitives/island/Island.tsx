import React from 'react';
import classNames from './island.module.scss';

type Props = {
    children: React.ReactNode;
};

const Island: React.FC<Props> = ({ children }) => (
    <div className={classNames.container}>{children}</div>
);

export default Island;
