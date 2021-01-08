import React from 'react';
import { ChevronDownIcon } from '@primer/octicons-react';
import classNames from '../goalDetails.module.scss';
import createClassName from 'classnames';

type Props = {
    detailsVisible: boolean;
};

const DescriptionOpenedIndicator: React.FC<Props> = ({ detailsVisible }) => {
    const className = createClassName(classNames.descriptionOpenedIndicator, {
        [classNames.descriptionOpenedIndicatorIsOpened]: detailsVisible,
    });

    return (
        <div className={className}>
            <ChevronDownIcon size="small" />
        </div>
    );
};

export default DescriptionOpenedIndicator;
