import React from 'react';
import type { AppProps } from 'next/app';
import MainLayout from '../primitives/mainLayout/MainLayout';
import '../styles/globals.scss';
import MainNavigation from '../features/mainNavigation/MainNavigation';
import { AuthenticationContextProvider } from '../context/authentication/AuthenticationContext';
import { initializeApp as initializeFirebaseApp } from '../firebase/app';
import Head from 'next/head';
import { NotificationContextProvider } from '../context/notification/NotificationContext';
import NotificationOverview from '../features/notificationOverview/NotificationOverview';

initializeFirebaseApp();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
    <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <NotificationContextProvider>
            <AuthenticationContextProvider>
                <MainLayout.Container>
                    <MainLayout.Header>
                        <MainNavigation />
                    </MainLayout.Header>
                    <Component {...pageProps} />
                </MainLayout.Container>
            </AuthenticationContextProvider>
            <NotificationOverview />
        </NotificationContextProvider>
    </>
);

export default MyApp;
