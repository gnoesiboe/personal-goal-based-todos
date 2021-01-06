import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import createClassName from 'classnames';
import classNames from './button.module.scss';

type Props = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'classname'
> & {
    icon?: ReactElement;
    children: string;
};

const Button: React.FC<Props> = ({ icon, children, ...otherProps }) => {
    const className = createClassName(classNames.container, {
        [classNames.containerWithIcon]: !!icon,
    });

    return (
        <button {...otherProps} className={className}>
            {icon && icon}
            {children}
        </button>
    );
};

export default Button;
