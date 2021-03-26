import React, { MouseEventHandler } from 'react';
import classNames from '../checkbox.module.scss';
import createClassName from 'classnames';
import { OnChangeHandler } from '../Checkbox';

type Props = {
    checked: boolean;
    onChange?: OnChangeHandler;
    disabled: boolean;
};

const Replacement: React.FC<Props> = ({ checked, onChange, disabled }) => {
    const onReplacementClick: MouseEventHandler<HTMLInputElement> = () => {
        if (disabled || !onChange) {
            return;
        }

        onChange(!checked);
    };

    const className = createClassName(classNames.replacement, {
        [classNames.replacementIsChecked]: checked,
        [classNames.replacementIsDisabled]: disabled,
    });

    return <span className={className} onClick={onReplacementClick} />;
};

export default Replacement;
