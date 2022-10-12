import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Appshell from "../components/Appshell/Appshell";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { trpc } from "@/trpc/hook";
import { NotificationsProvider } from "@mantine/notifications";
import { Global } from "@emotion/react";

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Coiner impact</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Open Sans",
            headings: { fontFamily: "Open Sans" },
          }}
        >
          <Global
            styles={[
              "@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap')",
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
