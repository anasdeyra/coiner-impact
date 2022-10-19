import { MantineProvider, TypographyStylesProvider } from "@mantine/core";
import { Global } from "@emotion/react";

export default function Content({ content }: { content: string }) {
  return (
    <MantineProvider theme={{ fontFamily: "Merriweather" }}>
      <Global styles={[{ p: { fontSize: 16 } }]} />
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </TypographyStylesProvider>
    </MantineProvider>
  );
}
