import React from 'react';
import type { AppProps } from 'next/app';
import MainLayout from '../primitives/mainLayout/MainLayout';
import '../styles/globals.scss';
import MainNavigation from '../features/mainNavigation/MainNavigation';
import { AuthenticationContextProvider } from '../context/authentication/AuthenticationContext';
import { initializeApp as initializeFirebaseApp } from '../firebase/app';

initializeFirebaseApp();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
    <AuthenticationContextProvider>
        <MainLayout.Container>
            <MainLayout.Header>
                <MainNavigation />
            </MainLayout.Header>
            <MainLayout.Content>
                <Component {...pageProps} />
            </MainLayout.Content>
        </MainLayout.Container>
    </AuthenticationContextProvider>
);

export default MyApp;
