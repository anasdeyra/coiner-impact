import { ActionIcon, Avatar, Group, Header as H, Button } from "@mantine/core";

import {
  FiSearch as SearchIcon,
  FiBookmark,
  FiMenu,
  FiBell,
  FiX,
} from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import UserMenu from "./UserMenu";
import { NextLink } from "@mantine/next";
import NavModal from "@/components/NavDrawer/NavDrawer";

export default function Header() {
  const { data } = useSession();
  const isSmall = useMediaQuery("(max-width: 992px)", false, {
    getInitialValueInEffect: true,
  });
  const [opened, { open, close, toggle }] = useDisclosure(false);
  return (
    <H
      sx={!isSmall ? { display: "none" } : {}}
      px={16}
      height={isSmall ? 55 + 16 : 0}
      withBorder={false}
    >
      {opened && <NavModal opened={opened} onClose={close} />}
      <Group
        sx={{ borderBottom: "1px solid #e9ecef" }}
        py={16}
        position="apart"
      >
        {data ? (
          <UserMenu>
            <Avatar // @ts-ignore
              radius={"50%"}
              sx={{ cursor: "pointer" }}
              src={data.user.image}
            ></Avatar>
          </UserMenu>
        ) : (
          <Button
            radius={"xl"}
            component={NextLink}
            href="/api/auth/signin"
            color={"dark"}
          >
            signin
          </Button>
        )}

        <Group spacing={16} position="right">
          <ActionIcon component={NextLink} href="/search" variant="transparent">
            <SearchIcon color={"#111"} size={24} />
          </ActionIcon>
          {data && (
            <>
              <ActionIcon variant="transparent">
                <FiBell color={"#111"} size={24} />
              </ActionIcon>
              <ActionIcon variant="transparent">
                <FiBookmark color={"#111"} size={24} />
              </ActionIcon>
            </>
          )}
          <ActionIcon
            onClick={() => {
              toggle();
            }}
            variant="transparent"
          >
            {opened ? (
              <FiX color={"#111"} size={24} />
            ) : (
              <FiMenu color={"#111"} size={24} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </H>
  );
}
