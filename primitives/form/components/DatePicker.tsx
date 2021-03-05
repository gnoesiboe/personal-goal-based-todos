import ReactDatePicker, {
    ReactDatePickerProps,
    registerLocale,
    setDefaultLocale,
} from 'react-datepicker';
import nl from 'date-fns/locale/nl';
import React from 'react';
import createClassName from 'classnames';
import classNames from '../form.module.scss';

registerLocale('nl', nl);
setDefaultLocale('nl');

type Props = Omit<ReactDatePickerProps, 'locale'>;

const DatePicker: React.FC<Props> = ({
    className: additionalClassName,
    ...otherProps
}) => {
    const className = createClassName(classNames.widget, additionalClassName);

    return (
        <ReactDatePicker {...otherProps} className={className} locale="nl" />
    );
};

export default DatePicker;
