import React, { SelectHTMLAttributes } from 'react';
import classNames from '../form.module.scss';

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'classname'>;

const Select: React.FC<Props> = (props) => (
    <select {...props} className={classNames.select} />
);

export default Select;
