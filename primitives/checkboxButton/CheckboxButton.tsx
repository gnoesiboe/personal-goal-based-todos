import React, { ReactNode } from 'react';
import Button, { Props as ButtonProps } from '../button/Button';
import Checkbox from '../checkbox/Checkbox';
import classNames from './checkboxButton.module.scss';
import createClassName from 'classnames';

type Props = ButtonProps & {
    active: boolean;
    children: ReactNode;
};

const CheckboxButton: React.FC<Props> = ({
    active,
    children,
    className: additionalClassName,
    ...otherProps
}) => {
    const className = createClassName(
        classNames.container,
        additionalClassName,
        {
            [classNames.isActive]: active,
        },
    );

    return (
        <Button {...otherProps} className={className}>
            {active && <Checkbox checked={active} />}
            {children}
        </Button>
    );
};

export default CheckboxButton;
