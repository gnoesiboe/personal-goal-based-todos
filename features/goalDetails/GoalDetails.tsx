import React, { useState } from 'react';
import useShowHide from '../../hooks/useShowHide';
import { Goal as GoalModel } from '../../model/goal';
import Button from '../../primitives/button/Button';
import classNames from './goalDetails.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import EditGoal from '../editGoal/EditGoal';
import { Role } from '../../model/role';
import useRefreshServerSideProps from '../../hooks/useRefetchServerSideProps';
import EditGoalButton from '../goalsOverview/components/EditGoalButton';
import nl2br from 'react-nl2br';
import DescriptionOpenedIndicator from './components/DescriptionOpenedIndicator';
import RemoveGoal from '../removeGoal/RemoveGoal';
import Title from './components/Title';

type Props = {
    goal: GoalModel;
    role: Role;
};

const GoalDetails: React.FC<Props> = ({ goal, role }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const {
        visible: detailsVisible,
        toggle: toggleDetailsVisible,
    } = useShowHide();

    const refreshServerSideProps = useRefreshServerSideProps();

    const onEditDone = () => {
        setIsEditing(false);
        refreshServerSideProps();
    };

    if (isEditing) {
        return <EditGoal goal={goal} role={role} onDone={onEditDone} />;
    }

    return (
        <>
            <Button onClick={() => toggleDetailsVisible()} transparent>
                <div className={classNames.header}>
                    <Title goal={goal}>
                        <DescriptionOpenedIndicator
                            detailsVisible={detailsVisible}
                        />
                    </Title>
                </div>
            </Button>
            <AnimatePresence>
                {detailsVisible && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: 1,
                            height: 'auto',
                            marginBottom: '40px',
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            transition: { duration: 0.2 },
                        }}
                        className={classNames.description}
                    >
                        {goal.description && (
                            <p onDoubleClick={() => setIsEditing(true)}>
                                {nl2br(goal.description)}
                            </p>
                        )}
                        <div className={classNames.actions}>
                            <EditGoalButton
                                onClick={() => setIsEditing(true)}
                            />
                            <RemoveGoal role={role} goal={goal} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GoalDetails;
