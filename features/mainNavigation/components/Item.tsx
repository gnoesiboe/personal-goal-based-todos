import Link from 'next/link';
import React from 'react';
import classNames from '../mainNavigation.module.scss';
import createClassName from 'classnames';
import { useRouter } from 'next/dist/client/router';
import { motion } from 'framer-motion';

type Props = {
    title: string;
    path: string;
};

const Item: React.FC<Props> = ({ title, path }) => {
    const router = useRouter();

    // remove anchors if any
    const currentPath = router.asPath.split('#')[0];

    const current = currentPath === path;

    const className = createClassName(classNames.item, {
        [classNames.currentItem]: current,
    });

    return (
        <>
            <Link href={path}>
                <a className={className}>{title}</a>
            </Link>
            {current && (
                <motion.div
                    layoutId="underline"
                    className={classNames.linkUnderline}
                />
            )}
        </>
    );
};

export default Item;
