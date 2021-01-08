import React, { MouseEventHandler } from 'react';
import Button from '../../../primitives/button/Button';
import classNames from '../notificationDetails.module.scss';
import { PlusIcon } from '@primer/octicons-react';

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const CloseButton: React.FC<Props> = ({ onClick }) => (
    <Button
        className={classNames.closeButton}
        onClick={onClick}
        deflated
        transparent
    >
        <PlusIcon />
    </Button>
);

export default CloseButton;
