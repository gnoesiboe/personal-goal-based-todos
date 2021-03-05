import React, { ReactNode } from 'react';
import classNames from '../form.module.scss';
import createClassName from 'classnames';

type Props = {
    children: ReactNode;
    centered?: boolean;
};

const ActionButtons: React.FC<Props> = ({ children, centered = false }) => {
    const className = createClassName(classNames.actionButtons, {
        [classNames.actionButtonsIsCentered]: centered,
    });

    return <div className={className}>{children}</div>;
};

export default ActionButtons;
