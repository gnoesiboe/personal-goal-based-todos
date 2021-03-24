import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import createClassName from 'classnames';
import classNames from './button.module.scss';

export type Props = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'className' | 'style'
> & {
    icon?: ReactElement;
    style?: 'link' | 'primary';
    size?: 'normal' | 'small' | 'full';
    transparent?: boolean;
    deflated?: boolean;
    children: ReactNode;
    className?: string;
    unstyled?: boolean;
    block?: boolean;
};

const Button: React.FC<Props> = ({
    icon,
    style,
    size,
    transparent = false,
    deflated = false,
    children,
    unstyled = false,
    block = false,
    className: additionalClassName,
    ...otherProps
}) => {
    const className = createClassName(
        classNames.container,
        {
            [classNames.containerWithIcon]: !!icon,
            [classNames.isTransparent]: transparent,
            [classNames.isStyleLink]: style === 'link',
            [classNames.isStylePrimary]: style === 'primary',
            [classNames.isDeflated]: deflated,
            [classNames.isSizeSmall]: size === 'small',
            [classNames.isSizeFull]: size === 'full',
            [classNames.unstyled]: unstyled,
            [classNames.block]: block,
        },
        additionalClassName,
    );

    return (
        <button {...otherProps} className={className}>
            {icon && icon}
            {children}
        </button>
    );
};

export default Button;
