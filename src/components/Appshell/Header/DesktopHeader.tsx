import { useElementSize } from "@mantine/hooks";
import { Box, Group, ActionIcon } from "@mantine/core";
import SearchBar from "@/components/SearchBar/SearchBar";
import { FiBell, FiBookmark } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { NextLink } from "@mantine/next";

export default function DesktopHeader() {
  const bigHeader = useElementSize();
  const { data } = useSession();
  return (
    <Box
      ref={bigHeader.ref}
      sx={{
        margin: -16,
        marginBottom: 72 + 16 + 24,
        width: "calc(100%+32px)",
        background: "green",
      }}
    >
      <Box
        px={16}
        sx={{
          position: "fixed",
          background: "white",
          zIndex: 10,
          width: bigHeader.width,
        }}
      >
        <Group
          position="apart"
          py={16}
          sx={{ borderBottom: "1px solid #e9ecef" }}
        >
          <SearchBar grow={3} />
          {data && (
            <Group sx={{ flexGrow: 1 }} position="right">
              <ActionIcon variant="transparent">
                <FiBell color={"#111"} size={24} />
              </ActionIcon>
              <ActionIcon
                component={NextLink}
                href="/saved"
                variant="transparent"
              >
                <FiBookmark color={"#111"} size={24} />
              </ActionIcon>
            </Group>
          )}
        </Group>
      </Box>
    </Box>
  );
}
