import React, { ReactNode } from 'react';
import createClassName from 'classnames';
import classNames from '../form.module.scss';

type Props = {
    children: ReactNode;
    horizontal?: boolean;
};

const Group: React.FC<Props> = ({ children, horizontal }) => {
    const className = createClassName(classNames.group, {
        [classNames.groupIsHorizontal]: horizontal,
    });

    return <div className={className}>{children}</div>;
};

export default Group;
