import React, { ReactNode } from 'react';
import classNames from '../form.module.scss';
import createClassName from 'classnames';

type Props = {
    children: ReactNode;
    horizontal?: boolean;
};

const Section: React.FC<Props> = ({ children, horizontal = false }) => {
    const className = createClassName(classNames.section, {
        [classNames.sectionIsHorizontal]: horizontal,
    });

    return (
        <fieldset className={className}>
            {/*<legend>{title}</legend>*/}
            {children}
        </fieldset>
    );
};

export default Section;
