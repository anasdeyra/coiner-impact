import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Appshell from "../components/Appshell/Appshell";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { trpc } from "@/trpc/hook";
import { NotificationsProvider } from "@mantine/notifications";
import { Global } from "@emotion/react";
import { SEO } from "@const";
import Script from "next/script";

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" type="image" href="/logo.png"></link>
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7629850326051906"
        crossOrigin="anonymous"
      />
      <SessionProvider session={pageProps.session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Open Sans, sans-serif",
            headings: { fontFamily: "Open Sans, sans-serif" },
          }}
        >
          <Global
            styles={[
              "@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap')",
              "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap');",
            ]}
          />
          <NotificationsProvider>
            <Appshell>
              <Component {...pageProps} />
            </Appshell>
          </NotificationsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}

export default trpc.withTRPC(App);
