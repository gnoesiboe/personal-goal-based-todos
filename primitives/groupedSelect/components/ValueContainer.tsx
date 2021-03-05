import React, { ReactNode } from 'react';
import classNames from '../groupedSelect.module.scss';

type Props = {
    children: ReactNode;
};

const ValueContainer: React.FC<Props> = ({ children }) => (
    <div className={classNames.valueContainer}>{children}</div>
);

export default ValueContainer;
