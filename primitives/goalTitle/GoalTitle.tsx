import React from 'react';

type Props = {
    title: string;
};

const GoalTitle: React.FC<Props> = ({ title }) => {
    const html = title.replace(/`([^`]+)`/g, '<em>$1</em>');

    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default GoalTitle;
