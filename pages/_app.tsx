import React from 'react';
import type { AppProps } from 'next/app';
import MainLayout from '../primitives/mainLayout/MainLayout';
import '../styles/globals.scss';
import MainNavigation from '../features/mainNavigation/MainNavigation';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
    <MainLayout.Container>
        <MainLayout.Header>
            <MainNavigation />
        </MainLayout.Header>
        <MainLayout.Content>
            <Component {...pageProps} />
        </MainLayout.Content>
    </MainLayout.Container>
);

export default MyApp;
