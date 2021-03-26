import React from 'react';
import useManageActiveGroup from './hooks/useManageActiveGroup';
import Tabs from './components/Tabs';
import GroupButton from './components/GroupButton';
import classNames from './groupedSelect.module.scss';
import Options from './components/Options';
import Option from './components/Option';
import useShowHide from '../../hooks/useShowHide';
import ContentContainer from './components/ContentContainer';
import ValueContainer from './components/ValueContainer';
import ClearButton from './components/ClearButton';
import ValueButton from './components/ValueButton';

export type Option = {
    label: string;
    value: string;
    [key: string]: any;
};

export type GroupedOptions = {
    [group: string]: Option[];
};

export type OnChangeHandler = (group: string | null) => void;

type Props = {
    options: GroupedOptions;
    value: string | null;
    onChange: OnChangeHandler;
    placeholder: string;
};

const GroupedSelect: React.VFC<Props> = ({
    options,
    value: currentValue,
    onChange,
    placeholder,
}) => {
    const { activeGroup, setActiveGroup } = useManageActiveGroup(
        options,
        currentValue,
    );

    const {
        toggle: toggleContentVisibility,
        visible: contentVisible,
        hide: hideContent,
    } = useShowHide(false);

    const groups = Object.keys(options);

    const currentOptions = activeGroup ? options[activeGroup] : [];

    return (
        <div className={classNames.container}>
            <ValueContainer>
                <ValueButton
                    options={options}
                    currentValue={currentValue}
                    placeholder={placeholder}
                    onClick={() => toggleContentVisibility()}
                />
                {currentValue && <ClearButton onClick={() => onChange(null)} />}
            </ValueContainer>
            <ContentContainer visible={contentVisible}>
                <Tabs>
                    {groups.map((group) => (
                        <GroupButton
                            key={group}
                            title={group}
                            active={group === activeGroup}
                            onClick={() => setActiveGroup(group)}
                        />
                    ))}
                </Tabs>
                <Options>
                    {currentOptions.map((option) => (
                        <Option
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                hideContent();
                            }}
                            option={option}
                            currentValue={currentValue}
                        />
                    ))}
                </Options>
            </ContentContainer>
        </div>
    );
};

export default GroupedSelect;
