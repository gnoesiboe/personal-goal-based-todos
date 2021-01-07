import React, { ReactNode, useState } from 'react';
import useShowHide from '../../../hooks/useShowHide';
import { Goal as GoalModel } from '../../../model/goal';
import Heading from '../../../primitives/heading/Heading';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import Button from '../../../primitives/button/Button';
import classNames from '../goalsOverview.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import EditGoal from '../../editGoal/EditGoal';
import { Role } from '../../../model/role';
import useRefreshServerSideProps from '../../../hooks/useRefetchServerSideProps';
import EditGoalButton from './EditGoalButton';
import nl2br from 'react-nl2br';
import GoalDescriptionOpenedIndicator from './GoalDescriptionOpenedIndicator';

type Props = {
    goal: GoalModel;
    role: Role;
    children: ReactNode;
};

const Goal: React.FC<Props> = ({ goal, role, children }) => {
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
                <div className={classNames.goalHeader}>
                    <Heading tag="h3" flattened>
                        {goal.title}
                        <GoalDescriptionOpenedIndicator
                            detailsVisible={detailsVisible}
                        />
                    </Heading>
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
                        className={classNames.goalDescription}
                    >
                        {goal.description && (
                            <p onDoubleClick={() => setIsEditing(true)}>
                                {nl2br(goal.description)}
                            </p>
                        )}
                        <div className={classNames.goalActions}>
                            <EditGoalButton
                                onClick={() => setIsEditing(true)}
                            />
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Goal;
