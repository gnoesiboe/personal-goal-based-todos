import { RoleWithGoals } from '../../model/role';
import React, { useState } from 'react';
import Heading from '../../primitives/heading/Heading';
import classNames from './roleDetails.module.scss';
import { createSlug } from '../../utility/stringUtilities';
import GoalsOverview from '../goalsOverview/GoalsOverview';
import AddGoal from '../addGoal/AddGoal';
import EditRoleButton from './components/EditRoleButton';
import EditRole from '../editRole/EditRole';
import useRefreshServerSideProps from '../../hooks/useRefetchServerSideProps';
import RemoveRole from '../removeRole/RemoveRole';

type Props = {
    role: RoleWithGoals;
};

const RoleDetails: React.FC<Props> = ({ role }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const refreshServerSideProps = useRefreshServerSideProps();

    const onEditDone = () => {
        setIsEditing(false);
        refreshServerSideProps();
    };

    return (
        <div className={classNames.container} id={createSlug(role.title)}>
            <div className={classNames.header}>
                {isEditing ? (
                    <EditRole role={role} onDone={onEditDone} />
                ) : (
                    <>
                        <Heading tag="h2" style="secondary">
                            {role.title}
                        </Heading>
                        <div className={classNames.actionButtons}>
                            <EditRoleButton
                                onClick={() => setIsEditing(true)}
                            />
                            <RemoveRole role={role} />
                        </div>
                    </>
                )}
            </div>

            <GoalsOverview role={role} goals={role.goals} />
            {!isEditing && (
                <>
                    <AddGoal role={role} />
                </>
            )}
        </div>
    );
};

export default RoleDetails;
