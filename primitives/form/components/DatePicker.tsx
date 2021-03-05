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

type Props = Omit<ReactDatePickerProps, 'locale'> & {
    placement: 'left' | 'right' | 'top';
};

const DatePicker: React.FC<Props> = ({
    className: additionalClassName,
    placement,
    placeholderText = 'dd/mm/yyyy',
    ...otherProps
}) => {
    const className = createClassName(
        classNames.widget,
        classNames.datePicker,
        additionalClassName,
    );

    return (
        <ReactDatePicker
            {...otherProps}
            className={className}
            wrapperClassName={classNames.datePickerWrapper}
            placeholderText={placeholderText}
            popperProps={{
                placement,
            }}
        />
    );
};

export default DatePicker;
