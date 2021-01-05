import Link from 'next/link';
import React from 'react';
import classNames from '../mainNavigation.module.scss';
import createClassName from 'classnames';
import { useRouter } from 'next/dist/client/router';

type Props = {
    title: string;
    path: string;
};

const ListItem: React.FC<Props> = ({ title, path }) => {
    const router = useRouter();

    const className = createClassName(classNames.item, {
        [classNames.currentItem]: router.asPath === path,
    });

    return (
        <Link href={path}>
            <a className={className}>{title}</a>
        </Link>
    );
};

export default ListItem;
