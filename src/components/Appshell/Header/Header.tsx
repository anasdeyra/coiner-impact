import { ActionIcon, Avatar, Group, Header as H, Button } from "@mantine/core";

import {
  FiSearch as SearchIcon,
  FiBookmark,
  FiMenu,
  FiBell,
} from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import { useMediaQuery } from "@mantine/hooks";
import UserMenu from "./UserMenu";
import { NextLink } from "@mantine/next";

export default function Header() {
  const { data } = useSession();
  const isSmall = useMediaQuery("(max-width: 992px)", false, {
    getInitialValueInEffect: true,
  });
  return (
    <H
      sx={!isSmall ? { display: "none" } : {}}
      m={16}
      mt={0}
      pt={16}
      height={isSmall ? 55 + 16 : 0}
    >
      <Group position="apart">
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
          <ActionIcon variant="transparent">
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
          <ActionIcon variant="transparent">
            <FiMenu color={"#111"} size={24} />
          </ActionIcon>
        </Group>
      </Group>
    </H>
  );
}
