import {
  ActionIcon,
  Avatar,
  Menu,
  Divider,
  Group,
  Header as H,
  Button,
} from "@mantine/core";

import {
  FiSearch as SearchIcon,
  FiBookmark,
  FiMenu,
  FiBell,
} from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data } = useSession();
  return (
    <H p={16} withBorder={false} pb={0} height={55 + 16}>
      <Group position="apart">
        {data ? (
          <Menu position="bottom-start">
            <Menu.Target>
              <Avatar
                //@ts-ignore
                radius={"50%"}
                size={"md"}
                src={data.user?.image}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color={"red"}
                onClick={() => {
                  signOut();
                }}
              >
                logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button component="a" href="/api/auth/signin" color={"dark"}>
            signin
          </Button>
        )}
        {data && (
          <Button color={"dark"} component="a" href="/admin">
            go admin
          </Button>
        )}
        <Group spacing={16} position="right">
          <ActionIcon variant="transparent">
            <SearchIcon color={"#111"} size={24} />
          </ActionIcon>
          <ActionIcon variant="transparent">
            <FiBell color={"#111"} size={24} />
          </ActionIcon>
          <ActionIcon variant="transparent">
            <FiBookmark color={"#111"} size={24} />
          </ActionIcon>
          <ActionIcon variant="transparent">
            <FiMenu color={"#111"} size={24} />
          </ActionIcon>
        </Group>
      </Group>
      <Divider color={"#dbdbdb"} size={"xs"} mt={16} orientation="horizontal" />
    </H>
  );
}
