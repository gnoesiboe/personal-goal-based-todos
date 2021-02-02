import React from 'react';
import classNames from '../todoListItem.module.scss';
import MarkdownContent from '../../../primitives/markdownContent/MarkdownContent';

type Props = {
    children: string;
};

const Description: React.FC<Props> = ({ children }) => (
    <div className={classNames.description}>
        <MarkdownContent>{children}</MarkdownContent>
    </div>
);

export default Description;
