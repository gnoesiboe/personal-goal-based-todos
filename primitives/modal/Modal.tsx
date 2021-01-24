import React from 'react';
import ReactModal from 'react-modal';
import useDetermineStyle from './hooks/useDetermineStyle';

type Props = Omit<ReactModal.Props, 'isOpen' | 'style'>;

ReactModal.setAppElement('#__next');

const Modal: React.FC<Props> = ({ children, ...otherProps }) => {
    const style = useDetermineStyle();

    return (
        <ReactModal {...otherProps} isOpen style={style}>
            {children}
        </ReactModal>
    );
};

export default Modal;
