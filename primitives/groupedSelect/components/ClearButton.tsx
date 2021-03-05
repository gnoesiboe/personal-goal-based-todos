import React, { MouseEventHandler } from 'react';
import Button from '../../button/Button';
import classNames from '../groupedSelect.module.scss';

type Props = {
    onClick: () => void;
};

const ClearButton: React.FC<Props> = ({ onClick: onClickHandler }) => {
    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        // prevent opening modal
        event.preventDefault();

        onClickHandler();
    };

    return (
        <Button
            onClick={onClick}
            unstyled
            deflated
            className={classNames.clearButton}
            title="Clear current value"
        >
            +
        </Button>
    );
};

export default ClearButton;
