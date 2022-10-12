import { MantineProvider, TypographyStylesProvider } from "@mantine/core";
import { Global } from "@emotion/react";

export default function Content({ content }: { content: string }) {
  return (
    <MantineProvider theme={{ fontFamily: "Merriweather" }}>
      <Global
        styles={[
          "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap');",
          { p: { fontSize: 16 } },
        ]}
      />
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </TypographyStylesProvider>
    </MantineProvider>
  );
}
