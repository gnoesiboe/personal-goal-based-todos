import React from 'react';
import classNames from '../form.module.scss';

type Props = {
    children: string;
};

const Help: React.FC<Props> = ({ children }) => (
    <div className={classNames.help}>{children}</div>
);

export default Help;
