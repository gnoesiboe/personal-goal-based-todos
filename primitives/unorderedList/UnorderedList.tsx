import React, { isValidElement, ReactNode } from 'react';
import classNames from './unorderedList.module.scss';
import createClassName from 'classnames';

type Props = {
    children: ReactNode;
    direction: 'horizontal' | 'vertical';
    centered?: boolean;
    className?: string;
};

const UnorderedList: React.FC<Props> = ({
    children,
    direction,
    centered = false,
    className: additionalClassName,
}) => {
    const className = createClassName(
        classNames.container,
        additionalClassName,
        {
            [classNames.isHorizontal]: direction === 'horizontal',
            [classNames.isCentered]: centered,
        },
    );

    return (
        <ul className={className}>
            {React.Children.map(children, (child, index) => {
                const key = isValidElement(child) ? child.key : index;

                return <li key={key}>{child}</li>;
            })}
        </ul>
    );
};

export default UnorderedList;
