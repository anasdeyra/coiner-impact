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
        <meta property="og:url" content={`https://coiner-impact.com/`} />
        <meta property="og:title" content="Coiner impact" />
        <meta
          property="og:description"
          content="Coiner impact is the web3 magazine"
        />
        <meta
          property="og:image"
          content={
            "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/pexels-pixabay-315788-scaled.jpg"
          }
        />
        <meta property="og:site_name" content="Coiner impact" />
        {/* twitter tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@coiner_impact" />
        <meta name="twitter:title" content={"Coiner impact"} />
        <meta
          name="twitter:description"
          content={"Coiner impact is the web3 magazine"}
        />
        <meta name="twitter:creator" content="@coiner_impact" />
        <meta
          name="twitter:image"
          content={
            "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/pexels-pixabay-315788-scaled.jpg"
          }
        />
      </Head>
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
