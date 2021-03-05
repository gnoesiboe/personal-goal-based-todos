import React from 'react';
import classNames from '../form.module.scss';

type Props = {
    children: string;
};

const Error: React.FC<Props> = ({ children }) => (
    <div className={classNames.error}>{children}</div>
);

export default Error;
