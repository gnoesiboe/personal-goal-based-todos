import TextareaAutosize, {
    TextareaAutosizeProps,
} from 'react-textarea-autosize';
import React from 'react';
import classNames from '../form.module.scss';

type Props = Omit<TextareaAutosizeProps, 'classname'>;

const TextArea: React.FC<Props> = (props) => {
    return <TextareaAutosize {...props} className={classNames.widget} />;
};

export default TextArea;
