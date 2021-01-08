import { FormHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import classNames from './form.module.scss';
import TextareaAutosize, {
    TextareaAutosizeProps,
} from 'react-textarea-autosize';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

const Form: React.FC<FormProps> = (props) => <form {...props} />;

const Group: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div>{children}</div>
);

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'classname'>;

const Input: React.FC<InputProps> = (props) => {
    return <input {...props} className={classNames.textWidget} />;
};

type TextAreaProps = Omit<TextareaAutosizeProps, 'classname'>;

const TextArea: React.FC<TextAreaProps> = (props) => {
    return <TextareaAutosize {...props} className={classNames.textWidget} />;
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
    ActionButtons,
    Error,
};
