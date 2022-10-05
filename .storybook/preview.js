import { Global, MantineProvider } from "@mantine/core";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "Open Sans",
        headings: { fontFamily: "Open Sans" },
        components: { Button: { styles: { root: { fontWeight: "bold" } } } },
      }}
    >
      <Global
        styles={[
          "@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap')",
        ]}
      />
      <Story />
    </MantineProvider>
  ),
];
