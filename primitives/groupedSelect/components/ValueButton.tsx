import React, { MouseEventHandler } from 'react';
import Button from '../../button/Button';
import { GroupedOptions } from '../GroupedSelect';
import { resolveLabelForCurrentValue } from '../utility/resolvers';

type Props = {
    options: GroupedOptions;
    currentValue: string | null;
    placeholder: string;
    onClick: () => void;
};

const ValueButton: React.FC<Props> = ({
    options,
    currentValue,
    placeholder,
    onClick: onClickHandler,
}) => {
    const currentLabel =
        resolveLabelForCurrentValue(options, currentValue) || placeholder;

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        onClickHandler();
    };

    return (
        <Button unstyled deflated onClick={onClick}>
            {currentLabel}
        </Button>
    );
};

export default ValueButton;
