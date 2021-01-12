import React from 'react';
import Head from 'next/head';
import { createMetaTitle } from '../utility/metaUtilities';
import TodoOverview from '../features/todoOverview/TodoOverview';

const Home: React.FC = () => (
    <>
        <Head>
            <title>{createMetaTitle('Todos')}</title>
        </Head>
        <TodoOverview />
    </>
);

export default Home;
