import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import classNames from '../goalDetails.module.scss';

type Props = {
    detailsVisible: boolean;
};

const DescriptionOpenedIndicator: React.FC<Props> = ({ detailsVisible }) => (
    <div className={classNames.descriptionOpenedIndicator}>
        {detailsVisible ? <ChevronUpIcon /> : <ChevronDownIcon size="small" />}
    </div>
);

export default DescriptionOpenedIndicator;
