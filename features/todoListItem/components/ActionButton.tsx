import React, { MouseEventHandler, ReactNode } from 'react';
import Button from '../../../primitives/button/Button';
import classNames from '../todoListItem.module.scss';

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
};

const ActionButton: React.FC<Props> = ({ onClick, children }) => (
    <Button
        deflated
        transparent
        onClick={onClick}
        className={classNames.actionButton}
    >
        {children}
    </Button>
);

export default ActionButton;
