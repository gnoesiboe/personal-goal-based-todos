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
};

const Checkbox: React.FC<Props> = ({
    checked,
    onChange,
    className: additionalClassName,
    accented = false,
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
                onChange={() => onChange && onChange(!checked)}
                checked={checked}
                className={classNames.input}
            />
            <Replacement checked={checked} onChange={onChange} />
        </div>
    );
};

export default Checkbox;
