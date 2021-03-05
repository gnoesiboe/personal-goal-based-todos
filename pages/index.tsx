import React from 'react';
import Head from 'next/head';
import { createMetaTitle } from '../utility/metaUtilities';
import TodoOverview from '../features/todoOverview/TodoOverview';
import MainLayout from '../primitives/mainLayout/MainLayout';
import Island from '../primitives/island/Island';
import TodoBacklog from '../features/todoBacklog/TodoBacklog';

const Home: React.FC = () => (
    <>
        <Head>
            <title>{createMetaTitle('Todos')}</title>
        </Head>
        <MainLayout.Body fullWidth>
            <MainLayout.ContentMain>
                <Island fullWidth ghost deflatedTop>
                    <TodoOverview />
                </Island>
                <Island style="secondary" fullWidth>
                    <TodoBacklog />
                </Island>
            </MainLayout.ContentMain>
        </MainLayout.Body>
    </>
);

export default Home;
