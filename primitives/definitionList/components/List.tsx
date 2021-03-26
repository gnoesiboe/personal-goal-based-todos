import React, { ReactNode } from 'react';
import classNames from './../definitionList.module.scss';

type Props = {
    children: ReactNode;
};

const List: React.FC<Props> = ({ children }) => (
    <dl className={classNames.list}>{children}</dl>
);

export default List;
