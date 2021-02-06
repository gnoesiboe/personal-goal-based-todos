import React from 'react';
import classNames from './checkbox.module.scss';
import createClassName from 'classnames';
import Replacement from './components/Replacement';

export type OnChangeHandler = (checked: boolean) => void;

type Props = {
    checked: boolean;
    onChange: OnChangeHandler;
    className?: string;
};

const Checkbox: React.FC<Props> = ({
    checked,
    onChange,
    className: additionalClassName,
}) => {
    const className = createClassName(
        classNames.container,
        additionalClassName,
    );

    return (
        <div className={className}>
            <input
                type="checkbox"
                onChange={() => onChange(!checked)}
                checked={checked}
                className={classNames.input}
            />
            <Replacement checked={checked} onChange={onChange} />
        </div>
    );
};

export default Checkbox;
