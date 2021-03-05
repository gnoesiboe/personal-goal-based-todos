import React, { MouseEventHandler } from 'react';
import Button from '../../button/Button';
import classNames from '../groupedSelect.module.scss';
import createClassName from 'classnames';

type Props = {
    title: string;
    active: boolean;
    onClick: () => void;
};

const GroupButton: React.FC<Props> = ({
    title,
    active,
    onClick: onClickHandler,
}) => {
    const className = createClassName(classNames.groupButton, {
        [classNames.groupButtonIsActive]: active,
    });

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        onClickHandler();
    };

    return (
        <Button unstyled size="small" onClick={onClick} className={className}>
            {title}
        </Button>
    );
};

export default GroupButton;
