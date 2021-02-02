import React from 'react';
import { parseMarkdown } from '../../utility/markdownUtilities';
import classNames from './markdownContent.module.scss';

type Props = {
    children: string;
};

const MarkdownContent: React.FC<Props> = ({ children }) => {
    const parsedDescription = parseMarkdown(children);

    return (
        <div
            className={classNames.container}
            dangerouslySetInnerHTML={{ __html: parsedDescription }}
        />
    );
};

export default MarkdownContent;
