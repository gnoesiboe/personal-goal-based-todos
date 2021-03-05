import React, { MouseEventHandler } from 'react';
import Button from '../../button/Button';
import { Option as OptionModel } from '../GroupedSelect';
import createClassName from 'classnames';
import classNames from '../groupedSelect.module.scss';

type Props = {
    onClick: () => void;
    option: OptionModel;
    currentValue: string | null;
};

const Option: React.FC<Props> = ({
    onClick: onClickHandler,
    option,
    currentValue,
}) => {
    const active = !!currentValue && option.value === currentValue;

    const className = createClassName(classNames.option, {
        [classNames.optionIsActive]: active,
    });

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        onClickHandler();
    };

    return (
        <Button
            onClick={onClick}
            style="link"
            size="small"
            deflated
            className={className}
        >
            {option.label}
        </Button>
    );
};

export default Option;
