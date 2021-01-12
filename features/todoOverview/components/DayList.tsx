import React, { ReactElement } from 'react';
import classNames from '../todoOverview.module.scss';

type Props = {
    children: ReactElement[];
};

const DayList: React.FC<Props> = ({ children }) => (
    <div className={classNames.dayList}>{children}</div>
);

export default DayList;
