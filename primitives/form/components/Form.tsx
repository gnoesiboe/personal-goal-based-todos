import React, { FormHTMLAttributes } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

const Form: React.FC<FormProps> = (props) => <form {...props} />;

export default Form;
