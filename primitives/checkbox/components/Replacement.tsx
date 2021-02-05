import React, { MouseEventHandler } from 'react';
import classNames from '../checkbox.module.scss';
import createClassName from 'classnames';
import { OnChangeHandler } from '../Checkbox';

type Props = {
    checked: boolean;
    onChange: OnChangeHandler;
};

const Replacement: React.FC<Props> = ({ checked, onChange }) => {
    const onReplacementClick: MouseEventHandler<HTMLInputElement> = () => {
        onChange(!checked);
    };

    const className = createClassName(classNames.replacement, {
        [classNames.replacementIsChecked]: checked,
    });

    return <span className={className} onClick={onReplacementClick} />;
};

export default Replacement;
