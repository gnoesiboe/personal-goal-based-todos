import React, { ReactNode } from 'react';
import classNames from '../form.module.scss';
import createClassName from 'classnames';

type Props = {
    children: ReactNode;
    centered?: boolean;
    fixed?: boolean;
};

const ActionButtons: React.FC<Props> = ({
    children,
    centered = false,
    fixed = false,
}) => {
    const className = createClassName(classNames.actionButtons, {
        [classNames.actionButtonsIsCentered]: centered,
        [classNames.actionButtonsIsFixed]: fixed,
    });

    return <div className={className}>{children}</div>;
};

export default ActionButtons;
