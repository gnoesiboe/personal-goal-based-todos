import React, { InputHTMLAttributes } from 'react';
import classNames from '../todoListItem.module.scss';
import createClassName from 'classnames';

type Props = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'className'
> & {
    hasBreadcrumb: boolean;
};

const CheckboxInput: React.FC<Props> = ({ hasBreadcrumb, ...otherProps }) => {
    const className = createClassName(classNames.checkbox, {
        [classNames.checkboxHasBreadcrumb]: hasBreadcrumb,
    });

    return <input type="checkbox" className={className} {...otherProps} />;
};

export default CheckboxInput;
