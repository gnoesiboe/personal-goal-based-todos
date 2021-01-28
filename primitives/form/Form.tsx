import React, {
    FormHTMLAttributes,
    InputHTMLAttributes,
    LabelHTMLAttributes,
    ReactNode,
    SelectHTMLAttributes,
} from 'react';
import classNames from './form.module.scss';
import TextareaAutosize, {
    TextareaAutosizeProps,
} from 'react-textarea-autosize';
import createClassName from 'classnames';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

const Form: React.FC<FormProps> = (props) => <form {...props} />;

const Group: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div>{children}</div>
);

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'classname'>;

const Input: React.FC<InputProps> = ({ type, ...otherProps }) => {
    const className = createClassName({
        [classNames.textWidget]: type === 'text',
    });

    return <input {...otherProps} type={type} className={className} />;
};

type TextAreaProps = Omit<TextareaAutosizeProps, 'classname'>;

const TextArea: React.FC<TextAreaProps> = (props) => {
    return <TextareaAutosize {...props} className={classNames.textWidget} />;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'classname'>;

const Select: React.FC<SelectProps> = (props) => {
    return <select {...props} className={classNames.select} />;
};

const Label: React.FC<
    Omit<LabelHTMLAttributes<HTMLLabelElement>, 'className'>
> = (props) => {
    return <label {...props} className={classNames.label} />;
};

const ActionButtons: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className={classNames.actionButtons}>{children}</div>
);

const Error: React.FC<{ children: string }> = ({ children }) => (
    <div className={classNames.error}>{children}</div>
);

export default {
    Form,
    Group,
    Input,
    TextArea,
    Select,
    Label,
    ActionButtons,
    Error,
};
