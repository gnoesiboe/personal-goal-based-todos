import React, { ReactNode } from 'react';
import classNames from '../form.module.scss';

type Props = {
    children: ReactNode;
};

const ActionButtons: React.FC<Props> = ({ children }) => (
    <div className={classNames.actionButtons}>{children}</div>
);

export default ActionButtons;
