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
    const className = createClassName(classNames.checkboxContainer, {
        [classNames.checkboxContainerHasBreadcrumb]: hasBreadcrumb,
    });

    return (
        <div className={className}>
            <input type="checkbox" className={className} {...otherProps} />
        </div>
    );
};

export default CheckboxInput;
