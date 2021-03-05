import React, { LabelHTMLAttributes } from 'react';
import classNames from '../form.module.scss';

type Props = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'className'>;

const Label: React.FC<Props> = (props) => {
    return <label {...props} className={classNames.label} />;
};

export default Label;
