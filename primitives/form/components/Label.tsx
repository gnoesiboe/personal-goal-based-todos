import React, { LabelHTMLAttributes, MouseEventHandler } from 'react';
import classNames from '../form.module.scss';

type Props = Omit<
    LabelHTMLAttributes<HTMLLabelElement>,
    'className' | 'onClick'
> & {
    preventClick?: boolean;
};

const Label: React.FC<Props> = ({ preventClick, ...otherProps }) => {
    const onClick: MouseEventHandler<HTMLLabelElement> = (event) => {
        if (preventClick) {
            event.preventDefault();
        }
    };

    return (
        <label {...otherProps} onClick={onClick} className={classNames.label} />
    );
};

export default Label;
