import React from 'react';
import classNames from '../definitionList.module.scss';

type Props = {
    term: string;
    description: string;
};

const Item: React.FC<Props> = ({ term, description }) => (
    <>
        <dt className={classNames.term}>{term}</dt>
        <dd className={classNames.description}>{description}</dd>
    </>
);

export default Item;
