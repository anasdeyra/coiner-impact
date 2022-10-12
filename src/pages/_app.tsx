import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Appshell from "../components/Appshell/Appshell";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { trpc } from "@/trpc/hook";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

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
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          <NotificationsProvider>
            <ModalsProvider>
              <Appshell>
                <Component {...pageProps} />
              </Appshell>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}

export default trpc.withTRPC(App);
