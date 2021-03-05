import ReactModal from 'react-modal';
import React from 'react';
import classNames from '../modal.module.scss';

type Props = Omit<
    ReactModal.Props,
    'isOpen' | 'style' | 'className' | 'overlayClassName'
>;

ReactModal.setAppElement('#__next');

const Container: React.FC<Props> = ({ children, ...otherProps }) => (
    <ReactModal
        {...otherProps}
        isOpen
        className={classNames.container}
        overlayClassName={classNames.overlay}
        htmlOpenClassName="modalIsOpen"
        portalClassName="modalPortal"
    >
        {children}
    </ReactModal>
);

export default Container;
