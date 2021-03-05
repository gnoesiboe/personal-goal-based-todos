import React, { InputHTMLAttributes } from 'react';
import createClassName from 'classnames';
import classNames from '../form.module.scss';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'classname'>;

const Input: React.FC<Props> = ({ type, ...otherProps }) => {
    const className = createClassName({
        [classNames.widget]: !type || type === 'text',
    });

    return <input {...otherProps} type={type} className={className} />;
};

export default Input;
