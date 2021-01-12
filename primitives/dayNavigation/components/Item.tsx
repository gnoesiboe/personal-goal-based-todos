import React, { MouseEventHandler, ReactNode } from 'react';
import Button from '../../button/Button';

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children?: ReactNode;
};

const Item: React.FC<Props> = ({ onClick, disabled = false, children }) => (
    <Button onClick={onClick} style="primary" disabled={disabled}>
        {children}
    </Button>
);

export default Item;
