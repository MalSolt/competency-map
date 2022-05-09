import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { useBooleanState } from 'shared/lib/hooks/useBooleanState';
import React from 'react';
import { HeaderTitleProvider } from 'shared/lib/HeaderTitle/HeaderTitleProvider';
import createEmotionCache from './helpers/createEmotionCache';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { MUiProvider } from './providers/MUiProvider';
import { Layout } from './ui/layout';
import { Header } from './ui/header';
import { Menu } from './ui/menu';
import { DndProvider } from './providers/DndProvider';
import { ReactSnackbarProvider } from './providers/SnackbarProvider';
import { UserDataWrapper } from './ui/userDataWrapper';
import { AbilityProvider } from './providers/AbilityProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const menuIsOpen = useBooleanState();

  return (
    <CacheProvider value={emotionCache}>
      <HeaderTitleProvider>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ReactQueryProvider>
          <DndProvider>
            <MUiProvider>
              <ReactSnackbarProvider>
                <UserDataWrapper>
                  <AbilityProvider>
                    <Layout
                      header={<Header onToggleMenu={menuIsOpen.toggle} />}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      app={<Component {...pageProps} />}
                    />
                    <Menu
                      isOpen={menuIsOpen.state}
                      onToggle={menuIsOpen.toggle}
                    />
                  </AbilityProvider>
                </UserDataWrapper>
              </ReactSnackbarProvider>
            </MUiProvider>
          </DndProvider>
        </ReactQueryProvider>
      </HeaderTitleProvider>
    </CacheProvider>
  );
}
