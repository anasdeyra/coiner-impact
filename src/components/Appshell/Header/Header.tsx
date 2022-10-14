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
  FiLogOut,
  FiUser,
  FiSettings,
  FiPlusCircle,
  FiBarChart2 as FiActivity,
} from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import { NextLink } from "@mantine/next";

export default function Header() {
  const { data } = useSession();
  return (
    <H p={16} withBorder={false} pb={0} height={55 + 16}>
      <Group position="apart">
        {data ? (
          <Menu radius={"lg"} position="bottom-start">
            <Menu.Target>
              <Avatar
                component="button"
                //@ts-ignore
                radius={"50%"}
                size={"md"}
                src={data.user?.image}
                sx={{ cursor: "pointer" }}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Actions</Menu.Label>
              <Menu.Item icon={<FiUser />}>Profile</Menu.Item>
              <Menu.Item icon={<FiPlusCircle />}>New Article</Menu.Item>
              {data.user.role === "admin" && (
                <Menu.Item
                  icon={<FiActivity />}
                  component={NextLink}
                  href="admin"
                >
                  Admin Dashboard
                </Menu.Item>
              )}
              <Menu.Item icon={<FiSettings />}>Settings</Menu.Item>
              <Menu.Divider />
              <Menu.Item
                icon={<FiLogOut />}
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
      <Divider color={"#dbdbdb"} size={"xs"} mt={18} orientation="horizontal" />
    </H>
  );
}
