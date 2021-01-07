import React from 'react';
import useAnchorLinking from '../../hooks/useAnchorLinking';
import { Role } from '../../model/role';
import Heading from '../../primitives/heading/Heading';
import Island from '../../primitives/island/Island';
import { createSlug } from '../../utility/stringUtilities';
import classNames from './roleSubNavigation.module.scss';

type Props = {
    roles: Role[];
};

const RoleSubNavagation: React.FC<Props> = ({ roles }) => {
    const onLinkClick = useAnchorLinking();

    return (
        <Island className={classNames.container}>
            <div className={classNames.header}>
                <Heading tag="h3" style="secondary">
                    Mijn rollen
                </Heading>
            </div>
            <ul className={classNames.list}>
                {roles.map((role) => (
                    <li key={role.uid}>
                        <a
                            href={`#${createSlug(role.title)}`}
                            onClick={onLinkClick}
                            className={classNames.anchor}
                        >
                            {role.title}
                        </a>
                    </li>
                ))}
            </ul>
        </Island>
    );
};

export default RoleSubNavagation;
