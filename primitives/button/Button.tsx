import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import createClassName from 'classnames';
import classNames from './button.module.scss';

type Props = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'classname'
> & {
    icon?: ReactElement;
    transparent?: true;
    children: ReactNode;
};

const Button: React.FC<Props> = ({
    icon,
    transparent,
    children,
    ...otherProps
}) => {
    const className = createClassName(classNames.container, {
        [classNames.containerWithIcon]: !!icon,
        [classNames.isTransparent]: transparent,
    });

    return (
        <button {...otherProps} className={className}>
            {icon && icon}
            {children}
        </button>
    );
};

export default Button;
