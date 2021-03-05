import React, { ReactNode } from 'react';
import classNames from '../modal.module.scss';
import Heading from '../../heading/Heading';

type Props = {
    title: string;
    children?: ReactNode;
};

const Header: React.FC<Props> = ({ title, children }) => (
    <div className={classNames.header}>
        <Heading tag="h1" centered flattened>
            {title}
        </Heading>
        {children}
    </div>
);

export default Header;
