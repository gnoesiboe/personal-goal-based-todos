import React from 'react';
import classNames from './checkbox.module.scss';
import createClassName from 'classnames';
import Replacement from './components/Replacement';

export type OnChangeHandler = (checked: boolean) => void;

type Props = {
    checked: boolean;
    onChange?: OnChangeHandler;
    accented?: boolean;
    className?: string;
    disabled?: boolean;
};

const Checkbox: React.FC<Props> = ({
    checked,
    onChange,
    className: additionalClassName,
    accented = false,
    disabled = false,
}) => {
    const className = createClassName(
        classNames.container,
        additionalClassName,
        {
            [classNames.containerIsAccented]: accented,
        },
    );

    return (
        <div className={className}>
            <input
                type="checkbox"
                onChange={() => {
                    if (disabled || !onChange) {
                        return;
                    }

                    onChange(!checked);
                }}
                checked={checked}
                className={classNames.input}
                disabled={disabled}
            />
            <Replacement
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};

export default Checkbox;
