import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import createClassName from 'classnames';
import classNames from './button.module.scss';

type Props = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'classname' | 'style'
> & {
    icon?: ReactElement;
    style?: 'link' | 'primary';
    size?: 'normal' | 'small';
    transparent?: true;
    deflated?: true;
    children: ReactNode;
};

const Button: React.FC<Props> = ({
    icon,
    style,
    size,
    transparent,
    deflated,
    children,
    ...otherProps
}) => {
    const className = createClassName(classNames.container, {
        [classNames.containerWithIcon]: !!icon,
        [classNames.isTransparent]: transparent,
        [classNames.isStyleLink]: style === 'link',
        [classNames.isStylePrimary]: style === 'primary',
        [classNames.isDeflated]: deflated,
        [classNames.isSizeSmall]: size === 'small',
    });

    return (
        <button {...otherProps} className={className}>
            {icon && icon}
            {children}
        </button>
    );
};

export default Button;
